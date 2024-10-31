<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AsesmenFoto extends Model
{
    protected $table = 'asesmen_foto';
    protected $primaryKey = 'id';

    protected $fillable = [
        'id', 'name',
    ];
    
    public function asesmen()
    {
        return $this->belongsTo(Asesmen::class, 'asesmen_id');
    }
}
