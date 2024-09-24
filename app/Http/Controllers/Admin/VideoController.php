<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Inertia\Inertia;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Storage;
use App\Models\Landing\Video;
use Cviebrock\EloquentSluggable\Services\SlugService;

class VideoController extends Controller
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
        return Inertia::render('Video/Index');
    }

    
    public function create()
    {
        return Inertia::render('Video/Form');
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
            'title' => 'required',
            'description' => 'required',
        ];

        $pesan = [
            'title.required' => 'Judul Video Wajib Diisi!',
            'description.required' => 'Deskripsi Video Wajib Diisi!',
        ];

        $validator = Validator::make($request->all(), $rules, $pesan);
        if ($validator->fails()){
            return back()->withErrors($validator->errors());
        }else{
            DB::beginTransaction();
            try{
                    $data = new Video();
                    $data->title = $request->title;
                    $data->description = $request->description;
                    $data->youtube = $request->youtube;
                    $data->youtube_id = $request->youtube_id;
                    $data->slug = SlugService::createSlug(Video::class, 'slug', $request->title);

                    $contents = file_get_contents($request->preview);
                    $name = '/video/'.uniqid().'-'.substr($request->preview, strrpos($request->preview, '/') + 1);
                    Storage::disk('public')->put($name, $contents);
                    $data->image = $name;
                    $data->save();
                    
            }catch(\QueryException $e){
                DB::rollback();
                dd($e);
            }
            DB::commit();
            return redirect()->route('admin.video.index');
        }
    }


    
    public function edit($id)
    {
        $data = Video::where('id', $id)->first();

        return Inertia::render('Video/Form',[
            'data' => $data,
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
            'title' => 'required',
            'description' => 'required',
        ];

        $pesan = [
            'title.required' => 'Judul Video Wajib Diisi!',
            'description.required' => 'Deskripsi Video Wajib Diisi!',
        ];

        $validator = Validator::make($request->all(), $rules, $pesan);
        if ($validator->fails()){
            return back()->withErrors($validator->errors());
        }else{
            DB::beginTransaction();
            try{
                $data = Video::where('id', $id)->first();
                $data->title = $request->title;
                $data->description = $request->description;
                $data->youtube = $request->youtube;
                $data->slug = SlugService::createSlug(Video::class, 'slug', $request->title);

                if($request->preview){
                    if(!empty($data->image)){
                        $cek = Storage::disk('public')->exists($data->image);
                        if($cek)
                        {
                            Storage::disk('public')->delete($data->image);
                        }
                    }
                    $contents = file_get_contents($request->preview);
                    $name = substr($request->preview, strrpos($request->preview, '/') + 1);
                    Storage::disk('public')->put('video/'.$name, $contents);
                    $data->image = $name;
                }
                $data->save();
            }catch(\QueryException $e){
                DB::rollback();
                return back();
            }
            DB::commit();
            return redirect()->route('admin.video.index');
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
            $data = Video::where('id', $id)->first();
            $cek = Storage::disk('public')->exists($data->image);
            if($cek)
            {
                Storage::disk('public')->delete($data->image);
            }
            $data->delete();
        }catch(\QueryException $e){
            DB::rollback();
            dd($e);
            return back();
        }

        DB::commit();
        return redirect()->route('admin.video.index');
    }
    
    public function data(Request $request)
    {
        $sort = !empty($request->sort) ? $request->sort : 'id';
        $sortDir = !empty($request->sortDir) ? $request->sortDir : 'desc';
        $limit = ($request->limit) ? $request->limit : 25;

        $data = Video::orderBy('id', 'ASC')->paginate($limit);

        return response()->json($data);
    }

    public function check_slug(Request $request)
    {
        // Old version: without uniqueness
        $slug = str_slug($request->title);

        // New version: to generate unique slugs
        $slug = SlugService::createSlug(Video::class, 'slug', $request->title);

        return response()->json($slug);
    }
}
