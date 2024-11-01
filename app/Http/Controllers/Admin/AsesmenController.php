<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Inertia\Inertia;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Image;
use Storage;
use App\Models\RPPH;
use App\Models\Anak;
use App\Models\Asesmen;
use App\Models\AsesmenNilai;
use App\Models\AsesmenFoto;
use PDF;

class AsesmenController extends Controller
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
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store($rpph, Request $request)
    {
        $rules = [
            'anak_id' => 'required',
            'lines' => 'required',
        ];

        $pesan = [
            'anak_id.required' => 'Kegiatan Wajib Diisi!',
            'lines.required' => 'Hasil Pengamatan Wajib Diisi!',
        ];

        $validator = Validator::make($request->all(), $rules, $pesan);
        if ($validator->fails()){
            return back()->withErrors($validator->errors());
        }else{
            DB::beginTransaction();
            try{
                $anak = Anak::where('id', $request->anak_id)->first();

                $data = new Asesmen();
                $data->rpph_id = $rpph;
                $data->anak_id = $request->anak_id;
                $data->user_id = $anak->user_id;
                $data->save();

                foreach($request->lines as $i){
                    $line = new AsesmenNilai();
                    $line->asesmen_id = $data->id;
                    $line->rpph_line_id = $i['rpph_line_id'];
                    $line->status = $i['status'];
                    $line->keterangan = $i['keterangan'];
                    $line->save();
                }

                if(count($request->images)){
                    foreach($request->images as $d){
                        $img = new AsesmenFoto();
                        $img->asesmen_id = $data->id;
                        $img->nama = $d['name'];
                        $img->path = $this->uploadImage($d['raw'], $data->id);
                        $img->save();
                    }
                }
                    
            }catch(\QueryException $e){
                DB::rollback();
                dd($e);
            }
            DB::commit();
            return redirect()->route('admin.rpph.show', $rpph);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $rpph, $id)
    {
        // dd($request->all());
        $rules = [
            'anak_id' => 'required',
            'lines' => 'required',
        ];

        $pesan = [
            'anak_id.required' => 'Kegiatan Wajib Diisi!',
            'lines.required' => 'Hasil Pengamatan Wajib Diisi!',
        ];

        $validator = Validator::make($request->all(), $rules, $pesan);
        if ($validator->fails()){
            return back()->withErrors($validator->errors());
        }else{
            DB::beginTransaction();
            try{
                $anak = Anak::where('id', $request->anak_id)->first();

                $data = Asesmen::where('id', $id)->first();
                $data->rpph_id = $rpph;
                $data->anak_id = $request->anak_id;
                $data->user_id = $anak->user_id;
                $data->save();

                foreach($request->lines as $i){
                    $line = AsesmenNilai::firstOrNew(['id' => $i['id']]);
                    $line->asesmen_id = $data->id;
                    $line->rpph_line_id = $i['rpph_line_id'];
                    $line->status = $i['status'];
                    $line->keterangan = $i['keterangan'];
                    $line->save();
                }

                if(count($request->images)){
                    foreach($request->images as $d){
                        if($d['status'] != "success"){
                            $img = new AsesmenFoto();
                            $img->asesmen_id = $data->id;
                            $img->nama = $d['name'];
                            $img->path = $this->uploadImage($d['raw'], $data->id);
                            $img->save();
                        }
                    }
                }

                if(count($request->imagesDeleted)){
                    foreach($request->imagesDeleted as $d){
                        $img = AsesmenFoto::where('asesmen_id', $id)
                        ->where('path', $d['url'])
                        ->delete();
                    }
                }
                    
            }catch(\QueryException $e){
                DB::rollback();
                dd($e);
            }
            DB::commit();
            return redirect()->route('admin.rpph.show', $rpph);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($rpph, $id)
    {
        
        DB::beginTransaction();
        try{
            $data = Asesmen::with(['foto'])
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
            return back();
        }

        DB::commit();
        return redirect()->route('admin.rpph.show', $rpph);
    }
    
    public function updateSumatif(Request $request, $rpph, $id)
    {
        $rules = [
            'status' => 'required',
            'keterangan' => 'required',
        ];

        $pesan = [
            'status.required' => 'Status Wajib Diisi!',
            'keterangan.required' => 'Hasil Pengamatan Wajib Diisi!',
        ];

        $validator = Validator::make($request->all(), $rules, $pesan);
        if ($validator->fails()){
            return back()->withErrors($validator->errors());
        }else{
            DB::beginTransaction();
            try{
                    $data = AsesmenSumatif::where('id', $id)->first();
                    $data->status = $request->status;
                    $data->keterangan = $request->keterangan;
                    $data->save();

            }catch(\QueryException $e){
                DB::rollback();
                return back();
            }
            DB::commit();
            return redirect()->route('admin.rpph.show', $rpph);
        }
    }

    
    private function uploadImage($file, $id){
        $file_name = uniqid() . '.' . $file->getClientOriginalExtension();
        $imgFile = Image::make($file->getRealPath());
        $destinationPath = 'public/asesmen/'.$id;

        $imgFile->resize(1000, 1000, function ($constraint) {
		    $constraint->aspectRatio();
		})->encode('jpg', 80);

        
        Storage::disk('public')->putFileAs(
            'asesmen/'.$id,
            $file,
            $file_name
        );
        
        return '/uploads/asesmen/'.$id.'/'.$file_name;
    }

    
    public function pdf($rpph)
    {
        $data = RPPH::with([
        'asesmen' => function($q){
            $q->with(['anak','foto', 'nilai' => function($q){
                $q->with(['line']);
            }]);
        }
        ])
        ->where('id', $rpph)->first();

        
        $pdf = PDF::loadView('pdf.asesmen', [
            'data' => $data,
        ], [ ], [
            'format' => 'A4-P'
        ]);

        return $pdf->stream('ASESMEN_TOPIK_'. ucwords($data->subtopik).'.pdf');
    }

}
