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


use App\Models\Aktivitas;
use App\Models\AktivitasFoto;


class AktivitasController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Aktivitas/Index');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Aktivitas/Form');
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

                $data = new Aktivitas();
                $data->tgl = $request->tgl;
                $data->admin_id = $user->id;
                $data->kelompok_id = $request->kelompok_id;
                $data->jenis_id = $request->jenis_id;
                $data->kegiatan_id = $request->kegiatan_id;
                $data->keterangan = $request->keterangan;
                $data->save();

                if(count($request->images)){
                    foreach($request->images as $d){
                        $img = new AktivitasFoto();
                        $img->aktivitas_id = $data->id;
                        $img->nama = $d['name'];
                        $img->path = $this->uploadImage($d['raw'], $data->id);
                        $img->save();
                    }
                }

            }catch(\QueryException $e){
                DB::rollback();
                return back();
            }
            DB::commit();
            return redirect()->route('admin.aktivitas.show', $data->id);
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
        
        $data = Aktivitas::with(['kelompok', 'kegiatan', 'jenis', 'admin', 
        'foto'])
        ->where('id', $id)->first();
        return Inertia::render('Aktivitas/Show', [
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
        
        $value = Aktivitas::with(['kelompok', 'kegiatan', 'jenis', 'admin', 
        'foto'])
        ->where('id', $id)->first();

        return Inertia::render('Aktivitas/Form', [
            'value' => $value,
            'editMode' => true,
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

                $data = Aktivitas::where('id', $id)->first();
                $data->tgl = $request->tgl;
                $data->admin_id = $user->id;
                $data->kelompok_id = $request->kelompok_id;
                $data->jenis_id = $request->jenis_id;
                $data->kegiatan_id = $request->kegiatan_id;
                $data->save();

                if(count($request->images)){
                    foreach($request->images as $d){
                        if($d['status'] != "success"){
                            $img = new AktivitasFoto();
                            $img->aktivitas_id = $data->id;
                            $img->nama = $d['name'];
                            $img->path = $this->uploadImage($d['raw'], $data->id);
                            $img->save();
                        }
                    }
                }

                if(count($request->imagesDeleted)){
                    foreach($request->imagesDeleted as $d){
                        $img = AktivitasFoto::where('aktivitas_id', $id)
                        ->where('path', $d['url'])
                        ->delete();
                    }
                }

            }catch(\QueryException $e){
                DB::rollback();
                return back();
            }
            DB::commit();
            return redirect()->route('admin.aktivitas.show', $data->id);
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

            $data = Aktivitas::with(['foto'])
            ->where('id', $id)->first();

            foreach($data->foto() as $v)
            {
                if(Storage::disk('public')->exists($v->path)){
                    Storage::disk('public')->delete($v->path);
                }
                $v->delete();
            }
            $data->delete();

        }catch(\QueryException $e){
            dd($e);
            DB::rollback();
        }
        DB::commit();
        return redirect()->route('admin.aktivitas.index');
    }

    public function data(Request $request)
    {
        $sort = !empty($request->sort) ? $request->sort : 'id';
        $sortDir = !empty($request->sortDir) ? $request->sortDir : 'desc';
        $paging = !empty($request->page) ? true : false;

        $elq = Aktivitas::with(['kelompok', 'kegiatan', 'jenis', 'admin'])
        ->withCount('foto')
        ->when($request->q, function($query, $search){
            $query->where('tgl', 'LIKE', '%' . $search . '%')
                ->orWhereHas('kelompok', function($q) use ($search) {
                    $q->where('nama', 'LIKE', '%' . $search . '%')
                    ->orwhere('usia', 'LIKE', '%' . $search . '%');
                })
                ->orWhereHas('kegiatan', function($q) use ($search) {
                    $q->where('nama', 'LIKE', '%' . $search . '%');
                })
                ->orWhereHas('jenis', function($q) use ($search) {
                    $q->where('nama', 'LIKE', '%' . $search . '%');
                })
                ->orWhereHas('admin', function($q) use ($search) {
                    $q->where('nama', 'LIKE', '%' . $search . '%');
                });
        })
        ->orderBy($sort, $sortDir);
        
        if($request->limit){
            $data = $elq->paginate($request->limit);
        }else{
            $data = $elq->get();
        }

        return response()->json($data);
    }

    
    private function uploadImage($file, $id){
        $file_name = uniqid() . '.' . $file->getClientOriginalExtension();
        $imgFile = Image::make($file->getRealPath());
        $destinationPath = 'public/aktivitas/'.$id;

        $imgFile->resize(1000, 1000, function ($constraint) {
		    $constraint->aspectRatio();
		})->encode('jpg', 80);

        
        Storage::disk('public')->putFileAs(
            'aktivitas/'.$id,
            $file,
            $file_name
        );
        
        return '/uploads/aktivitas/'.$id.'/'.$file_name;
    }

}
