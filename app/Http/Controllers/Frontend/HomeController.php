<?php

namespace App\Http\Controllers\Frontend;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use App\Helpers\Collection;
use Illuminate\Support\Facades\Validator;

use Carbon\Carbon;
use App\Models\Paket;
use App\Models\Landing\Video;
class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {

        $program = collect([
            [
                'icon' => '/images/icon/alphabet.png',
                'title' => 'Happy Song And Education Game',
                'content' => 'Program dimana pengasuh akan mengajarkan anak untuk bernyanyi bersama. Education Game adalah program yang akan dilakukan dengan game yang akan membantu anak dalam mengasah kemampuan kognitif, afektif, maupun psikomotor.'
            ],
            [
                'icon' => '/images/icon/kitchen-set.png',
                'title' => 'Fun Cooking',
                'content' => 'Sebuah program kegiatan dimana anak diajari untuk berpikir kreatif dalam mengolah atau mengkreasi sebuah makanan. Kegiatan ini bertujuan untuk membiasakan anak berpikir kreatif dan inovatif.'
            ],
            [
                'icon' => '/images/icon/repetitive.png',
                'title' => 'Life Basic Skill & Good Behaviour',
                'content' => 'Sebuah program dimana anak akan diajarkan mengenai tata cara atas kemampuan kegiatan yang dilakukan sehari hari baik verbal maupun non verbal. Kegiatan ini bertujuan untuk membiasakan anak bisa mandiri dan memiliki dasar kepribadian yang baik.'
            ],
            [
                'icon' => '/images/icon/fairytale.png',
                'title' => 'Story Telling',
                'content' => 'Kegiatan bercerita yang dilakukan oleh pengasuh dengan tema yang akan ditentukan. Kegiatan ini bertujuan agar anak terbiasa mendengar dan dapat mempelajari hal-hal yang disampaikan oleh pengasuh.'
            ],
            [
                'icon' => '/images/icon/talking.png',
                'title' => 'Simple English',
                'content' => 'Sebuah kegiatan dimana anak akan diajarkan menggunakan bahasa Inggris dasar dengan tema yang sesuai langsung dengan anak. Kegiatan ini bertujuan agar anak sudah mengenai bahasa Inggris sejak dini.'
            ],
            [
                'icon' => '/images/icon/medical-report.png',
                'title' => 'Medical Check Up',
                'content' => 'Kegiatan pengecekan kesehatan yang akan dilakukan oleh pengasuh dan bekerja sama dengan puskesmas, bidan, atau psikolog. Kegiatan ini bertujuan untuk menjaga kesehatan anak.'
            ],
            [
                'icon' => '/images/icon/playground.png',
                'title' => 'Outdoor Activity',
                'content' => 'Sebuah kegiatan yang akan dilakukan di luar area Taman Penitipan Anak yang akan dipandu oleh pengasuh dengan tema yang ditentukan. Kegiatan ini bertujuan agar anak dapat bersosialisasi dengan lingkungan sekitar dan memahami lingkungannya.'
            ],
            [
                'icon' => '/images/icon/children.png',
                'title' => 'Project with Parents',
                'content' => 'Program yang akan dilakukan bersama-sama antara anak dan orang tua, kegiatan bisa berupa menggambar bersama, mewarnai, game, dll. Program ini bertujuan untuk mempererat rasa kebersamaan antara anak, orang tua, dan pihak Taman Penitipan Anak.'
            ],
            [
                'icon' => '/images/icon/watching-movie.png',
                'title' => 'Audio Visual',
                'content' => 'Program yang akan dilaksanakan dalam bentuk mendengarkan musik atau melihat video bertema anak-anak. Anak akan diperdengarkan lagu kanak-kanak dan bergerak bersama-sama.'
            ],
        ]);

        $biaya = collect([
            'denda' => (int)settings()->get('denda') ?? 0,
            'laundry' => (int)settings()->get('laundry') ?? 0,
            'antar_jemput' => (int)settings()->get('antar_jemput') ?? 0,
        ]);

        $paket = Paket::orderBy('id', 'ASC')->get();

        return Inertia::render('Home',[
            'program' => $program,
            'biaya' => $biaya,
            'paket' => $paket
        ]);
    }

    
    public function TataTertib()
    {
        return Inertia::render('About/TataTertib');
    }


    
    public function sitemap()
    {

        $video = Video::orderBy('id', 'DESC')->get();

        return response()->view('sitemap', [
            'video' => $video
        ])->header('Content-Type', 'text/xml');
    }
}
