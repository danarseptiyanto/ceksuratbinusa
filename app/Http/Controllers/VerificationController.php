<?php

namespace App\Http\Controllers;

use App\Models\Surat;
use Illuminate\Http\Request;

class VerificationController extends Controller
{
    public function show($slug)
    {
        $surat = Surat::where('slug', $slug)->firstOrFail();
        return view('verification.show', compact('surat'));
    }
}
