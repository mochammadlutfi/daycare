<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kegiatan extends Model
{
    protected $table = 'kegiatan';
    protected $primaryKey = 'id';

    protected $fillable = [
        'id', 'nama',
    ];
    
    public function jenis()
    {
        return $this->belongsTo(JenisKegiatan::class, 'jenis_id');
    }

}
