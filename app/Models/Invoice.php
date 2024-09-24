<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    protected $table = 'invoice';
    protected $primaryKey = 'id';

    protected $fillable = [
        'id', 'name',
    ];
    
    
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    
    public function anak()
    {
        return $this->belongsTo(Anak::class, 'anak_id');
    }
    
    public function detail()
    {
        return $this->hasMany(InvoiceDetail::class, 'invoice_id');
    }
    
}
