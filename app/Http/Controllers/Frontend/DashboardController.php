<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

use App\Models\Landing\Aspirasi;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = auth()->guard('web')->user();

        $data = collect([
            [
                'to' => route('user.anak.index'),
                'icon' => '<i class="fa fa-user-friends fa-2x"></i>',
                'name' => 'Anak',
                'value' => DB::table('anak')->where('user_id', $user->id)->where('status', 'Aktif')->get()->count(),
            ],
            [
                'to' => route('user.invoice.index'),
                'icon' => '<i class="fa fa-wallet fa-2x"></i>',
                'name' => 'Tagihan Invoice',
                'value' => DB::table('invoice')->where('user_id', $user->id)->where('status', 'unpaid')->get()->count(),
            ],
            [
                'to' => route('user.raport.index'),
                'icon' => '<i class="fa fa-wallet fa-2x"></i>',
                'name' => 'Penilaian',
                'value' => DB::table('invoice')->where('user_id', $user->id)->where('status', 'unpaid')->get()->count(),
            ],
        ]);

        return Inertia::render('Dashboard',[
            'data' => $data
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
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
            'nama' => 'required',
            'pekerjaan' => 'required',
            'phone' => 'required',
            'email' => 'required',
            'kota_id' => 'required',
            'kecamatan_id' => 'required',
        ];

        $pesan = [
            'nama.required' => 'Nama Lengkap Wajib Diisi!',
            'pekerjaan.required' => 'Pekerjaan Wajib Diisi!',
            'phone.required' => 'No Handphone Wajib Diisi!',
            'email.required' => 'Alamat Email Wajib Diisi!',
            'kota_id.required' => 'Kota Wajib Diisi!',
            'kecamatan_id.required' => 'Kecamatan Wajib Diisi!',
        ];

        $validator = Validator::make($request->all(), $rules, $pesan);
        if ($validator->fails()){
            return back()->withErrors($validator->errors());
        }else{
            DB::beginTransaction();
            try{
                $data = new Aspirasi();
                $data->nama = $request->nama;
                $data->pekerjaan = $request->pekerjaan;
                $data->phone = $request->phone;
                $data->email = $request->email;
                $data->kota_id = $request->kota_id;
                $data->kec_id = $request->kecamatan_id;
                $data->deskripsi = $request->description;
                $data->save();

            }catch(\QueryException $e){
                DB::rollback();
                return back();
            }
            DB::commit();
            return redirect()->route('home');
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
        //
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
}
