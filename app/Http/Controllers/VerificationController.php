<?php

// namespace App\Http\Controllers;

// use App\Models\Surat;
// use Illuminate\Http\Request;

// class VerificationController extends Controller
// {
//     public function show($slug)
//     {
//         $surat = Surat::where('slug', $slug)->firstOrFail();
//         return view('verification.show', compact('surat'));
//     }
// }

namespace App\Http\Controllers;

use App\Models\Surat;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class VerificationController extends Controller
{
    /**
     * Display the specified resource.
     *
     * @param  string  $slug
     * @return \Inertia\Response
     */
    public function show($slug)
    {
        // Find the record by its slug, or fail with a 404 error
        $surat = Surat::where('slug', $slug)->firstOrFail();

        // Render the Inertia component and pass the necessary data as props
        return Inertia::render('Surat/Verify', [
            'surat' => [
                'nama_surat' => $surat->nama_surat,
                'nomor_surat' => $surat->nomor_surat,
                // Format the date for display (e.g., "08 Oktober 2025")
                'tanggal_surat' => Carbon::parse($surat->tanggal_surat)->translatedFormat('d F Y'),
                // Provide a direct, usable URL for the file if it exists
                'file_url' => $surat->file_path ? Storage::url($surat->file_path) : null,
                'showpdf' => (bool) $surat->showpdf,
            ],
            // Pass the URL to be encoded into the QR code on the frontend
            'verificationUrl' => route('surat.verify', $surat->slug),
        ]);
    }
}
