<?php


namespace App\Http\Controllers\Admin\Auth;

use App\Models\Admin;
use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Validate;
use Illuminate\Support\Facades\Validator;
use Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Redirect;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        // $this->middleware('guest:admin')->except('admin.logout');
    }

    /**
     * Show the login form.
     *
     * @return \Illuminate\Http\Response
     */
    public function showLoginForm()
    {
        Redirect::setIntendedUrl(url()->previous());

        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Create a new controller instance.
     *
     * @return void
     */
     public function login(Request $request)
     {
        // dd($request->all());
        $input = $request->all();
        $fieldType = filter_var($request->email, FILTER_VALIDATE_EMAIL) ? 'email' : 'username';
        
        $rules = [
            'password' => 'required|string'
        ];

        $pesan = [
            'password.required' => 'Password Wajib Diisi!',
        ];

        if($fieldType == 'email'){
            $rules['email'] = 'required|exists:admins,email';
            $pesan['email.required'] = 'Alamat Email Wajib Diisi!';
            $pesan['email.exists'] = 'Alamat Email Belum Terdaftar!';
        }else{
            $rules['email'] = 'required|exists:admins,username|string';
            $pesan['email.required'] = 'Username Wajib Diisi!';
            $pesan['email.exists'] = 'Username Belum Terdaftar!';
        }


        $validator = Validator::make($request->all(), $rules, $pesan);
        if ($validator->fails()){
            return back()->withErrors($validator->errors());
        }else{
            if(auth()->guard('admin')->attempt(array($fieldType => $input['email'], 'password' => $input['password']), true))
            {
                return redirect()->route('admin.dashboard');
            }else{
                $gagal['password'] = array('Password salah!');
                return back()->withErrors($gagal);
            }
        }

     }

    public function logout()
    {
        // dd('sa');
        Auth::guard('admin')->logout();
        return redirect()->route('admin.login');
    }

}
