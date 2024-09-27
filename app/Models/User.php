<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;
use Laravel\Sanctum\HasApiTokens;
use App\Notifications\VerifyEmail;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasFactory, Notifiable, HasRoles, HasApiTokens;
    

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [ 
        'name', 'username', 'phone', 'email', 'password'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    
    protected $appends = [
        // 'avatar_url',
    ];

    public function getAvatarAttribute($value)
    {
        if($this->attributes['avatar']){
            return $this->attributes['avatar'];
        }else{
            return '/media/placeholder/avatar.jpg';
        }
    }

    /**
     * Get all of the posts that are assigned this tag.
     */
    public function anak()
    {
        return $this->hasOne(Anak::class, 'user_id');
    }
    
    public function detail()
    {
        return $this->hasOne(UserDetail::class, 'user_id');
    }

    public function invoice()
    {
        return $this->hasMany(Invoice::class, 'user_id');
    }

    
    public function sendEmailVerificationNotification()
    {
        $this->notify(new VerifyEmail); // Use your custom notification
    }
}
