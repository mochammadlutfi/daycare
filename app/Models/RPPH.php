<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
class RPPH extends Model
{
    protected $table = 'rpph';
    protected $primaryKey = 'id';

    protected $fillable = [
        'id', 'nama', 'usia'
    ];

    protected $appends = [
        'durasi'
    ];
    
    public function detail()
    {
        return $this->hasMany(RPPHLine::class, 'rpph_id');
    }
    
    public function asesmen()
    {
        return $this->hasMany(Asesmen::class, 'rpph_id');
    }
    
    public function asesmen_awal()
    {
        return $this->hasMany(AsesmenAwal::class, 'rpph_id');
    }

    public function asesmen_sumatif()
    {
        return $this->hasMany(AsesmenSumatif::class, 'rpph_id');
    }
    
    public function kelompok()
    {
        return $this->belongsTO(Kelompok::class, 'kelompok_id');
    }
    
    public function admin()
    {
        return $this->belongsTO(Admin::class, 'admin_id');
    }

    
    public function getKegiatanAttribute($value)
    {
        if($this->attributes['kegiatan']){
            return json_decode($this->attributes['kegiatan']);
        }else{
            return [];
        }
    }

    public function getDurasiAttribute($value)
    {
        if($this->attributes['tgl_mulai'] && $this->attributes['tgl_selesai']){
            $date1 = Carbon::parse($this->attributes['tgl_mulai']);
            $date2 = Carbon::parse($this->attributes['tgl_selesai']);
            
            // Calculate the difference in days
            $daysDifference = $date2->diffInDays($date1);

            return $daysDifference. ' Hari';
        }else{
            return '-';
        }
    }
}
