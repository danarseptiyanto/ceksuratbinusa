<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TahunAjaran;

class TahunAjaranController extends Controller
{
    public function switch($id)
    {
        $tahunAjaran = TahunAjaran::findOrFail($id);
        session(['active_tahun_ajaran_id' => $tahunAjaran->id]);
        return redirect()->back();
    }
}
