<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Inertia\Inertia;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

use App\Models\Foto;

class FotoController extends Controller
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
        return Inertia::render('Dapil');
    }

    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Dapil/Form');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // dd(implode(',', $request->wilayah));
        // dd($request->all());
        $rules = [
            'name' => 'required',
            'wilayah' => 'required',
        ];

        $pesan = [
            'name.required' => 'Nama Dapil Wajib Diisi!',
            'wilayah.required' => 'Wilayah Dapil Wajib Diisi!',
        ];

        $validator = Validator::make($request->all(), $rules, $pesan);
        if ($validator->fails()){
            return back()->withErrors($validator->errors());
        }else{
            DB::beginTransaction();
            try{
                    $data = new Dapil();
                    $data->name = $request->name;
                    $data->tipe = $request->tipe;
                    $data->level = 'kota';
                    $data->daerah_id = $request->daerah_id;
                    $data->wilayah = implode(',', $request->wilayah);
                    $data->kec_id = $request->kec_id;
                    $data->save();

            }catch(\QueryException $e){
                DB::rollback();
                dd($e);
            }
            DB::commit();
            return redirect()->route('admin.dapil.index');
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
            'name' => 'required',
            'wilayah' => 'required',
        ];

        $pesan = [
            'name.required' => 'Nama Dapil Wajib Diisi!',
            'wilayah.required' => 'Wilayah Dapil Wajib Diisi!',
        ];

        $validator = Validator::make($request->all(), $rules, $pesan);
        if ($validator->fails()){
            return back()->withErrors($validator->errors());
        }else{
            DB::beginTransaction();
            try{
                    $data = Dapil::where('id', $id)->first();
                    $data->name = $request->name;
                    $data->tipe = $request->tipe;
                    $data->level = 'kota';
                    $data->daerah_id = $request->daerah_id;
                    $data->wilayah = implode(',', $request->wilayah);
                    $data->kec_id = $request->kec_id;
                    $data->save();

            }catch(\QueryException $e){
                DB::rollback();
                return back();
            }
            DB::commit();
            return redirect()->route('admin.dapil.index');
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
            $hapus_db = Dapil::destroy($id);
        }catch(\QueryException $e){
            DB::rollback();
            return back();
        }

        // DB::commit();
        return redirect()->route('dapil.index');
    }
    
    public function data(Request $request)
    {
        $sort = !empty($request->sort) ? $request->sort : 'name';
        $sortDir = !empty($request->sortDir) ? $request->sortDir : 'ASC';
        $limit = ($request->limit) ? $request->limit : 25;

        $data = Dapil::orderBy($sort, $sortDir)->paginate($limit);

        return response()->json($data);
    }
}
