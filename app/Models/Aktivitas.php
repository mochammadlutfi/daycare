<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AntarJemput extends Model
{
    protected $table = 'antarjemput';
    protected $primaryKey = 'id';

    protected $fillable = [
        'id', 'name',
    ];
    
    public function foto()
    {
        return $this->hasMany(AktivitasFoto::class, 'aktivitas_id');
    }
    
    public function kelompok()
    {
        return $this->belongsTo(Kelompok::class, 'kelompok_id');
    }
    
    public function admin()
    {
        return $this->belongsTo(Admin::class, 'admin_id');
    }

    public function jenis()
    {
        return $this->belongsTo(JenisKegiatan::class, 'jenis_id');
    }

    public function kegiatan()
    {
        return $this->belongsTo(Kegiatan::class, 'kegiatan_id');
    }
    
}
