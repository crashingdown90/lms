"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MonitorPlay, Loader2 } from "lucide-react";

export default function EnrollButton({ courseId, isEnrolled }: { courseId: string, isEnrolled: boolean }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleEnroll = async () => {
    if (isEnrolled) {
      router.push(`/course/${courseId}`);
      return;
    }

    setLoading(true);
    const res = await fetch(`/api/courses/${courseId}/enroll`, { method: "POST" });
    if (res.ok) {
      router.push(`/course/${courseId}`);
    } else {
      setLoading(false);
      alert("Gagal mendaftar pelatihan. Silakan coba lagi.");
    }
  };

  return (
    <button 
      onClick={handleEnroll}
      disabled={loading}
      className="w-full py-4 bg-primary text-white text-lg font-bold rounded-xl shadow-[0_8px_20px_-5px_rgba(141,198,63,0.4)] hover:-translate-y-1 hover:shadow-[0_12px_25px_-5px_rgba(141,198,63,0.5)] transition-all flex items-center justify-center gap-2 mb-4 disabled:opacity-70 disabled:transform-none"
    >
      {loading ? <Loader2 size={20} className="animate-spin" /> : <MonitorPlay size={20} />}
      {isEnrolled ? "Lanjutkan Belajar" : "Daftar & Mulai Belajar"}
    </button>
  );
}
