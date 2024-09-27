<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AntarJemputFoto extends Model
{
    protected $table = 'antarjemput_foto';
    protected $primaryKey = 'id';

    protected $fillable = [
        'id', 'name',
    ];
    
    public function antarjemput()
    {
        return $this->belongsTo(AntarJemput::class, 'antarjemput_id');
    }
}
