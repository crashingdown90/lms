"use client";

import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Play, Pause, CheckCircle, Award, ChevronLeft, Download, FileText, AlertTriangle, Volume2, VolumeX, Maximize, Loader2, ShieldAlert, X } from "lucide-react";
import Link from "next/link";

export default function CoursePage() {
  const params = useParams();
  const [dbCourse, setDbCourse] = useState<any>(null);
  const [dbUser, setDbUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Video states
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); 
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Anti-skip and completion states
  const [maxTimeWatched, setMaxTimeWatched] = useState(0);
  const [videoCompleted, setVideoCompleted] = useState(false);
  const [warningMsg, setWarningMsg] = useState("");

  // Quiz & Certificate States
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  // Dummy Quiz Data
  const quizQuestions = [
    {
      q: "Apa tujuan utama dari implementasi Good Corporate Governance (Tata Kelola Pemerintahan yang Baik)?",
      options: [
        "Meningkatkan anggaran pengeluaran instansi.",
        "Menciptakan pelayanan publik yang transparan dan akuntabel.",
        "Mengurangi jam kerja pegawai negeri."
      ],
      correct: 1
    },
    {
      q: "Fitur keamanan apa yang memastikan ASN benar-benar menyimak materi tanpa mencurangi durasi?",
      options: [
        "Fitur Resolusi 4K",
        "Sistem Anti-Skip Video",
        "Autoplay Otomatis"
      ],
      correct: 1
    },
    {
      q: "Sertifikat digital yang diperoleh dari LMS ini secara otomatis akan terintegrasi dengan...",
      options: [
        "Portal MyASN BKN",
        "Aplikasi SatuSehat",
        "Portal E-Tilang"
      ],
      correct: 0
    }
  ];

  useEffect(() => {
    const loadData = async () => {
      try {
        const [courseRes, userRes] = await Promise.all([
          fetch(`/api/courses/${params.id}`),
          fetch(`/api/user/dashboard`)
        ]);
        
        const courseData = await courseRes.json();
        const userData = await userRes.json();
        
        if (courseData.course) {
          setDbCourse(courseData.course);
          if (courseData.progress?.status === "SELESAI") {
            setVideoCompleted(true);
            setQuizCompleted(true);
            setQuizScore(courseData.progress.score || 100);
            setProgress(100);
            setMaxTimeWatched(9999);
          }
        }
        if (userData.user) {
          setDbUser(userData.user);
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    loadData();
  }, [params.id]);

  // Handle Video Play/Pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (playerContainerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        playerContainerRef.current.requestFullscreen();
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration || 1; 
      
      setCurrentTime(current);
      setProgress((current / total) * 100);

      if (current > maxTimeWatched) {
        setMaxTimeWatched(current);
      }

      if (total > 0 && current >= total - 1 && !videoCompleted) {
        setVideoCompleted(true);
      }
    }
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickPosition = (e.clientX - rect.left) / rect.width;
      const targetTime = clickPosition * duration;

      if (targetTime <= maxTimeWatched) {
        videoRef.current.currentTime = targetTime;
      } else {
        setWarningMsg("Anti-Skip: Anda tidak dapat melompati bagian yang belum ditonton.");
        setTimeout(() => setWarningMsg(""), 3000);
      }
    }
  };

  const handleSeeking = () => {
    if (videoRef.current) {
      if (videoRef.current.currentTime > maxTimeWatched + 1) { 
        videoRef.current.currentTime = maxTimeWatched;
        setWarningMsg("Anti-Skip: Anda tidak dapat melompati video materi.");
        setTimeout(() => setWarningMsg(""), 3000);
      }
    }
  };

  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return "00:00";
    const m = Math.floor(timeInSeconds / 60).toString().padStart(2, '0');
    const s = Math.floor(timeInSeconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Quiz Handlers
  const handleAnswerSelect = (idx: number) => {
    const newAnswers = [...answers];
    newAnswers[quizStep] = idx;
    setAnswers(newAnswers);
  };

  const handleNextQuiz = () => {
    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      // Evaluate
      let correctCount = 0;
      answers.forEach((ans, i) => {
        if (ans === quizQuestions[i].correct) correctCount++;
      });
      const finalScore = Math.round((correctCount / quizQuestions.length) * 100);
      setQuizScore(finalScore);
      setQuizCompleted(true);
      
      if (finalScore >= 70) {
        fetch(`/api/courses/${params.id}/progress`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "SELESAI", score: finalScore })
        });
      }
    }
  };

  const resetQuiz = () => {
    setQuizStep(0);
    setAnswers([]);
    setQuizCompleted(false);
    setQuizScore(0);
  };

  return (
    <div className="min-h-screen bg-transparent flex flex-col">
      <Header />
      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="animate-spin text-primary w-12 h-12" />
        </div>
      ) : (
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <Link href="/katalog" className="inline-flex items-center gap-1 text-sm text-muted hover:text-primary mb-6 transition-colors">
          <ChevronLeft size={16} /> Kembali ke Katalog
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content (Video Player) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* PREMIUM VIDEO PLAYER */}
            <div 
              ref={playerContainerRef}
              className="bg-black rounded-2xl overflow-hidden shadow-glass relative aspect-video border border-slate-800 flex items-center justify-center group cursor-pointer"
              onClick={togglePlay}
            >
              
              {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-20">
                  <Loader2 className="animate-spin text-primary w-12 h-12" />
                </div>
              )}

              {/* Reliable Video Source & Poster */}
              <video 
                ref={videoRef}
                className="w-full h-full object-contain bg-black"
                src={dbCourse?.videoUrl || "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4"}
                poster="/images/Asset_kota/Asset 11.png"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={(e) => {
                  setDuration(e.currentTarget.duration);
                  setIsLoaded(true);
                }}
                onSeeking={handleSeeking}
                onEnded={() => {
                  setIsPlaying(false);
                  setVideoCompleted(true);
                }}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                playsInline
              />

              {/* Anti Skip Warning */}
              {warningMsg && (
                <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-error text-white px-5 py-3 rounded-xl text-sm font-bold shadow-2xl flex items-center gap-2 animate-bounce z-50 border-2 border-white/20">
                  <AlertTriangle size={18} /> {warningMsg}
                </div>
              )}

              {/* Custom Controls Overlay */}
              <div 
                className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pt-12 pb-4 px-4 flex flex-col gap-3 transition-opacity duration-300 z-30 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}
                onClick={(e) => e.stopPropagation()} 
              >
                {/* Clickable Progress Bar */}
                <div 
                  className="w-full h-2 bg-slate-600/50 rounded-full overflow-hidden cursor-pointer relative group/progress"
                  onClick={handleProgressBarClick}
                >
                  <div className="absolute top-0 left-0 h-full bg-slate-400/50 transition-all" style={{ width: `${(maxTimeWatched / (duration || 1)) * 100}%` }}></div>
                  <div className="absolute top-0 left-0 h-full bg-primary transition-all duration-100 relative" style={{ width: `${progress}%` }}>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow opacity-0 group-hover/progress:opacity-100 transition-opacity"></div>
                  </div>
                </div>
                
                {/* Control Buttons */}
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-5">
                    <button onClick={togglePlay} className="hover:text-primary transition-transform hover:scale-110">
                      {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
                    </button>
                    
                    <button onClick={toggleMute} className="hover:text-primary transition-transform hover:scale-110">
                      {isMuted ? <VolumeX size={22} /> : <Volume2 size={22} />}
                    </button>

                    <span className="text-xs font-medium font-mono">
                      {formatTime(currentTime)} <span className="text-slate-400 mx-1">/</span> {formatTime(duration)}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-[10px] font-bold text-success uppercase tracking-widest bg-black/60 border border-success/30 px-3 py-1.5 rounded-full flex items-center gap-1">
                      <ShieldAlert size={12} /> Anti-Skip Aktif
                    </div>
                    <button onClick={toggleFullscreen} className="hover:text-primary transition-transform hover:scale-110">
                      <Maximize size={22} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Big Play Button Center (if paused) */}
              {!isPlaying && isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 bg-black/20">
                  <div className="w-20 h-20 bg-primary/90 text-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(30,64,175,0.5)] backdrop-blur-md animate-pulse">
                    <Play size={40} className="ml-2" fill="currentColor" />
                  </div>
                </div>
              )}
            </div>

            {/* Course Information */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-subtle border border-border">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-primary-light text-primary text-xs font-bold rounded-full uppercase tracking-wider">Modul 1</span>
                {videoCompleted && <span className="px-3 py-1 bg-green-100 text-success text-xs font-bold rounded-full uppercase tracking-wider flex items-center gap-1"><CheckCircle size={14}/> Video Selesai</span>}
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">{dbCourse?.title}</h1>
              <p className="text-muted leading-relaxed text-sm sm:text-base">
                {dbCourse?.description || "Materi pelatihan interaktif. Tonton video ini sampai selesai untuk membuka kuis ujian."}
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-card border border-border rounded-xl p-6 shadow-subtle sticky top-24">
              <h3 className="font-bold text-foreground mb-6 border-b border-slate-100 pb-4">Status Pelatihan Anda</h3>
              
              <div className="space-y-5 mb-8">
                {/* Video Status */}
                <div className="flex items-start gap-4 text-sm relative before:absolute before:left-3.5 before:top-8 before:w-0.5 before:h-8 before:bg-slate-200">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm z-10 transition-colors ${videoCompleted ? 'bg-success text-white' : 'bg-primary text-white'}`}>
                    {videoCompleted ? <CheckCircle size={16} /> : <Play size={14} fill="currentColor" />}
                  </div>
                  <div className="pt-1.5">
                    <span className={videoCompleted ? 'text-success font-bold block' : 'text-primary font-bold block'}>Menonton Video Materi</span>
                    <span className="text-xs text-muted">Durasi: {formatTime(duration)}</span>
                  </div>
                </div>
                
                {/* Quiz Status */}
                <div className="flex items-start gap-4 text-sm relative">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm z-10 transition-colors ${quizCompleted && quizScore >= 70 ? 'bg-success text-white' : (videoCompleted ? 'bg-warning text-white' : 'bg-slate-100 text-muted')}`}>
                    {(quizCompleted && quizScore >= 70) ? <CheckCircle size={16} /> : <FileText size={16} />}
                  </div>
                  <div className="pt-1.5">
                    <span className={(quizCompleted && quizScore >= 70) ? 'text-success font-bold block' : (videoCompleted ? 'text-warning font-bold block' : 'text-muted font-semibold block')}>
                      Kuis Akhir Modul
                    </span>
                    <span className="text-xs text-muted">Nilai Minimal Lulus: 70</span>
                  </div>
                </div>
              </div>

              {/* Action Button Logic */}
              {(quizCompleted && quizScore >= 70) ? (
                <button 
                  onClick={() => setShowCertificateModal(true)}
                  className="w-full py-4 bg-gradient-to-r from-primary to-primary-hover text-white font-bold rounded-xl shadow-[0_8px_20px_-5px_rgba(30,64,175,0.4)] hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                >
                  <Award size={22} /> KLAIM SERTIFIKAT
                </button>
              ) : videoCompleted ? (
                <button 
                  onClick={() => setShowQuizModal(true)}
                  className="w-full py-4 bg-warning text-white font-bold rounded-xl shadow-[0_8px_20px_-5px_rgba(234,179,8,0.4)] hover:-translate-y-1 transition-all flex items-center justify-center gap-2 animate-bounce"
                >
                  <FileText size={20} /> MULAI KUIS AKHIR
                </button>
              ) : (
                <div className="w-full bg-slate-50 border border-slate-200 rounded-xl overflow-hidden">
                  <div className="p-4 flex flex-col items-center justify-center text-center">
                    <span className="text-sm font-bold text-muted mb-2">Progres Menonton</span>
                    <span className="text-3xl font-black text-slate-300">{Math.round(progress)}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200">
                    <div className="h-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }}></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      )}
      
      <Footer />

      {/* QUIZ MODAL */}
      {showQuizModal && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-border flex justify-between items-center bg-slate-50">
              <h2 className="font-bold text-foreground flex items-center gap-2">
                <FileText size={20} className="text-primary" /> Kuis Akhir Modul
              </h2>
              <button onClick={() => setShowQuizModal(false)} className="text-muted hover:text-error transition-colors p-1"><X size={24} /></button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              {!quizCompleted ? (
                // QUIZ IN PROGRESS
                <div className="space-y-6">
                  <div className="flex justify-between items-center text-sm font-bold text-muted mb-2">
                    <span>Pertanyaan {quizStep + 1} dari {quizQuestions.length}</span>
                    <span className="text-primary">Progres: {Math.round(((quizStep) / quizQuestions.length) * 100)}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full mb-8 overflow-hidden">
                    <div className="h-full bg-primary transition-all" style={{ width: `${((quizStep) / quizQuestions.length) * 100}%` }}></div>
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-6 leading-relaxed">
                    {quizQuestions[quizStep].q}
                  </h3>

                  <div className="space-y-3">
                    {quizQuestions[quizStep].options.map((opt, idx) => (
                      <button 
                        key={idx}
                        onClick={() => handleAnswerSelect(idx)}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all ${answers[quizStep] === idx ? 'border-primary bg-primary-light text-primary font-bold shadow-sm' : 'border-slate-200 hover:border-primary/50 hover:bg-slate-50 text-foreground font-medium'}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border-2 ${answers[quizStep] === idx ? 'border-primary bg-primary text-white' : 'border-slate-300'}`}>
                            {answers[quizStep] === idx && <CheckCircle size={14} />}
                          </div>
                          {opt}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                // QUIZ RESULT
                <div className="text-center py-8">
                  {quizScore >= 70 ? (
                    <>
                      <div className="w-24 h-24 bg-green-100 text-success rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                        <CheckCircle size={48} />
                      </div>
                      <h2 className="text-3xl font-black text-foreground mb-2">Lulus!</h2>
                      <p className="text-muted mb-6">Nilai Anda: <span className="text-success font-bold text-xl">{quizScore}</span>/100</p>
                      <p className="text-sm text-muted mb-8 max-w-md mx-auto">Selamat, Anda telah memenuhi syarat kelulusan modul ini. Sertifikat kompetensi Anda kini siap diunduh.</p>
                      <button 
                        onClick={() => {
                          setShowQuizModal(false);
                          setShowCertificateModal(true);
                        }}
                        className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-md hover:bg-primary-hover transition-colors text-lg"
                      >
                        Klaim Sertifikat Sekarang
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="w-24 h-24 bg-red-100 text-error rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                        <AlertTriangle size={48} />
                      </div>
                      <h2 className="text-3xl font-black text-foreground mb-2">Belum Lulus</h2>
                      <p className="text-muted mb-6">Nilai Anda: <span className="text-error font-bold text-xl">{quizScore}</span>/100</p>
                      <p className="text-sm text-muted mb-8 max-w-md mx-auto">Maaf, nilai Anda belum memenuhi standar kelulusan (Minimum: 70). Silakan pelajari kembali materi dan ulangi kuis.</p>
                      <button 
                        onClick={resetQuiz}
                        className="w-full py-4 bg-slate-100 text-foreground font-bold rounded-xl shadow-sm hover:bg-slate-200 transition-colors"
                      >
                        Coba Kuis Lagi
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
            
            {!quizCompleted && (
              <div className="p-4 border-t border-border bg-slate-50 flex justify-end">
                <button 
                  onClick={handleNextQuiz}
                  disabled={answers[quizStep] === undefined}
                  className="px-8 py-3 bg-primary text-white font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-hover transition-colors"
                >
                  {quizStep === quizQuestions.length - 1 ? 'Selesai & Kumpulkan' : 'Selanjutnya'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Certificate Success Modal */}
      {showCertificateModal && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="bg-gradient-to-r from-primary to-primary-hover p-8 text-center text-white relative">
              <div className="w-20 h-20 bg-white rounded-full mx-auto flex items-center justify-center text-warning shadow-xl mb-4">
                <Award size={40} />
              </div>
              <h2 className="text-2xl font-bold mb-2">Selamat! Anda Lulus</h2>
              <p className="text-primary-light text-sm">Anda telah menyelesaikan pelatihan dan kuis dengan baik.</p>
              
              <div className="absolute top-0 right-0 w-32 h-32 border-4 border-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 border-4 border-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
            </div>
            
            <div className="p-8 text-center bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
              <div className="border-4 border-double border-slate-200 p-6 rounded-xl bg-white/90 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-amber-400/20 rounded-bl-full flex items-start justify-end p-2">
                  <Award size={20} className="text-amber-500" />
                </div>
                <h3 className="text-[10px] font-bold text-muted uppercase tracking-widest mb-4">Sertifikat Kompetensi Nasional</h3>
                <h4 className="text-2xl font-black text-foreground mb-1 uppercase tracking-wide">{dbUser?.name || "Pegawai ASN"}</h4>
                <p className="text-sm text-muted mb-6">NIP. {dbUser?.nip || "198501012010011012"}</p>
                <div className="w-16 h-1 bg-primary mx-auto mb-6 rounded-full"></div>
                <p className="text-xs font-medium text-foreground mb-1">Diberikan atas kelulusan pada materi:</p>
                <p className="text-base font-bold text-primary leading-tight mb-2">{dbCourse?.title}</p>
                <p className="text-xs font-bold text-success bg-green-50 px-2 py-1 rounded inline-block">Skor Akhir: {quizScore}/100</p>
              </div>
              
              <div className="mt-8 flex gap-3">
                <button 
                  onClick={() => setShowCertificateModal(false)}
                  className="flex-1 py-3 bg-slate-100 text-foreground font-bold rounded-xl hover:bg-slate-200 transition-colors text-sm"
                >
                  Tutup
                </button>
                <button 
                  onClick={() => window.print()}
                  className="flex-1 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover shadow-md transition-colors text-sm flex items-center justify-center gap-2"
                >
                  <Download size={16} /> Cetak & Unduh PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
