<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Surat;
use App\Models\SuratMasuk;
use App\Models\TahunAjaran;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $activeTahunAjaranId = $request->session()->get('active_tahun_ajaran_id');

        if (!$activeTahunAjaranId) {
            $activeTahunAjaranId = TahunAjaran::latest()->first()->id ?? null;
        }

        // --- Get date range (last 20 days including today)
        $endDate = Carbon::today();
        $startDate = Carbon::today()->subDays(28);

        // --- Surat counts per day
        $suratCounts = Surat::select(
            DB::raw('DATE(created_at) as date'),
            DB::raw('COUNT(*) as count')
        )
            ->where('tahun_ajaran_id', $activeTahunAjaranId)
            ->whereBetween('created_at', [$startDate, $endDate])
            ->groupBy('date')
            ->pluck('count', 'date'); // returns like ['2024-04-01' => 5, ...]

        // --- SuratMasuk counts per day
        $suratMasukCounts = SuratMasuk::select(
            DB::raw('DATE(created_at) as date'),
            DB::raw('COUNT(*) as count')
        )
            ->where('tahun_ajaran_id', $activeTahunAjaranId)
            ->whereBetween('created_at', [$startDate, $endDate])
            ->groupBy('date')
            ->pluck('count', 'date');

        // --- Build chart data array (ensure all days exist, even if count = 0)
        $chartData = [];
        for ($date = $startDate->copy(); $date->lte($endDate); $date->addDay()) {
            $dateStr = $date->toDateString();
            $chartData[] = [
                'date' => $dateStr,
                'surat' => $suratCounts[$dateStr] ?? 0,
                'surat_masuk' => $suratMasukCounts[$dateStr] ?? 0,
            ];
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
            'chart_data' => $chartData, // <-- send to frontend
        ]);
    }
}
