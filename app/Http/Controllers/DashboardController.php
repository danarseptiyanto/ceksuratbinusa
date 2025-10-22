<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Surat;
use App\Models\SuratMasuk;
use App\Models\TahunAjaran;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $activeTahunAjaranId = $request->session()->get('active_tahun_ajaran_id');

        if (!$activeTahunAjaranId) {
            $activeTahunAjaranId = TahunAjaran::latest()->first()->id ?? null;
        }

        return inertia('Dashboard', [
            'auth' => [
                'user' => auth()->user(),
            ],
            'stats' => [
                'surat_keluar' => Surat::where('tipe', 'surat keluar')->where('tahun_ajaran_id', $activeTahunAjaranId)->count(),
                'surat_masuk' => SuratMasuk::where('tahun_ajaran_id', $activeTahunAjaranId)->count(),
                'surat_internal' => Surat::where('tipe', 'surat internal')->where('tahun_ajaran_id', $activeTahunAjaranId)->count(),
                'tahun_ajaran' => TahunAjaran::count(),
            ],
            'latest_surat_keluar' => Surat::where('tipe', 'surat keluar')->where('tahun_ajaran_id', $activeTahunAjaranId)->latest()->take(10)->get(),
            'latest_surat_internal' => Surat::where('tipe', 'surat internal')->where('tahun_ajaran_id', $activeTahunAjaranId)->latest()->take(10)->get(),
            'latest_surat_masuk' => SuratMasuk::where('tahun_ajaran_id', $activeTahunAjaranId)->latest()->take(10)->get(),
        ]);
    }
}
