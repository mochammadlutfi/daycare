<?php

namespace App\Http\Controllers\Frontend;


use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;


use App\Models\Raport;
use App\Models\Anak;
use PDF;

class RaportController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Raport/Index');
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
            'kelompok_id' => 'required',
            'tgl' => 'required',
            'tinggi' => 'required',
            'berat' => 'required',
            'perkembangan_nilai_agama_dan_moral' => 'required',
            'perkembangan_sosial_emosional' => 'required',
            'perkembangan_fisik_motorik' => 'required',
            'perkembangan_kognitif' => 'required',
            'perkembangan_bahasa' => 'required',
        ];

        $pesan = [
            'kelompok_id.required' => 'Kelompok Wajib Diisi!',
            'tgl.required' => 'Tanggal Wajib Diisi!',
            'anak_id.required' => 'Anak Wajib Diisi!',
            'tinggi.required' => 'Tinggi Badan Wajib Diisi!',
            'berat.required' => 'Berat Badan Wajib Diisi!',
            'perkembangan_nilai_agama_dan_moral.required' => 'Perkembangan Nilai Agama dan Moral Wajib Diisi!',
            'perkembangan_sosial_emosional.required' => 'Perkembangan Sosial dan Emosional Wajib Diisi!',
            'perkembangan_fisik_motorik.required' => 'Perkembangan Fisik dan Motorik Wajib Diisi!',
            'perkembangan_kognitif.required' => 'Perkembangan Kognitif Wajib Diisi!',
            'perkembangan_bahasa.required' => 'Perkembangan Bahasa Wajib Diisi!',
        ];

        $validator = Validator::make($request->all(), $rules, $pesan);
        if ($validator->fails()){
            return back()->withErrors($validator->errors());
        }else{
            DB::beginTransaction();
            try{
                $user = auth()->guard('admin')->user();
                $anak = Anak::where('id', $request->anak_id)->first();


                $data = new Raport();
                $data->tgl = Carbon::parse($request->tgl);
                $data->admin_id = $user->id;
                $data->kelompok_id = $request->kelompok_id;
                $data->anak_id = $request->anak_id;
                $data->user_id = $anak->user_id;
                $data->tinggi = $request->tinggi;
                $data->berat = $request->berat;
                $data->perkembangan_nilai_agama_dan_moral = $request->perkembangan_nilai_agama_dan_moral;
                $data->perkembangan_sosial_emosional = $request->perkembangan_sosial_emosional;
                $data->perkembangan_fisik_motorik = $request->perkembangan_fisik_motorik;
                $data->perkembangan_kognitif = $request->perkembangan_kognitif;
                $data->perkembangan_bahasa = $request->perkembangan_bahasa;
                $data->save();

            }catch(\QueryException $e){
                DB::rollback();
                return back();
            }
            DB::commit();
            return redirect()->route('admin.raport.show', $data->id);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        
        $data = Raport::with(['kelompok', 'anak'])
        ->where('id', $id)->first();


        return Inertia::render('Raport/Show', [
            'data' => $data
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $data = Raport::with(['kelompok', 'anak'])
        ->where('id', $id)->first();


        return Inertia::render('Raport/Form', [
            'value' => $data,
            'editMode' => true
        ]);
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
            'kelompok_id' => 'required',
            'tgl' => 'required',
            'tinggi' => 'required',
            'berat' => 'required',
            'perkembangan_nilai_agama_dan_moral' => 'required',
            'perkembangan_sosial_emosional' => 'required',
            'perkembangan_fisik_motorik' => 'required',
            'perkembangan_kognitif' => 'required',
            'perkembangan_bahasa' => 'required',
        ];

        $pesan = [
            'kelompok_id.required' => 'Kelompok Wajib Diisi!',
            'tgl.required' => 'Tanggal Wajib Diisi!',
            'anak_id.required' => 'Anak Wajib Diisi!',
            'tinggi.required' => 'Tinggi Badan Wajib Diisi!',
            'berat.required' => 'Berat Badan Wajib Diisi!',
            'perkembangan_nilai_agama_dan_moral.required' => 'Perkembangan Nilai Agama dan Moral Wajib Diisi!',
            'perkembangan_sosial_emosional.required' => 'Perkembangan Sosial dan Emosional Wajib Diisi!',
            'perkembangan_fisik_motorik.required' => 'Perkembangan Fisik dan Motorik Wajib Diisi!',
            'perkembangan_kognitif.required' => 'Perkembangan Kognitif Wajib Diisi!',
            'perkembangan_bahasa.required' => 'Perkembangan Bahasa Wajib Diisi!',
        ];

        $validator = Validator::make($request->all(), $rules, $pesan);
        if ($validator->fails()){
            return back()->withErrors($validator->errors());
        }else{
            DB::beginTransaction();
            try{
                $user = auth()->guard('admin')->user();
                $anak = Anak::where('id', $request->anak_id)->first();


                $data = Raport::where('id', $id)->first();
                $data->tgl = Carbon::parse($request->tgl);
                $data->admin_id = $user->id;
                $data->kelompok_id = $request->kelompok_id;
                $data->anak_id = $request->anak_id;
                $data->user_id = $anak->user_id;
                $data->tinggi = $request->tinggi;
                $data->berat = $request->berat;
                $data->perkembangan_nilai_agama_dan_moral = $request->perkembangan_nilai_agama_dan_moral;
                $data->perkembangan_sosial_emosional = $request->perkembangan_sosial_emosional;
                $data->perkembangan_fisik_motorik = $request->perkembangan_fisik_motorik;
                $data->perkembangan_kognitif = $request->perkembangan_kognitif;
                $data->perkembangan_bahasa = $request->perkembangan_bahasa;
                $data->save();

            }catch(\QueryException $e){
                DB::rollback();
                return back();
            }
            DB::commit();
            return redirect()->route('admin.raport.show', $data->id);
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
            
            $pdk = Raport::find($id);
            $pdk->delete();

        }catch(\QueryException $e){
            DB::rollback();
            return response()->json([
                'fail' => true,
                'errors' => $e,
                'pesan' => 'Error Menhapus Data',
            ]);
        }

        DB::commit();
        return redirect()->route('admin.raport.index');
    }

    
    public function pdf($id)
    {
        $data = Raport::with(['kelompok', 'anak'])
        ->where('id', $id)->first();

        
        $pdf = PDF::loadView('pdf.raport', [
            'data' => $data,
        ], [ ], [
            'format' => 'A4-P'
        ]);

        return $pdf->stream('Raport '. $data->anak->nama .' ('.Carbon::parse($data->tgl)->format('d-m-Y').').pdf');
    }

    public function data(Request $request)
    {
        $sort = !empty($request->sort) ? $request->sort : 'id';
        $sortDir = !empty($request->sortDir) ? $request->sortDir : 'desc';
        $paging = !empty($request->page) ? true : false;

        $elq = Raport::with(['kelompok', 'anak', 'admin'])
        ->when($request->q, function($query, $search){
            $query->where('nama', 'LIKE', '%' . $search . '%')
            ->orWhere('alamat', 'LIKE', '%' . $search . '%')
            ->orWhere('email', 'LIKE', '%' . $search . '%');
        })
        ->whereHas('anak', function($q){
            return $q->where('user_id', auth()->guard('web')->user()->id);
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
