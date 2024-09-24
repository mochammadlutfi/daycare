<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AbsenDetail extends Model
{
    protected $table = 'absen_detail';
    protected $primaryKey = 'id';

    protected $fillable = [
        'id', 'name',
    ];
    
    public function absen()
    {
        return $this->belongsTo(Absen::class, 'absen_id');
    }
    
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    
    public function anak()
    {
        return $this->belongsTo(Anak::class, 'anak_id');
    }
}
