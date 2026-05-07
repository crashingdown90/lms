import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Trophy, Medal, Award, Star, Search, ShieldCheck } from "lucide-react";

export default function LeaderboardPage() {
  const topThree = [
    { rank: 2, name: "Siti Rahmawati, S.E.", nip: "198805...2001", unit: "Dinas Pendidikan", jp: 145, medal: "bg-slate-300 text-slate-700", ring: "ring-slate-300" },
    { rank: 1, name: "Budi Santoso, S.Kom., M.Si", nip: "198203...1003", unit: "Diskominfo", jp: 182, medal: "bg-amber-400 text-amber-900", ring: "ring-amber-400", isWinner: true },
    { rank: 3, name: "Ahmad Fauzan, S.STP", nip: "199011...1005", unit: "Kecamatan Cikole", jp: 130, medal: "bg-amber-700 text-amber-100", ring: "ring-amber-700" }
  ];

  const runnersUp = [
    { rank: 4, name: "Dr. Rina Puspita", nip: "197502...2001", unit: "Dinas Kesehatan", jp: 120 },
    { rank: 5, name: "Agus Maulana, S.T.", nip: "198507...1002", unit: "Dinas PUPR", jp: 115 },
    { rank: 6, name: "Dewi Lestari, S.Pd", nip: "198909...2004", unit: "Dinas Pendidikan", jp: 110 },
    { rank: 7, name: "Hendra Gunawan, S.E.", nip: "198101...1001", unit: "BAPPEDA", jp: 105 },
    { rank: 8, name: "Maya Indah, S.IP", nip: "199204...2002", unit: "Setda Kota", jp: 98 },
    { rank: 9, name: "Reza Pahlevi, S.Kom", nip: "199508...1001", unit: "Diskominfo", jp: 95 },
    { rank: 10, name: "Fitria Andayani, M.Kes", nip: "198306...2003", unit: "RSUD R. Syamsudin", jp: 92 },
  ];

  return (
    <div className="min-h-screen bg-transparent flex flex-col">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-amber-100 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border-4 border-amber-50">
            <Trophy size={40} />
          </div>
          <h1 className="text-4xl font-black text-foreground mb-4">Papan Peringkat Kompetensi</h1>
          <p className="text-muted text-lg max-w-2xl mx-auto leading-relaxed">
            Apresiasi tertinggi untuk Aparatur Sipil Negara (ASN) Pemerintah Kota Sukabumi dengan pencapaian Jam Pelajaran (JP) terbanyak tahun ini.
          </p>
        </div>

        {/* Podium Top 3 */}
        <div className="flex flex-col sm:flex-row items-end justify-center gap-4 sm:gap-6 lg:gap-8 mb-20 px-4">
          {topThree.map((user) => (
            <div key={user.rank} className={`flex flex-col items-center w-full sm:w-1/3 ${user.isWinner ? 'order-1 sm:order-2 z-10' : (user.rank === 2 ? 'order-2 sm:order-1' : 'order-3')}`}>
              
              {/* Avatar & Name */}
              <div className="flex flex-col items-center mb-6 relative">
                {user.isWinner && (
                  <div className="absolute -top-8 text-amber-500 animate-bounce">
                    <Star size={32} fill="currentColor" />
                  </div>
                )}
                <div className={`w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 ${user.ring} bg-slate-100 flex items-center justify-center shadow-xl overflow-hidden relative mb-4`}>
                  <img 
                    src={`https://ui-avatars.com/api/?name=${user.name}&background=random&color=fff&size=150`} 
                    alt={user.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute bottom-0 left-0 right-0 py-1 text-center font-black text-sm ${user.medal}`}>
                    #{user.rank}
                  </div>
                </div>
                <h3 className="font-bold text-foreground text-center line-clamp-1">{user.name}</h3>
                <p className="text-xs text-muted text-center">{user.unit}</p>
              </div>

              {/* Podium Block */}
              <div className={`w-full rounded-t-2xl flex flex-col items-center justify-start pt-6 shadow-2xl relative overflow-hidden
                ${user.isWinner ? 'h-48 sm:h-64 bg-gradient-to-t from-amber-500 to-amber-300' : 
                 (user.rank === 2 ? 'h-40 sm:h-48 bg-gradient-to-t from-slate-400 to-slate-200' : 
                                    'h-32 sm:h-40 bg-gradient-to-t from-amber-800 to-amber-600')}`}
              >
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay"></div>
                <div className="text-white font-black text-4xl sm:text-5xl mb-2 relative z-10 drop-shadow-md">{user.jp}</div>
                <div className="text-white/90 font-bold text-xs sm:text-sm uppercase tracking-widest relative z-10">Jam Pelajaran</div>
              </div>
            </div>
          ))}
        </div>

        {/* Search & Filter for Table */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Award className="text-primary" /> Peringkat 4 - 10
          </h2>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
            <input 
              type="text" 
              placeholder="Cari NIP / Nama..." 
              className="w-full pl-11 pr-4 py-2.5 text-sm rounded-xl border border-border bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            />
          </div>
        </div>

        {/* Runners Up Table */}
        <div className="bg-white border border-border rounded-2xl shadow-subtle overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-border">
                  <th className="px-6 py-4 font-bold text-sm text-slate-500 uppercase tracking-wider w-16 text-center">Rank</th>
                  <th className="px-6 py-4 font-bold text-sm text-slate-500 uppercase tracking-wider">Aparatur Sipil Negara</th>
                  <th className="px-6 py-4 font-bold text-sm text-slate-500 uppercase tracking-wider hidden sm:table-cell">Unit Kerja</th>
                  <th className="px-6 py-4 font-bold text-sm text-slate-500 uppercase tracking-wider text-right">Poin JP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {runnersUp.map((user) => (
                  <tr key={user.rank} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-500 font-bold text-sm group-hover:bg-primary group-hover:text-white transition-colors">
                        {user.rank}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={`https://ui-avatars.com/api/?name=${user.name}&background=random&color=fff&size=100`} 
                          alt={user.name} 
                          className="w-10 h-10 rounded-full border border-slate-200 hidden xs:block"
                        />
                        <div>
                          <p className="font-bold text-foreground text-sm flex items-center gap-1.5">
                            {user.name}
                            {user.rank <= 5 && <span title="Top 5 Regional"><ShieldCheck size={14} className="text-success" /></span>}
                          </p>
                          <p className="text-xs text-muted font-mono">{user.nip}</p>
                          {/* Mobile Unit View */}
                          <p className="text-xs text-muted mt-1 sm:hidden">{user.unit}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-semibold">
                        {user.unit}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="font-black text-primary text-lg">{user.jp}</span>
                      <span className="text-xs text-muted ml-1 font-medium">JP</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-border bg-slate-50 text-center">
            <p className="text-xs text-muted font-medium">Peringkat diperbarui secara otomatis setiap hari pukul 00:00 WIB.</p>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
