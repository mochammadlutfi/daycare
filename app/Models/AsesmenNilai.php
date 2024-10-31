<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AsesmenNilai extends Model
{
    protected $table = 'asesmen_nilai';
    protected $primaryKey = 'id';

    protected $fillable = [
        'id', 'nama', 'usia'
    ];
    
    public function asesmen()
    {
        return $this->belongsTo(Asesmen::class, 'asesmen_id');
    }

    public function line()
    {
        return $this->belongsTo(RPPHLine::class, 'rpph_line_id');
    }
}
