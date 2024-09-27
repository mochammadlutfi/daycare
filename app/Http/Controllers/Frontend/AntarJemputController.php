<?php

namespace App\Http\Controllers\Frontend;


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
        return Inertia::render('AntarJemput');
    }

    public function data(Request $request)
    {
        $sort = !empty($request->sort) ? $request->sort : 'id';
        $sortDir = !empty($request->sortDir) ? $request->sortDir : 'desc';
        $paging = !empty($request->page) ? true : false;

        $elq = AntarJemput::with(['kelompok', 'anak', 'admin', 'foto'])
        ->when($request->q, function($query, $search){
            $query->where('nama', 'LIKE', '%' . $search . '%')
            ->orWhere('alamat', 'LIKE', '%' . $search . '%')
            ->orWhere('email', 'LIKE', '%' . $search . '%');
        })
        ->Where('user_id', auth()->guard('web')->user()->id)
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
