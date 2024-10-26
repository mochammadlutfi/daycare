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
                'icon' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="40" width="40" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M19.449 8.448L16.388 11a4.52 4.52 0 010 2.002l3.061 2.55a8.275 8.275 0 000-7.103zM15.552 19.45L13 16.388a4.52 4.52 0 01-2.002 0l-2.55 3.061a8.275 8.275 0 007.103 0zM4.55 15.552L7.612 13a4.52 4.52 0 010-2.002L4.551 8.45a8.275 8.275 0 000 7.103zM8.448 4.55L11 7.612a4.52 4.52 0 012.002 0l2.55-3.061a8.275 8.275 0 00-7.103 0zm8.657-.86a9.776 9.776 0 011.79 1.415 9.776 9.776 0 011.414 1.788 9.764 9.764 0 010 10.211 9.777 9.777 0 01-1.415 1.79 9.777 9.777 0 01-1.788 1.414 9.764 9.764 0 01-10.212 0 9.776 9.776 0 01-1.788-1.415 9.776 9.776 0 01-1.415-1.788 9.764 9.764 0 010-10.212 9.774 9.774 0 011.415-1.788A9.774 9.774 0 016.894 3.69a9.764 9.764 0 0110.211 0zM14.121 9.88a2.985 2.985 0 00-1.11-.704 3.015 3.015 0 00-2.022 0 2.985 2.985 0 00-1.11.704c-.326.325-.56.705-.704 1.11a3.015 3.015 0 000 2.022c.144.405.378.785.704 1.11.325.326.705.56 1.11.704.652.233 1.37.233 2.022 0a2.985 2.985 0 001.11-.704c.326-.325.56-.705.704-1.11a3.016 3.016 0 000-2.022 2.985 2.985 0 00-.704-1.11z" clip-rule="evenodd"></path></svg>',
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
