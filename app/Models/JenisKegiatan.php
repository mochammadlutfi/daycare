<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JenisKegiatan extends Model
{
    protected $table = 'jenis_kegiatan';
    protected $primaryKey = 'id';

    protected $fillable = [
        'id', 'nama',
    ];
    
    public function kegiatan()
    {
        return $this->hasMany(Kegiatan::class, 'jenis_id');
    }

}
