<?php

namespace App\Models;

use App\Models\Surat;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TahunAjaran extends Model
{
    use HasFactory;
    protected $fillable = ['tahun'];

    public function surats()
    {
        return $this->hasMany(Surat::class);
    }
}
