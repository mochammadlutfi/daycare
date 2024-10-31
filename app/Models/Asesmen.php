<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Asesmen extends Model
{
    protected $table = 'asesmen';
    protected $primaryKey = 'id';

    protected $fillable = [
        'id', 'nama', 'usia'
    ];
    
    public function anak()
    {
        return $this->belongsTo(Anak::class, 'anak_id');
    }

    public function nilai()
    {
        return $this->hasMany(AsesmenNilai::class, 'asesmen_id');
    }

    public function foto()
    {
        return $this->hasMany(AsesmenFoto::class, 'asesmen_id');
    }
}
