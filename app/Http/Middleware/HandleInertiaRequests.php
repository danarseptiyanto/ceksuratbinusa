<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use App\Models\TahunAjaran;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            // Share all academic years and the one stored in the session
            'all_tahun_ajaran' => fn() => TahunAjaran::orderBy('tahun', 'desc')->get(),
            'active_tahun_ajaran' => fn() => $request->session()->has('active_tahun_ajaran_id')
                ? TahunAjaran::find($request->session()->get('active_tahun_ajaran_id'))
                : null,
        ];
    }
}
