'use client';

import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  LogOut, 
  LogIn, 
  Award, 
  HelpCircle, 
  FileText, 
  GraduationCap,
  Layers,
  Compass,
  MessageSquareQuote,
  Bot
} from 'lucide-react';
import { StudentSession } from '@/lib/types';

interface HeaderProps {
  session: StudentSession;
  onLogin: (username: string, grade: string) => void;
  onLogout: () => void;
  activeLevel: 1 | 2 | 3;
  onSelectLevel: (level: 1 | 2 | 3) => void;
  onOpenGlossary: () => void;
  onOpenReport: () => void;
  onOpenChat: () => void;
}

export default function Header({
  session,
  onLogin,
  onLogout,
  activeLevel,
  onSelectLevel,
  onOpenGlossary,
  onOpenReport,
  onOpenChat,
}: HeaderProps) {
  const [inputName, setInputName] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('6. Sınıf');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputName.trim()) {
      setErrorMsg('Lütfen öğrenci adınızı giriniz.');
      return;
    }
    setErrorMsg('');
    onLogin(inputName.trim(), selectedGrade);
    setInputName('');
  };

  const completedCount = session.completedTasks.length;

  return (
    <header className="bg-white border-b-2 border-orange-200 sticky top-0 z-40 shadow-xs">
      {/* Top Banner / MEB Sosyal Bilgiler Maarif Modeli Badge */}
      <div className="bg-orange-600 text-white px-4 py-1.5 text-xs sm:text-sm font-medium shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-orange-700/90 px-2.5 py-0.5 rounded-md text-[11px] font-bold tracking-wide border border-orange-400/40">
              MEB SOSYAL BİLGİLER
            </span>
            <span className="hidden sm:inline text-orange-100 font-medium">
              Türkiye Yüzyılı Maarif Modeli • Farklılaştırılmış Öğrenme İstasyonları
            </span>
            <span className="sm:hidden text-orange-100 font-medium">
              Kültürel Mirasımız & Yaşayan Geçmiş
            </span>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              onClick={onOpenChat}
              className="flex items-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-amber-950 px-2.5 py-0.5 rounded-md text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-95"
              title="Sosyal Bilgiler Yapay Zekâ Öğretmeni"
            >
              <Bot className="w-3.5 h-3.5 text-amber-950" />
              <span>YZ Öğretmene Sor</span>
            </button>
            <button
              onClick={onOpenGlossary}
              className="flex items-center gap-1.5 text-orange-100 hover:text-white hover:underline transition-colors text-xs font-semibold cursor-pointer"
              title="Kavram Sözlüğü"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Kavram Sözlüğü</span>
            </button>
            {session.isLoggedIn && (
              <button
                onClick={onOpenReport}
                className="flex items-center gap-1.5 bg-orange-700/80 hover:bg-orange-800 text-white px-2.5 py-0.5 rounded-md text-xs font-semibold transition-colors cursor-pointer border border-orange-400/40"
                title="Çalışma Raporum"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Raporum & Belge</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Header Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Logo & Main Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-md shrink-0">
              M
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-lg sm:text-xl font-black text-slate-800 tracking-tight">
                  Miras Gezgini
                </h1>
                <span className="text-orange-500 font-bold text-xs sm:text-sm bg-orange-50 px-2 py-0.5 rounded-md border border-orange-200">
                  Sosyal Bilgiler
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Kültürel Mirasımız ve Yaşayan Geçmiş • 3 Kademeli Öğrenme İstasyonu
              </p>
            </div>
          </div>

          {/* User Session & Login Area */}
          <div className="flex items-center gap-3">
            {!session.isLoggedIn ? (
              /* LOGGED OUT: Username Input and Login Button */
              <form 
                onSubmit={handleLoginSubmit} 
                className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full sm:w-auto"
              >
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <select
                      value={selectedGrade}
                      onChange={(e) => setSelectedGrade(e.target.value)}
                      className="text-xs bg-orange-50/70 border-2 border-orange-100 rounded-lg px-2.5 py-1.5 text-slate-700 focus:outline-hidden focus:border-orange-400 font-semibold cursor-pointer"
                      aria-label="Sınıf Seviyesi Seçiniz"
                    >
                      <option value="5. Sınıf">5. Sınıf</option>
                      <option value="6. Sınıf">6. Sınıf</option>
                      <option value="7. Sınıf">7. Sınıf</option>
                      <option value="8. Sınıf">8. Sınıf</option>
                    </select>

                    <input
                      id="student-username-input"
                      type="text"
                      placeholder="Öğrenci Adı..."
                      value={inputName}
                      onChange={(e) => {
                        setInputName(e.target.value);
                        if (errorMsg) setErrorMsg('');
                      }}
                      className="text-sm px-3 py-1.5 border-2 border-orange-100 rounded-lg outline-none focus:border-orange-400 transition-colors text-slate-800 placeholder-slate-400 w-40 sm:w-48 bg-white"
                    />

                    <button
                      type="submit"
                      id="login-button"
                      className="px-5 py-1.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg text-sm transition-all shadow-md active:scale-95 cursor-pointer inline-flex items-center gap-1.5"
                    >
                      <LogIn className="w-4 h-4" />
                      <span>Giriş Yap</span>
                    </button>
                  </div>
                  {errorMsg && (
                    <span className="text-[11px] text-rose-600 mt-1 font-semibold">
                      {errorMsg}
                    </span>
                  )}
                </div>
              </form>
            ) : (
              /* LOGGED IN: Welcome Banner, Progress, Logout Button */
              <div className="flex items-center gap-3 sm:gap-4 bg-orange-50 border-2 border-orange-200 rounded-2xl px-4 py-2 shadow-xs">
                <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
                  {session.username.charAt(0).toUpperCase()}
                </div>
                
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-slate-500 font-medium">Hoş geldin,</span>
                    <span className="text-sm font-black text-orange-600">
                      {session.username}
                    </span>
                    <span className="text-[10px] bg-orange-200 text-orange-900 font-bold px-2 py-0.5 rounded-full">
                      {session.grade}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-slate-600">
                    <span className="flex items-center gap-1 font-semibold text-orange-900">
                      <Award className="w-3.5 h-3.5 text-orange-600" />
                      {completedCount} Görev Tamamlandı
                    </span>
                  </div>
                </div>

                {/* Logout Button */}
                <button
                  type="button"
                  id="logout-button"
                  onClick={onLogout}
                  className="px-4 py-1.5 border-2 border-orange-500 text-orange-600 hover:bg-orange-100/70 font-semibold rounded-lg text-xs transition-all cursor-pointer ml-1 inline-flex items-center gap-1"
                  title="Oturumu Kapat"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Çıkış Yap</span>
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Level Navigation Tabs (Vibrant Theme: Seviye 1 Emerald, Seviye 2 Sky, Seviye 3 Indigo) */}
        <div className="mt-5 pt-3 border-t border-orange-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-600 font-bold uppercase tracking-wider">
            <Layers className="w-4 h-4 text-orange-600" />
            <span>Öğrenme İstasyonu Seçimi:</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full sm:w-auto">
            {/* Level 1 Tab */}
            <button
              onClick={() => onSelectLevel(1)}
              className={`flex-1 min-w-[200px] p-3 sm:p-3.5 rounded-2xl border-4 text-left transition-all cursor-pointer ${
                activeLevel === 1
                  ? 'border-emerald-400 bg-emerald-50 text-emerald-900 shadow-lg scale-105'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-emerald-300 hover:bg-emerald-50/40'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">🌱</span>
                <span className="font-black uppercase tracking-wider text-[11px] text-emerald-700">
                  Seviye 1
                </span>
              </div>
              <div className="font-bold text-sm sm:text-base leading-tight">
                Temel: Keşif İstasyonu
              </div>
              <div className="text-[11px] opacity-75 mt-0.5">Görsel & Somut Miras</div>
            </button>

            {/* Level 2 Tab */}
            <button
              onClick={() => onSelectLevel(2)}
              className={`flex-1 min-w-[200px] p-3 sm:p-3.5 rounded-2xl border-4 text-left transition-all cursor-pointer ${
                activeLevel === 2
                  ? 'border-sky-400 bg-sky-50 text-sky-900 shadow-lg scale-105'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-sky-300 hover:bg-sky-50/40'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">📚</span>
                <span className="font-black uppercase tracking-wider text-[11px] text-sky-700">
                  Seviye 2
                </span>
              </div>
              <div className="font-bold text-sm sm:text-base leading-tight">
                Orta: Sözlü Tarih
              </div>
              <div className="text-[11px] opacity-75 mt-0.5">Sözel Miras & Kuşaklar Köprüsü</div>
            </button>

            {/* Level 3 Tab */}
            <button
              onClick={() => onSelectLevel(3)}
              className={`flex-1 min-w-[200px] p-3 sm:p-3.5 rounded-2xl border-4 text-left transition-all cursor-pointer ${
                activeLevel === 3
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-900 shadow-lg scale-105'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:bg-indigo-50/40'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">🧪</span>
                <span className="font-black uppercase tracking-wider text-[11px] text-indigo-700">
                  Seviye 3
                </span>
              </div>
              <div className="font-bold text-sm sm:text-base leading-tight">
                İleri: Analiz Laboratuvarı
              </div>
              <div className="text-[11px] opacity-75 mt-0.5">Dijital Miras & İnovasyon</div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
