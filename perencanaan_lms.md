# Perencanaan Sistem Learning Management System (LMS) Berbasis Video

## 1. Deskripsi Umum
Sistem ini adalah sebuah Learning Management System (LMS) interaktif yang berfokus pada pembelajaran berbasis video. Sistem dirancang untuk memastikan peserta benar-benar mengikuti materi pembelajaran dari awal hingga akhir tanpa kecurangan (anti-skip). Setelah menyelesaikan materi, peserta akan diuji melalui sistem tes/kuis terintegrasi, dan setelah lulus akan mendapatkan sertifikat online secara otomatis. Sistem juga dilengkapi dengan fitur analitik untuk memantau kebiasaan dan metrik interaksi peserta.

## 2. Fitur Utama

### A. Autentikasi & Manajemen Pengguna
*   **Registrasi & Login:** Sistem login yang aman (bisa menggunakan email/password atau OAuth seperti Google/Facebook).
*   **Profil Pengguna:** Halaman profil bagi peserta untuk melihat progres belajar, riwayat nilai ujian, dan sertifikat yang telah diperoleh.
*   **Dashboard Peserta:** Katalog materi pembelajaran di mana peserta dapat memilih kursus atau materi yang ingin dipelajari.

### B. Pemutar Video Khusus (Anti-Cheat / Anti-Skip)
*   **Video-Based Learning:** Seluruh materi utama disajikan dalam format video.
*   **Non-Skippable Player:** Video player dikonfigurasi secara khusus agar tombol *seek/fast-forward* (percepatan video) dinonaktifkan. Peserta tidak dapat melompati durasi video ke depan.
*   **Resume Capability:** Jika peserta keluar di tengah video, sistem menyimpan posisi terakhir (timestamp) sehingga peserta bisa melanjutkannya nanti tanpa mengulang dari awal, tetapi tetap tidak bisa melompat ke depan.
*   **Focus Tracking:** Jika pengguna memindahkan tab browser atau me-minimize jendela, video akan otomatis berhenti (pause) untuk memastikan mereka benar-benar menonton.

### C. Sistem Ujian / Evaluasi
*   **Kuis Berbasis Pertanyaan:** Setelah satu materi video selesai ditonton hingga detik terakhir, tombol untuk memulai ujian/tes baru akan terbuka (ter-unlock).
*   **Berbagai Format Soal:** Pilihan ganda (Multiple Choice), Benar/Salah (True/False), atau jawaban singkat.
*   **Batas Waktu (Timer):** Ujian memiliki batas waktu pengerjaan.
*   **Sistem Penilaian Otomatis:** Nilai akan langsung keluar setelah ujian selesai. Terdapat nilai batas kelulusan (Passing Grade). Jika gagal, peserta bisa mengulang ujian (opsional: bisa diwajibkan menonton ulang sebagian materi atau diberi cooldown time).

### D. Sertifikat Online
*   **Sertifikat Otomatis:** Setelah peserta lulus ujian untuk suatu kursus/modul, sistem otomatis membuatkan (generate) sertifikat digital dalam format PDF atau gambar (PNG/JPG).
*   **Validasi Keaslian:** Sertifikat memiliki ID unik atau QR Code yang dapat dipindai untuk memverifikasi keasliannya di sistem.
*   **Nama Peserta Dinamis:** Sertifikat mencetak nama pengguna sesuai profil dan tanggal penyelesaian.

### E. Pelacakan Kebiasaan & Analitik (User Behavior Tracking)
*   **Watch Time Analytics:** Merekam berapa lama peserta benar-benar menonton video.
*   **Drop-off Rate:** Mengetahui di menit ke berapa pada video peserta sering berhenti atau keluar.
*   **Test Attempts & Analysis:** Mencatat berapa kali peserta gagal ujian sebelum lulus dan soal mana yang paling sering dijawab salah (untuk mengevaluasi kualitas materi/soal).
*   **Log Aktivitas:** Menyimpan data setiap klik, waktu login, dan interaksi (misalnya seberapa sering mereka melakukan *pause*).

---

## 3. Desain & Antarmuka (Dashboard Pengguna)

Sistem ini dirancang khusus untuk **BKPSDM (Badan Kepegawaian dan Pengembangan Sumber Daya Manusia) Pemerintah Kota Sukabumi**. Oleh karena itu, antarmuka pengguna (UI) akan mencerminkan profesionalisme instansi pemerintahan, namun tetap *modern* dan sangat mudah digunakan (*User Friendly*).

### A. Konsep Visual & Tema
*   **Clean & White Aesthetic:** Tema utama menggunakan latar belakang putih bersih (*clean white*) dengan tata letak (*layout*) yang luas dan tidak padat (*ample white-space*). Tujuannya agar mata peserta tidak cepat lelah saat belajar.
*   **Aksen Warna (Color Palette):** Menggunakan perpaduan warna identitas Pemerintah Kota Sukabumi (misalnya biru elegan sebagai warna utama, dipadukan dengan sentuhan abu-abu terang dan aksen emas/hijau kalem untuk notifikasi/progres).
*   **Modern Typography:** Menggunakan jenis huruf (font) Sans-Serif yang tegas, bersih, dan modern (seperti Inter, Plus Jakarta Sans, atau Roboto) agar mudah dibaca di layar HP maupun laptop.
*   **Soft Shadows & Glassmorphism:** Elemen seperti kartu materi (*course cards*) akan memiliki efek bayangan yang sangat halus (*subtle shadow*) agar terlihat melayang elegan, bukan kaku.

### B. Struktur Dashboard Peserta (ASN/Pegawai)
Ketika ASN atau pegawai berhasil masuk (login) ke LMS, mereka akan melihat dashboard dengan struktur:

1.  **Header (Bagian Atas):**
    *   Sebelah kiri: Logo **Pemerintah Kota Sukabumi** beserta teks **LMS BKPSDM**.
    *   Sebelah kanan: Foto profil, Nama Lengkap, NIP, serta ikon lonceng untuk Notifikasi.
2.  **Papan Sambutan (Welcome Banner):**
    *   Sapaan hangat (contoh: *"Selamat Pagi, [Nama Pegawai]. Mari tingkatkan kompetensi Anda hari ini!"*).
    *   Bisa berisi pengumuman singkat atau *running text* informasi dari admin BKPSDM.
3.  **Ringkasan Statistik (Quick Stats):**
    *   Tiga kotak minimalis berjajar mendatar yang menampilkan:
        *   **Pelatihan Aktif:** Angka jumlah materi yang sedang diikuti.
        *   **Pelatihan Selesai:** Total modul yang telah dituntaskan.
        *   **Sertifikat Diraih:** Jumlah sertifikat kompetensi yang sudah didapat.
4.  **Lanjutkan Belajar (Resume Course):**
    *   Sebuah kartu besar yang langsung menonjolkan video/materi terakhir yang belum selesai.
    *   Menampilkan indikator progres (misal: *Bar* melengkung menunjukkan "75% Selesai") dan tombol besar **"Lanjutkan Nonton"**.
5.  **Katalog Materi Pelatihan:**
    *   Grid/Daftar materi yang tersedia, ditampilkan dalam bentuk kartu bersih berujung sedikit membulat (*rounded corners*).
    *   Tiap kartu memuat gambar *thumbnail*, judul pelatihan, nama instruktur/pemateri, durasi total, dan lencana (*badge*) status (Belum Dimulai, Terkunci, atau Selesai).
6.  **Akses Ujian & Sertifikat:**
    *   Area khusus di mana peserta dapat langsung mengeklik untuk mengikuti ujian jika syarat video sudah terpenuhi.
    *   Galeri sertifikat mini tempat peserta bisa langsung mengunduh sertifikat ber-QR Code dari pelatihan yang telah lulus.

---

## 4. Arsitektur & Teknologi (Rekomendasi)

Untuk mencapai tujuan di atas, berikut adalah rekomendasi tumpukan teknologi (Tech Stack):

*   **Frontend (Antarmuka Pengguna):**
    *   **Framework:** Next.js (React) atau Vue.js. Sangat baik untuk performa dan interaktivitas tingkat tinggi.
    *   **Styling:** Tailwind CSS untuk UI yang modern dan responsif.
    *   **Video Player:** Menggunakan library seperti `video.js` dengan custom plugin, atau mengontrol HTML5 `<video>` API secara langsung via JavaScript untuk mencegah *seeking* dan memantau *timestamp*.
*   **Backend (Logika Server & API):**
    *   **Framework:** Node.js (Express/NestJS), Python (Django/FastAPI), atau PHP (Laravel).
    *   **Autentikasi:** NextAuth.js, Supabase, atau JWT.
*   **Database:**
    *   **Relational (SQL):** PostgreSQL atau MySQL untuk mengelola data user, relasi kursus, dan sertifikat dengan integritas tinggi yang terstruktur.
*   **Penyimpanan Media (Video Hosting):**
    *   *Sangat disarankan **TIDAK** menggunakan YouTube karena mudah diakali dan di-skip.*
    *   **Solusi:** AWS S3 dipadukan dengan CloudFront (CDN), atau menggunakan layanan *Video on Demand* khusus seperti Mux, Vimeo Pro (dengan API kontrol penuh), atau Cloudflare Stream agar aman dari *download* ilegal menggunakan format streaming HLS (*HTTP Live Streaming*).

---

## 5. Mekanisme Keamanan "Anti-Akal-akalan" (Cheat Prevention)

1.  **Server-Side Validation:** Jangan hanya mengandalkan frontend (browser) untuk mencegah skip. Video player akan mengirimkan 'ping' secara berkala (misal setiap 5 detik) ke server bersamaan dengan *timestamp* video. Server akan memvalidasi apakah penambahan waktu logis. Jika pengguna memanipulasi kode frontend untuk melompat ke menit akhir, server akan menolak akses kuis karena log rekam jejak 'ping' mereka tidak lengkap.
2.  **HLS Streaming:** Video tidak bisa diunduh secara utuh menggunakan IDM (Internet Download Manager) atau ekstensi browser, karena dipecah menjadi fragmen-fragmen kecil.
3.  **Watermark Dinamis:** Menampilkan nomor ID, nama, atau email peserta secara acak dan transparan di atas pemutar video untuk mencegah perekaman layar (Screen Recording) atau pendistribusian materi secara ilegal.
4.  **Page Visibility API:** Memanfaatkan API browser untuk mendeteksi apakah tab LMS sedang aktif dilihat. Jika tab ditutup, di-minimize, atau pengguna membuka aplikasi/tab lain, video otomatis akan di-*Pause*.

---

## 6. Fase Pengembangan (Roadmap)

*   **Fase 1: Minimum Viable Product (MVP) - 2 s/d 3 Minggu**
    *   Setup Database, Server, dan Frontend.
    *   Sistem Login & Register.
    *   Upload materi video pertama & katalog kursus.
    *   Pembuatan *Custom Video Player* dengan fitur dasar Anti-Skip.
*   **Fase 2: Ujian & Sertifikasi - 2 Minggu**
    *   Sistem pembuatan soal dan database kuis di admin panel.
    *   Logika *Unlock* kuis (hanya bisa dibuka jika video sudah 100% ditonton).
    *   Sistem *grading* (penilaian) otomatis.
    *   Generator sertifikat dinamis (PDF) dengan template.
*   **Fase 3: Security & Analytics - 1 s/d 2 Minggu**
    *   Implementasi *server-side validation* untuk mencegah kecurangan video.
    *   Pause otomatis jika pindah tab (Focus Tracking).
    *   Dashboard analitik khusus admin untuk memantau data kebiasaan pengguna.
*   **Fase 4: Testing & Peluncuran - 1 Minggu**
    *   User Acceptance Testing (UAT).
    *   Stress testing & pengecekan celah keamanan.
    *   Deployment (peluncuran) ke server produksi.
