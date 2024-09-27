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

    protected $appends = [
        'foto_list'
    ];
    
    public function foto()
    {
        return $this->hasMany(AntarJemputFoto::class, 'antarjemput_id');
    }
    
    public function kelompok()
    {
        return $this->belongsTo(Kelompok::class, 'kelompok_id');
    }
    
    public function admin()
    {
        return $this->belongsTo(Admin::class, 'admin_id');
    }

    public function anak()
    {
        return $this->belongsTo(Anak::class, 'anak_id');
    }

    public function getFotoListAttribute($value)
    {
        return $this->hasMany(AntarJemputFoto::class, 'antarjemput_id')->get()->pluck('path');
    }
    
}
