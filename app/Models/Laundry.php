<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Laundry extends Model
{
    protected $table = 'laundry';
    protected $primaryKey = 'id';

    protected $fillable = [
        'id', 'name',
    ];
    
    public function detail()
    {
        return $this->hasMany(LaundryDetail::class, 'laundry_id');
    }
    
    public function kelompok()
    {
        return $this->belongsTO(Kelompok::class, 'kelompok_id');
    }
    
    public function admin()
    {
        return $this->belongsTO(Admin::class, 'admin_id');
    }

    public function anak()
    {
        return $this->belongsTO(Anak::class, 'anak_id');
    }

    public function kegiatan()
    {
        return $this->belongsTO(Kegiatan::class, 'kegiatan_id');
    }


    public function getTotalAttribute($value)
    {
        return $this->detail()->sum('berat');
    }
    
}
