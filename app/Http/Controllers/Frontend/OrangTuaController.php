<?php

namespace App\Http\Controllers\Frontend;


use App\Models\UserDetail;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Storage;
class OrangTuaController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware(['auth']);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index(Request $request)
    {
        $user_id = auth()->guard('web')->user()->id;

        $value = UserDetail::where('user_id', $user_id)->first();

        return Inertia::render('Register/Wali',[
            'value' => $value,
            'editMode' => $value ? true : false
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
        $rules = [
            'nama_ayah' => 'required',
            'tmp_lahir_ayah' => 'required',
            'tgl_lahir_ayah' => 'required',
            'telp_ayah' => 'required',
            'alamat_ayah' => 'required',
            'pekerjaan_ayah' => 'required',
            'penghasilan_ayah' => 'required',
            'alamat_kantor_ayah' => 'required',
            'agama_ayah' => 'required',
            'pendidikan_ayah' => 'required',
            'nama_ibu' => 'required',
            'tmp_lahir_ibu' => 'required',
            'tgl_lahir_ibu' => 'required',
            'telp_ibu' => 'required',
            'alamat_ibu' => 'required',
            'pekerjaan_ibu' => 'required',
            'penghasilan_ibu' => 'required',
            'alamat_kantor_ibu' => 'required',
            'agama_ibu' => 'required',
            'pendidikan_ibu' => 'required',
        ];

        $pesan = [
            'nama_ayah.required' => 'Nama ayah tidak boleh kosong',
            'tmp_lahir_ayah.required' => 'Tempat lahir ayah tidak boleh kosong',
            'tgl_lahir_ayah.required' => 'Tanggal lahir ayah tidak boleh kosong',
            'telp_ayah.required' => 'Telepon ayah tidak boleh kosong',
            'alamat_ayah.required' => 'Alamat ayah tidak boleh kosong',
            'pekerjaan_ayah.required' => 'Pekerjaan ayah tidak boleh kosong',
            'penghasilan_ayah.required' => 'Penghasilan ayah tidak boleh kosong',
            'alamat_kantor_ayah.required' => 'Alamat kantor ayah tidak boleh kosong',
            'agama_ayah.required' => 'Agama ayah tidak boleh kosong',
            'pendidikan_ayah.required' => 'Pendidikan ayah tidak boleh kosong',
            'nama_ibu.required' => 'Nama ibu tidak boleh kosong',
            'tmp_lahir_ibu.required' => 'Tempat lahir ibu tidak boleh kosong',
            'tgl_lahir_ibu.required' => 'Tanggal lahir ibu tidak boleh kosong',
            'telp_ibu.required' => 'Telepon ibu tidak boleh kosong',
            'alamat_ibu.required' => 'Alamat ibu tidak boleh kosong',
            'pekerjaan_ibu.required' => 'Pekerjaan ibu tidak boleh kosong',
            'penghasilan_ibu.required' => 'Penghasilan ibu tidak boleh kosong',
            'alamat_kantor_ibu.required' => 'Alamat kantor ibu tidak boleh kosong',
            'agama_ibu.required' => 'Agama ibu tidak boleh kosong',
            'pendidikan_ibu.required' => 'Pendidikan ibu tidak boleh kosong',
        ];        

        $validator = Validator::make($request->all(), $rules, $pesan);
        if ($validator->fails()){
            if($request->axios){
                return response()->json([
                    'errors' => $validator->errors(),
                    'fail' => true,
                ], 200);
            }
            return back()->withErrors($validator->errors());
            
        }else{
            DB::beginTransaction();
            try{

                $user = auth()->guard('web')->user();

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
    
                    "scan_ktp_ayah" => $ktpAyahDir ?? $request->scan_ktp_ayah,
                    "scan_ktp_ibu" => $ktpIbuDir ?? $request->scan_ktp_ayah,
                    "scan_kk" => $kkDir ?? $request->scan_kk,
                ]);

            }catch(\QueryException $e){
                DB::rollback();
                return back();
            }
            DB::commit();
            if($request->axios){
                return response()->json([
                    'data' => $data,
                    'fail' => false,
                ], 200);
            }
            return redirect()->route('user.orangtua.index');
        }
    }

        /**
     * Store a newly created resource in storage.
     * @param Request $request
     * @return Renderable
     */
    public function update(Request $request)
    {
        $rules = [
            'name' => 'required',
            'reciever' => 'required',
            'phone' => 'required',
            'reciever' => 'required',
            'area_id' => 'required',
            'address' => 'required',
        ];

        $pesan = [
            'name.required' => 'Label Alamat Wajib Diisi!',
            'reciever.required' => 'Nama Penerima Wajib Diisi!',
            'phone.required' => 'No Handphone Penerima Wajib Diisi!',
            'area_id.required' => 'Wilayah Wajib Diisi!',
            'address.required' => 'Alamat Lengkap Wajib Diisi!',
        ];

        $validator = Validator::make($request->all(), $rules, $pesan);
        if ($validator->fails()){
            return back()->withErrors($validator->errors());
        }else{
            DB::beginTransaction();
            try{
                    $data = UserAddress::find($request->id);
                    $data->user_id = auth()->guard('web')->user()->id;
                    $data->name = $request->name;
                    $data->reciever = $request->reciever;
                    $data->phone = $request->phone;
                    $data->area_id = $request->area_id;
                    $data->area_text = $request->area_text;
                    $data->address = $request->address;
                    $data->postal_code = $request->postal_code;
                    $data->save();

            }catch(\QueryException $e){
                DB::rollback();
                return back();
            }
            DB::commit();
            return redirect()->route('user.address.index');
        }
    }
    
    public function data(Request $request)
    {
        $search = $request->search;

        $user_id = auth()->guard('web')->user()->id;
        $data = UserAddress::where('user_id', $user_id)->orderBy('is_primary', 'DESC')
        ->when($search, function($query, $search){
            $query->where('name', 'LIKE', '%' . $search . '%')
            ->orWhere('address', 'LIKE', '%' . $search . '%')
            ->orWhere('reciever', 'LIKE', '%' . $search . '%')
            ->orWhere('phone', 'LIKE', '%' . $search . '%')
            ->orWhere('area_text', 'LIKE', '%' . $search . '%');
        })
        ->get();

        if($data){
            return response()->json([
                'data' => $data,
                'fail' => false,
            ], 200);
        }else{
            return response()->json([
                'message' => "Address Not Found",
                'fail' => false,
            ], 400);
        }
    }

    public function main(Request $request)
    {
        $id = $request->id;
        DB::beginTransaction();
        try{
            $user_id = auth()->guard('web')->user()->id;
            $default = UserAddress::where('user_id', $user_id)->update(['is_primary' => 0]);
    
            $primary = UserAddress::where('user_id', $user_id)->where('id', $id)->update(['is_primary' => 1]);

        }catch(\QueryException $e){
            DB::rollback();
            return back();
        }
        DB::commit();
        return redirect()->route('user.address.index');
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
            $hapus_db = UserAddress::destroy($id);
        }catch(\QueryException $e){
            DB::rollback();
            return back();
        }
        DB::commit();
        return redirect()->route('user.address.index');
    }
}
