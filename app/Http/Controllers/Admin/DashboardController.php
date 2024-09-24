<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:admin');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $data = collect([
            [
                'route' => 'admin.anak.index',
                'icon' => '<i class="si si-bag fa-2x"></i>',
                'name' => 'Anak',
                'value' => DB::table('anak')->get()->count(),
            ],
            [
                'route' => 'admin.register.index',
                'icon' => '<i class="si si-bag fa-2x"></i>',
                'name' => 'Pendaftaran',
                'value' => DB::table('anak')->get()->count(),
            ],
            [
                'route' => 'admin.kelompok.index',
                'icon' => '<i class="si si-bag fa-2x"></i>',
                'name' => 'Kelompok',
                'value' => DB::table('anak')->get()->count(),
            ],
            [
                'route' => 'admin.kegiatan.index',
                'icon' => '<i class="si si-bag fa-2x"></i>',
                'name' => 'Kegiatan',
                'value' => DB::table('anak')->get()->count(),
            ],
            [
                'route' => 'admin.anak.index',
                'icon' => '<i class="si si-bag fa-2x"></i>',
                'name' => 'Anak',
                'value' => DB::table('anak')->get()->count(),
            ],
        ]);

        return Inertia::render('Dashboard',[
            'data' => $data,
        ]);

    }
}
