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
                $data->tgl = $request->tgl;
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

    public function data(Request $request)
    {
        $sort = !empty($request->sort) ? $request->sort : 'id';
        $sortDir = !empty($request->sortDir) ? $request->sortDir : 'desc';
        $limit = ($request->limit) ? $request->limit : 25;
        $paging = !empty($request->page) ? true : false;

        $elq = Nilai::with(['kelompok', 'kegiatan', 'jenis', 'admin'])
        ->when($request->q, function($query, $search){
            $query->where('nama', 'LIKE', '%' . $search . '%')
            ->orWhere('alamat', 'LIKE', '%' . $search . '%')
            ->orWhere('email', 'LIKE', '%' . $search . '%');
        })
        ->when($request->level, function($query, $level){
            $query->where('level', $level);
        })
        ->orderBy($sort, $sortDir);
        
        if($paging){
            $data = $elq->paginate($request->page);
        }else{
            $data = $elq->get();
        }

        return response()->json($data);
    }
}
