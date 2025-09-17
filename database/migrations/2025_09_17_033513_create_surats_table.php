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
        Schema::create('surats', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('tahun_ajaran_id')->constrained()->onDelete('cascade');
            $table->string('nomor_surat');
            $table->string('nama_surat');
            $table->date('tanggal_surat');
            $table->string('file_path')->nullable(); // To store the PDF path
            $table->string('slug')->unique(); // For the public verification URL
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('surats');
    }
};
