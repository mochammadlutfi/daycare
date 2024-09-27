<?php

namespace App\Http\Controllers\Admin;


use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;


use App\Models\AntarJemput;
use App\Models\AntarJemputFoto;
use App\Models\Anak;
use PDF;
use Image;
use Storage;
class AntarJemputController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('AntarJemput/Index');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('AntarJemput/Form');
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
            'jam' => 'required',
            'anak_id' => 'required',
            'images' => 'required',
        ];

        $pesan = [
            'kelompok_id.required' => 'Kelompok Wajib Diisi!',
            'tgl.required' => 'Tanggal Wajib Diisi!',
            'anak_id.required' => 'Anak Wajib Diisi!',
            'jam.required' => 'Jam Wajib Diisi!',
            'berat.required' => 'Berat Badan Wajib Diisi!',
            'images.required' => 'Foto Wajib Diisi!',
        ];

        $validator = Validator::make($request->all(), $rules, $pesan);
        if ($validator->fails()){
            return back()->withErrors($validator->errors());
        }else{
            DB::beginTransaction();
            try{
                $user = auth()->guard('admin')->user();
                $anak = Anak::where('id', $request->anak_id)->first();

                $data = new AntarJemput();
                $data->tgl = Carbon::parse($request->tgl);
                $data->jam = Carbon::parse($request->jam);
                $data->admin_id = $user->id;
                $data->kelompok_id = $request->kelompok_id;
                $data->anak_id = $request->anak_id;
                $data->user_id = $anak->user_id;
                $data->keterangan = $request->keterangan;
                $data->save();

                if(count($request->images)){
                    foreach($request->images as $d){
                        $img = new AntarJemputFoto();
                        $img->antarjemput_id = $data->id;
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
            return redirect()->route('admin.antarjemput.show', $data->id);
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
        
        $data = AntarJemput::with(['kelompok', 'anak', 'admin', 
        'foto'])
        ->where('id', $id)->first();

        return Inertia::render('AntarJemput/Show', [
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
        $data = AntarJemput::with(['kelompok', 'anak','admin', 
        'foto'])
        ->where('id', $id)->first();


        return Inertia::render('AntarJemput/Form', [
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
            'jam' => 'required',
            'anak_id' => 'required',
            'images' => 'required',
        ];

        $pesan = [
            'kelompok_id.required' => 'Kelompok Wajib Diisi!',
            'tgl.required' => 'Tanggal Wajib Diisi!',
            'anak_id.required' => 'Anak Wajib Diisi!',
            'jam.required' => 'Jam Wajib Diisi!',
            'berat.required' => 'Berat Badan Wajib Diisi!',
            'images.required' => 'Foto Wajib Diisi!',
        ];

        $validator = Validator::make($request->all(), $rules, $pesan);
        if ($validator->fails()){
            return back()->withErrors($validator->errors());
        }else{
            DB::beginTransaction();
            try{
                $user = auth()->guard('admin')->user();
                $anak = Anak::where('id', $request->anak_id)->first();

                $data = AntarJemput::where('id', $id)->first();
                $data->tgl = Carbon::parse($request->tgl);
                $data->jam = Carbon::parse($request->jam);
                $data->admin_id = $user->id;
                $data->kelompok_id = $request->kelompok_id;
                $data->anak_id = $request->anak_id;
                $data->user_id = $anak->user_id;
                $data->keterangan = $request->keterangan;
                $data->save();

                if(count($request->images)){
                    foreach($request->images as $d){
                        if($d['status'] != "success"){
                            $img = new AntarJemput();
                            $img->aktivitas_id = $data->id;
                            $img->nama = $d['name'];
                            $img->path = $this->uploadImage($d['raw'], $data->id);
                            $img->save();
                        }
                    }
                }

                if(count($request->imagesDeleted)){
                    foreach($request->imagesDeleted as $d){
                        $img = AntarJemput::where('aktivitas_id', $id)
                        ->where('path', $d['url'])
                        ->delete();
                    }
                }
            }catch(\QueryException $e){
                DB::rollback();
                return back();
            }
            DB::commit();
            return redirect()->route('admin.antarjemput.show', $data->id);
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
            
            $data = AntarJemput::with(['foto'])
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
            DB::rollback();
            return response()->json([
                'fail' => true,
                'errors' => $e,
                'pesan' => 'Error Menhapus Data',
            ]);
        }

        DB::commit();
        return redirect()->route('admin.antarjemput.index');
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

        $elq = AntarJemput::with(['kelompok', 'anak', 'admin'])
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
    
    private function uploadImage($file, $id){
        $file_name = uniqid() . '.' . $file->getClientOriginalExtension();
        $imgFile = Image::make($file->getRealPath());
        $destinationPath = 'public/antarjemput/'.$id;

        $imgFile->resize(1000, 1000, function ($constraint) {
		    $constraint->aspectRatio();
		})->encode('jpg', 80);

        
        Storage::disk('public')->putFileAs(
            'antarjemput/'.$id,
            $file,
            $file_name
        );
        
        return '/uploads/antarjemput/'.$id.'/'.$file_name;
    }
}
