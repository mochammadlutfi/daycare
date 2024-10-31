<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AsesmenAwal extends Model
{
    protected $table = 'asesmen_awal';
    protected $primaryKey = 'id';

    protected $fillable = [
        'id', 'nama', 'usia'
    ];
    
    public function anak()
    {
        return $this->hasMany(Anak::class, 'paket_id');
    }
}
