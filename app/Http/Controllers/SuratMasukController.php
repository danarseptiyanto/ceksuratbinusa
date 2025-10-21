<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SuratMasuk;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class SuratMasukController extends Controller
{
    public function index(Request $request)
    {
        $activeTahunAjaranId = $request->session()->get('active_tahun_ajaran_id');
        if (!$activeTahunAjaranId) {
            return redirect()->route('dashboard')->with('error', 'Please select an academic year.');
        }

        $suratMasuks = SuratMasuk::with('user')->where('tahun_ajaran_id', $activeTahunAjaranId)
            ->orderBy('id', 'desc')
            ->get();

        return Inertia::render('SuratMasuk/Index', [
            'suratMasuks' => $suratMasuks
        ]);
    }

    public function create()
    {
        return Inertia::render('SuratMasuk/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama_surat' => 'required|string|max:255',
            'nomor_surat' => 'required|string|max:255',
            'tanggal_surat' => 'required|date',
            'asal_surat' => 'required|string|max:255',
            'pdf_file' => 'nullable|file|mimes:pdf|max:2048',
        ]);

        $activeTahunAjaranId = $request->session()->get('active_tahun_ajaran_id');
        $data = $request->all();
        $data['user_id'] = auth()->id();
        $data['tahun_ajaran_id'] = $activeTahunAjaranId;

        if ($request->hasFile('pdf_file')) {
            $data['file_path'] = $request->file('pdf_file')->store('surat_masuk_files', 'public');
        }

        SuratMasuk::create($data);

        return redirect()->route('surat-masuk.index')->with('success', 'Surat masuk created successfully.');
    }

    public function edit(SuratMasuk $suratMasuk)
    {
        return Inertia::render('SuratMasuk/Edit', [
            'suratMasuk' => $suratMasuk,
        ]);
    }

    public function update(Request $request, SuratMasuk $suratMasuk)
    {
        $request->validate([
            'nama_surat' => 'required|string|max:255',
            'nomor_surat' => 'required|string|max:255',
            'tanggal_surat' => 'required|date',
            'asal_surat' => 'required|string|max:255',
            'pdf_file' => 'nullable|file|mimes:pdf|max:2048',
        ]);

        $data = $request->except('pdf_file');

        if ($request->hasFile('pdf_file')) {
            if ($suratMasuk->file_path) {
                Storage::disk('public')->delete($suratMasuk->file_path);
            }
            $data['file_path'] = $request->file('pdf_file')->store('surat_masuk_files', 'public');
        }

        $suratMasuk->update($data);

        return redirect()->route('surat-masuk.index')->with('success', 'Surat masuk updated successfully.');
    }

    public function destroy(SuratMasuk $suratMasuk)
    {
        if ($suratMasuk->file_path) {
            Storage::disk('public')->delete($suratMasuk->file_path);
        }
        $suratMasuk->delete();
        return redirect()->route('surat-masuk.index')->with('success', 'Surat masuk deleted successfully.');
    }

    public function deleteFile(SuratMasuk $suratMasuk)
    {
        if ($suratMasuk->file_path) {
            Storage::disk('public')->delete($suratMasuk->file_path);
        }
        $suratMasuk->file_path = null;
        $suratMasuk->save();
        return redirect()->back()->with('success', 'File has been deleted successfully.');
    }
}
