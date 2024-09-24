<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use App\Helpers\Collection;
use Illuminate\Support\Facades\Validator;

use Rawilk\Settings\Settings;

class BiayaController extends Controller
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
        // dd(settings()->get('pembangunan'));
        $pembangunan = settings()->get('pembangunan') ?? 0;
        $pendaftaran = settings()->get('pendaftaran') ?? 0;
        $spp = settings()->get('spp') ?? 0;
        $denda = settings()->get('denda') ?? 0;
        $laundry = settings()->get('laundry') ?? 0;
        $antar_jemput = settings()->get('antar_jemput') ?? 0;
        // dd($pembangunan);

        $value = collect([
            'pembangunan' => $pembangunan,
            'pendaftaran' => $pendaftaran,
            'spp' => $spp,
            'denda' => $denda,
            'laundry' =>$laundry,
            'antar_jemput' => $antar_jemput,
        ]);

        return Inertia::render('Biaya', [
            'value' => $value,
        ]);
    }

    
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $rules = [
            'pembangunan' => 'required',
            'pendaftaran' => 'required',
            'spp' => 'required',
            'denda' => 'required',
            'laundry' => 'required',
            'antar_jemput' => 'required',
        ];

        $pesan = [
            'pembangunan.required' => 'Pembangunan Wajib Diisi!',
            'pendaftaran.required' => 'Pendaftaran Wajib Diisi!',
            'spp.required' => 'SPP Wajib Diisi!',
            'denda.required' => 'Dendan Keterlambatan Wajib Diisi!',
            'laundry.required' => 'Layanan Laundry Wajib Diisi!',
            'antar_jemput.required' => 'Layanan Antar Jemput Wajib Diisi!',
        ];

        $validator = Validator::make($request->all(), $rules, $pesan);
        if ($validator->fails()){
            return back()->withErrors($validator->errors());
        }else{
            DB::beginTransaction();
            try{
                // Settings::set('foo', 'bar');

                settings()->set('pembangunan', $request->pembangunan);
                settings()->set('pendaftaran', $request->pendaftaran);
                settings()->set('spp', $request->spp);
                settings()->set('denda', $request->denda);
                settings()->set('laundry', $request->laundry);
                settings()->set('antar_jemput', $request->antar_jemput);


            }catch(\QueryException $e){
                DB::rollback();
                return back();
            }
            DB::commit();
            return redirect()->route('admin.biaya.index');
        }
    }

    public function show($id, Request $request)
    {

        $data = Task::where('id', $id)->first();

        $data->lines = TaskMember::
        select('task_members.*', 'd.nama', 'd.image')
        ->leftjoin('dukungan as d', 'd.id', '=', 'task_members.user_id')
        ->where('task_id', $data->id)
        ->get();
        $data->selesai = TaskProgres::where('task_id', $id)->get()->sum('target');


        return Inertia::render('Tasks/Show',[
            'data' => $data,
        ]);
    }

    public function edit($id, Request $request)
    {

    }

    public function update($id, Request $request)
    {

    }

    public function destroy($id)
    {

    }

    public function submit(Request $request)
    {
        
    }

}
