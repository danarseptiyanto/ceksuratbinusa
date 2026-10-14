# AGENTS.md

Laravel 12 + Inertia v2 + React 18 + Breeze auth (Pest). Single Vite entry `resources/js/app.jsx`; it resolves `./Pages/${name}.jsx` via `import.meta.glob`, so a controller's `Inertia::render('Surat/Index')` requires an exactly-cased `resources/js/Pages/Surat/Index.jsx`. Routes come from Ziggy (`@routes` in `resources/views/app.blade.php`) — use `route("name")` in JSX, never hardcoded URLs.

## Domain

- `Surat` (`surats`): outgoing/internal letters. `tipe` is a MySQL enum with **lowercase, spaced values** `'surat keluar'` / `'surat internal'` — validation is `in:surat keluar,surat internal`. `slug` is auto-derived from `nomor_surat` in `Surat::boot()` and drives the public `/verify/{slug}` URL; `showpdf` (bool) gates whether the PDF link/embed renders publicly.
- `SuratMasuk` (`surat_masuks`): incoming archive. No slug, no `showpdf`.
- `TahunAjaran` (`tahun_ajarans`): `tahun` is unique (e.g. `2025/2026`).
- PDFs: `public` disk, dirs `surat_files/` and `surat_masuk_files/`, `mimes:pdf`, 2MB cap.

## Active academic year (tahun ajaran) — main footgun

- `session('active_tahun_ajaran_id')` is the filter key for every index/dashboard query. It is **only** set by `GET tahun-ajaran/switch/{id}` (a full `window.location.href` navigation from `components/app-sidebar.jsx:91`).
- `app/Listeners/SetActiveTahunAjaranSession.php` exists (sets it on `Login` to the latest year) but is **never registered** — no `EventServiceProvider`, absent from `bootstrap/providers.php`. Don't assume login initialises it.
- `DashboardController@index` falls back to `TahunAjaran::latest()`, but `SuratController@index` and `SuratMasukController@index` **redirect to dashboard with an error** when the session key is missing. So after a fresh login/seed, `/surat` bounces until the user picks a year.
- Seed data (`DatabaseSeeder`) creates `2024/2025` + `2025/2026` and **no users** — user creation is admin-only (see below).

## Access control

- `UserController` hardcodes an allowlist in `checkAccess()`: `tu@binusasmg.sch.id`, `ops@binusasmg.sch.id`. The same two emails are duplicated as a literal in `components/app-sidebar.jsx:216` to show the "Manajemen User" nav item. Change both together.
- Registration is disabled — `/register` routes are commented out in `routes/auth.php`.

## Known-broken / missing (don't "fix" as if new)

- `php artisan test` has **2 pre-existing failures**: `tests/Feature/Auth/RegistrationTest.php` hits `/register`, which is commented out. ~22 tests also emit `PDO::MYSQL_ATTR_SSL_CA is deprecated` notices (every test reports `DEPR` for this, not a real problem). Baseline is red.
- `Route::resource('surat')` registers `surat.create` but `SuratController` has no `create()`. Same for `surat.show`, `surat-masuk.show`, `tahun-ajaran.show` (empty stubs) → 500 or blank.
- `users.create` / `users.edit` render `Users/Create` and `Users/Edit`, but `resources/js/Pages/Users/` contains only `Index.jsx`.
- `Home.jsx:78` links to `/blocks`, which is not a route.
- `resources/views/verification/show.blade.php` is dead — `VerificationController` renders Inertia `Surat/Verify`.
- QR PNGs are generated **client-side** in `Pages/Surat/QRDownload.jsx` (`qrcode.toDataURL()` → canvas, with an SVG fallback). The `bacon-qr-code` / `intervention/image` composer deps are unused dead weight — don't reach for server-side QR generation.
- `VerificationController@show` builds the file URL with `Storage::url()` (default disk = `FILESYSTEM_DISK=local`) while uploads are written to the `public` disk. `php artisan storage:link` has never been run here (`public/storage` absent), so PDF links 404 until it is.
- `APP_LOCALE=en` and there is no `lang/` dir, so `translatedFormat('d F Y')` in `VerificationController` renders **English** month names despite Indonesian UI copy and the "08 Oktober 2025" comment.

## Commands

- `composer dev` — `serve` + `queue:listen` + `vite` concurrently. Only npm scripts are `dev` / `build` (no lint, typecheck, or test).
- `composer test` = `artisan config:clear` + `artisan test`. Focused: `php artisan test --filter=Name`. `phpunit.xml` forces sqlite `:memory:` + `RefreshDatabase` — no MySQL needed.
- DB: `php artisan migrate`, `php artisan db:seed`. `.env` uses sqlite; `README.md` claims MySQL — trust `.env`/`phpunit.xml`.
- Format: Prettier (`tabWidth: 4`, `prettier-plugin-tailwindcss`) but **no npm script** — run `npx prettier --write <file>`. PHP: `./vendor/bin/pint` (no `pint.json`, so Laravel defaults).
- Index pages are **server-side paginated at 20/page** (`->paginate(20)->withQueryString()`), not client-side. `SuratController@index` accepts `search` + `tipe`; `SuratMasukController@index` accepts `search`. Both `LIKE`-match `nomor_surat` and `nama_surat` only. The controllers also return a `filters` prop so the search box/filter select can hydrate from the URL. Shared pager: `resources/js/components/pagination.jsx` (returns `null` when `last_page <= 1`, so no controls render unless there's more than one page). `tests/Feature/PaginationTest.php` covers this and must be re-sized whenever the page size changes.
- Frontend search debounces ~400ms and always requests `page: 1`, so a term matching a row that was on an old later page still surfaces. Skip the `withQueryString()` call and the pager keeps losing the active filters.

## Frontend gotchas

- **Case-sensitive (Linux):** `@/components`, `@/lib`, `@/hooks`, `resources/js/components/*` are lowercase; `@/Layouts` keeps capital `L`; `resources/js/Pages/` and `resources/js/Layouts/` are also capitalised. A Vite `Failed to resolve import` is nearly always wrong case (past: `@/Components/...`, `./QRdownload` vs `QRDownload.jsx`).
- The `@` alias must exist in **both** `vite.config.js` (`resolve.alias`) and `jsconfig.json`; jsconfig alone does not fix `vite build`.
- shadcn per `components.json`: `ui → @/components/ui`, `utils → @/lib/utils`; `cn` from `@/lib/utils`; `lucide-react` icons; `@magicui` registry available. Tailwind is **v3** via PostCSS (`@tailwind base` directives in `resources/css/app.css`) — `@tailwindcss/vite` is installed but unused, and `tailwind.config.js` content only globs `resources/js/**/*.jsx`.
- Flash toasts: render `<FlashMessage />` (wraps sonner `Toaster`); it is mounted in `AppLayout.jsx` and `Surat/Verify.jsx` only.

## Operational notes

- `public/build/` is **not** gitignored (`02db16c` removed it) and hashed assets are committed — `npm run build` intentionally dirties git status. Commit rebuilt assets with UI changes, as prior commits do.
- No CI workflows, no `.github/`. No pre-commit hooks.
- No `lang/` directory exists; do not add translation files without being asked.