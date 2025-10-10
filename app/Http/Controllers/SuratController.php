<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Surat;
use BaconQrCode\Writer;
use Illuminate\Http\Request;
use Intervention\Image\Image;
use BaconQrCode\Renderer\ImageRenderer;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Response;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use BaconQrCode\Renderer\Image\SvgImageBackEnd;
use BaconQrCode\Renderer\RendererStyle\RendererStyle;

class SuratController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $activeTahunAjaranId = $request->session()->get('active_tahun_ajaran_id');

        if (!$activeTahunAjaranId) {
            // Redirect or show a message if no academic year is set
            return redirect()->route('dashboard')->with('error', 'Please select an academic year.');
        }

        $surats = Surat::where('tahun_ajaran_id', $activeTahunAjaranId)
            ->orderBy('id', 'desc')
            ->get(); // Using pagination

        return Inertia::render('Surat/Index', [
            'surats' => $surats
        ]);
    }

    public function downloadQr($slug)
    {
        // Build your URL
        $url = url('/' . $slug);

        // Generate QR Code as PNG binary
        $qr = QrCode::format('png')->size(200)->generate($url);

        // Create an Intervention Image from the QR binary
        $qrImage = Image::read($qr);

        // Create a blank white canvas (width 400px, height 300px)
        $canvas = Image::canvas(400, 300, '#ffffff');

        // Add text
        $canvas->text('Here\'s the QR code for the URL:', 200, 40, function ($font) {
            $font->size(20);
            $font->align('center');
            $font->valign('middle');
            $font->color('#000000');
        });

        // Insert the QR code image into the canvas
        $canvas->insert($qrImage, 'center', 0, 40);

        // Encode final image as PNG
        $finalImage = $canvas->encode('png');

        // Return as downloadable file
        return Response::make($finalImage)
            ->header('Content-Type', 'image/png')
            ->header('Content-Disposition', 'attachment; filename="qr-' . $slug . '.png"');
    }

    public function create(Request $request)
    {
        // Generate suggested number
        $month = date('n');
        $year = date('Y');
        $romanMonth = $this->toRoman($month);

        // Get the latest number for the current month and year to increment it
        $lastSurat = Surat::whereYear('created_at', $year)
            ->whereMonth('created_at', $month)
            ->count();
        $increment = $lastSurat + 1;

        $suggestedNumber = sprintf("%03d/SK/SMK.BN/%s/%d", $increment, $romanMonth, $year);

        return Inertia::render('Surat/Create', [
            'suggestedNumber' => $suggestedNumber,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nomor_surat' => 'required|string|max:255|unique:surats,nomor_surat',
            'nama_surat' => 'required|string|max:255',
            'kepada' => 'required|string|max:255',
            'tanggal_surat' => 'required|date',
            'pdf_file' => 'nullable|file|mimes:pdf|max:2048', // 2MB Max
        ]);

        $activeTahunAjaranId = $request->session()->get('active_tahun_ajaran_id');

        $surat = Surat::create([
            'user_id' => auth()->id(),
            'tahun_ajaran_id' => $activeTahunAjaranId,
            'nomor_surat' => $request->nomor_surat,
            'nama_surat' => $request->nama_surat,
            'kepada' => $request->kepada,
            'tanggal_surat' => $request->tanggal_surat,
        ]);

        // Handle file upload
        if ($request->hasFile('pdf_file')) {
            $path = $request->file('pdf_file')->store('surat_files', 'public');
            $surat->update(['file_path' => $path]);
        }

        return redirect()->route('surat.index')->with('success', 'Nomor surat berhasil dibuat.');
    }

    // Full implementation for toRoman helper
    private function toRoman($number)
    {
        $map = ['M' => 1000, 'CM' => 900, 'D' => 500, 'CD' => 400, 'C' => 100, 'XC' => 90, 'L' => 50, 'XL' => 40, 'X' => 10, 'IX' => 9, 'V' => 5, 'IV' => 4, 'I' => 1];
        $returnValue = '';
        while ($number > 0) {
            foreach ($map as $roman => $int) {
                if ($number >= $int) {
                    $number -= $int;
                    $returnValue .= $roman;
                    break;
                }
            }
        }
        return $returnValue;
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Surat $surat)
    {
        return Inertia::render('Surat/Edit', [
            'surat' => $surat,
        ]);
    }

    public function update(Request $request, Surat $surat)
    {
        $request->validate([
            'nomor_surat' => 'required|string|max:255',
            'nama_surat' => 'required|string|max:255',
            'tanggal_surat' => 'required|date',
            'kepada' => 'required|string|max:255',
            'pdf_file' => 'nullable|file|mimes:pdf|max:2048',
        ]);

        $surat->update($request->only('nomor_surat', 'nama_surat', 'tanggal_surat', 'kepada'));

        if ($request->hasFile('pdf_file')) {
            // Delete old file if it exists
            if ($surat->file_path) {
                Storage::disk('public')->delete($surat->file_path);
            }
            $path = $request->file('pdf_file')->store('surat_files', 'public');
            $surat->update(['file_path' => $path]);
        }

        return redirect()->route('surat.index')->with('success', 'Surat updated successfully.');
    }

    public function destroy(Surat $surat)
    {
        // Delete associated file
        if ($surat->file_path) {
            Storage::disk('public')->delete($surat->file_path);
        }
        $surat->delete();
        return redirect()->route('surat.index')->with('success', 'Surat deleted successfully.');
    }
    public function deleteFile(Surat $surat)
    {
        // Check if a file path exists and delete it from storage
        if ($surat->file_path) {
            Storage::disk('public')->delete($surat->file_path);
        }

        // Set the file_path to null in the database
        $surat->file_path = null;
        $surat->save();

        return redirect()->back()->with('success', 'File has been deleted successfully.');
    }
}
