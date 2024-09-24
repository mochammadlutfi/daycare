<?php

namespace App\Http\Controllers\Admin;


use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Image;
use Storage;


use App\Models\Kelompok;
use App\Models\Jadwal;


class JadwalController extends Controller
{
    public function __construct() {
        $this->middleware('auth:admin');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id)
    {
        // dd('sa');
        $kelompok = Kelompok::where('id', $id)->first();
        $hari = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];

        return Inertia::render('Jadwal',[
            'kelompok' => $kelompok,
            'hari' => $hari
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store($kelompok, Request $request)
    {
        // dd($request->all());
        $rules = [
            'jenis_id' => 'required',
            'kegiatan_id' => 'required',
            'hari' => 'required',
            'jam_mulai' => 'required',
            'jam_selesai' => 'required',
        ];

        $pesan = [
            'jenis_id.required' => 'Jenis Kegiatan Wajib Diisi!',
            'kegiatan_id.required' => 'Kegiatan Wajib Diisi!',
            'hari.required' => 'Hari Wajib Diisi!',
            'jam_mulai.required' => 'Jam Mulai Wajib Diisi!',
            'jam_selesai.required' => 'Jam Selesai Wajib Diisi!',
        ];

        $validator = Validator::make($request->all(), $rules, $pesan);
        if ($validator->fails()){
            return back()->withErrors($validator->errors());
        }else{
            DB::beginTransaction();
            try{
                $user = auth()->guard('admin')->user();

                $data = new Jadwal();
                $data->hari = $request->hari;
                $data->kelompok_id = $kelompok;
                $data->jenis_id = $request->jenis_id;
                $data->kegiatan_id = $request->kegiatan_id;
                $data->jam_mulai = $request->jam_mulai;
                $data->jam_selesai = $request->jam_selesai;
                $data->save();
            }catch(\QueryException $e){
                DB::rollback();
                return back();
            }
            DB::commit();
            return redirect()->route('admin.kelompok.jadwal.index', [$kelompok]);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id, $kelompok)
    {
        // dd($request->all());
        $rules = [
            'jenis_id' => 'required',
            'kegiatan_id' => 'required',
            'hari' => 'required',
            'jam_mulai' => 'required',
            'jam_selesai' => 'required',
        ];

        $pesan = [
            'jenis_id.required' => 'Jenis Kegiatan Wajib Diisi!',
            'kegiatan_id.required' => 'Kegiatan Wajib Diisi!',
            'hari.required' => 'Hari Wajib Diisi!',
            'jam_mulai.required' => 'Jam Mulai Wajib Diisi!',
            'jam_selesai.required' => 'Jam Selesai Wajib Diisi!',
        ];

        $validator = Validator::make($request->all(), $rules, $pesan);
        if ($validator->fails()){
            return back()->withErrors($validator->errors());
        }else{
            DB::beginTransaction();
            try{
                $user = auth()->guard('admin')->user();

                $data = Jadwal::where('id', $id)->first();
                $data->hari = $request->hari;
                $data->kelompok_id = $request->kelompok_id;
                $data->jenis_id = $request->jenis_id;
                $data->kegiatan_id = $request->kegiatan_id;
                $data->jam_mulai = $request->jam_mulai;
                $data->jam_selesai = $request->jam_selesai;
                $data->save();
            }catch(\QueryException $e){
                DB::rollback();
                return back();
            }
            DB::commit();
            return redirect()->route('admin.kelompok.jadwal.index', $request->kelompok_id);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id, $kelompok)
    {
        DB::beginTransaction();
        try{
            $hapus_db = Jadwal::destroy($id);
        }catch(\QueryException $e){
            DB::rollback();
            return back();
        }

        DB::commit();
        return redirect()->route('admin.kelompok.jadwal.index', $kelompok);
    }

    public function data($kelompok, Request $request)
    {
        $hariArray = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];

        $data = [];
        $jadwal = Jadwal::with(['jenis', 'kegiatan'])
        ->where('kelompok_id', $kelompok)->orderBy('jam_mulai', "ASC")->get();

        // dd($jadwal);
        foreach ($hariArray as $hari) {
            $data[$hari] = $jadwal->filter(function($item) use ($hari) {
                return $item->hari === $hari;
            })->values()->toArray();
        }


        return response()->json($data);
    }

}
