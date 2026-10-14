<?php

namespace App\Http\Controllers;

use App\Models\Surat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SuratController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $activeTahunAjaranId = $request->session()->get('active_tahun_ajaran_id');

        if (! $activeTahunAjaranId) {
            // Redirect or show a message if no academic year is set
            return redirect()->route('dashboard')->with('error', 'Please select an academic year.');
        }

        $search = trim((string) $request->query('search', ''));
        $tipe = (string) $request->query('tipe', 'all');

        if (! in_array($tipe, ['surat keluar', 'surat internal'], true)) {
            $tipe = 'all';
        }

        $surats = Surat::with('user')
            ->where('tahun_ajaran_id', $activeTahunAjaranId)
            ->when($search !== '', function ($query) use ($search) {
                $query->where(function ($query) use ($search) {
                    $query->where('nomor_surat', 'like', '%'.$search.'%')
                        ->orWhere('nama_surat', 'like', '%'.$search.'%');
                });
            })
            ->when($tipe !== 'all', fn ($query) => $query->where('tipe', $tipe))
            ->orderBy('id', 'desc')
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('Surat/Index', [
            'surats' => $surats,
            'filters' => [
                'search' => $search,
                'tipe' => $tipe,
            ],
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
            'tipe' => 'required|in:surat keluar,surat internal',
            'showpdf' => 'boolean',
        ]);

        $activeTahunAjaranId = $request->session()->get('active_tahun_ajaran_id');

        $surat = Surat::create([
            'user_id' => auth()->id(),
            'tahun_ajaran_id' => $activeTahunAjaranId,
            'nomor_surat' => $request->nomor_surat,
            'nama_surat' => $request->nama_surat,
            'kepada' => $request->kepada,
            'tanggal_surat' => $request->tanggal_surat,
            'tipe' => $request->tipe,
            'showpdf' => $request->showpdf,
        ]);

        // Handle file upload
        if ($request->hasFile('pdf_file')) {
            $path = $request->file('pdf_file')->store('surat_files', 'public');
            $surat->update(['file_path' => $path]);
        }

        return redirect()->route('surat.index')->with('success', 'Nomor surat berhasil dibuat.');
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
            'tipe' => 'in:surat keluar,surat internal',
            'showpdf' => 'boolean',
        ]);

        $surat->update($request->only('nomor_surat', 'nama_surat', 'tanggal_surat', 'kepada', 'tipe', 'showpdf'));

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
