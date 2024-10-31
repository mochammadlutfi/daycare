<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AsesmenSumatif extends Model
{
    protected $table = 'asesmen_sumatif';
    protected $primaryKey = 'id';

    protected $fillable = [
        'id', 'nama', 'usia'
    ];
    
    public function rpph()
    {
        return $this->belongsTo(RPPHLine::class, 'rpph_line_id');
    }
    
    public function line()
    {
        return $this->belongsTo(RPPHLine::class, 'rpph_line_id');
    }
}
