<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RPPHLine extends Model
{
    protected $table = 'rpph_line';
    protected $primaryKey = 'id';

    protected $fillable = [
        'id', 'nama', 'usia'
    ];
    
}
