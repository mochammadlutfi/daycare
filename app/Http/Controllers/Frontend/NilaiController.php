<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class NilaiController extends Controller
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
        return Inertia::render('Nilai');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    
    public function data(Request $request)
    {
        $user = auth()->guard('web')->user();

        $data = DB::table("nilai_detail as nd")
        ->join("nilai as n", function($join){
            $join->on("n.id", "=", "nd.nilai_id");
        })
        ->join("jenis_kegiatan as j", function($join){
            $join->on("j.id", "=", "n.jenis_id");
        })
        ->join("kegiatan as k", function($join){
            $join->on("k.id", "=", "n.kegiatan_id");
        })
        ->join("admins as a", function($join){
            $join->on("a.id", "=", "n.admin_id");
        })
        ->join("anak as nk", function($join){
            $join->on("nk.id", "=", "nd.anak_id");
        })
        ->select("n.tgl", "nk.nama as anak", "a.nama as guru", "j.nama as jenis", "k.nama as kegiatan", "nd.nilai")
        ->where("nd.user_id", "=", $user->id)
        ->paginate($request->limit);

        return response()->json($data, 200);
    }
}
