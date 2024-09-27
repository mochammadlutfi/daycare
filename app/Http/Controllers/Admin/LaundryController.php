<?php

namespace App\Http\Controllers\Admin;


use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;


use App\Models\Laundry;
use App\Models\LaundryDetail;


class LaundryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Laundry/Index');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Laundry/Form');
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
            // 'lines' => ''
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

                $data = new Laundry();
                $data->tgl = $request->tgl;
                $data->admin_id = $user->id;
                $data->kelompok_id = $request->kelompok_id;
                $data->save();

                foreach($request->lines as $i){
                    $line = new LaundryDetail();
                    $line->anak_id = $i['anak_id'];
                    $line->user_id = $i['user_id'];
                    $line->berat = $i['berat'];
                    $data->detail()->save($line);
                }

            }catch(\QueryException $e){
                DB::rollback();
                return back();
            }
            DB::commit();
            return redirect()->route('admin.laundry.show', $data->id);
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
        
        $data = Laundry::with(['kelompok', 'admin', 
        'detail' => function($q){
            return $q->with('anak');
        }
        ])
        ->where('id', $id)->first();
        return Inertia::render('Laundry/Show', [
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
        $data = Laundry::with(['kelompok', 'admin', 
        'detail' => function($q){
            return $q->with('anak');
        }
        ])
        ->where('id', $id)->first();

        return Inertia::render('Laundry/Form', [
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
            // 'lines' => ''
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

                $data = Laundry::where('id', $id)->first();
                $data->tgl = $request->tgl;
                $data->admin_id = $user->id;
                $data->kelompok_id = $request->kelompok_id;
                $data->save();

                foreach($request->lines as $i){
                    $line = LaundryDetail::where('id', $i['id'])->first();
                    $line->laundry_id = $data->id;
                    $line->anak_id = $i['anak_id'];
                    $line->user_id = $i['user_id'];
                    $line->berat = $i['berat'];
                    $line->save();
                }

            }catch(\QueryException $e){
                DB::rollback();
                return back();
            }
            DB::commit();
            return redirect()->route('admin.laundry.show', $data->id);
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

            $data = Laundry::where('id', $id)->first();
            $data->delete();

        }catch(\QueryException $e){
            dd($e);
            DB::rollback();
        }
        DB::commit();
        return redirect()->route('admin.laundry.index');
    }

    public function data(Request $request)
    {
        $sort = !empty($request->sort) ? $request->sort : 'id';
        $sortDir = !empty($request->sortDir) ? $request->sortDir : 'desc';
        $paging = !empty($request->page) ? true : false;

        $elq = Laundry::with(['kelompok', 'admin'])
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
