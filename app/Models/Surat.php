<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Surat extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'tahun_ajaran_id',
        'nomor_surat',
        'nama_surat',
        'kepada',
        'tanggal_surat',
        'file_path',
        'slug',
        'tipe',
        'showpdf',
    ];

    protected $casts = [
        'showpdf' => 'boolean',
    ];

    // Automatically generate slug when saving
    protected static function boot()
    {
        parent::boot();
        static::creating(function ($surat) {
            $surat->slug = Str::slug($surat->nomor_surat);
        });
        static::updating(function ($surat) {
            $surat->slug = Str::slug($surat->nomor_surat);
        });
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function tahunAjaran()
    {
        return $this->belongsTo(TahunAjaran::class);
    }
}
