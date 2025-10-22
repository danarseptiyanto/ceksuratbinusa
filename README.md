# Sistem Manajemen Surat Binusa

## Deskripsi Aplikasi

Sistem Manajemen Surat Binusa adalah aplikasi web yang dirancang khusus untuk mengelola berbagai jenis surat di lingkungan sekolah SMK Binusa. Aplikasi ini memungkinkan pengguna untuk membuat, mengelola, dan melacak surat keluar, surat internal, serta surat masuk dengan mudah dan efisien. Sistem ini juga terintegrasi dengan sistem tahun ajaran untuk memastikan semua data surat terorganisir berdasarkan periode akademik yang relevan.

## Fitur Utama

- **Dashboard Interaktif**: Menampilkan statistik real-time jumlah surat berdasarkan jenis dan tahun ajaran aktif.
- **Manajemen Surat Keluar**: Buat, edit, dan hapus surat keluar dengan fitur upload PDF dan QR code untuk verifikasi.
- **Manajemen Surat Internal**: Kelola surat internal dengan kemampuan yang sama seperti surat keluar.
- **Manajemen Surat Masuk**: Arsipkan dan kelola surat masuk yang diterima sekolah.
- **Filter dan Pencarian**: Cari surat berdasarkan nomor atau perihal, serta filter berdasarkan jenis surat.
- **Sistem Tahun Ajaran**: Semua data surat terhubung dengan tahun ajaran untuk organisasi yang lebih baik.
- **Autentikasi Pengguna**: Sistem login dan manajemen pengguna dengan Laravel Breeze.
- **Responsive Design**: Antarmuka yang responsif menggunakan Tailwind CSS dan komponen Shadcn/ui.
- **Verifikasi Surat**: Link verifikasi untuk memastikan keaslian surat melalui QR code.

## Teknologi yang Digunakan

- **Backend**: Laravel 12 (PHP Framework)
- **Frontend**: React dengan Inertia.js
- **Database**: MySQL (dapat dikonfigurasi untuk database lain)
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **Authentication**: Laravel Breeze
- **File Storage**: Laravel Storage untuk upload PDF
- **QR Code Generation**: Library untuk generate QR code

## Persyaratan Sistem

- PHP 8.2 atau lebih tinggi
- Composer
- Node.js 18+ dan npm
- MySQL 8.0 atau MariaDB
- Git

## Cara Mengkloning dan Menjalankan Aplikasi

### Langkah 1: Kloning Repository

Buka terminal atau command prompt, lalu navigasikan ke direktori tempat Anda ingin menyimpan proyek. Jalankan perintah berikut untuk mengkloning repository dari GitHub:

```bash
git clone https://github.com/username/ceksuratbinusa.git
```

Ganti `username` dengan nama pengguna GitHub yang sesuai jika repository berada di akun berbeda.

### Langkah 2: Masuk ke Direktori Proyek

Setelah cloning selesai, masuk ke direktori proyek:

```bash
cd ceksuratbinusa
```

### Langkah 3: Instal Dependensi PHP

Instal semua dependensi PHP menggunakan Composer:

```bash
composer install
```

Perintah ini akan mengunduh dan menginstal semua paket PHP yang diperlukan seperti Laravel dan library lainnya.

### Langkah 4: Instal Dependensi JavaScript

Instal dependensi frontend menggunakan npm:

```bash
npm install
```

### Langkah 5: Konfigurasi Environment

Salin file environment example dan sesuaikan konfigurasi:

```bash
cp .env.example .env
```

Buka file `.env` dengan editor teks dan sesuaikan pengaturan berikut:

- **Database Configuration**:
  ```
  DB_CONNECTION=mysql
  DB_HOST=127.0.0.1
  DB_PORT=3306
  DB_DATABASE=ceksuratbinusa
  DB_USERNAME=your_username
  DB_PASSWORD=your_password
  ```

- **App Configuration**:
  ```
  APP_NAME="Sistem Manajemen Surat Binusa"
  APP_ENV=local
  APP_KEY=base64:your_app_key_here
  APP_DEBUG=true
  APP_URL=http://localhost:8000
  ```

### Langkah 6: Generate Application Key

Generate key aplikasi Laravel:

```bash
php artisan key:generate
```

### Langkah 7: Migrasi Database

Jalankan migrasi untuk membuat tabel database:

```bash
php artisan migrate
```

Jika Anda ingin mengisi database dengan data dummy (opsional):

```bash
php artisan db:seed
```

### Langkah 8: Build Assets Frontend

Compile dan build assets frontend:

```bash
npm run build
```

Atau untuk development dengan hot reload:

```bash
npm run dev
```

### Langkah 9: Jalankan Server

Jalankan server Laravel:

```bash
php artisan serve
```

Aplikasi akan berjalan di `http://localhost:8000`.

### Langkah 10: Akses Aplikasi

Buka browser dan kunjungi `http://localhost:8000`. Anda akan diarahkan ke halaman login. Jika belum ada akun, Anda dapat mendaftar atau menggunakan data seed jika tersedia.

## Struktur Database

Aplikasi ini menggunakan beberapa tabel utama:

- `users`: Menyimpan data pengguna
- `surats`: Menyimpan data surat keluar dan internal
- `surat_masuks`: Menyimpan data surat masuk
- `tahun_ajarans`: Menyimpan data tahun ajaran

## Penggunaan Aplikasi

1. **Login/Register**: Masuk atau daftar akun baru.
2. **Dashboard**: Lihat statistik surat dan akses menu utama.
3. **Surat Keluar**: Kelola surat keluar dengan fitur CRUD lengkap.
4. **Surat Internal**: Kelola surat internal.
5. **Surat Masuk**: Kelola surat masuk.
6. **Tahun Ajaran**: Kelola periode tahun ajaran (jika diperlukan).

## Troubleshooting

- **Error Database Connection**: Pastikan konfigurasi database di `.env` sudah benar dan database sudah dibuat.
- **Assets Tidak Load**: Jalankan `npm run build` atau `npm run dev` untuk compile assets.
- **Permission Issues**: Pastikan direktori `storage` dan `bootstrap/cache` memiliki permission write.
- **Port Conflict**: Jika port 8000 sudah digunakan, gunakan `php artisan serve --port=8080`.

## Kontribusi

Jika Anda ingin berkontribusi pada pengembangan aplikasi ini, silakan fork repository dan buat pull request dengan perubahan Anda.

## Lisensi

Aplikasi ini menggunakan lisensi MIT. Lihat file LICENSE untuk detail lebih lanjut.

## Dukungan

Jika Anda mengalami masalah atau memiliki pertanyaan, silakan buat issue di repository GitHub ini.
