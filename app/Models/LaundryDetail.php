<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LaundryDetail extends Model
{
    protected $table = 'laundry_detail';
    protected $primaryKey = 'id';

    protected $fillable = [
        'id', 'name',
    ];
    
    public function laundry()
    {
        return $this->belongsTo(Laundry::class, 'laundry_id');
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
