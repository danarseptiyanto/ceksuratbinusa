<?php

use App\Http\Controllers\DashboardController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\SuratController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SuratMasukController;
use App\Http\Controllers\TahunAjaranController;
use App\Http\Controllers\VerificationController;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

// Route::get('/hehe', function () {
//     return Inertia(
//         'Home'
//     );
// });

Route::get('/', [SearchController::class, 'show'])->name('search.show');
Route::post('/', [SearchController::class, 'find'])->name('search.find');

Route::get('/tahun-ajaran/switch/{id}', [TahunAjaranController::class, 'switch'])
    ->middleware(['auth'])
    ->name('tahun-ajaran.switch');

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');


Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::resource('surat', SuratController::class);
    Route::resource('tahun-ajaran', TahunAjaranController::class);
    Route::delete('/surat/{surat}/delete-file', [SuratController::class, 'deleteFile'])->name('surat.deleteFile');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::resource('surat-masuk', SuratMasukController::class);
    Route::delete('/surat-masuk/{suratMasuk}/delete-file', [SuratMasukController::class, 'deleteFile'])->name('surat-masuk.deleteFile');
});

Route::get('/verify/{slug}', [VerificationController::class, 'show'])->name('surat.verify');

require __DIR__ . '/auth.php';
