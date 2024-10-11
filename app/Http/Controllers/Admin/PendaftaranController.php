<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Inertia\Inertia;
use Auth;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;
use Image;
use Storage;
use Illuminate\Support\Str;


use App\Models\User;
use App\Models\UserDetail;
use App\Models\Anak;
use App\Models\Invoice;
use App\Models\InvoiceDetail;
use App\Models\paket;
class PendaftaranController extends Controller
{

    /**
     * Create a new controller instance.
     *
     * @return void 
     */
    public function __construct() {
        $this->middleware('auth:admin');
    }

    /**
     * Display a listing of the resource.
     * @return Renderable
     */
    public function index(Request $request)
    {
        return Inertia::render('Pendaftaran/Index');
    }

    /**
     * Show the form for creating a new resource.
     * @return Renderable
     */
    public function create()
    {
        $user = auth()->guard('web')->user();

        $biaya = collect([
            'denda' => (int)settings()->get('denda') ?? 0,
            'laundry' => (int)settings()->get('laundry') ?? 0,
            'antar_jemput' => (int)settings()->get('antar_jemput') ?? 0,
        ]);

        $paket = Paket::orderBy('id', 'ASC')->get();

        return Inertia::render('Pendaftaran/Form',[
            // 'value' => $data,
            'biaya' => $biaya,
            'paket' => $paket,
            // 'editMode' => $data ? true : false,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     * @param Request $request
     * @return Renderable
     */
    public function store(Request $request)
    {
        // dd($request->all());


        // $validator = $this->validate($request->all());
        // if ($validator->fails()){
        //     return back()->withErrors($validator->errors());
        // }else{
            DB::beginTransaction();
            try{

                if($request->has_account == "0"){
                    $user = new User();
                    $user->nama = $request->nama_akun;
                    $user->email = $request->email_akun;
                    $user->password = Hash::make($request->password_akun);
                    $user->save();
                }else{
                    $user = User::where('id', $request->akun_id)->first();
                }
                
                $ktpAyahDir = null;
                $ktpIbuDir = null;
                $kkDir = null;
                $akteAnakDir = null;
    
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
                    $akteAnakDir = 'scan/' . Str::random(32) . '.' . $request->file('scan_akte_anak')->getClientOriginalExtension();
                    $directory = Storage::disk('public')->put($kkDir, fopen($request->file('scan_akte_anak'), 'r+'));
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
                $anak->scan_akte = $akteAnakDir ?? $request->scan_akte_anak;
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
                $invoice->metode = 'Tunai';
                $invoice->status = 'paid';
                $invoice->tgl_tempo = Carbon::now()->addDays(7);
                $invoice->total = $paket->pembangunan + $paket->pendaftaran + $paket->spp;
                $invoice->save();


                $linesData = collect([
                    [
                        'tipe' => 'Pembangunan',
                        'harga' => $paket->pembangunan
                    ],
                    [
                        'tipe' => 'Pendaftaran',
                        'harga' => $paket->pendaftaran
                    ],
                    [
                        'tipe' => 'SPP',
                        'harga' => $paket->spp
                    ]
                ]);

                foreach($linesData as $i){
                    $line = new InvoiceDetail();
                    $line->tipe = $i['tipe'];
                    $line->harga = $i['harga'];
                    $line->qty = 1;
                    $invoice->detail()->save($line);
                }

            }catch(\QueryException $e){
                DB::rollback();
                dd($e);
            }

            DB::commit();
            return redirect()->route('admin.register.index');
        // }
    }

    /**
     * Show the specified resource.
     * @param int $id
     * @return Renderable
     */
    public function show($id)
    {
        $data = Anak::with(['user' => function($q){
            return $q->with('detail');
        }, 'kelompok'
        ])
        ->where('id', $id)->first();

        $invoice = Invoice::with(['user', 'anak', 'detail'])
        ->where('anak_id', $id)->orderBy('id', 'ASC')->first();

        return Inertia::render('Pendaftaran/Show', [
            'data' => $data,
            'invoice' => $invoice
        ]);
    }

    /**
     * Update the specified resource in storage.
     * @param Request $request
     * @param int $id
     * @return Renderable
     */
    public function update(Request $request, $id)
    {
        // dd($request->all());
        if($request->status == 'terima'){
            $rules = [
                'kelompok_id' => 'required',
            ];
        }else{
            $rules = [
                'alasan' => 'required',
            ];
        }

        $pesan = [
            'kelompok_id.required' => 'Kelompok Wajib Diisi!',
            'alasan.required' => 'Alasan Penolakan Wajib Diisi!',
        ];
        $validator = Validator::make($request->all(), $rules, $pesan);
        if ($validator->fails()){
            return back()->withErrors($validator->errors());
        }else{
            DB::beginTransaction();
            try{
                
                $data = Anak::where('id', $id)->first();
                $data->kelompok_id = $request->kelompok_id;
                $data->status = ($request->status == 'terima') ? 'Aktif' : 'Tolak';
                $data->alasan = $request->alasan;
                if($request->status == 'terima'){
                    $data->tgl_terima = Carbon::now();
                }
                $data->save();

            }catch(\QueryException $e){
                DB::rollback();
                dd($e);
            }

            DB::commit();
            return redirect()->route('admin.anak.show', $id);
        }
    }

    /**
     * Remove the specified resource from storage.
     * @param int $id
     * @return Renderable
     */
    public function destroy($id)
    {
        DB::beginTransaction();
        try{
            
            $pdk = Pendukung::find($id);
            $pdk->delete();

        }catch(\QueryException $e){
            DB::rollback();
            return response()->json([
                'fail' => true,
                'errors' => $e,
                'pesan' => 'Error Menhapus Data Pendukung',
            ]);
        }

        DB::commit();
        return redirect()->route('saksi.index');

    }

    public function data(Request $request)
    {
        // dd('wqewq');
        $keyword = $request->q;
        $kota_id = $request->kota;
        $kec_id = $request->kec;
        $kel_id = $request->kel_id;
        
        $sort = !empty($request->sort) ? $request->sort : 'id';
        $sortDir = !empty($request->sortDir) ? $request->sortDir : 'desc';
        $limit = ($request->limit) ? $request->limit : 25;

        $data = Anak::with(['user' => function($q){
            return $q->with('detail');
        }, 'kelompok', 'invoice' => function($q){
            return $q->latest()->first();
        }
        ])
        ->whereHas('invoice')
        ->whereNull('kelompok_id')
        ->where('status','!=' ,'Aktif')
        ->orderBy('id', 'DESC')->paginate($limit);

        return response()->json($data);
    }

    private function uploadImage($file, $kota_id , $type = 'avatar'){

        $file_name = $kota_id. '-' . uniqid() . '.' . $file->getClientOriginalExtension();

        $imgFile = Image::make($file->getRealPath());
        if($type == 'avatar'){
            $destinationPath = storage_path('app/public/'.$kota_id.'/saksi');
            $return = '/uploads/'.$kota_id.'/saksi/'.$file_name;
        }else{
            $destinationPath = storage_path('app/public/'.$kota_id.'/ktp');
            $return = '/uploads/'.$kota_id.'/ktp/'.$file_name;
        }
        if (!file_exists($destinationPath)) {
            mkdir($destinationPath, 755, true);
        }

        if($type == 'avatar'){
            $width = 800;
            $heigth = 800;
        }else{
            $width = 1200;
            $heigth = 337;
        }

        $imgFile->resize($width, $heigth, function ($constraint) {
		    $constraint->aspectRatio();
		})->save($destinationPath.'/'.$file_name, 90);

        return $return;
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

    private function validate($data, $editMode = false){
        
        $rules = [
            'nama' => 'required',
            'ktp' => 'required',
            'jk' => 'required',
            'tmpLahir' => 'required',
            'tglLahir' => 'required',
            'alamat' => 'required',
            'rt' => 'required',
            'rw' => 'required',
            'kota_id' => 'required',
            'kecamatan_id' => 'required',
            'kelurahan_id' => 'required',
        ];

        $pesan = [
            'nama.required' => 'Nama Lengkap Wajib Diisi!',
            'ktp.required' => 'KTP Wajib Diisi!',
            'jk.required' => 'Jenis Kelamin Wajib Diisi!',
            'tmpLahir.required' => 'Tempat Lahir Wajib Diisi!',
            'tglLahir.required' => 'Tanggal Lahir Wajib Diisi!',
            'alamat.required' => 'Alamat Lengkap Wajib Diisi!',
            'rt.required' => 'RT Wajib Diisi!',
            'rw.required' => 'RW Wajib Diisi!',
            'kota_id.required' => 'Kota Wajib Diisi!',
            'kecamatan_id.required' => 'Kecamatan Wajib Diisi!',
            'kelurahan_id.required' => 'Desa/Kelurahan Wajib Diisi!',
            'email.required' => 'Alamat Email Wajib Diisi!',
            'email.unique' => 'Alamat Email Sudah Digunakan!',
        ];
        

        if(!$editMode){
            $rules['username'] = 'required|unique:saksi,username';
            $rules['password'] = 'required';

            $pesan['username.required'] = 'Username Wajib Diisi!';
            $pesan['username.unique'] = 'Username Sudah Digunakan!';
            $pesan['password.required'] = 'Password Wajib Diisi!';
        }

        return Validator::make($data, $rules, $pesan);
    }
}
