<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        return inertia('Dashboard', [
            'auth' => [
                'user' => auth()->user(),
            ],
            'stats' => [
                'surat_keluar' => 377,
                'surat_masuk' => 128,
                'surat_internal' => 85,
                'Tahun Ajaran' => 2,
            ],
        ]);
    }
}
