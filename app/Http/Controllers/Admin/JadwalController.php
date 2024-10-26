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
use App\Models\JadwalDetail;


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
    public function index()
    {
        return Inertia::render('Jadwal/Index');
    }
    

    public function store(Request $request)
    {
        // dd($request->all());
        $rules = [
            'kelompok_id' => 'required',
            'periode' => 'required',
        ];

        $pesan = [
            'kelompok_id.required' => 'Kelompok Wajib Diisi!',
            'periode.required' => 'Tanggal periode Wajib Diisi!',
        ];

        $validator = Validator::make($request->all(), $rules, $pesan);
        if ($validator->fails()){
            return back()->withErrors($validator->errors());
        }else{
            DB::beginTransaction();
            try{
                $user = auth()->guard('admin')->user();

                $data = new Jadwal();
                $data->kelompok_id = $request->kelompok_id;
                $data->tgl_mulai = Carbon::parse($request->periode[0]);
                $data->tgl_selesai = Carbon::parse($request->periode[1]);
                $data->admin_id = $user->id;
                $data->save();
            }catch(\QueryException $e){
                DB::rollback();
                return back();
            }
            DB::commit();
            return redirect()->route('admin.jadwal.detail', $data->id);
        }
    }

    public function detail($id)
    {
        $jadwal = Jadwal::with(['kelompok'])->where('id', $id)->first();
        $hari = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];

        return Inertia::render('Jadwal/Detail',[
            'jadwal' => $jadwal,
            'hari' => $hari
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function detailStore($id, Request $request)
    {
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

                $data = new JadwalDetail();
                $data->jadwal_id = $id;
                $data->hari = $request->hari;
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
            return redirect()->route('admin.jadwal.detail', $id);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function detailUpdate(Request $request, $id, $detail)
    {
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

                $data = JadwalDetail::where('id', $detail)->first();
                $data->hari = $request->hari;
                $data->jadwal_id = $id;
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
            return redirect()->route('admin.jadwal.detail', $id);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function detailDestroy($id, $detail)
    {
        DB::beginTransaction();
        try{
            $hapus_db = JadwalDetail::destroy($detail);
        }catch(\QueryException $e){
            DB::rollback();
            return back();
        }

        DB::commit();
        return redirect()->route('admin.jadwal.detail', $id);
    }

    public function data(Request $request)
    {
        $sort = !empty($request->sort) ? $request->sort : 'id';
        $sortDir = !empty($request->sortDir) ? $request->sortDir : 'desc';
        $limit = $request->limit;

        $elq = Jadwal::with(['kelompok', 'admin'])
        ->when($request->search, function($q, $search){
            return $q->where('kelompok_id', 'Like', '%'.$search.'%');
        })
        ->orderBy($sort, $sortDir);

        if($limit){
            $data = $elq->paginate($limit);
        }else{
            $data = $elq->get();
        }

        return response()->json($data);
    }

    public function detailData($id, Request $request)
    {
        // $hariArray = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];

        $data = [];
        $jadwal = JadwalDetail::with(['jenis', 'kegiatan'])
        ->where('jadwal_id', $id)->orderBy('hari', 'DESC')->orderBy('jam_mulai', "ASC")->get();

        // foreach ($hariArray as $hari) {
        //     $data[$hari] = $jadwal->filter(function($item) use ($hari) {
        //         return $item->hari === $hari;
        //     })->values()->toArray();
        // }


        return response()->json($jadwal);
    }

}
