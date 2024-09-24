<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kelompok extends Model
{
    protected $table = 'kelompok';
    protected $primaryKey = 'id';

    protected $fillable = [
        'id', 'name',
    ];
    
    public function anak()
    {
        return $this->hasMany(Anak::class, 'kelompok_id');
    }


    public function admin()
    {
        return $this->belongsTo(Admin::class, 'admin_id');
    }
}
