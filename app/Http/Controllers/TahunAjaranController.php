<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TahunAjaran;
use Inertia\Inertia;

class TahunAjaranController extends Controller
{
    public function switch($id)
    {
        $tahunAjaran = TahunAjaran::findOrFail($id);
        session(['active_tahun_ajaran_id' => $tahunAjaran->id]);
        return redirect()->back();
    }
    public function index()
    {
        $tahunAjarans = TahunAjaran::orderBy('id', 'desc')->get();
        return Inertia::render('TahunAjaran/Index', [
            'tahunAjarans' => $tahunAjarans
        ]);
    }

    public function create()
    {
        return Inertia::render('TahunAjaran/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'tahun' => 'required|string|max:255|unique:tahun_ajarans',
        ]);

        TahunAjaran::create([
            'tahun' => $request->tahun,
        ]);

        return redirect()->route('tahun-ajaran.index')->with('success', 'Tahun Ajaran created successfully.');
    }

    public function show(TahunAjaran $tahunAjaran)
    {
        //
    }

    public function edit(TahunAjaran $tahunAjaran)
    {
        return Inertia::render('TahunAjaran/Edit', [
            'tahunAjaran' => $tahunAjaran
        ]);
    }

    public function update(Request $request, TahunAjaran $tahunAjaran)
    {
        $request->validate([
            'tahun' => 'required|string|max:255|unique:tahun_ajarans,tahun,' . $tahunAjaran->id,
        ]);

        $tahunAjaran->update([
            'tahun' => $request->tahun,
        ]);

        return redirect()->route('tahun-ajaran.index')->with('success', 'Tahun Ajaran updated successfully.');
    }

    public function destroy(TahunAjaran $tahunAjaran)
    {
        $tahunAjaran->delete();

        return redirect()->route('tahun-ajaran.index')->with('success', 'Tahun Ajaran deleted successfully.');
    }
}
