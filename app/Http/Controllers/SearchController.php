<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Surat; // We are searching the outgoing letters (Surat)
use Inertia\Inertia;

class SearchController extends Controller
{
    /**
     * Display the search form.
     */
    public function show()
    {
        return Inertia::render('Home');
    }

    /**
     * Find the letter by its number and redirect or return an error.
     */
    public function find(Request $request)
    {
        $request->validate([
            'nomor_surat' => 'required|string|max:255',
        ]);

        // Find the "Surat Keluar" that has a public slug
        $surat = Surat::where('nomor_surat', $request->input('nomor_surat'))->first();

        // If the letter is found, redirect to its public verification page
        if ($surat) {
            return redirect()->route('surat.verify', $surat->slug)->with('success', 'Nomor surat ditemukan.');
        }

        // If not found, redirect back to the search page with an error message.
        // This integrates directly with Inertia's error handling.
        return back()->withErrors([
            'nomor_surat' => 'Nomor surat yang Anda masukkan tidak ditemukan dalam sistem.',
        ]);
    }
}
