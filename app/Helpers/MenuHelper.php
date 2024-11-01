<?php

namespace App\Helpers;

use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;
use DB;

class MenuHelper
{

    public static function get(){

        $menuData = Collect([]);

        $menuData->push([
            "icon" => "fa fa-home",
            "name" => "Beranda",
            "to" => "admin.dashboard",
        ]);

        $menuData->push([
            "heading" => true,
            "name" => 'Kelompok & Aktivitas'
        ]);

        $menuData->push([
            "svg" => true,
            "icon" => '<path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z"></path>',
            "name" => "Kelompok",
            "to" => "admin.kelompok.index",
        ]);

        $menuData->push([
            "svg" => true,
            "icon" => '<path fill-rule="evenodd" d="M19.449 8.448L16.388 11a4.52 4.52 0 010 2.002l3.061 2.55a8.275 8.275 0 000-7.103zM15.552 19.45L13 16.388a4.52 4.52 0 01-2.002 0l-2.55 3.061a8.275 8.275 0 007.103 0zM4.55 15.552L7.612 13a4.52 4.52 0 010-2.002L4.551 8.45a8.275 8.275 0 000 7.103zM8.448 4.55L11 7.612a4.52 4.52 0 012.002 0l2.55-3.061a8.275 8.275 0 00-7.103 0zm8.657-.86a9.776 9.776 0 011.79 1.415 9.776 9.776 0 011.414 1.788 9.764 9.764 0 010 10.211 9.777 9.777 0 01-1.415 1.79 9.777 9.777 0 01-1.788 1.414 9.764 9.764 0 01-10.212 0 9.776 9.776 0 01-1.788-1.415 9.776 9.776 0 01-1.415-1.788 9.764 9.764 0 010-10.212 9.774 9.774 0 011.415-1.788A9.774 9.774 0 016.894 3.69a9.764 9.764 0 0110.211 0zM14.121 9.88a2.985 2.985 0 00-1.11-.704 3.015 3.015 0 00-2.022 0 2.985 2.985 0 00-1.11.704c-.326.325-.56.705-.704 1.11a3.015 3.015 0 000 2.022c.144.405.378.785.704 1.11.325.326.705.56 1.11.704.652.233 1.37.233 2.022 0a2.985 2.985 0 001.11-.704c.326-.325.56-.705.704-1.11a3.016 3.016 0 000-2.022 2.985 2.985 0 00-.704-1.11z" clip-rule="evenodd"></path>',
            "name" => "Kegiatan",
            "to" => "admin.kegiatan.index",
        ]);

        // $menuData->push([
        //     'icon' => 'fa fa-calendar-alt',
        //     "name" => "Jadwal",
        //     "to" => "admin.jadwal.index",
        // ]);

        $menuData->push([
            "svg" => true,
            "icon" => '<path fill-rule="evenodd" d="M19.449 8.448L16.388 11a4.52 4.52 0 010 2.002l3.061 2.55a8.275 8.275 0 000-7.103zM15.552 19.45L13 16.388a4.52 4.52 0 01-2.002 0l-2.55 3.061a8.275 8.275 0 007.103 0zM4.55 15.552L7.612 13a4.52 4.52 0 010-2.002L4.551 8.45a8.275 8.275 0 000 7.103zM8.448 4.55L11 7.612a4.52 4.52 0 012.002 0l2.55-3.061a8.275 8.275 0 00-7.103 0zm8.657-.86a9.776 9.776 0 011.79 1.415 9.776 9.776 0 011.414 1.788 9.764 9.764 0 010 10.211 9.777 9.777 0 01-1.415 1.79 9.777 9.777 0 01-1.788 1.414 9.764 9.764 0 01-10.212 0 9.776 9.776 0 01-1.788-1.415 9.776 9.776 0 01-1.415-1.788 9.764 9.764 0 010-10.212 9.774 9.774 0 011.415-1.788A9.774 9.774 0 016.894 3.69a9.764 9.764 0 0110.211 0zM14.121 9.88a2.985 2.985 0 00-1.11-.704 3.015 3.015 0 00-2.022 0 2.985 2.985 0 00-1.11.704c-.326.325-.56.705-.704 1.11a3.015 3.015 0 000 2.022c.144.405.378.785.704 1.11.325.326.705.56 1.11.704.652.233 1.37.233 2.022 0a2.985 2.985 0 001.11-.704c.326-.325.56-.705.704-1.11a3.016 3.016 0 000-2.022 2.985 2.985 0 00-.704-1.11z" clip-rule="evenodd"></path>',
            "name" => "Jenis Kegiatan",
            "to" => "admin.jenis_kegiatan.index",
        ]);

        $menuData->push([
            "icon" => "fa fa-clock-rotate-left",
            "name" => "Aktivitas",
            "to" => "admin.aktivitas.index",
        ]);

        $menuData->push([
            "icon" => "fa fa-list-check",
            "name" => "Absen",
            "to" => "admin.absen.index",
        ]);
        
        $menuData->push([
            "icon" => "fa fa-check-square",
            "name" => "Penilaian",
            "to" => "admin.nilai.index",
        ]);

        $menuData->push([
            "icon" => "fa fa-check-square",
            "name" => "RPPH",
            "to" => "admin.rpph.index",
        ]);

        $menuData->push([
            'svg' => true,
            "icon" => '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
    <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
    <path d="M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2m0 12v-5m3 5v-1m3 1v-3" />
</g>',
            "name" => "Raport",
            "to" => "admin.raport.index",
        ]);

        
        $menuData->push([
            "svg" => true,
            "icon" => '	<path fill="currentColor" d="M6 13.975v-3L4.125 12l-3-5.2l6.6-3.8H9q.4 1.2.95 2.1T12 6t2.05-.9T15 3h1.275l6.575 3.825L19.875 12L18 10.975v4.8l-1.575 1.375q-.175.15-.4.238t-.45.087q-.15 0-.35-.1t-.4-.25l-2.65-2.275q-.8-.7-1.8-1.025T8.35 13.5q-.6 0-1.188.113T6 13.975m-1.35 5.4l-1.3-1.525L5.525 16q.575-.5 1.313-.763t1.537-.262t1.525.263t1.3.762l2.9 2.475q.3.25.713.388t.837.137q.45 0 .838-.125t.687-.4L19.35 16.6l1.3 1.55L18.475 20q-.575.5-1.3.75T15.65 21t-1.537-.25T12.8 20l-2.9-2.475q-.3-.25-.687-.387T8.375 17q-.425 0-.837.138t-.713.387z" />',
            "name" => "Laundry",
            "to" => "admin.laundry.index",
        ]);

        
        $menuData->push([
            "icon" => "fa fa-car-side",
            "name" => "Antar Jemput",
            "to" => "admin.antarjemput.index",
        ]);

        $menuData->push([
            "heading" => true,
            "name" => 'Kesiswaan'
        ]);
        
        $menuData->push([
            "icon" => "fa fa-user-plus",
            "name" => "Pendaftaran",
            "to" => "admin.register.index",
        ]);
        
        $menuData->push([
            "icon" => "fa fa-user-friends",
            "name" => "Anak",
            "to" => "admin.anak.index",
        ]);
        
        $menuData->push([
            "icon" => "fa fa-thumbs-up",
            "name" => "Pengguna",
            "to" => "admin.pengguna.index",
        ]);

        $menuData->push([
            "icon" => "fa fa-wallet",
            "name" => "Invoice",
            "to" => "admin.invoice.index",
        ]);

        // $menuData->push([
        //     "heading" => true,
        //     "name" => 'Dokumentasi'
        // ]);
        // $menuData->push([
        //     "icon" => "fa fa-camera",
        //     "name" => "Foto",
        //     "to" => "admin.foto.index",
        // ]);
        
        // $menuData->push([
        //     "icon" => "fa fa-video-camera",
        //     "name" => "Video",
        //     "to" => "admin.video.index",
        // ]);
        
        $menuData->push([
            "heading" => true,
            "name" => 'Pengaturan'
        ]);

        $menuData->push([
            "icon" => "fa fa-money-bills",
            "name" => "Paket",
            "to" => "admin.paket.index",
        ]);

        $menuData->push([
            "icon" => "fa fa-money-bills",
            "name" => "Biaya",
            "to" => "admin.biaya.index",
        ]);
        
        $menuData->push([
            "svg" => true,
            "icon" => '<path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z"></path>',
            "name" => "Pegawai",
            "to" => "admin.pegawai.index",
        ]);
        
        return $menuData->all();
    }

    
    public static function user(){

        $menuData = Collect([]);

        $menuData->push([
            "icon" => "fa fa-home",
            "name" => "Beranda",
            "to" => "user.dashboard",
        ]);
        
        $menuData->push([
            "icon" => "fa fa-user-friends",
            "name" => "Anak",
            "to" => "user.anak.index",
        ]);

        
        $menuData->push([
            "icon" => "fa fa-wallet",
            "name" => "Invoice",
            "to" => "user.invoice.index",
        ]);

        if(auth()->guard('web')->user()->anak()->where('status', 'Aktif')->count()){

            $menuData->push([
                "icon" => "fa fa-calendar-alt",
                "name" => "Absensi",
                "to" => "user.absen.index",
            ]);
    
            $menuData->push([
                "icon" => "fa fa-check-square",
                "name" => "Penilaian",
                "to" => "user.nilai.index",
            ]);
    
            $menuData->push([
                "icon" => "fa fa-clock-rotate-left",
                "name" => "Aktivitas",
                "to" => "user.aktivitas.index",
            ]);

            $menuData->push([
                'svg' => true,
                "icon" => '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
		<path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
		<path d="M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2m0 12v-5m3 5v-1m3 1v-3" />
	</g>',
                "name" => "Raport",
                "to" => "user.raport.index",
            ]);
        }
        
        if(auth()->guard('web')->user()->anak()->where('status', 'Aktif')->where('isLaundry', 1)->count()){
            $menuData->push([
                "svg" => true,
                "icon" => '	<path fill="currentColor" d="M6 13.975v-3L4.125 12l-3-5.2l6.6-3.8H9q.4 1.2.95 2.1T12 6t2.05-.9T15 3h1.275l6.575 3.825L19.875 12L18 10.975v4.8l-1.575 1.375q-.175.15-.4.238t-.45.087q-.15 0-.35-.1t-.4-.25l-2.65-2.275q-.8-.7-1.8-1.025T8.35 13.5q-.6 0-1.188.113T6 13.975m-1.35 5.4l-1.3-1.525L5.525 16q.575-.5 1.313-.763t1.537-.262t1.525.263t1.3.762l2.9 2.475q.3.25.713.388t.837.137q.45 0 .838-.125t.687-.4L19.35 16.6l1.3 1.55L18.475 20q-.575.5-1.3.75T15.65 21t-1.537-.25T12.8 20l-2.9-2.475q-.3-.25-.687-.387T8.375 17q-.425 0-.837.138t-.713.387z" />',
                "name" => "Laundry",
                "to" => "user.laundry.index",
            ]);
        }
        
        if(auth()->guard('web')->user()->anak()->where('status', 'Aktif')->where('isAntarJemput', 1)->count()){
            $menuData->push([
                "icon" => "fa fa-car-side",
                "name" => "Antar Jemput",
                "to" => "user.antarjemput.index",
            ]);
        }

        return $menuData->all();
    }

    public static function permission()
    {
        $data = auth()->guard('admin')->user()->getAllPermissions()->toArray();
        $permission = array();
        foreach ($data as $element) {
            $permission[$element['module']][] = $element['name'];
        }

        return $permission;
    }
}
