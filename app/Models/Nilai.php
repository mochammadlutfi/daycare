<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Nilai extends Model
{
    protected $table = 'nilai';
    protected $primaryKey = 'id';

    protected $fillable = [
        'id', 'name',
    ];
    
    public function detail()
    {
        return $this->hasMany(NilaiDetail::class, 'nilai_id');
    }
    
    public function kelompok()
    {
        return $this->belongsTO(Kelompok::class, 'kelompok_id');
    }
    
    public function admin()
    {
        return $this->belongsTO(Admin::class, 'admin_id');
    }

    public function jenis()
    {
        return $this->belongsTO(JenisKegiatan::class, 'jenis_id');
    }

    public function kegiatan()
    {
        return $this->belongsTO(Kegiatan::class, 'kegiatan_id');
    }
    
}
