<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Inertia\Inertia;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

use App\Models\Kegiatan;

class KegiatanController extends Controller
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
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Kegiatan');
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
            'nama' => 'required',
            'tipe' => 'required',
            'jenis_id' => 'required',
            'indikator' => 'required',
        ];

        $pesan = [
            'nama.required' => 'Nama Kegiatan Wajib Diisi!',
            'tipe.required' => 'Tipe Kegiatan Wajib Diisi!',
            'jenis_id.required' => 'Jenis Kegiatan Wajib Diisi!',
            'indikator.required' => 'Indikator Kegiatan Wajib Diisi!',
        ];

        $validator = Validator::make($request->all(), $rules, $pesan);
        if ($validator->fails()){
            return back()->withErrors($validator->errors());
        }else{
            DB::beginTransaction();
            try{
                    $data = new Kegiatan();
                    $data->nama = $request->nama;
                    $data->tipe = $request->tipe;
                    $data->indikator = $request->indikator;
                    $data->jenis_id = $request->jenis_id;
                    $data->save();
                    
            }catch(\QueryException $e){
                DB::rollback();
                dd($e);
            }
            DB::commit();
            return redirect()->route('admin.kegiatan.index');
        }
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
        $rules = [
            'nama' => 'required',
            'tipe' => 'required',
            'jenis_id' => 'required',
            'indikator' => 'required',
        ];

        $pesan = [
            'nama.required' => 'Nama Kegiatan Wajib Diisi!',
            'tipe.required' => 'Tipe Kegiatan Wajib Diisi!',
            'jenis_id.required' => 'Jenis Kegiatan Wajib Diisi!',
            'indikator.required' => 'Indikator Kegiatan Wajib Diisi!',
        ];

        $validator = Validator::make($request->all(), $rules, $pesan);
        if ($validator->fails()){
            return back()->withErrors($validator->errors());
        }else{
            DB::beginTransaction();
            try{
                    $data = Kegiatan::where('id', $id)->first();
                    $data->nama = $request->nama;
                    $data->tipe = $request->tipe;
                    $data->indikator = $request->indikator;
                    $data->jenis_id = $request->jenis_id;
                    $data->save();

            }catch(\QueryException $e){
                DB::rollback();
                return back();
            }
            DB::commit();
            return redirect()->route('admin.kegiatan.index');
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        
        DB::beginTransaction();
        try{
            $hapus_db = Kegiatan::destroy($id);
        }catch(\QueryException $e){
            DB::rollback();
            return back();
        }

        DB::commit();
        return redirect()->route('admin.kegiatan.index');
    }
    
    public function data(Request $request)
    {
        $sort = !empty($request->sort) ? $request->sort : 'id';
        $sortDir = !empty($request->sortDir) ? $request->sortDir : 'desc';

        $elq = Kegiatan::with('jenis')
        ->when($request->search, function($q, $search){
            return $q->where('nama', 'Like', '%'.$search.'%');
        })
        ->when($request->jenis_id, function($q, $jenis_id){
            return $q->where('jenis_id', '=', $jenis_id);
        })
        ->orderBy($sort, $sortDir);

        if($request->limit){
            $data = $elq->paginate($request->limit);
        }else{
            $data = $elq->get();
        }

        return response()->json($data);
    }
}
