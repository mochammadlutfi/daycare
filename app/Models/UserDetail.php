<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class UserDetail extends Model
{
    use HasFactory;

    protected $table = 'user_detail';
    protected $primaryKey = 'id';

    protected $fillable = [
        'user_id', 'nama_ayah', 'tmp_lahir_ayah', 'tgl_lahir_ayah', 'telp_ayah', 'alamat_ayah', 'pekerjaan_ayah', 'penghasilan_ayah', 'alamat_kantor_ayah', 'pendidikan_ayah', 'agama_ayah', 'nama_ibu', 'tmp_lahir_ibu', 'tgl_lahir_ibu', 'telp_ibu', 'alamat_ibu', 'pekerjaan_ibu', 'penghasilan_ibu', 'alamat_kantor_ibu', 'pendidikan_ibu', 'agama_ibu', 'scan_ktp_ayah', 'scan_ktp_ibu', 'scan_kk'
    ];

    public function user(){
        return $this->belongsTo(User::class, 'user_id');
    }

}
