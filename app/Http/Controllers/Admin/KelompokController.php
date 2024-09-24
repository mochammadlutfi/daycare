<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;


use App\Models\Kelompok;

class KelompokController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Kelompok');
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
            'admin_id' => 'required',
            'usia' => 'required',
        ];

        $pesan = [
            'nama.required' => 'Nama Kelompok Wajib Diisi!',
            'admin_id.required' => 'Guru Wajib Diisi!',
            'usia.required' => 'Usia Wajib Diisi!',
        ];

        $validator = Validator::make($request->all(), $rules, $pesan);
        if ($validator->fails()){
            return back()->withErrors($validator->errors());
        }else{
            DB::beginTransaction();
            try{
                    $data = new Kelompok();
                    $data->nama = $request->nama;
                    $data->admin_id = $request->admin_id;
                    $data->usia = $request->usia;
                    $data->save();

            }catch(\QueryException $e){
                DB::rollback();
                return back();
            }
            DB::commit();
            return redirect()->route('admin.kelompok.index');
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
        ];

        $pesan = [
            'nama.required' => 'Nama Kelompok Wajib Diisi!',
        ];

        $validator = Validator::make($request->all(), $rules, $pesan);
        if ($validator->fails()){
            return back()->withErrors($validator->errors());
        }else{
            DB::beginTransaction();
            try{
                    $data = Kelompok::where('id', $id)->first();
                    $data->name = $request->name;
                    $data->save();

            }catch(\QueryException $e){
                DB::rollback();
                return back();
            }
            DB::commit();
            return redirect()->route('admin.kelompok.index');
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
            
            $data = Kelompok::where('id', $id)->first();
            $data->delete();

        }catch(\QueryException $e){
            DB::rollback();
            dd($e);
        }

        DB::commit();
        return redirect()->route('admin.contact.index');
    }
    
    public function data(Request $request)
    {
        $page = $request->page;
        $sort = !empty($request->sort) ? $request->sort : 'id';
        $sortDir = !empty($request->sortDir) ? $request->sortDir : 'desc';
        $limit = ($request->limit) ? $request->limit : 25;

        $data = Kelompok::with(['admin'])->withcount('anak')
        ->when($request->search, function($q, $search){
            return $q->where('nama', 'like', '%' . $search . '%')
            ->orWhere('usia', 'like', '%' . $search . '%');
        })
        ->orderBy($sort, $sortDir);

        if($page){
            $output = $data->paginate($limit);
        }else{
            $output = $data->get();
        }

        return response()->json($output);
    }
}
