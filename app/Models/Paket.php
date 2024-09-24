<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Paket extends Model
{
    protected $table = 'paket';
    protected $primaryKey = 'id';

    protected $fillable = [
        'id', 'nama', 'usia'
    ];
    
}
