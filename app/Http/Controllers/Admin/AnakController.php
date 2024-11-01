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

        $value = Anak::with(['user' => function($q){
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
        $rules = [
            'nama' => 'required',
            'username' => 'required',
            'jk' => 'required',
            'tmp_lahir' => 'required',
            'tgl_lahir' => 'required',
            'alamat' => 'required',
            'jarak' => 'required',
            'sosialisasi_dengan_lingkungan' => 'required',
        ];

        $pesan = [
            'nama.required' => 'Nama Lengkap Wajib Diisi!',
            'username.required' => 'Nama Panggilan Wajib Diisi!',
            'jk.required' => 'Jenis Kelamin Wajib Diisi!',
            'tmp_lahir.required' => 'Tempat Lahir Wajib Diisi!',
            'tgl_lahir.required' => 'Tanggal Lahir Wajib Diisi!',
            'alamat.required' => 'Alamat Lengkap Wajib Diisi!',
            'jarak.required' => 'Jarak Rumah Wajib Diisi!',
            'sosialisasi_dengan_lingkungan.required' => 'Sosialisasi dengan lingkungan Ke Wajib Diisi!',
        ];

        $validator =  Validator::make($request->all(), $rules, $pesan);
        if ($validator->fails()){
            return back()->withErrors($validator->errors());
        }else{
            DB::beginTransaction();
            try{
                
                $data = Anak::where('id', $id)->first();
                $data->username = $request->username;
                $data->nama = $request->nama;
                $data->jk = $request->jk;
                $data->tgl_lahir = Carbon::parse($request->tgl_lahir)->format('Y-m-d');
                $data->tmp_lahir = $request->tmp_lahir;
                $data->alamat = $request->alamat;
                $data->anak_ke = $request->anak_ke;
                $data->jarak = $request->jarak;
                $data->sosialisasi_dengan_lingkungan = $request->sosialisasi_dengan_lingkungan;
                $data->sakit_yang_pernah_diderita = $request->sakit_yang_pernah_diderita;
                $data->makanan_yang_disukai = $request->makanan_yang_disukai;
                $data->makanan_yang_tidak_disukai = $request->makanan_yang_tidak_disukai;
                $data->alergi = $request->alergi;
                $data->scan_akte = $request->scan_akte;
                $data->isAntarJemput = $request->isAntarJemput;
                $data->isLaundry = $request->isLaundry;
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
        
    }
}
