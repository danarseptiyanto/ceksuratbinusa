<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('surat_masuks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Who archived it
            $table->foreignId('tahun_ajaran_id')->constrained()->onDelete('cascade'); // Link to academic year
            $table->string('nama_surat'); // Subject of the letter
            $table->string('nomor_surat'); // The letter's own number
            $table->date('tanggal_surat'); // Date on the letter
            $table->string('asal_surat'); // Where the letter is from
            $table->string('file_path')->nullable(); // The scanned PDF file
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('surat_masuks');
    }
};
