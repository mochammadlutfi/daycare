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
class AnakController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');

        \Midtrans\Config::$serverKey    = config('midtrans.server_key');
        \Midtrans\Config::$isProduction = config('midtrans.is_production');
        \Midtrans\Config::$isSanitized  = config('midtrans.is_sanitized');
        \Midtrans\Config::$is3ds        = config('midtrans.is_3ds');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $user = auth()->guard('web')->user();
        // dd();
        if($user->anak()->count()){
            if($user->anak()->count() > 1){
                return Inertia::render('Anak/Index');
            }else{
                // $data = Anak::where()
                return Inertia::render('Anak/Show',[
                    'data' => $user->anak
                ]);
            }
        }else{
            return redirect()->route('user.anak.create');
        }

    }

    public function create()
    {
        $biaya = collect([
            'pembangunan' => (int)settings()->get('pembangunan') ?? 0,
            'pendaftaran' => (int)settings()->get('pendaftaran') ?? 0,
            'spp' => (int)settings()->get('spp') ?? 0,
            'denda' => (int)settings()->get('denda') ?? 0,
            'laundry' => (int)settings()->get('laundry') ?? 0,
            'antar_jemput' => (int)settings()->get('antar_jemput') ?? 0,
        ]);

        return Inertia::render('Anak/Form',[
            'biaya' => $biaya
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
        dd($request->all());
        $rules = [
            'nama' => 'required',
            'tmp_lahir' => 'required',
            'tgl_lahir' => 'required',
            'alamat' => 'required',
            'anak_ke' => 'required',
            'jarak' => 'required',
            'sosialisasi_dengan_lingkungan_anak' => 'required',
        ];

        $pesan = [
            'nama.required' => 'Nama Lengkap Wajib Diisi!',
            'tmp_lahir.required' => 'Tempat Lahir Wajib Diisi!',
            'tgl_lahir.required' => 'Tanggal Lahir Wajib Diisi!',
            'alamat.required' => 'Alamat Wajib Diisi!',
            'anak_ke.required' => 'Anak Ke Wajib Diisi!',
            'jarak.required' => 'Jarak Wajib Diisi!',
            'sosialisasi_dengan_lingkungan_anak.required' => 'Sosialisasi dengan lingkungan Wajib Diisi!',
        ];

        $validator = Validator::make($request->all(), $rules, $pesan);
        if ($validator->fails()){
            return back()->withErrors($validator->errors());
        }else{
            DB::beginTransaction();
            try{

                $user = auth()->guard('web')->user();
                
                $akteDir = null;
                if (is_file($request->scan_akte_anak)) {
                    $akteDir = 'scan/' . Str::random(32) . '.' . $request->file('scan_akte_anak')->getClientOriginalExtension();
                    $directory = Storage::disk('public')->put($akteDir, fopen($request->file('scan_akte_anak'), 'r+'));
                }

                $data = new Anak();
                $data->user_id = $user->id;
                $data->nama = $request->nama;
                $data->username = $request->username;
                $data->jk = $request->jk;
                $data->anak_ke = $request->anak_ke;
                $data->tmp_lahir = $request->tmp_lahir;
                $data->tgl_lahir = $request->tgl_lahir;
                $data->alamat = $request->alamat;
                $data->jarak = $request->jarak;
                $data->sosialisasi_dengan_lingkungan = $request->sosialisasi_dengan_lingkungan;
                $data->sakit_yang_pernah_diderita = $request->sakit_yang_pernah_diderita;
                $data->makanan_yang_disukai = $request->makanan_yang_disukai;
                $data->makanan_yang_tidak_disukai = $request->makanan_yang_tidak_disukai;
                $data->alergi = $request->memiliki_alergi;
                $data->isAntarJemput = $request->isLaundry ? 1 : 0;
                $data->isLaundry = $request->isAntarJemput ? 1 : 0;
                $data->scan_akte = $akteDir ?? $request->scan_akte_anak;
                $data->status = 'Pending';
                $data->save();


                $invoice = new Invoice();
                $invoice->nomor = $this->getNomor();
                $invoice->tgl = Carbon::now();
                $invoice->user_id = $user->id;
                $invoice->anak_id = $data->id;
                $invoice->uid = uniqid();
                $invoice->status = 'unpaid';
                $invoice->tgl_tempo = Carbon::now()->addDays(7);
                $invoice->total = settings()->get('pembangunan') + settings()->get('pendaftaran') + settings()->get('spp');
                $invoice->save();

                $linesData = collect([
                    [
                        'tipe' => 'Pembangunan',
                        'harga' => settings()->get('pembangunan')
                    ],
                    [
                        'tipe' => 'Pendaftaran',
                        'harga' => settings()->get('pendaftaran')
                    ],
                    [
                        'tipe' => 'SPP',
                        'harga' => settings()->get('spp')
                    ]
                ]);

                foreach($linesData as $i){
                    $line = new InvoiceDetail();
                    $line->tipe = $i['tipe'];
                    $line->harga = $i['harga'];
                    $line->qty = 1;
                    $invoice->detail()->save($line);

                    $lines[] = [
                        'id' => $line->id,
                        'price' => $line->harga,
                        'quantity' => $line->qty,
                        'name' => $line->tipe,
                    ];
                }
                
                $payload = [
                    'transaction_details' => [
                        'order_id'     => $invoice->uid,
                        'gross_amount' => $request->total,
                    ],
                    'customer_details' => [
                        'first_name' => $user->nama,
                        'email'      => $user->email,
                    ],
                    'item_details' => $lines,
                ];

                $snapToken = \Midtrans\Snap::getSnapToken($payload);
                $invoice->ref = $snapToken;
                $invoice->save();

            }catch(\QueryException $e){
                DB::rollback();
                return back();
            }
            DB::commit();
            // return redirect()->route('user.invoice.show', $invoice->id);
            return redirect()->url('https://app.sandbox.midtrans.com/snap/v4/redirection/'. $snapToken);
            // return 
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
        $data = Anak::with('kelompok')->where('id', $id)->first();

        return Inertia::render('Anak/Show',[
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
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    
    public function data(Request $request)
    {
        $sort = !empty($request->sort) ? $request->sort : 'id';
        $sortDir = !empty($request->sortDir) ? $request->sortDir : 'desc';
        $page = $request->page;
        $anak_ids = auth()->guard('web')->user()->anak()->pluck('id');

        $elq = Anak::with(['kelompok'])
        ->when($request->q, function($query, $search){
            $query->where('nama', 'LIKE', '%' . $search . '%');
        })
        ->when($request->kelompok_id, function($query, $kelompok_id){
            $query->where('kelompok_id', '=',$kelompok_id);
        })
        ->whereIn('id', $anak_ids)
        ->orderBy($sort, $sortDir);

        if($request->limit){
            $data = $elq->paginate($request->limit);
        }else{
            $data = $elq->get();
        }
        return response()->json($data);
    }

    private function getNomor()
    {

        $q = Invoice::select(DB::raw('MAX(RIGHT(nomor,5)) AS kd_max'));

        $code = 'DC/';
        $no = 1;
        date_default_timezone_set('Asia/Jakarta');

        if($q->count() > 0){
            foreach($q->get() as $k){
                return $code . date('ymd') .'/'.sprintf("%05s", abs(((int)$k->kd_max) + 1));
            }
        }else{
            return $code . date('ymd') .'/'. sprintf("%05s", $no);
        }
    }
}
