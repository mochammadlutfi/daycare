<?php

namespace App\Http\Controllers\Frontend\Auth;

use App\Models\User;
use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Notification;
use Inertia\Inertia;
use Redirect;
use Storage;
use PDF;

use App\Models\UserDetail;
use App\Models\Anak;
use App\Models\Invoice;
use App\Models\InvoiceDetail;
use Carbon\Carbon;
use App\Models\Paket;
use App\Notifications\RegisterNotification;
class RegisterController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        // $this->middleware('guest:web');
        \Midtrans\Config::$serverKey    = config('midtrans.server_key');
        \Midtrans\Config::$isProduction = config('midtrans.is_production');
        \Midtrans\Config::$isSanitized  = config('midtrans.is_sanitized');
        \Midtrans\Config::$is3ds        = config('midtrans.is_3ds');
    }

    public function showRegisterForm()
    {
        return Inertia::render('Register/Index');
    }

    public function register(Request $request)
    {
        // dd($request->all());
        $rules = [
            'nama' => 'required',
            'email' => 'email|required|unique:users',
            'password' => 'required|min:6|required_with:password_confirmation|same:password_confirmation',
            'password_confirmation' => 'required|min:6'
        ];

        $pesan = [
            'nama.required' => 'Nama Lengkap Wajib Diisi!',
            'email.required' => 'Alamat Email Wajib Diisi!',
            'email.unique' => 'Alamat Email Sudah Terdaftar!',
            'email.email' => 'Alamat Email Tidak Valid!',
            'password.required' => 'Password Wajib Diisi!',
            'password.min' => 'Tidak Boleh Kurang Dari 6 Karakter!',
            'password.same' => 'Konfirmasi Password Tidak Sama!',
            'password_confirmation.required' => 'Konfirmasi Password Wajib Diisi!',
            'password_confirmation.min' => 'Tidak Boleh Kurang Dari 6 Karakter!'
        ];

        $validator = Validator::make($request->all(), $rules, $pesan);
        if ($validator->fails()){
            return back()->withErrors($validator->errors());
        }else{
            DB::beginTransaction();
            try{
                $data = new User;
                $data->nama = $request->nama;
                $data->email = $request->email;
                $data->password = Hash::make($request->password);
                $data->save();

                // $data->sendEmailVerificationNotification();
                auth()->guard('web')->attempt(array('email' => $request->email, 'password' => $request->password), true);
            }catch(\QueryException $e){
                DB::rollback();
                return response()->json([
                    'fail' => true,
                    'pesan' => 'Error Menyimpan Data',
                    'log' => $e,
                ]);
            }

            DB::commit();
            return redirect()->route('verification.notice');
        }
    }

    public function detail()
    {

        $user = auth()->guard('web')->user();


        if($user->anak){
            return redirect()->route('user.anak.index');
        }
        $data = $user->detail;

        $biaya = collect([
            'denda' => (int)settings()->get('denda') ?? 0,
            'laundry' => (int)settings()->get('laundry') ?? 0,
            'antar_jemput' => (int)settings()->get('antar_jemput') ?? 0,
        ]);

        $paket = Paket::orderBy('id', 'ASC')->get();

        return Inertia::render('Register/Detail',[
            'value' => $data,
            'biaya' => $biaya,
            'paket' => $paket,
            'editMode' => $data ? true : false,
        ]);
    }

    public function detailStore(Request $request)
    {
        DB::beginTransaction();
        try{

            $user = auth()->guard('web')->user();

            $ktpAyahDir = null;
            $ktpIbuDir = null;
            $kkDir = null;
            $akteDir = null;

            if (is_file($request->ktp_ayah)) {
                $ktpAyahDir = 'scan/' . Str::random(32) . '.' . $request->file('ktp_ayah')->getClientOriginalExtension();
                $directory = Storage::disk('public')->put($ktpAyahDir, fopen($request->file('ktp_ayah'), 'r+'));
            }

            if (is_file($request->ktp_ibu)) {
                $ktpIbuDir = 'scan/' . Str::random(32) . '.' . $request->file('ktp_ibu')->getClientOriginalExtension();
                $directory = Storage::disk('public')->put($ktpIbuDir, fopen($request->file('ktp_ibu'), 'r+'));
            }

            if (is_file($request->kk)) {
                $kkDir = 'scan/' . Str::random(32) . '.' . $request->file('kk')->getClientOriginalExtension();
                $directory = Storage::disk('public')->put($kkDir, fopen($request->file('kk'), 'r+'));
            }

            if (is_file($request->scan_akte_anak)) {
                $akteDir = 'scan/' . Str::random(32) . '.' . $request->file('scan_akte_anak')->getClientOriginalExtension();
                $directory = Storage::disk('public')->put($akteDir, fopen($request->file('scan_akte_anak'), 'r+'));
            }

            $orang_tua = UserDetail::updateOrCreate(["user_id" => $user->id], [
                "user_id" => $user->id,
                "nama_ayah" => $request->nama_ayah,
                "tmp_lahir_ayah" => $request->tmp_lahir_ayah,
                "tgl_lahir_ayah" => $request->tgl_lahir_ayah,
                "telp_ayah" => $request->telp_ayah,
                "alamat_ayah" => $request->alamat_ayah,
                "pekerjaan_ayah" => $request->pekerjaan_ayah,
                "penghasilan_ayah" => $request->penghasilan_ayah,
                "alamat_kantor_ayah" => $request->alamat_kantor_ayah,
                "pendidikan_ayah" => $request->pendidikan_ayah,
                "agama_ayah" => $request->agama_ayah,

                "nama_ibu" => $request->nama_ibu,
                "tmp_lahir_ibu" => $request->tmp_lahir_ibu,
                "tgl_lahir_ibu" => $request->tgl_lahir_ibu,
                "telp_ibu" => $request->telp_ibu,
                "alamat_ibu" => $request->alamat_ibu,
                "pekerjaan_ibu" => $request->pekerjaan_ibu,
                "penghasilan_ibu" => $request->penghasilan_ibu,
                "alamat_kantor_ibu" => $request->alamat_kantor_ibu,
                "pendidikan_ibu" => $request->pendidikan_ibu,
                "agama_ibu" => $request->agama_ibu,

                "scan_ktp_ayah" => $ktpAyahDir ?? $request->ktp_ayah,
                "scan_ktp_ibu" => $ktpIbuDir ?? $request->ktp_ibu,
                "scan_kk" => $kkDir ?? $request->kk,
            ]);

            $anak = new Anak();
            $anak->user_id = $user->id;
            $anak->nama = $request->nama_anak;
            $anak->username = $request->username;
            $anak->jk = $request->jk_anak;
            $anak->anak_ke = $request->anak_ke;
            $anak->tmp_lahir = $request->tmp_lahir_anak;
            $anak->tgl_lahir = $request->tgl_lahir_anak;
            $anak->alamat = $request->alamat_anak;
            $anak->jarak = $request->jarak;
            $anak->sosialisasi_dengan_lingkungan = $request->sosialisasi_dengan_lingkungan;
            $anak->sakit_yang_pernah_diderita = $request->sakit_yang_pernah_diderita;
            $anak->makanan_yang_disukai = $request->makanan_yang_disukai;
            $anak->makanan_yang_tidak_disukai = $request->makanan_yang_tidak_disukai;
            $anak->alergi = $request->memiliki_alergi;
            $anak->isAntarJemput = $request->isLaundry ? 1 : 0;
            $anak->isLaundry = $request->isAntarJemput ? 1 : 0;
            $anak->scan_akte = $akteDir ?? $request->scan_akte_anak;
            $anak->paket_id = $request->paket_id;
            $anak->status = 'Pending';
            $anak->save();

            $paket = Paket::where('id', $request->paket_id)->first();
                
            $invoice = new Invoice();
            $invoice->nomor = $this->getNomor();
            $invoice->tgl = Carbon::now();
            $invoice->user_id = $user->id;
            $invoice->anak_id = $anak->id;
            $invoice->uid = uniqid();
            $invoice->metode = 'Transfer';
            $invoice->status = 'paid';
            $invoice->tgl_tempo = Carbon::now()->addDays(7);
            $invoice->total = $paket->pembangunan + $paket->pendaftaran + $paket->spp;
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

            $pdfData = Invoice::with(['user','detail'])->where('id', $invoice->id)
            ->first();
    
            $invoiceFile = PDF::loadView('pdf.invoice', [
                'data' => $pdfData,
            ], [ ], [
                'format' => 'A4-P'
            ]);
    
            Notification::route('mail', $user->email)
            ->notify(new RegisterNotification($invoiceFile->output(), $pdfData));

        }catch(\QueryException $e){
            DB::rollback();
            return back();
        }
        DB::commit();
        return Inertia::location('https://app.sandbox.midtrans.com/snap/v4/redirection/'. $snapToken);
    }

    
    public function anakStore(Request $request)
    {
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
                $data->paket_id = $request->paket_id;
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

                $pdfData = Invoice::with(['user','detail'])->where('id', $invoice->id)
                ->first();
        
                $invoiceFile = PDF::loadView('pdf.invoice', [
                    'data' => $pdfData,
                ], [ ], [
                    'format' => 'A4-P'
                ]);
        
                Notification::route('mail', $user->email)
                ->notify(new RegisterNotification($invoiceFile->output(), $pdfData));
                
            }catch(\QueryException $e){
                DB::rollback();
                return back();
            }
            DB::commit();

            return Inertia::location('https://app.sandbox.midtrans.com/snap/v4/redirection/'. $snapToken);
        }
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
