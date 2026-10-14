<?php

use App\Models\Surat;
use App\Models\SuratMasuk;
use App\Models\TahunAjaran;
use App\Models\User;

function actingAsWithActiveYear(): User
{
    $user = User::factory()->create();

    test()->actingAs($user)->withSession([
        'active_tahun_ajaran_id' => TahunAjaran::create(['tahun' => '2025/2026'])->id,
    ]);

    return $user;
}

function makeSurats(User $user, int $count, string $tipe = 'surat keluar', string $prefix = '000/S.Ket', string $label = 'Perihal'): void
{
    foreach (range(1, $count) as $i) {
        Surat::create([
            'user_id' => $user->id,
            'tahun_ajaran_id' => session('active_tahun_ajaran_id'),
            'nomor_surat' => "{$prefix}/{$i}",
            'nama_surat' => "{$label} {$i}",
            'kepada' => 'Sekolah',
            'tanggal_surat' => '2025-09-01',
            'tipe' => $tipe,
            'showpdf' => true,
        ]);
    }
}

function makeSuratMasuks(User $user, int $count): void
{
    foreach (range(1, $count) as $i) {
        SuratMasuk::create([
            'user_id' => $user->id,
            'tahun_ajaran_id' => session('active_tahun_ajaran_id'),
            'nomor_surat' => "IN/{$i}",
            'nama_surat' => "Surat Masuk {$i}",
            'asal_surat' => 'Dinas',
            'tanggal_surat' => '2025-09-01',
        ]);
    }
}

function suratsFrom(string $url): array
{
    return test()->get($url)->assertOk()->viewData('page')['props']['surats'];
}

test('surat index paginates twenty rows per page', function () {
    $user = actingAsWithActiveYear();
    makeSurats($user, 45);

    $first = suratsFrom('/surat');
    expect($first['data'])->toHaveCount(20)
        ->and($first['total'])->toBe(45)
        ->and($first['last_page'])->toBe(3)
        ->and($first['from'])->toBe(1);

    $last = suratsFrom('/surat?page=3');
    expect($last['data'])->toHaveCount(5)
        ->and($last['from'])->toBe(41);
});

test('surat index stays on a single page when twenty or fewer records exist', function () {
    $user = actingAsWithActiveYear();
    makeSurats($user, 12);

    $surats = suratsFrom('/surat');
    expect($surats['data'])->toHaveCount(12)
        ->and($surats['last_page'])->toBe(1);
});

test('surat search matches rows that live on a later page', function () {
    $user = actingAsWithActiveYear();
    makeSurats($user, 45);

    $unfiltered = suratsFrom('/surat');
    expect(json_encode($unfiltered['data']))->not->toContain('000/S.Ket/45');

    $searched = suratsFrom('/surat?search=000/S.Ket/45');
    expect($searched['total'])->toBe(1)
        ->and($searched['data'][0]['nomor_surat'])->toBe('000/S.Ket/45');
});

test('surat search also matches the perihal column', function () {
    $user = actingAsWithActiveYear();
    makeSurats($user, 45);

    $searched = suratsFrom('/surat?search=Perihal 7');
    expect($searched['total'])->toBe(1)
        ->and($searched['data'][0]['nama_surat'])->toBe('Perihal 7');
});

test('surat tipe filter narrows results and combines with search', function () {
    $user = actingAsWithActiveYear();
    makeSurats($user, 25);
    makeSurats($user, 25, 'surat internal', '001/S.Int', 'Internal');

    $all = suratsFrom('/surat');
    expect($all['total'])->toBe(50)
        ->and($all['last_page'])->toBe(3);

    $keluar = suratsFrom('/surat?tipe=surat+keluar');
    expect($keluar['total'])->toBe(25)
        ->and($keluar['last_page'])->toBe(2);

    $combined = suratsFrom('/surat?tipe=surat+internal&search=Internal+3');
    expect($combined['total'])->toBe(1)
        ->and($combined['data'][0]['nama_surat'])->toBe('Internal 3');

    // tipe and search intersect rather than union.
    expect(suratsFrom('/surat?tipe=surat+internal&search=Perihal')['total'])->toBe(0);
});

test('an unrecognised tipe value falls back to listing everything', function () {
    $user = actingAsWithActiveYear();
    makeSurats($user, 45);

    expect(suratsFrom('/surat?tipe=bogus')['total'])->toBe(45);
});

test('surat index returns the active filters so the search box can hydrate', function () {
    $user = actingAsWithActiveYear();
    makeSurats($user, 12);

    $filters = $this->get('/surat?search=Perihal&tipe=surat+keluar')
        ->viewData('page')['props']['filters'];

    expect($filters['search'])->toBe('Perihal')
        ->and($filters['tipe'])->toBe('surat keluar');
});

test('surat masuk index paginates and searches', function () {
    $user = actingAsWithActiveYear();
    makeSuratMasuks($user, 45);

    $masuks = $this->get('/surat-masuk')->assertOk()->viewData('page')['props']['suratMasuks'];
    expect($masuks['data'])->toHaveCount(20)
        ->and($masuks['total'])->toBe(45)
        ->and($masuks['last_page'])->toBe(3);

    $searched = $this->get('/surat-masuk?search=IN/10')
        ->viewData('page')['props']['suratMasuks'];
    expect($searched['total'])->toBe(1)
        ->and($searched['data'][0]['nomor_surat'])->toBe('IN/10');
});

test('surat masuk index stays on a single page when twenty or fewer records exist', function () {
    $user = actingAsWithActiveYear();
    makeSuratMasuks($user, 12);

    $masuks = $this->get('/surat-masuk')->viewData('page')['props']['suratMasuks'];
    expect($masuks['data'])->toHaveCount(12)
        ->and($masuks['last_page'])->toBe(1);
});

test('both letter indexes redirect to the dashboard when no academic year is active', function () {
    $this->actingAs(User::factory()->create())->withSession([]);

    $this->get('/surat')->assertRedirect(route('dashboard'));
    $this->get('/surat-masuk')->assertRedirect(route('dashboard'));
});
