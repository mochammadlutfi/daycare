<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AktivitasFoto extends Model
{
    protected $table = 'aktivitas_foto';
    protected $primaryKey = 'id';

    protected $fillable = [
        'id', 'name',
    ];
    
    public function aktivitas()
    {
        return $this->belongsTo(Aktivitas::class, 'aktivitas_id');
    }
}
