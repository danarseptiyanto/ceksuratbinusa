<?php

// app/Listeners/SetActiveTahunAjaranSession.php
namespace App\Listeners;

use App\Models\TahunAjaran;
use Illuminate\Auth\Events\Login; // 👈 This is the important part
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SetActiveTahunAjaranSession
{
    public function handle(Login $event): void // 👈 Laravel sees this and knows what to do
    {
        // Get the latest academic year
        $latestTahunAjaran = TahunAjaran::orderBy('tahun', 'desc')->first();

        if ($latestTahunAjaran) {
            session(['active_tahun_ajaran_id' => $latestTahunAjaran->id]);
        }
    }
}
