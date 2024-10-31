<?php

namespace App\Http\Controllers\Admin;


use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;


use App\Models\RPPH;
use App\Models\RPPHLine;
use App\Models\AsesmenSumatif;
use App\Models\Anak;
use PDF;

class RPPHController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('RPPH/Index');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('RPPH/Form');
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
            'topik' => 'required',
            'subtopik' => 'required',
            'fase' => 'required',
            'waktu' => 'required',
        ];

        $pesan = [
            'kelompok_id.required' => 'Kelompok Wajib Diisi!',
            'tgl.required' => 'Tanggal Wajib Diisi!',
            'topik.required' => 'Topik Wajib Diisi!',
            'subtopik.required' => 'Subtopik Badan Wajib Diisi!',
            'fase.required' => 'Fase Badan Wajib Diisi!',
            'waktu.required' => 'Waktu Wajib Diisi!',
        ];

        $validator = Validator::make($request->all(), $rules, $pesan);
        if ($validator->fails()){
            return back()->withErrors($validator->errors());
        }else{
            DB::beginTransaction();
            try{
                $user = auth()->guard('admin')->user();

                $tgl = $request->tgl;

                $data = new RPPH();
                $data->admin_id = $user->id;
                $data->tgl_mulai = Carbon::parse($request->tgl[0]);
                $data->tgl_selesai = Carbon::parse($request->tgl[1]);
                $data->kelompok_id = $request->kelompok_id;
                $data->topik = $request->topik;
                $data->subtopik = $request->subtopik;
                $data->fase = $request->fase;
                $data->kegiatan = json_encode($request->kegiatan);
                $data->jam_mulai = Carbon::parse($request->waktu[0]);
                $data->jam_selesai = Carbon::parse($request->waktu[1]);
                $data->save();

                foreach($request->lines as $i){
                    $line = new RPPHLine();
                    $line->rpph_id = $data->id;
                    $line->klasifikasi = $i['klasifikasi'];
                    $line->tujuan = $i['tujuan'];
                    $line->iktp = $i['iktp'];
                    $line->save();

                    $sumatif = new AsesmenSumatif();
                    $sumatif->rpph_id = $data->id;
                    $sumatif->rpph_line_id = $line->id;
                    $sumatif->save();
                }

            }catch(\QueryException $e){
                DB::rollback();
                return back();
            }
            DB::commit();
            return redirect()->route('admin.rpph.show', $data->id);
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
        
        $data = RPPH::with(['kelompok', 'detail', 'asesmen_awal', 
        'asesmen_sumatif' => function($q){
            $q->with(['line']);
        },
        'asesmen' => function($q){
            $q->with(['anak','foto', 'nilai' => function($q){
                $q->with(['line']);
            }]);
        }
        ])
        ->where('id', $id)->first();

        

        return Inertia::render('RPPH/Show', [
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
        $data = RPPH::with(['kelompok', 'detail'])
        ->where('id', $id)->first();


        return Inertia::render('RPPH/Form', [
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
            'topik' => 'required',
            'subtopik' => 'required',
            'fase' => 'required',
            'waktu' => 'required',
        ];

        $pesan = [
            'kelompok_id.required' => 'Kelompok Wajib Diisi!',
            'tgl.required' => 'Tanggal Wajib Diisi!',
            'topik.required' => 'Topik Wajib Diisi!',
            'subtopik.required' => 'Subtopik Badan Wajib Diisi!',
            'fase.required' => 'Fase Badan Wajib Diisi!',
            'waktu.required' => 'Waktu Wajib Diisi!',
        ];

        $validator = Validator::make($request->all(), $rules, $pesan);
        if ($validator->fails()){
            return back()->withErrors($validator->errors());
        }else{
            DB::beginTransaction();
            try{
                $user = auth()->guard('admin')->user();

                $data = RPPH::where('id', $id)->first();
                $data->admin_id = $user->id;
                $data->tgl_mulai = Carbon::parse($request->tgl[0]);
                $data->tgl_selesai = Carbon::parse($request->tgl[1]);
                $data->topik = $request->topik;
                $data->subtopik = $request->subtopik;
                $data->fase = $request->fase;
                $data->kegiatan = json_encode($request->kegiatan);
                $data->jam_mulai = Carbon::parse($request->waktu[0]);
                $data->jam_selesai = Carbon::parse($request->waktu[1]);
                $data->save();

                if(count($request->linesDeleted)){
                    RPPHLine::whereIn('id', $request->linesDeleted)->delete();
                }

                foreach($request->lines as $i){
                    $line = RPPHLine::firstOrNew(['id' => $i['id']]);
                    $line->rpph_id = $data->id;
                    $line->klasifikasi = $i['klasifikasi'];
                    $line->tujuan = $i['tujuan'];
                    $line->iktp = $i['iktp'];
                    $line->save();

                    $sumatif = AsesmenSumatif::firstOrNew(['rpph_line_id' => $line->id]);
                    $sumatif->rpph_id = $data->id;
                    $sumatif->rpph_line_id = $line->id;
                    $sumatif->save();
                }

            }catch(\QueryException $e){
                DB::rollback();
                return back();
            }
            DB::commit();
            return redirect()->route('admin.rpph.show', $data->id);
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
        $data = RPPH::with(['kelompok', 'detail', 'asesmen_awal', 
        'asesmen_sumatif' => function($q){
            $q->with(['line']);
        }
        ])
        ->where('id', $id)->first();

        
        $pdf = PDF::loadView('pdf.rpph', [
            'data' => $data,
        ], [ ], [
            'format' => 'A4-P'
        ]);

        return $pdf->stream('RPPH_TOPIK_'. ucwords($data->subtopik).').pdf');
    }

    public function data(Request $request)
    {
        $sort = !empty($request->sort) ? $request->sort : 'id';
        $sortDir = !empty($request->sortDir) ? $request->sortDir : 'desc';
        $paging = !empty($request->page) ? true : false;

        $elq = RPPH::with(['kelompok' => function($q){
            $q->with(['admin']);
        }])
        ->when($request->q, function($query, $search){
            $query->where('nama', 'LIKE', '%' . $search . '%')
            ->orWhere('alamat', 'LIKE', '%' . $search . '%')
            ->orWhere('email', 'LIKE', '%' . $search . '%');
        })
        ->when($request->level, function($query, $level){
            $query->where('level', $level);
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
