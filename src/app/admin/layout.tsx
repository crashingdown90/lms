"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  PieChart, Activity, Users, BookOpen, Award, 
  MessageSquare, ClipboardList, Settings, LogOut, 
  X, Menu, Bell, ShieldCheck
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/admin' && pathname === '/admin') return true;
    if (path !== '/admin' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      
      {/* SIDEBAR BACKDROP FOR MOBILE */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden backdrop-blur-sm transition-opacity" 
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* SIDEBAR ADMIN */}
      <aside className={`w-64 bg-[#0B1120] text-slate-300 flex flex-col fixed inset-y-0 left-0 z-30 shadow-2xl transition-transform duration-300 ease-in-out lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-primary/20 border border-white/10">
              KS
            </div>
            <div>
              <h1 className="font-bold text-white text-lg leading-tight">Admin Pusat</h1>
              <p className="text-[10px] text-slate-400 font-medium">BKPSDM Kota Sukabumi</p>
            </div>
          </div>
          <button className="lg:hidden text-slate-400 hover:text-white" onClick={() => setIsSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide py-4">
          <nav className="space-y-1 px-3">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 mt-2 px-3">DASHBOARD</p>
            <Link 
              href="/admin"
              onClick={() => setIsSidebarOpen(false)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-bold transition-colors text-left ${isActive('/admin') ? "bg-primary/15 text-white border border-primary/20 shadow-sm" : "hover:bg-white/5 hover:text-white"}`}
            >
              <PieChart size={18} className={`shrink-0 ${isActive('/admin') ? "text-primary-light" : ""}`} /> 
              <span className="truncate">Ringkasan Utama</span>
            </Link>
            <Link 
              href="/admin/analytics"
              onClick={() => setIsSidebarOpen(false)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left ${isActive('/admin/analytics') ? "bg-primary/15 text-white border border-primary/20 shadow-sm font-bold" : "hover:bg-white/5 hover:text-white font-medium"}`}
            >
              <Activity size={18} className={`shrink-0 ${isActive('/admin/analytics') ? "text-primary-light" : ""}`} /> 
              <span className="truncate">Analitik Lanjutan</span>
            </Link>
            
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 mt-8 px-3">MANAJEMEN</p>
            <Link 
              href="/admin/users"
              onClick={() => setIsSidebarOpen(false)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors justify-between text-left ${isActive('/admin/users') ? "bg-primary/15 text-white border border-primary/20 shadow-sm font-bold" : "hover:bg-white/5 hover:text-white font-medium"}`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <Users size={18} className={`shrink-0 ${isActive('/admin/users') ? "text-primary-light" : ""}`} /> 
                <span className="truncate">Data Pegawai</span>
              </div>
              <span className="bg-primary/20 text-primary-light text-[10px] py-0.5 px-2 rounded-full font-bold shrink-0">3.2k</span>
            </Link>
            <Link 
              href="/admin/modules"
              onClick={() => setIsSidebarOpen(false)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left ${isActive('/admin/modules') ? "bg-primary/15 text-white border border-primary/20 shadow-sm font-bold" : "hover:bg-white/5 hover:text-white font-medium"}`}
            >
              <BookOpen size={18} className={`shrink-0 ${isActive('/admin/modules') ? "text-primary-light" : ""}`} /> 
              <span className="truncate">Modul Pelatihan</span>
            </Link>
            <Link 
              href="/admin/certificates"
              onClick={() => setIsSidebarOpen(false)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors justify-between text-left ${isActive('/admin/certificates') ? "bg-primary/15 text-white border border-primary/20 shadow-sm font-bold" : "hover:bg-white/5 hover:text-white font-medium"}`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <Award size={18} className={`shrink-0 ${isActive('/admin/certificates') ? "text-primary-light" : ""}`} /> 
                <span className="truncate">Validasi Sertifikat</span>
              </div>
              <span className="bg-error/20 text-error text-[10px] py-0.5 px-2 rounded-full font-bold shrink-0">3</span>
            </Link>
            <Link 
              href="/admin/helpdesk"
              onClick={() => setIsSidebarOpen(false)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors justify-between text-left ${isActive('/admin/helpdesk') ? "bg-primary/15 text-white border border-primary/20 shadow-sm font-bold" : "hover:bg-white/5 hover:text-white font-medium"}`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <MessageSquare size={18} className={`shrink-0 ${isActive('/admin/helpdesk') ? "text-primary-light" : ""}`} /> 
                <span className="truncate">Pusat Bantuan</span>
              </div>
              <span className="bg-amber-500/20 text-amber-500 text-[10px] py-0.5 px-2 rounded-full font-bold shrink-0">2</span>
            </Link>
            
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 mt-8 px-3">SISTEM & PENGATURAN</p>
            <Link 
              href="/admin/logs"
              onClick={() => setIsSidebarOpen(false)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left ${isActive('/admin/logs') ? "bg-primary/15 text-white border border-primary/20 shadow-sm font-bold" : "hover:bg-white/5 hover:text-white font-medium"}`}
            >
              <ClipboardList size={18} className={`shrink-0 ${isActive('/admin/logs') ? "text-primary-light" : ""}`} /> 
              <span className="truncate">Log Aktivitas</span>
            </Link>
            <Link 
              href="/admin/settings"
              onClick={() => setIsSidebarOpen(false)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left ${isActive('/admin/settings') ? "bg-primary/15 text-white border border-primary/20 shadow-sm font-bold" : "hover:bg-white/5 hover:text-white font-medium"}`}
            >
              <Settings size={18} className={`shrink-0 ${isActive('/admin/settings') ? "text-primary-light" : ""}`} /> 
              <span className="truncate">Konfigurasi LMS</span>
            </Link>
          </nav>
        </div>

        <div className="p-4 border-t border-white/10 bg-black/20">
          <Link href="/" className="flex items-center justify-center gap-2 px-3 py-3 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 border border-red-500/20 rounded-lg font-bold transition-colors w-full text-sm">
            <LogOut size={16} /> Keluar Ke Portal
          </Link>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 lg:ml-64 flex flex-col min-h-screen relative">
        
        {/* TOP NAVBAR */}
        <header className="bg-white/80 backdrop-blur-md h-16 border-b border-border flex items-center justify-between px-4 sm:px-6 sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-3">
            <button 
              className="lg:hidden p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <h2 className="font-bold text-foreground text-lg hidden sm:block">Command Center</h2>
            <span className="px-2.5 py-1 bg-green-50 border border-green-200 text-success text-[10px] font-bold rounded-full hidden sm:flex items-center gap-1.5 uppercase tracking-widest animate-pulse">
              <span className="w-1.5 h-1.5 bg-success rounded-full shadow-[0_0_5px_#22c55e]"></span> Sistem Online
            </span>
          </div>

          <div className="flex items-center gap-5">
            <button className="relative p-2 text-slate-400 hover:text-primary transition-colors bg-slate-50 rounded-full border border-slate-100">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 cursor-pointer group border-l border-slate-200 pl-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-foreground leading-none group-hover:text-primary transition-colors">Admin Super</p>
                <p className="text-[10px] text-muted font-medium mt-0.5">Kepala BKPSDM</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-slate-800 to-slate-700 text-white flex items-center justify-center font-bold border-2 border-white shadow-sm">
                <ShieldCheck size={20} />
              </div>
            </div>
          </div>
        </header>

        {/* DYNAMIC CONTENT */}
        <div className="p-6 sm:p-8 flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
