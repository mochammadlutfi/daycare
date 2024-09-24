<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Jadwal extends Model
{
    protected $table = 'jadwal';
    protected $primaryKey = 'id';

    protected $fillable = [
        'id', 'name',
    ];

    public function kelompok()
    {
        return $this->belongsTO(Kelompok::class, 'kelompok_id');
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
