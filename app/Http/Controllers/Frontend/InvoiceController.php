<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Str;
use Storage;
use App\Models\Anak;
use App\Models\Invoice;
use App\Models\InvoiceDetail;
use Midtrans\Notification;
use Carbon\Carbon;

use PDF;
class InvoiceController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Invoice/Index');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $data = Invoice::with(['user', 'anak', 'detail'])
        ->where('id', $id)->first();

        return Inertia::render('Invoice/Show',[
            'data' => $data
        ]);
    }

    
    public function pdf($id)
    {
        $data = Invoice::with(['user','detail'])->where('id', $id)
        ->first();

        $pdf = PDF::loadView('pdf.invoice', [
            'data' => $data,
        ], [ ], [
            'format' => 'A4-P'
        ]);

        return $pdf->stream('Invoice '. $data->nomor .'.pdf');
    }
    public function data(Request $request)
    {
        $user = auth()->guard('web')->user();
        $sort = !empty($request->sort) ? $request->sort : 'id';
        $sortDir = !empty($request->sortDir) ? $request->sortDir : 'desc';
        $limit = ($request->limit) ? $request->limit : 25;
        $status = $request->status;

        $data = Invoice::with(['anak'])
        ->where('user_id', $user->id)
        ->orderBy($sort, $sortDir)
        ->when(!empty($status), function($q) use($status){
            return $q->where('status', $status);
        })
        ->paginate($limit);

        return response()->json($data);
    } 

    public function payment(Request $request)
    {
       
        if($request->order_id){
            $data = Invoice::where('uid', $request->order_id)->first();
    
            if($request->transaction_status == 'expire'){
                $data->status = 'cancel';
                $data->save();
            }elseif($request->transaction_status == 'settlement'){
                $data->status = 'paid';
                $data->save();
            }
    
            return redirect()->route('user.invoice.show', $data->id);
        }else{
            return redirect()->route('user.invoice.index');
        }
    }
}
