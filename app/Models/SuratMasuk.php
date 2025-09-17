<?php

namespace App\Models;

use App\Models\User;
use App\Models\TahunAjaran;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SuratMasuk extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'tahun_ajaran_id',
        'nama_surat',
        'nomor_surat',
        'tanggal_surat',
        'asal_surat',
        'file_path',
    ];

    /**
     * Get the user who archived this letter.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the academic year this letter belongs to.
     */
    public function tahunAjaran()
    {
        return $this->belongsTo(TahunAjaran::class);
    }
}
