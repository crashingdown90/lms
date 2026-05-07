"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Bell, User, LogOut, Menu, X } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Dashboard", href: "/" },
    { name: "Katalog Pelatihan", href: "/katalog" },
    { name: "Sertifikat Saya", href: "/sertifikat" },
    { name: "Panduan", href: "/panduan" },
  ];

  return (
    <header className="sticky top-0 z-50 glass border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo & Brand */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-primary to-accent rounded-full flex items-center justify-center text-primary-foreground font-bold shrink-0 shadow-[0_0_15px_rgba(141,198,63,0.3)]">
              <span className="text-xl">▶</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-bold text-foreground text-lg leading-tight group-hover:text-primary transition-colors">SOLASIDO</h1>
              <p className="text-[10px] text-muted font-medium">Pemkot Sukabumi</p>
            </div>
          </Link>
        </div>

        {/* Center Navigation (Desktop) */}
        <nav className="hidden lg:flex items-center gap-8 font-semibold text-sm">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.name}
                href={link.href} 
                className={`py-5 border-b-2 transition-colors ${isActive ? 'text-primary border-primary' : 'text-muted border-transparent hover:text-primary hover:border-primary/50'}`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center justify-end gap-2 sm:gap-4">
          <button className="relative p-2 text-muted hover:text-primary transition-colors rounded-full hover:bg-slate-100 hidden sm:block">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full border-2 border-white"></span>
          </button>
          
          <div className="flex items-center gap-2 sm:gap-3 sm:border-l border-border sm:pl-4">
            <div className="text-right hidden md:block">
              <p className="text-sm font-bold text-foreground leading-tight">Drefan Sukabumi</p>
              <p className="text-[11px] text-muted">NIP. 198501012010011012</p>
            </div>
            
            <Link href="/profile" title="Profil Saya" className="ml-1">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary-light border border-primary/20 flex items-center justify-center text-primary overflow-hidden shrink-0 shadow-sm cursor-pointer hover:bg-primary hover:text-white transition-all">
                <User size={20} />
              </div>
            </Link>
            
            <Link 
              href="/api/auth/logout" 
              title="Keluar (Logout)"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-error/10 text-error flex items-center justify-center hover:bg-error hover:text-white transition-all shadow-sm"
            >
              <LogOut size={18} className="ml-0.5" />
            </Link>

            {/* Mobile Menu Toggle */}
            <button 
              className="lg:hidden p-2 text-muted hover:text-primary rounded-lg bg-slate-100 ml-1"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 right-0 bg-white border-b border-border shadow-xl p-4 animate-in slide-in-from-top-2">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.name}
                  href={link.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`p-3 rounded-lg font-semibold text-sm transition-colors ${isActive ? 'bg-primary-light text-primary' : 'text-foreground hover:bg-slate-50'}`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
