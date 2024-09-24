<template>
    <base-layout>
        <Head>
            <title>Profil</title>
            <meta name="description" content="Kang Ebod, Makhfudz Solaeman">
        </Head>
        <div class="content">
            <div class="block block-rounded block-transparent bg-image bg-image-center"
                style="background-image: url('/images/default.webp');">
                <div class="block-content bg-primary-dark-op">
                    <div class="py-5 text-center">
                        <h1 class="h2 fw-bold text-white mb-2">Profil Kang Ebod</h1>
                        <h2 class="h5 fw-medium text-white-75">Mengenal Makhfudz Solaeman</h2>
                    </div>
                </div>
            </div>

            <div class="block block-rounded block-bordered">
                <div class="block-content">
                    <el-row :gutter="32">
                        <el-col :lg="8">
                            <div class="text-center mb-4">
                                <img src="/images/profile.png" class="w-75"/>
                            </div>
                            <div class="d-flex justify-content-center mb-3">
                                <a class="btn btn-danger mx-2" href="https://www.youtube.com/@kangebod7315" target="_blank">
                                    <i class="fa-brands fa-youtube"></i>
                                </a>
                                <a class="btn btn-danger mx-2" href="" target="_blank">
                                    <i class="fa-brands fa-instagram"></i>
                                </a>
                            </div>
                        </el-col>
                        <el-col :lg="16">
                            <p>
                                H Makhfudz Solaiman yang lebih dikenal dengan panggilan Kang Ebod, lahir pada tahun 1971 Di Kab. Kebumen, Jawa Tengah, Indonesia. 
                                Meskipun latar belakang keluarganya sederhana, namun semangat dan tekadnya untuk meraih kesuksesan telah terlihat sejak usia muda.
                            </p>
                            <h3 class="h4 fw-bold mb-2">Awal Karir dan Pendirian Ebod Jaya</h3>
                            <p>Memulai karir dengan merantau ke Kota Bekasi pada Tahun 1989, kemudian berpindah ke Bandung pada tahun 1990 sebagai seorang karyaan di sebuah konveksi.
                                Karena semangat dan tekadnya Kang Ebod terus mencari peluang selama bekerja di Konveksi. Pada tahun 2000, ia mendirikan perusahaan yang diberi nama "Ebod Jaya". 
                                Perusahaan ini bergerak di bidang distribusi produk keperluan burung dengan fokus pada kualitas pelayanan dan efisiensi operasional.</p>
                            <h3 class="h4 fw-bold mb-2">Pemimpin Inovatif dan Keberhasilan Bisnis</h3>
                            <p>Kang Ebod dikenal sebagai pemimpin yang inovatif dan berani mengambil risiko. 
                                Ia tidak hanya mengelola perusahaan secara efektif, tetapi juga terus mencari peluang untuk mengembangkan layanan yang lebih baik. 
                                Di bawah kepemimpinannya, Ebod Jaya berkembang pesat dan menjadi salah satu perusahaan distribusi produk burung terkemuka di Indonesia.</p>
                            <h3 class="h4 fw-bold mb-2">Pemimpin Inovatif dan Keberhasilan Bisnis</h3>
                            <p>Keberhasilan Ebod Jaya dalam menyediakan solusi logistik yang handal dan efisien telah memberikan dampak yang signifikan bagi industri dan ekonomi Indonesia. Kang Ebod sendiri 
                                dikenal sebagai contoh inspiratif bagi para pengusaha muda, karena perjalanannya dari awal yang sederhana hingga menjadi pemimpin bisnis sukses.</p>
                            <h3 class="h4 fw-bold mb-2">Pemberdayaan Masyarakat dan Tanggung Jawab Sosial</h3>
                            <p>Selain fokus pada kesuksesan bisnis, Kang Ebod juga memiliki komitmen terhadap tanggung jawab sosial. 
                                Ia aktif terlibat dalam berbagai kegiatan sosial dan program pemberdayaan masyarakat, 
                                seperti pelatihan keterampilan untuk orang-orang yang membutuhkan.</p>
                            <h3 class="h4 fw-bold mb-2">Pemberdayaan Masyarakat dan Tanggung Jawab Sosial</h3>
                            <p>Berkat dedikasinya dalam mengembangkan bisnis dan memberikan dampak positif bagi masyarakat, 
                                Kang Ebod telah menerima berbagai penghargaan dan pengakuan dari lembaga bisnis dan pemerintah. 
                                Penghargaan tersebut merupakan bukti nyata atas prestasinya dalam mengelola perusahaan dengan baik</p>
                            <h3 class="h4 fw-bold mb-2">Kesimpulan</h3>
                            <p>Makhfudz Solaiman, atau Kang Ebod, adalah seorang pengusaha sukses yang melalui perjalanan panjang dari latar belakang sederhana menuju kesuksesan bisnis yang menginspirasi. 
                                Melalui kepemimpinannya di Ebod Jaya dan komitmennya terhadap pengembangan diri serta tanggung jawab sosial, ia telah menciptakan jejak positif dalam dunia bisnis dan masyarakat.</p>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>
    </base-layout>
</template>
<script>
import { Head } from '@inertiajs/vue3';
export default {
    components : {
        Head
    },
    setup() {
        
    },
}
</script>