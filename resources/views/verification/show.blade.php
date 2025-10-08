<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verifikasi Surat</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css"/>
    <style>
        body { padding: 2rem; }
        .qr-code { margin-top: 1rem; }
    </style>
</head>
<body data-theme="light">
    <main class="container">
        <article>
            <hgroup>
                <h1>✅ Dokumen Terverifikasi</h1>
                <img src="/img/logosekolah.png">
                <h2>Surat ini adalah dokumen yang sah dan terverifikasi oleh sistem kami.</h2>
            </hgroup>
            
            <p><strong>Nama/Perihal:</strong> {{ $surat->nama_surat }}</p>
            <p><strong>Nomor Surat:</strong> {{ $surat->nomor_surat }}</p>
            <p><strong>Tanggal Surat:</strong> {{ \Carbon\Carbon::parse($surat->tanggal_surat)->format('d F Y') }}</p>

            @if ($surat->file_path)
                <a href="{{ Illuminate\Support\Facades\Storage::url($surat->file_path) }}" target="_blank" role="button">Lihat File PDF</a>
            @else
                <p><em>Tidak ada file PDF yang dilampirkan.</em></p>
            @endif

            <div class="qr-code">
                <p><strong>Scan QR Code:</strong></p>
                {!! QrCode::size(150)->generate(route('surat.verify', $surat->slug)) !!}
            </div>
        </article>
    </main>
</body>
</html>