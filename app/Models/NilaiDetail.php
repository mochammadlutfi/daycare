<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NilaiDetail extends Model
{
    protected $table = 'nilai_detail';
    protected $primaryKey = 'id';

    protected $fillable = [
        'id', 'name',
    ];
    
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    
    public function anak()
    {
        return $this->belongsTo(Anak::class, 'anak_id');
    }
}
