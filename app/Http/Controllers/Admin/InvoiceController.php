<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Inertia\Inertia;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

use App\Models\Invoice;
use App\Models\InvoiceDetail;
use App\Exports\InvoiceExport;
use Excel;
use App\Models\Anak;

use PDF;
class InvoiceController extends Controller
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
        return Inertia::render('Invoice/Index');
    }

    
    public function show($id)
    {

    //     // $invoice = Invoice
    //         DB::beginTransaction();
    //         try{
    //     $anak = Anak::orderBy('nama', 'ASC')->get();

    //     foreach($anak as $a){
            
    //         $invoice = new Invoice();
    //         $invoice->nomor = $this->getNomor();
    //         $invoice->tgl = '2024-09-23';
    //         $invoice->user_id = $a->user_id;
    //         $invoice->anak_id = $a->id;
    //         $invoice->uid = uniqid();
    //         $invoice->metode = 'Tunai';
    //         $invoice->status = 'paid';
    //         $invoice->tgl_tempo = '2024-10-07';
    //         $invoice->total = 0;
    //         $invoice->save();


    //         $linesData = collect([
    //             [
    //                 'tipe' => 'SPP',
    //                 'harga' => 1200000,
    //                 'qty' => 1,
    //             ]
    //         ]);

    //         if($a->id == 18){
    //             $linesData->push(
    //                 [
    //                     'tipe' => 'Laundry',
    //                     'harga' => 7000,
    //                     'qty' => 20
    //                 ]
    //             );
    //             $linesData->push(
    //                 [
    //                     'tipe' => 'Antar Jemput',
    //                     'harga' => 10000,
    //                     'qty' => 40
    //                 ]
    //             );
    //         }
    //         $total = 0;

    //         foreach($linesData->all() as $i){
    //             $line = new InvoiceDetail();
    //             // dd($i['tipe']);
    //             $line->tipe = $i['tipe'];
    //             $line->harga = $i['harga'];
    //             $line->qty = $i['qty'];
    //             $invoice->detail()->save($line);

    //             $total += $i['harga'] * $i['qty'];
    //         }
    //         $invoice->total = $total;
    //         $invoice->save();
    //     }

    // }catch(\QueryException $e){
    //     DB::rollback();
    //     dd($e);
    // }
    // DB::commit();
    // return redirect()->route('admin.invoice.index');

        $data = Invoice::with(['user', 'anak', 'detail'])
        ->where('id', $id)->first();

        return Inertia::render('Invoice/Show',[
            'data' => $data
        ]);
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
            'name' => 'required',
            'wilayah' => 'required',
        ];

        $pesan = [
            'name.required' => 'Nama Dapil Wajib Diisi!',
            'wilayah.required' => 'Wilayah Dapil Wajib Diisi!',
        ];

        $validator = Validator::make($request->all(), $rules, $pesan);
        if ($validator->fails()){
            return back()->withErrors($validator->errors());
        }else{
            DB::beginTransaction();
            try{
                    $data = new Dapil();
                    $data->name = $request->name;
                    $data->daerah_id = implode(',', $request->wilayah);
                    $data->save();
                    
            }catch(\QueryException $e){
                DB::rollback();
                dd($e);
            }
            DB::commit();
            return redirect()->route('dapil.index');
        }
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
            $hapus_db = Invoice::destroy($id);
        }catch(\QueryException $e){
            DB::rollback();
            return back();
        }

        DB::commit();
        return redirect()->route('dapil.index');
    }
    
    public function data(Request $request)
    {
        $sort = !empty($request->sort) ? $request->sort : 'id';
        $sortDir = !empty($request->sortDir) ? $request->sortDir : 'desc';
        $limit = ($request->limit) ? $request->limit : 25;
        $status = $request->status;

        $data = Invoice::with(['user', 'anak'])
        ->orderBy($sort, $sortDir)
        ->when(!empty($status), function($q) use($status){
            return $q->where('status', $status);
        })
        ->when($request->anak, function($q, $anak){
            return $q->where('anak_id', $anak);
        })
        ->paginate($limit);

        return response()->json($data);
    }

    
    public function report(Request $request)
    {
        $kelompok = $request->kelompok;
        $paket = $request->paket;

        return Excel::download(new InvoiceExport($kelompok, $paket), 'Data Report Invoice.xlsx');
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
    
    private function getNomor()
    {

        $q = Invoice::select(DB::raw('MAX(RIGHT(nomor,5)) AS kd_max'));

        $code = 'DC/';
        $no = 1;
        date_default_timezone_set('Asia/Jakarta');

        if($q->count() > 0){
            foreach($q->get() as $k){
                return $code . '241001'.sprintf("%05s", abs(((int)$k->kd_max) + 1));
            }
        }else{
            return $code . '241001'. sprintf("%05s", $no);
        }
    }
}
