<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Anak extends Model
{
    use HasFactory;
 
    protected $table = 'anak';
    protected $primaryKey = 'id';

    protected $fillable = [
        'id', 'name',
    ];
    
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    
    public function kelompok()
    {
        return $this->belongsTo(Kelompok::class, 'kelompok_id');
    }

    public function invoice()
    {
        return $this->hasMany(Invoice::class, 'anak_id');
    }

    

    public function invoice_last()
    {
        return $this->hasMany(Invoice::class, 'anak_id')->latest()->first();
    }
    
}
