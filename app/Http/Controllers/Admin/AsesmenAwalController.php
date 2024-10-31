<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Inertia\Inertia;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

use App\Models\AsesmenAwal;
use App\Models\AsesmenSumatif;

class AsesmenAwalController extends Controller
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
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store($rpph, Request $request)
    {
        $rules = [
            'kegiatan' => 'required',
            'keterangan' => 'required',
        ];

        $pesan = [
            'kegiatan.required' => 'Kegiatan Wajib Diisi!',
            'keterangan.required' => 'Hasil Pengamatan Wajib Diisi!',
        ];

        $validator = Validator::make($request->all(), $rules, $pesan);
        if ($validator->fails()){
            return back()->withErrors($validator->errors());
        }else{
            DB::beginTransaction();
            try{
                    $data = new AsesmenAwal();
                    $data->rpph_id = $rpph;
                    $data->kegiatan = $request->kegiatan;
                    $data->keterangan = $request->keterangan;
                    $data->save();
                    
            }catch(\QueryException $e){
                DB::rollback();
                dd($e);
            }
            DB::commit();
            return redirect()->route('admin.rpph.show', $rpph);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $rpph, $id)
    {
        $rules = [
            'kegiatan' => 'required',
            'keterangan' => 'required',
        ];

        $pesan = [
            'kegiatan.required' => 'Kegiatan Wajib Diisi!',
            'keterangan.required' => 'Hasil Pengamatan Wajib Diisi!',
        ];

        $validator = Validator::make($request->all(), $rules, $pesan);
        if ($validator->fails()){
            return back()->withErrors($validator->errors());
        }else{
            DB::beginTransaction();
            try{
                    $data = AsesmenAwal::where('id', $id)->first();
                    $data->kegiatan = $request->kegiatan;
                    $data->keterangan = $request->keterangan;
                    $data->save();

            }catch(\QueryException $e){
                DB::rollback();
                return back();
            }
            DB::commit();
            return redirect()->route('admin.rpph.show', $rpph);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($rpph, $id)
    {
        
        DB::beginTransaction();
        try{
            $hapus_db = AsesmenAwal::destroy($id);
        }catch(\QueryException $e){
            DB::rollback();
            return back();
        }

        DB::commit();
        return redirect()->route('admin.rpph.show', $rpph);
    }
    
    public function updateSumatif(Request $request, $rpph, $id)
    {
        $rules = [
            'status' => 'required',
            'keterangan' => 'required',
        ];

        $pesan = [
            'status.required' => 'Status Wajib Diisi!',
            'keterangan.required' => 'Hasil Pengamatan Wajib Diisi!',
        ];

        $validator = Validator::make($request->all(), $rules, $pesan);
        if ($validator->fails()){
            return back()->withErrors($validator->errors());
        }else{
            DB::beginTransaction();
            try{
                    $data = AsesmenSumatif::where('id', $id)->first();
                    $data->status = $request->status;
                    $data->keterangan = $request->keterangan;
                    $data->save();

            }catch(\QueryException $e){
                DB::rollback();
                return back();
            }
            DB::commit();
            return redirect()->route('admin.rpph.show', $rpph);
        }
    }
}
