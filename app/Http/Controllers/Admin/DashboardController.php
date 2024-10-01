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
                'icon' => '<i class="fa fa-user-friends fa-2x"></i>',
                'name' => 'Anak',
                'value' => DB::table('anak')->where('status', 'Aktif')->get()->count(),
            ],
            [
                'route' => 'admin.register.index',
                'icon' => '<i class="fa fa-user-plus fa-2x"></i>',
                'name' => 'Pendaftaran',
                'value' => DB::table('anak')->where('status', 'Pending')->get()->count(),
            ], 
            [
                'route' => 'admin.kelompok.index',
                'icon' => '<path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z"></path>',
                'name' => 'Kelompok',
                'value' => DB::table('kelompok')->get()->count(),
            ],
            [
                'route' => 'admin.kegiatan.index',
                'icon' => '<i class="si si-bag fa-2x"></i>',
                'name' => 'Pengasuh',
                'value' => DB::table('admins')->where('level', 'guru')->get()->count(),
            ],
            [
                'route' => 'admin.anak.index',
                'icon' => '<i class="si si-bag fa-2x"></i>',
                'name' => 'Invoice Tagihan',
                'value' => DB::table('invoice')->where('status', 'unpaid')->get()->count(),
            ],
        ]);

        return Inertia::render('Dashboard',[
            'data' => $data,
        ]);

    }
}
