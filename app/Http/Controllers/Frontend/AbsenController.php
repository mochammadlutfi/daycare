<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Inertia\Inertia;


use App\Models\Absen;
use App\Models\AbsenDetail;

class AbsenController extends Controller
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
        $user = auth()->guard('web')->user();
        if($user->anak()->count() > 1){
            return Inertia::render('Absen/Index');
        }else{
            // $data = Anak::where()
            $anak = $user->anak;
            $elq = Absen::with(['detail' => function($q) use($user){
                return $q->where('anak_id', $user->anak->id);
            }])
            ->whereHas('detail', function ($query) use($user){
                $query->where('anak_id', $user->anak->id);
            })->get();
            // return response()->json($elq);
            $line = AbsenDetail::where('anak_id', $user->anak->id)->get();
            $data = [];
            foreach($elq as $e){
                $data[$e->tgl] = $e->detail[0];
            }

            return Inertia::render('Absen/Show',[
                'data' => $data,
                'anak' => $anak
            ]);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Absen/Form');
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
}
