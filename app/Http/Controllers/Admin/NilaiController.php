<?php

namespace App\Http\Controllers\Admin;


use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;


use App\Models\Nilai;
use App\Models\NilaiDetail;


class NilaiController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Nilai/Index');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Nilai/Form');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // dd($request->all());
        $rules = [
            'kelompok_id' => 'required',
            'tgl' => 'required',
        ];

        $pesan = [
            'kelompok_id.required' => 'Kelompok Wajib Diisi!',
            'tgl.required' => 'Tanggal Wajib Diisi!',
        ];

        $validator = Validator::make($request->all(), $rules, $pesan);
        if ($validator->fails()){
            return back()->withErrors($validator->errors());
        }else{
            DB::beginTransaction();
            try{
                $user = auth()->guard('admin')->user();

                $data = new Nilai();
                $data->tgl = Carbon::parse($request->tgl);
                $data->admin_id = $user->id;
                $data->kelompok_id = $request->kelompok_id;
                $data->jenis_id = $request->jenis_id;
                $data->kegiatan_id = $request->kegiatan_id;
                $data->save();

                foreach($request->lines as $i){
                    $line = new NilaiDetail();
                    $line->anak_id = $i['anak_id'];
                    $line->user_id = $i['user_id'];
                    $line->nilai = $i['nilai'];
                    $line->keterangan = $i['keterangan'];
                    $data->detail()->save($line);
                }

            }catch(\QueryException $e){
                DB::rollback();
                return back();
            }
            DB::commit();
            return redirect()->route('admin.nilai.show', $data->id);
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
        
        $data = Nilai::with(['kelompok', 'kegiatan', 'jenis', 'admin', 
        'detail' => function($q){
            return $q->with('anak');
        }
        ])
        ->where('id', $id)->first();
        return Inertia::render('Nilai/Show', [
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
        $data = Nilai::with(['kelompok', 'kegiatan', 'jenis', 'admin', 
        'detail' => function($q){
            return $q->with('anak');
        }
        ])
        ->where('id', $id)->first();
        return Inertia::render('Nilai/Form', [
            'data' => $data
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
        ];

        $pesan = [
            'kelompok_id.required' => 'Kelompok Wajib Diisi!',
            'tgl.required' => 'Tanggal Wajib Diisi!',
        ];

        $validator = Validator::make($request->all(), $rules, $pesan);
        if ($validator->fails()){
            return back()->withErrors($validator->errors());
        }else{
            DB::beginTransaction();
            try{
                $user = auth()->guard('admin')->user();

                $data = Nilai::where('id', $id)->first();
                $data->tgl = $request->tgl;
                $data->admin_id = $user->id;
                $data->kelompok_id = $request->kelompok_id;
                $data->jenis_id = $request->jenis_id;
                $data->kegiatan_id = $request->kegiatan_id;
                $data->save();

                foreach($request->lines as $i){
                    if($i['id']){
                        $line = NilaiDetail::where('id', $i['id'])->first();
                    }else{
                        $line = new NilaiDetail();
                    }
                    $line->anak_id = $i['anak_id'];
                    $line->user_id = $i['user_id'];
                    $line->nilai = $i['nilai'];
                    $line->keterangan = $i['keterangan'];
                    $data->detail()->save($line);
                }

            }catch(\QueryException $e){
                DB::rollback();
                return back();
            }
            DB::commit();
            return redirect()->route('admin.nilai.show', $data->id);
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
        //
    }

    public function data(Request $request)
    {
        $sort = !empty($request->sort) ? $request->sort : 'id';
        $sortDir = !empty($request->sortDir) ? $request->sortDir : 'desc';
        $paging = !empty($request->page) ? true : false;
        $page = $request->page;

        $elq = Nilai::with(['kelompok', 'kegiatan', 'jenis', 'admin'])
        ->when($request->q, function($query, $search){
            $query->where('nama', 'LIKE', '%' . $search . '%')
            ->orWhere('alamat', 'LIKE', '%' . $search . '%')
            ->orWhere('email', 'LIKE', '%' . $search . '%');
        })
        ->orderBy($sort, $sortDir);
        
        if($request->limit){
            $data = $elq->paginate($request->limit);
        }else{
            $data = $elq->get();
        }

        return response()->json($data);
    }

    public function detail(Request $request)
    {
        $sort = !empty($request->sort) ? $request->sort : 'id';
        $sortDir = !empty($request->sortDir) ? $request->sortDir : 'desc';
        $paging = !empty($request->page) ? true : false;
        $page = $request->page;
        $indikator = $request->indikator;
        $anak_id = $request->anak_id;

        $data = DB::table('nilai_detail as nd')
        ->join('nilai as n', 'n.id', '=', 'nd.nilai_id')
        ->join('jenis_kegiatan as j', 'j.id', '=', 'n.jenis_id')
        ->join('kegiatan as k', 'k.id', '=', 'n.kegiatan_id')
        ->join('admins as a', 'a.id', '=', 'n.admin_id')
        ->join('anak as nk', 'nk.id', '=', 'nd.anak_id')
        ->join(DB::raw("(SELECT MAX(n2.tgl) as max_tgl, k2.id as kid FROM kegiatan as k2 JOIN nilai as n2 ON n2.kegiatan_id = k2.id GROUP BY k2.id) as latest"),
            function ($join) {
                $join->on('k.id', '=', 'latest.kid')
                    ->on('n.tgl', '=', 'latest.max_tgl');
            })
        ->select('n.tgl', 'j.nama as jenis', 'n.kegiatan_id', 'k.nama as kegiatan', 'nd.nilai', 'nd.keterangan')
        ->where('k.indikator', '=', $indikator)
        ->where('nd.anak_id', '=', $anak_id)
        ->orderBy('n.tgl', 'DESC')
        ->get();
    

        return response()->json($data);
    }

    public function chart(Request $request)
    {
        $kegiatan = $request->kegiatan;
        $anak_id = $request->anak_id;

        $data = DB::table('nilai_detail as nd')
        ->join('nilai as n', 'n.id', '=', 'nd.nilai_id')
        ->select("nd.nilai", "n.tgl")
        ->where('n.kegiatan_id', '=', $kegiatan)
        ->where("nd.anak_id", "=", $anak_id)
        ->groupBy('nd.nilai')
        ->groupBy('n.tgl')
        ->orderBy('n.tgl', 'ASC')
        ->get();

        $nilaiMapping = ['BB' => 1, 'MB' => 2, 'BSH' => 3, 'BSB' => 4];

        $chartData = $data->map(function($d) use ($nilaiMapping) {
            return [
                'nilai' => $nilaiMapping[$d->nilai],
                'tgl' => Carbon::parse($d->tgl)->translatedFormat('d F Y')
            ];
        });

        return response()->json($chartData);
    }
}
