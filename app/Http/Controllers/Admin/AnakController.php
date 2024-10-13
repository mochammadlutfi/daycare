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
use Intervention\Image\ImageManagerStatic;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Storage;

use App\Models\User;
use App\Models\Anak;

use PDF;
use Excel;
use App\Exports\AnakExport;
use App\Models\Invoice;
class AnakController extends Controller
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
        return Inertia::render('Anak/Index');
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

        return Inertia::render('Anak/Show', [
            'data' => $data,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     * @param int $id
     * @return Renderable
     */
    public function edit($id)
    {

        $value = Dukungan::with(['user' => function($q){
            return $q->with('detail');
        }, 'kelompok'
        ])
        ->where('id', $id)->first();

        return Inertia::render('Anak/Form',[
            'editMode' => true,
            'value' => $value
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
        $validator = $this->validate($request->all(), true);
        if ($validator->fails()){
            return back()->withErrors($validator->errors());
        }else{
            DB::beginTransaction();
            try{
                
                $data = Dukungan::where('id', $id)->first();
                $data->nik = $request->nik;
                $data->nama = $request->nama;
                $data->jk = ($request->jk == 'Laki-Laki') ? 'L' : 'P';
                $data->tgl_lahir = Carbon::parse($request->tglLahir)->format('Y-m-d');
                $data->tmp_lahir = $request->tmpLahir;
                $data->alamat = $request->alamat;
                $data->tps = $request->tps;
                $data->rt = $request->rt;
                $data->rw = $request->rw;
                $data->kota_id = $request->kota_id;
                $data->kecamatan_id = $request->kecamatan_id;
                $data->kelurahan_id = $request->kelurahan_id;
                $data->email = $request->email;
                $data->phone = $request->phone;
                $data->ref = $request->ref;
                $data->user_id = $request->user_id;

                if($request->hasFile('image')){
                    if($data->image){
                        if(Storage::disk('public')->exists($data->image)){
                            Storage::disk('public')->delete($data->image);
                        }
                    }
                    $data->image = $this->uploadImage($request->file('image'), $user_id);
                }
                
                if($request->hasFile('ktp')){
                    if($data->ktp){
                        if(Storage::disk('public')->exists($data->ktp)){
                            Storage::disk('public')->delete($data->ktp);
                        }
                    }
                    $data->ktp = $this->uploadImage($request->file('ktp'), $user_id, 'ktp');
                }

                $data->save();

            }catch(\QueryException $e){
                DB::rollback();
                dd($e);
            }

            DB::commit();
            return redirect()->route('admin.dukungan.show', $id);
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

    public function report(Request $request)
    {
        $kelompok = $request->kelompok;
        $paket = $request->paket;

        return Excel::download(new AnakExport($kelompok, $paket), 'Data Anak.xlsx');
    }

    public function data(Request $request)
    {
        $sort = !empty($request->sort) ? $request->sort : 'id';
        $sortDir = !empty($request->sortDir) ? $request->sortDir : 'desc';
        
        $elq = Anak::with(['user' => function($q){
            return $q->with('detail');
        }, 'kelompok'])
        ->when($request->q, function($query, $search){
            $query->where('nama', 'LIKE', '%' . $search . '%');
        })
        ->when($request->kelompok_id, function($query, $kelompok_id){
            $query->where('kelompok_id', '=',$kelompok_id);
        })
        ->when($request->laundry == 'true', function($query, $laundry){
            $query->where('isLaundry', '=', 1);
        })
        ->when($request->anjem == 'true', function($query, $jemput){
            $query->where('isAntarJemput', '=', 1);
        })
        ->where('status', 'Aktif')
        ->orderBy($sort, $sortDir);

        if($request->limit){
            $data = $elq->paginate($request->limit);
        }else{
            $data = $elq->get();
        }

        return response()->json($data);
    }

    public function foto($id, Request $request)
    {
        // dd($request->all());
        $anak = Anak::where('id', $id)->first();
        if($request->type == 'upload'){
            $image = $request->file('image');
            $imgFile = Image::make($image->getRealPath())->resize(800, 800);
    
            $filePath = 'anak/' . time() . '.' . $image->getClientOriginalExtension();
            Storage::disk('public')->put($filePath, (string) $imgFile->encode());
    
            $anak->image = '/uploads/'.$filePath;
        }else{
            if(Storage::disk('public')->exists($anak->image)){
                Storage::disk('public')->delete($anak->image);
            }
            $anak->image = null;
        }

        $anak->save();

        return redirect()->route('admin.anak.show', $id);
    }

    
    
    public function spp($id)
    {
        $invoices = Invoice::with(['user','detail'])->where('anak_id', $id)
        ->get();

        $anak = Anak::with(['user' => function($q){
            return $q->with('detail');
        }, 'kelompok'
        ])
        ->where('id', $id)->first();

        $firstInvoiceMonth = Carbon::parse($invoices->first()->tgl)->month;
        $firstInvoiceYear = Carbon::parse($invoices->first()->tgl)->year;
    
        $months = collect();
        for ($i = 0; $i < 12; $i++) {
            $months->push(Carbon::create($firstInvoiceYear, $firstInvoiceMonth)->addMonths($i));
        }

        $monthlyReport = $months->map(function ($month) use ($invoices) {
            $monthlyInvoices = $invoices->filter(function ($invoice) use ($month) {
                return Carbon::parse($invoice->payment_date)->format('Y-m') == $month->format('Y-m');
            });
    
            return [
                'month' => $month->translatedFormat('F Y'),
                'invoices' => $monthlyInvoices->isEmpty() ? 
                [['nomor' => '-', 'tgl' => '-', 'metode' => '-', 'total' => '-']] : 
                $monthlyInvoices->map(function ($invoice) {
                    return [
                        'nomor' => $invoice->nomor,
                        'tgl' => $invoice->tgl,
                        'metode' => $invoice->metode,
                        'total' => $invoice->total,
                    ];
                })
            ];
        });
        // dd($monthlyReport);
        $pdf = PDF::loadView('pdf.spp', [
            'data' => $monthlyReport,
            'anak' => $anak,
        ], [ ], [
            'default_font_size'  => '7',
            'format'          => 'A6',
            'margin_left'     => 5,
            'margin_right'    => 5,
            'margin_top'      => 5,
            'margin_bottom'   => 5,
        ]);

        return $pdf->stream('Kartu SPP.pdf');
    }

    public function kartu($id)
    {
        $anak = Anak::where('id', $id)->first();

        $qrCode = base64_encode(QrCode::format('png')->size(120)->generate($anak->id));
        $qrCodeImage = Image::make(base64_decode($qrCode));

        $backgroundPath = asset('/images/card-bg.png');
        $img = ImageManagerStatic::make($backgroundPath)->resize(400, 600);

        // Insert User Image into Base ID Card
        $anakImage = $anak->image ?? '/images/avatar.png';

        $userImage = ImageManagerStatic::make(asset($anakImage))->resize(113, 113);
        $img->insert($userImage, 'top-left', 145, 184);

        // Insert QR Code into Base ID Card
        $img->insert($qrCode, 'bottom-center', 125, 80);

        // Add Text
        $img->text($anak->nama, 200, 350, function($font) {
            $font->file(base_path('resources/fonts/OpenSans/OpenSans-Bold.ttf'));
            $font->size(24);
            $font->color('#000');
            $font->align('center');
            $font->valign('bottom');
        });
        
        $img->text("ID: $anak->id", 200, 370, function($font) {
            $font->file(base_path('resources/fonts/OpenSans/OpenSans-Bold.ttf'));
            $font->size(18);
            $font->color('#000');
            $font->align('center');
            $font->valign('bottom');
        });

        return $img->response('png');
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
