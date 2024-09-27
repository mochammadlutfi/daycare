<?php

namespace App\Http\Controllers\Frontend;


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
        return Inertia::render('Laundry');
    }

    public function data(Request $request)
    {
        $sort = !empty($request->sort) ? $request->sort : 'id';
        $sortDir = !empty($request->sortDir) ? $request->sortDir : 'desc';
        $paging = !empty($request->page) ? true : false;

        $elq = LaundryDetail::with(['anak', 'laundry' => function($q){
            return $q->with(['admin', 'kelompok']);
        }])
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
}
