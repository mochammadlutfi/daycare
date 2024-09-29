<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;


use App\Models\Aktivitas;

class AktivitasController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Aktivitas/Index');
    }

    
    public function data(Request $request)
    {
        $user = auth()->guard('web')->user();

        $data = DB::table("aktivitas as ak")
        ->join("kelompok as kl", function($join){
            $join->on("kl.id", "=", "ak.kelompok_id");
        })
        ->join("jenis_kegiatan as j", function($join){
            $join->on("j.id", "=", "ak.jenis_id");
        })
        ->join("kegiatan as k", function($join){
            $join->on("k.id", "=", "ak.kegiatan_id");
        })
        ->join("admins as a", function($join){
            $join->on("a.id", "=", "ak.admin_id");
        })
        ->join("anak as nk", function($join){
            $join->on("nk.kelompok_id", "=", "ak.kelompok_id");
        })
        ->select("ak.tgl", "nk.nama as anak", "a.nama as guru", "j.nama as jenis", "k.nama as kegiatan")
        ->where("nk.user_id", "=", $user->id)
        ->paginate($request->limit);

        return response()->json($data, 200);
    }
}
