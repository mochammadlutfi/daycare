<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::namespace('Frontend')->group(function(){
    
    Route::middleware('guest')->group(function () {
        Route::get('/','HomeController@index')->name('home');
        Route::get('/profil','HomeController@profil')->name('profil');
        Route::get('/sitemap.xml','HomeController@sitemap')->name('sitemap');
        
        Route::prefix('/video')->name('video.')->group(function () {
            Route::get('/', 'VideoController@index')->name('index');
            Route::get('/data', 'VideoController@data')->name('data');
            Route::get('/{slug}', 'VideoController@show')->name('show');
        });

        
        Route::namespace('Auth')->group(function () {
            Route::get('/login','LoginController@showLoginForm')->name('login');
            Route::post('/login','LoginController@login');

            
            Route::prefix('/pendaftaran')->group(function () {
                Route::get('/','RegisterController@showRegisterForm')
                ->middleware('guest:web')->name('register');
                Route::post('/','RegisterController@register');
            });
        });

    });
    
    Route::middleware(['auth:web'])->group(function () {

        Route::namespace('Auth')->group(function () {
            Route::post('/logout','LoginController@logout')->name('logout');

            Route::get('/verify-email','EmailVerificationPromptController@__invoke')
            ->middleware('auth')
            ->name('verification.notice');
            
            Route::get('/verify-email/{id}/{hash}','VerifyEmailController@__invoke')
            ->middleware(['auth', 'signed', 'throttle:6,1'])
            ->name('verification.verify');

            Route::post('/email/verification-notification','EmailVerificationNotificationController@store')
            ->middleware(['throttle:6,1'])
            ->name('verification.send');

            Route::get('/pendaftaran/detail','RegisterController@detail')->name('register.detail');
            Route::post('/pendaftaran/detail','RegisterController@detailStore');
            Route::post('/pendaftaran/anak','RegisterController@anakStore')->name('register.anak');
        });

        Route::prefix('/user')->name('user.')
        ->middleware(['verified', 'check.user.details'])
        ->group(function () {
            route::get('/', function () {    
                return redirect()->route('user.dashboard');
            });

            Route::get('/dashboard','DashboardController@index')
            ->name('dashboard');

            Route::prefix('/profil')->group(function () {
                Route::get('/', 'UserController@profile')->name('profile');
                Route::post('/','UserController@profileUpdate');
            });
            
            Route::prefix('/password')->group(function () {
                Route::get('/', 'UserController@password')->name('password');
                Route::post('/','UserController@passwordUpdate');
            });

            // Route::get('/password','UserController@password')->name('password');
            // Route::post('/password/update','UserController@passwordUpdate')->name('password.update');

            Route::prefix('/orangtua')->name('orangtua.')->group(function () {
                Route::get('/', 'OrangTuaController@index')->name('index');
                Route::post('/store','OrangTuaController@store')->name('store');
                Route::post('/{id}/update','OrangTuaController@update')->name('update');
            });

            Route::prefix('/invoice')->name('invoice.')->group(function () {
                Route::get('/', 'InvoiceController@index')->name('index');
                Route::get('/data', 'InvoiceController@data')->name('data');
                Route::get('/payment', 'InvoiceController@payment')->name('payment');
                Route::get('/{id}', 'InvoiceController@show')->name('show');
                Route::get('/{id}/pdf', 'InvoiceController@pdf')->name('pdf');
            });
            
            Route::prefix('/absen')->name('absen.')->group(function () {
                Route::get('/', 'AbsenController@index')->name('index');
            });

            Route::prefix('/anak')->name('anak.')->group(function () {
                Route::get('/', 'AnakController@index')->name('index');
                Route::get('/tambah', 'AnakController@create')->name('create');
                Route::post('/store','AnakController@store')->name('store');
                Route::get('/data', 'AnakController@data')->name('data');
                Route::get('/slug', 'AnakController@check_slug')->name('slug');
                Route::get('/{id}', 'AnakController@show')->name('show');
                Route::get('/{id}/edit','AnakController@edit')->name('edit');
                Route::post('/{id}/update','AnakController@update')->name('update');
                Route::delete('/{id}/hapus','AnakController@destroy')->name('delete');
            });

            
            Route::prefix('/nilai')->name('nilai.')->group(function () {
                Route::get('/', 'NilaiController@index')->name('index');
                Route::get('/data', 'NilaiController@data')->name('data');
            });

            Route::prefix('/aktivitas')->name('aktivitas.')->group(function () {
                Route::get('/', 'AktivitasController@index')->name('index');
                Route::get('/data', 'AktivitasController@data')->name('data');
            });

            Route::prefix('/raport')->name('raport.')->group(function () {
                Route::get('/', 'RaportController@index')->name('index');
                Route::get('/data', 'RaportController@data')->name('data');
                Route::get('/{id}', 'RaportController@show')->name('show');
                Route::get('/{id}/pdf', 'RaportController@pdf')->name('pdf');
            });
            
            Route::prefix('/laundry')->name('laundry.')->group(function () {
                Route::get('/', 'LaundryController@index')->name('index');
                Route::get('/data', 'LaundryController@data')->name('data');
            });

            
            Route::prefix('/antarjemput')->name('antarjemput.')->group(function () {
                Route::get('/', 'AntarJemputController@index')->name('index');
                Route::get('/data', 'AntarJemputController@data')->name('data');
            });
        });

    });

});

Route::prefix('admin')->namespace('Admin')->name('admin.')->group(function(){
    
    Route::middleware('guest')->namespace('Auth')->group(function () {
        Route::get('/','LoginController@showLoginForm')->name('login');
        Route::post('/','LoginController@login');
    });

    Route::middleware('auth:admin')->group(function () {
        Route::post('/logout','Auth\LoginController@logout')->name('logout');

        Route::get('/beranda','DashboardController@index')->name('dashboard');
        
        Route::prefix('/video')->name('video.')->group(function () {
            Route::get('/', 'VideoController@index')->name('index');
            Route::get('/create', 'VideoController@create')->name('create');
            Route::post('/store','VideoController@store')->name('store');
            Route::get('/data', 'VideoController@data')->name('data');
            Route::get('/slug', 'VideoController@check_slug')->name('slug');
            Route::get('/{id}', 'VideoController@show')->name('show');
            Route::get('/{id}/edit','VideoController@edit')->name('edit');
            Route::post('/{id}/update','VideoController@update')->name('update');
            Route::delete('/{id}/hapus','VideoController@destroy')->name('delete');
        });
        
        Route::prefix('/foto')->name('foto.')->group(function () {
            Route::get('/', 'FotoController@index')->name('index');
            Route::get('/create', 'FotoController@create')->name('create');
            Route::post('/store','FotoController@store')->name('store');
            Route::get('/data', 'FotoController@data')->name('data');
            Route::get('/slug', 'FotoController@check_slug')->name('slug');
            Route::get('/{id}', 'FotoController@show')->name('show');
            Route::get('/{id}/edit','FotoController@edit')->name('edit');
            Route::post('/{id}/update','FotoController@update')->name('update');
            Route::delete('/{id}/hapus','FotoController@destroy')->name('delete');
        });

        Route::prefix('/pendaftaran')->name('register.')->group(function () {
            Route::get('/', 'PendaftaranController@index')->name('index');
            Route::get('/pending', 'PendaftaranController@pending')->name('pending');
            Route::get('/create', 'PendaftaranController@create')->name('create');
            Route::post('/store','PendaftaranController@store')->name('store');
            Route::get('/data', 'PendaftaranController@data')->name('data');
            Route::get('/slug', 'PendaftaranController@check_slug')->name('slug');
            Route::get('/{id}', 'PendaftaranController@show')->name('show');
            Route::get('/{id}/edit','PendaftaranController@edit')->name('edit');
            Route::post('/{id}/update','PendaftaranController@update')->name('update');
            Route::delete('/{id}/hapus','PendaftaranController@destroy')->name('delete');
        });

        Route::prefix('/anak')->name('anak.')->group(function () {
            Route::get('/', 'AnakController@index')->name('index');
            Route::get('/pending', 'AnakController@pending')->name('pending');
            Route::get('/create', 'AnakController@create')->name('create');
            Route::post('/store','AnakController@store')->name('store');
            Route::get('/data', 'AnakController@data')->name('data');
            Route::get('/report', 'AnakController@report')->name('report');
            Route::get('/{id}', 'AnakController@show')->name('show');
            Route::get('/{id}/kartu', 'AnakController@kartu')->name('kartu');
            Route::get('/{id}/spp', 'AnakController@spp')->name('spp');
            Route::get('/{id}/edit','AnakController@edit')->name('edit');
            Route::post('/{id}/update','AnakController@update')->name('update');
            Route::post('/{id}/foto','AnakController@foto')->name('foto');
            Route::delete('/{id}/hapus','AnakController@destroy')->name('delete');
        });

        Route::prefix('/pengguna')->name('pengguna.')->group(function () {
            Route::get('/', 'PenggunaController@index')->name('index');
            Route::get('/pending', 'PenggunaController@pending')->name('pending');
            Route::get('/create', 'PenggunaController@create')->name('create');
            Route::post('/store','PenggunaController@store')->name('store');
            Route::get('/data', 'PenggunaController@data')->name('data');
            Route::get('/slug', 'PenggunaController@check_slug')->name('slug');
            Route::get('/{id}', 'PenggunaController@show')->name('show');
            Route::get('/{id}/edit','PenggunaController@edit')->name('edit');
            Route::post('/{id}/update','PenggunaController@update')->name('update');
            Route::delete('/{id}/hapus','PenggunaController@destroy')->name('delete');
        });

        Route::prefix('/invoice')->name('invoice.')->group(function () {
            Route::get('/', 'InvoiceController@index')->name('index');
            Route::get('/pending', 'InvoiceController@pending')->name('pending');
            Route::get('/create', 'InvoiceController@create')->name('create');
            Route::post('/store','InvoiceController@store')->name('store');
            Route::get('/data', 'InvoiceController@data')->name('data');
            Route::get('/report', 'InvoiceController@report')->name('report');
            Route::get('/{id}', 'InvoiceController@show')->name('show');
            Route::get('/{id}/edit','InvoiceController@edit')->name('edit');
            Route::post('/{id}/update','InvoiceController@update')->name('update');
            Route::delete('/{id}/hapus','InvoiceController@destroy')->name('delete');
        });
        
        Route::prefix('/kelompok')->name('kelompok.')->group(function () {
            Route::get('/', 'KelompokController@index')->name('index');
            Route::get('/create', 'KelompokController@create')->name('create');
            Route::post('/store','KelompokController@store')->name('store');
            Route::get('/data', 'KelompokController@data')->name('data');
            Route::get('/{id}', 'KelompokController@show')->name('show');
            Route::get('/{id}/edit','KelompokController@edit')->name('edit');
            Route::post('/{id}/update','KelompokController@update')->name('update');
            Route::delete('/{id}/delete','KelompokController@destroy')->name('delete');
        });
        
        Route::prefix('/jadwal')->name('jadwal.')->group(function () {
            Route::get('/', 'JadwalController@index')->name('index');
            Route::get('/data', 'JadwalController@data')->name('data');
            Route::post('/store','JadwalController@store')->name('store');
            Route::get('/{id}','JadwalController@detail')->name('detail');
            Route::post('/{id}/store','JadwalController@detailStore')->name('detail.store');
            Route::post('/{id}/update','JadwalController@update')->name('update');
            Route::delete('/{id}/hapus','JadwalController@destroy')->name('delete');
            Route::get('/{id}/data','JadwalController@detailData')->name('detail.data');
            Route::post('/{id}/{detail}/upate','JadwalController@detailUpdate')->name('detail.update');
            Route::delete('/{id}/{detail}/hapus','JadwalController@detailDestroy')->name('detail.delete');
        });
        
        Route::prefix('/kegiatan')->name('kegiatan.')->group(function () {
            Route::get('/', 'KegiatanController@index')->name('index');
            Route::get('/create', 'KegiatanController@create')->name('create');
            Route::post('/store','KegiatanController@store')->name('store');
            Route::get('/data', 'KegiatanController@data')->name('data');
            Route::get('/{id}', 'KegiatanController@show')->name('show');
            Route::get('/{id}/edit','KegiatanController@edit')->name('edit');
            Route::post('/{id}/update','KegiatanController@update')->name('update');
            Route::delete('/{id}/delete','KegiatanController@destroy')->name('delete');
        });

        Route::prefix('/jenis-kegiatan')->name('jenis_kegiatan.')->group(function () {
            Route::get('/', 'JenisKegiatanController@index')->name('index');
            Route::get('/create', 'JenisKegiatanController@create')->name('create');
            Route::post('/store','JenisKegiatanController@store')->name('store');
            Route::get('/data', 'JenisKegiatanController@data')->name('data');
            Route::get('/{id}', 'JenisKegiatanController@show')->name('show');
            Route::get('/{id}/edit','JenisKegiatanController@edit')->name('edit');
            Route::post('/{id}/update','JenisKegiatanController@update')->name('update');
            Route::delete('/{id}/delete','JenisKegiatanController@destroy')->name('delete');
        });

        Route::prefix('/aktivitas')->name('aktivitas.')->group(function () {
            Route::get('/', 'AktivitasController@index')->name('index');
            Route::get('/create', 'AktivitasController@create')->name('create');
            Route::post('/store','AktivitasController@store')->name('store');
            Route::get('/data', 'AktivitasController@data')->name('data');
            Route::get('/{id}', 'AktivitasController@show')->name('show');
            Route::get('/{id}/edit','AktivitasController@edit')->name('edit');
            Route::post('/{id}/update','AktivitasController@update')->name('update');
            Route::delete('/{id}/delete','AktivitasController@destroy')->name('delete');
        });

        Route::prefix('/pegawai')->name('pegawai.')->group(function () {
            Route::get('/', 'PegawaiController@index')->name('index');
            Route::get('/pending', 'PegawaiController@pending')->name('pending');
            Route::get('/create', 'PegawaiController@create')->name('create');
            Route::post('/store','PegawaiController@store')->name('store');
            Route::get('/data', 'PegawaiController@data')->name('data');
            Route::get('/slug', 'PegawaiController@check_slug')->name('slug');
            Route::get('/{id}', 'PegawaiController@show')->name('show');
            Route::get('/{id}/edit','PegawaiController@edit')->name('edit');
            Route::post('/{id}/update','PegawaiController@update')->name('update');
            Route::delete('/{id}/hapus','PegawaiController@destroy')->name('delete');
        });

        Route::prefix('/biaya')->name('biaya.')->group(function () {
            Route::get('/', 'BiayaController@index')->name('index');
            Route::post('/store','BiayaController@store')->name('store');
        });

        Route::prefix('/absen')->name('absen.')->group(function () {
            Route::get('/', 'AbsenController@index')->name('index');
            Route::get('/scanner', 'AbsenController@scanner')->name('scanner');
            Route::get('/create', 'AbsenController@create')->name('create');
            Route::post('/store','AbsenController@store')->name('store');
            Route::post('/scan','AbsenController@scan')->name('scan');
            Route::get('/data', 'AbsenController@data')->name('data');
            Route::get('/anak', 'AbsenController@anak')->name('anak');
            Route::get('/report', 'AbsenController@report')->name('report');
            Route::get('/{id}', 'AbsenController@show')->name('show');
            Route::get('/{id}/edit','AbsenController@edit')->name('edit');
            Route::post('/{id}/update','AbsenController@update')->name('update');
            Route::delete('/{id}/hapus','AbsenController@destroy')->name('delete');
        });


        Route::prefix('/penilaian')->name('nilai.')->group(function () {
            Route::get('/', 'NilaiController@index')->name('index');
            Route::get('/create', 'NilaiController@create')->name('create');
            Route::post('/store','NilaiController@store')->name('store');
            Route::get('/data', 'NilaiController@data')->name('data');
            Route::get('/slug', 'NilaiController@check_slug')->name('slug');
            Route::get('/{id}', 'NilaiController@show')->name('show');
            Route::get('/{id}/edit','NilaiController@edit')->name('edit');
            Route::post('/{id}/update','NilaiController@update')->name('update');
            Route::delete('/{id}/hapus','NilaiController@destroy')->name('delete');
        });        

        Route::prefix('/raport')->name('raport.')->group(function () {
            Route::get('/', 'RaportController@index')->name('index');
            Route::get('/create', 'RaportController@create')->name('create');
            Route::post('/store','RaportController@store')->name('store');
            Route::get('/data', 'RaportController@data')->name('data');
            Route::get('/slug', 'RaportController@check_slug')->name('slug');
            Route::get('/{id}', 'RaportController@show')->name('show');
            Route::get('/{id}/edit','RaportController@edit')->name('edit');
            Route::post('/{id}/update','RaportController@update')->name('update');
            Route::delete('/{id}/hapus','RaportController@destroy')->name('delete');
            Route::get('/{id}/pdf', 'RaportController@pdf')->name('pdf');
        });


        Route::prefix('/antarjemput')->name('antarjemput.')->group(function () {
            Route::get('/', 'AntarJemputController@index')->name('index');
            Route::get('/create', 'AntarJemputController@create')->name('create');
            Route::post('/store','AntarJemputController@store')->name('store');
            Route::get('/data', 'AntarJemputController@data')->name('data');
            Route::get('/slug', 'AntarJemputController@check_slug')->name('slug');
            Route::get('/{id}', 'AntarJemputController@show')->name('show');
            Route::get('/{id}/edit','AntarJemputController@edit')->name('edit');
            Route::post('/{id}/update','AntarJemputController@update')->name('update');
            Route::delete('/{id}/hapus','AntarJemputController@destroy')->name('delete');
        });

        Route::prefix('/laundry')->name('laundry.')->group(function () {
            Route::get('/', 'LaundryController@index')->name('index');
            Route::get('/create', 'LaundryController@create')->name('create');
            Route::post('/store','LaundryController@store')->name('store');
            Route::get('/data', 'LaundryController@data')->name('data');
            Route::get('/slug', 'LaundryController@check_slug')->name('slug');
            Route::get('/{id}', 'LaundryController@show')->name('show');
            Route::get('/{id}/edit','LaundryController@edit')->name('edit');
            Route::post('/{id}/update','LaundryController@update')->name('update');
            Route::delete('/{id}/hapus','LaundryController@destroy')->name('delete');
        });

        Route::prefix('/paket')->name('paket.')->group(function () {
            Route::get('/', 'PaketController@index')->name('index');
            Route::get('/create', 'PaketController@create')->name('create');
            Route::post('/store','PaketController@store')->name('store');
            Route::get('/data', 'PaketController@data')->name('data');
            Route::get('/slug', 'PaketController@check_slug')->name('slug');
            Route::get('/{id}', 'PaketController@show')->name('show');
            Route::get('/{id}/edit','PaketController@edit')->name('edit');
            Route::post('/{id}/update','PaketController@update')->name('update');
            Route::delete('/{id}/hapus','PaketController@destroy')->name('delete');
        });
    });
});