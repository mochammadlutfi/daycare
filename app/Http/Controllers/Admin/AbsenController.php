<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Inertia\Inertia;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

use App\Models\Anak;
use App\Models\Absen;
use App\Models\AbsenDetail;

class AbsenController extends Controller
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
        return Inertia::render('Absen/Index');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Absen/Form');
    }

    public function scanner()
    {
        return Inertia::render('Absen/Scanner');
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

                $data = new Absen();
                $data->tgl = Carbon::parse($request->tgl)->format('Y-m-d');
                $data->admin_id = $user->id;
                $data->kelompok_id = $request->kelompok_id;
                $data->save();

                foreach($request->lines as $i){
                    $line = new AbsenDetail();
                    $line->anak_id = $i['anak_id'];
                    $line->user_id = $i['user_id'];
                    $line->status = $i['status'];
                    $line->check_in = $i['check_in'];
                    $line->check_out = $i['check_out'];
                    $data->detail()->save($line);
                }
                    
            }catch(\QueryException $e){
                DB::rollback();
                dd($e);
            }
            DB::commit();
            return redirect()->route('admin.absen.index');
        }
    }

    
    public function scan(Request $request)
    {
        $anak = Anak::where('code', $request->code)->first();
        if($anak){
            DB::beginTransaction();
            try{
                $user = auth()->guard('admin')->user();
                $now = Carbon::now();
                $noon = Carbon::createFromTime(12, 0, 0);
    
                // $data = Absen::firstOrNew([
                //     'kelompok_id' =>  $anak->kelompok_id,
                //     'tgl' =>  Carbon::now(),
                // ]);
                $absen = Absen::where('kelompok_id', $anak->kelompok_id)
                ->whereDate('tgl', Carbon::now())->first();
                if($absen == null){
                    $absen = new Absen();
                    $absen->tgl = Carbon::now()->format('Y-m-d');
                    $absen->admin_id = $user->id;
                    $absen->kelompok_id = $anak->kelompok_id;
                    $absen->save();

                    $line = Anak::where('kelompok_id', $anak->kelompok_id)
                    ->orderBy('id', 'DESC')->get();

                    foreach($line as $l){
                        if($l->id == $anak->id){
                            $line = new AbsenDetail();
                            $line->anak_id = $l->id;
                            $line->user_id = $l->user_id;
                            $line->status = 'Hadir';

                            if ($now->greaterThan($noon)) {
                                $line->check_out = $now->format('H:i');
                            } else {
                                $line->check_in = $now->format('H:i');
                            }
                            $absen->detail()->save($line);
                        }else{
                            $line = new AbsenDetail();
                            $line->anak_id = $l->id;
                            $line->user_id = $l->user_id;
                            $line->status = 'Alpa';
                            $absen->detail()->save($line);
                        }
                    }

                }else{
                    $detail = AbsenDetail::where('absen_id', $absen->id)
                    ->where('anak_id', $anak->id)->first();
                    $detail->status = 'Hadir';
                    if($detail->check_in){
                        $detail->check_out = $now->format('H:i');
                    }else{
                        $detail->check_in = $now->format('H:i');
                    }
                    $detail->save();
                }
            }catch(\QueryException $e){
                DB::rollback();
                dd($e);
            }
            DB::commit();
            return redirect()->route('admin.absen.scanner');
        }else{
            return back()->withErrors(['code' => 'QR Tidak Terdaftar']);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $data = Absen::with(['kelompok'])
        ->with(['detail' => function($q){
            return $q->with('anak');
        }])
        ->where('id', $id)
        ->first();

        return Inertia::render('Absen/Show',[
            'data' => $data,
        ]);
    }

    public function edit($id)
    {
        $data = Admin::where('id', $id)->first();

        return Inertia::render('DPD/Form',[
            'editMode' => true,
            'data' => $data,
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
            'name' => 'required',
            'daerah_id' => 'required',
            'username' => 'required|unique:admins,username,'.$id,
            'email' => 'required|unique:admins,email,'.$id,
        ];

        $pesan = [
            'name.required' => 'Nama DPD Wajib Diisi!',
            'daerah_id.required' => 'Daerah DPD Wajib Diisi!',
            'username.required' => 'Username DPD Wajib Diisi!',
            'username.unique' => 'Username Sudah Digunakan!',
            'email.required' => 'Alamat Email Wajib Diisi!',
            'email.unique' => 'Alamat Email Sudah Digunakan!',
        ];

        $validator = Validator::make($request->all(), $rules, $pesan);
        if ($validator->fails()){
            return back()->withErrors($validator->errors());
        }else{
            DB::beginTransaction();
            try{
                    $data = Admin::where('id', $id)->first();
                    $data->name = $request->name;
                    $data->username = $request->username;
                    $data->email = $request->email;
                    $data->daerah_id = $request->daerah_id;
                    $data->save();

            }catch(\QueryException $e){
                DB::rollback();
                return back();
            }
            DB::commit();
            return redirect()->route('dpd.index');
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
            
            $data = Admin::where('id', $id)->first();
            $data->delete();

        }catch(\QueryException $e){
            DB::rollback();
            return back();
        }

        return redirect()->route('dpd.index');
    }
    
    public function data(Request $request)
    {
        $sort = !empty($request->sort) ? $request->sort : 'id';
        $sortDir = !empty($request->sortDir) ? $request->sortDir : 'desc';
        $limit = ($request->limit) ? $request->limit : 25;


        $data = Absen::with(['kelompok'])
        ->withCount(['detail as hadir' => function($query) {
            $query->where('status', 'Hadir');
        },'detail as izin' => function($query) {
            $query->where('status', 'Izin');
        }, 'detail as sakit' => function($query) {
            $query->where('status', 'Sakit');
        }, 'detail as alpa' => function($query) {
            $query->where('status', 'Alpa');
        }])
        ->orderBy('tgl', 'DESC')
        ->paginate($limit);


        return response()->json($data);
    }

    public function anak(Request $request)
    {
        $sort = !empty($request->sort) ? $request->sort : 'id';
        $sortDir = !empty($request->sortDir) ? $request->sortDir : 'desc';
        $limit = ($request->limit) ? $request->limit : 25;


        $head = Absen::with(['kelompok'])
        ->where('tgl', $request->tgl)
        ->where('kelompok_id', $request->kelompok_id)
        ->orderBy('id', 'DESC')->first();
        $data = collect();

        if($head){
            $line = Anak::with(['user'])
            ->where('kelompok_id', $request->kelompok_id)
            ->orderBy('id', 'DESC')
            ->get();
        }else{
            $line = Anak::with(['user'])
            ->where('kelompok_id', $request->kelompok_id)
            ->orderBy('id', 'DESC')
            ->get();

            foreach($line as $l){
                $data->push([
                    'anak_id' => $l->id,
                    'anak_nama' => $l->nama,
                    'user_id' => $l->user_id,
                    'status' => 'Hadir',
                    'check_in' => '07:00:00',
                    'check_out' => '16:30:00',
                    'disabled' => false,
                ]);
            }
        }


        return response()->json($data);
    }
    
}
