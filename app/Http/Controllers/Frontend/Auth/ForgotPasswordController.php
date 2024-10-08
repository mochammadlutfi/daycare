<?php

namespace App\Http\Controllers\Frontend\Auth;

use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class ForgotPasswordController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset emails and
    | includes a trait which assists in sending these notifications from
    | your application to your users. Feel free to explore this trait.
    |
    */

    use SendsPasswordResetEmails;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    
    public function showLinkRequestForm(Request $request)
    {
        return Inertia::render('Auth/Passwords/Email');
    }

    public function sendResetLinkEmail(Request $request)
    {
        if($this->checkEmail($request->email))
        {
            $rules = [
                'email' => 'required|exists:users',
            ];
        }else{
            $rules = [
                'email' => 'required|exists:users,username',
            ];
        }

        $pesan = [
            'email.required' => 'Username/Email Wajib Diisi!',
            'email.exists' => 'Username/Email Tidak Terdaftar!',
        ];

        $validator = Validator::make($request->all(), $rules, $pesan);
        if ($validator->fails()){
            return back()->withErrors($validator->errors());
        }else{
            if($this->checkEmail($request->email))
            {
                $email = $request->only('email');
            }else{
                $user = User::where('username', $request->email)->first();
                $email = array(
                    'email' => $user->email
                );
            }
            $send = Password::sendResetLink($email);
            if($send){
                return redirect()->route('login')->with('message', 'Email Reset Password Berhasil Dikirim');
            }else{
                return redirect()->route('login')->with('message', 'Email Reset Password Gagal Dikirim');
            }
        }
    }

    private function checkEmail($email) {
        $find1 = strpos($email, '@');
        $find2 = strpos($email, '.');
        return ($find1 !== false && $find2 !== false && $find2 > $find1);
     }

}
