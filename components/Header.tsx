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
  Bot,
  Volume2,
  VolumeX,
  RotateCcw
} from 'lucide-react';
import { StudentSession } from '@/lib/types';
import { sounds } from '@/lib/audio';

interface HeaderProps {
  session: StudentSession;
  onOpenAuthModal: (mode: 'login' | 'register') => void;
  onLogout: () => void;
  onClearAllProgress?: () => void;
  activeLevel: 1 | 2 | 3;
  onSelectLevel: (level: 1 | 2 | 3) => void;
  onOpenGlossary: () => void;
  onOpenReport: () => void;
  onOpenChat: () => void;
}

export default function Header({
  session,
  onOpenAuthModal,
  onLogout,
  onClearAllProgress,
  activeLevel,
  onSelectLevel,
  onOpenGlossary,
  onOpenReport,
  onOpenChat,
}: HeaderProps) {
  const [isSoundOn, setIsSoundOn] = useState(sounds.isSoundEnabled());
  const completedCount = session.completedTasks.length;

  const handleToggleSound = () => {
    const newState = sounds.toggleSound();
    setIsSoundOn(newState);
    if (newState) sounds.playClick();
  };

  const handleLevelClick = (lvl: 1 | 2 | 3) => {
    sounds.playStationSwitch();
    onSelectLevel(lvl);
  };

  return (
    <header className="bg-[#FAF7F2] border-b-2 border-[#E6DCB8] sticky top-0 z-40 shadow-sm">
      {/* Top Banner / MEB Sosyal Bilgiler Maarif Modeli Badge - Anatolian Crimson & Gold */}
      <div className="bg-gradient-to-r from-[#741D15] via-[#8C291E] to-[#5C140E] text-white px-4 py-1.5 text-xs sm:text-sm font-medium shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-[#5C140E]/80 text-[#FDE68A] px-2.5 py-0.5 rounded-md text-[11px] font-bold tracking-wide border border-[#F59E0B]/40">
              MEB SOSYAL BİLGİLER
            </span>
            <span className="hidden sm:inline text-amber-100 font-medium">
              Türkiye Yüzyılı Maarif Modeli • 5. Sınıf Kültürel Mirasımız ve Yaşayan Geçmiş
            </span>
            <span className="sm:hidden text-amber-100 font-medium">
              5. Sınıf Kültürel Mirasımız
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Audio On/Off Toggle */}
            <button
              onClick={handleToggleSound}
              className="flex items-center gap-1 bg-white/10 hover:bg-white/20 text-amber-100 hover:text-white px-2.5 py-0.5 rounded-md text-xs font-semibold transition-colors cursor-pointer border border-white/20"
              title={isSoundOn ? 'Ses Efektlerini Kapat' : 'Ses Efektlerini Aç'}
            >
              {isSoundOn ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-amber-300" />
                  <span className="hidden sm:inline">Ses: Açık</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-stone-400" />
                  <span className="hidden sm:inline">Ses: Kapalı</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                onOpenChat();
              }}
              className="flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-[#5C140E] px-3 py-0.5 rounded-md text-xs font-black transition-all cursor-pointer shadow-xs active:scale-95 border border-amber-200"
              title="Sosyal Bilgiler Yapay Zekâ Öğretmeni"
            >
              <Bot className="w-3.5 h-3.5 text-[#5C140E]" />
              <span>YZ Öğretmene Sor</span>
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                onOpenGlossary();
              }}
              className="flex items-center gap-1.5 text-amber-100 hover:text-white hover:underline transition-colors text-xs font-semibold cursor-pointer"
              title="Kavram Sözlüğü"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Kavram Sözlüğü</span>
            </button>
            {onClearAllProgress && (
              <button
                onClick={() => {
                  sounds.playClick();
                  onClearAllProgress();
                }}
                className="flex items-center gap-1 text-amber-200 hover:text-white hover:underline transition-colors text-xs font-semibold cursor-pointer"
                title="Tüm Yanıtları Temizle ve Sıfırdan Başla"
              >
                <RotateCcw className="w-3.5 h-3.5 text-amber-300" />
                <span>Cevapları Sıfırla</span>
              </button>
            )}
            {session.isLoggedIn && (
              <button
                onClick={() => {
                  sounds.playCelebration();
                  onOpenReport();
                }}
                className="flex items-center gap-1.5 bg-[#5C140E]/80 hover:bg-[#450E0A] text-amber-100 px-2.5 py-0.5 rounded-md text-xs font-semibold transition-colors cursor-pointer border border-amber-500/30"
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
            <div className="w-11 h-11 bg-gradient-to-br from-[#8C291E] to-[#B45309] rounded-2xl flex items-center justify-center text-[#FEF3C7] font-black text-xl shadow-md border border-[#FDE68A]/40 shrink-0">
              🏛️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-black text-[#451A03] tracking-tight">
                  Miras Gezgini
                </h1>
                <span className="text-[#9A3412] font-bold text-xs bg-[#FEF3C7] px-2.5 py-0.5 rounded-md border border-[#FDE68A]">
                  5. Sınıf Sosyal Bilgiler
                </span>
              </div>
              <p className="text-xs text-stone-600 font-medium">
                Anadolu Kültürel Mirası ve Yaşayan Geçmiş • 3 Kademeli Öğrenme İstasyonu
              </p>
            </div>
          </div>

          {/* User Session & Login/Register Area */}
          <div className="flex items-center gap-2.5">
            {!session.isLoggedIn ? (
              /* LOGGED OUT: Giriş Yap and Kayıt Ol buttons */
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onOpenAuthModal('login')}
                  className="px-4 py-2 border-2 border-[#B45309] text-[#9A3412] hover:bg-[#FEF3C7] font-bold rounded-xl text-xs sm:text-sm transition-all shadow-2xs active:scale-95 cursor-pointer inline-flex items-center gap-1.5"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Giriş Yap</span>
                </button>

                <button
                  type="button"
                  onClick={() => onOpenAuthModal('register')}
                  className="px-4 py-2 bg-gradient-to-r from-[#9A3412] to-[#B45309] hover:from-[#7C2D12] hover:to-[#92400E] text-white font-bold rounded-xl text-xs sm:text-sm transition-all shadow-md active:scale-95 cursor-pointer inline-flex items-center gap-1.5 border border-amber-600/30"
                >
                  <Sparkles className="w-4 h-4 text-amber-200" />
                  <span>Kayıt Ol</span>
                </button>
              </div>
            ) : (
              /* LOGGED IN: Welcome Banner, Progress, Logout Button */
              <div className="flex items-center gap-3 sm:gap-4 bg-[#FFFBEB] border-2 border-[#FDE68A] rounded-2xl px-4 py-2 shadow-2xs">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#8C291E] to-[#B45309] text-amber-100 flex items-center justify-center font-black text-sm shadow-xs shrink-0 border border-amber-300/40">
                  {(session.fullName || session.username || 'Ö').charAt(0).toUpperCase()}
                </div>
                
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-stone-500 font-medium">Hoş geldin,</span>
                    <span className="text-sm font-black text-[#78350F]">
                      {session.fullName || session.username}
                    </span>
                    <span className="text-[10px] bg-[#FEF3C7] text-[#92400E] font-bold px-2 py-0.5 rounded-full border border-amber-300">
                      {session.grade}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-stone-600">
                    <span className="flex items-center gap-1 font-bold text-[#9A3412]">
                      <Award className="w-3.5 h-3.5 text-[#B45309]" />
                      {completedCount} Görev Tamamlandı
                    </span>
                  </div>
                </div>

                {/* Logout Button */}
                <button
                  type="button"
                  id="logout-button"
                  onClick={onLogout}
                  className="px-3 py-1.5 border-2 border-[#B45309] text-[#9A3412] hover:bg-[#FEF3C7] font-bold rounded-xl text-xs transition-all cursor-pointer ml-1 inline-flex items-center gap-1"
                  title="Oturumu Kapat"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Çıkış</span>
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Level Navigation Tabs (Kültürel Miras Paleti: Seviye 1 İznik Firuzesi, Seviye 2 Anadolu Toprak/Terracotta, Seviye 3 Selçuklu Laciverti) */}
        <div className="mt-5 pt-3 border-t border-[#E6DCB8] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-1.5 text-xs text-stone-700 font-bold uppercase tracking-wider">
            <Layers className="w-4 h-4 text-[#9A3412]" />
            <span>Öğrenme İstasyonu Seçimi:</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full sm:w-auto">
            {/* Level 1 Tab - İznik Çinisi & Firuze */}
            <button
              onClick={() => handleLevelClick(1)}
              className={`flex-1 min-w-[200px] p-3.5 rounded-2xl border-4 text-left transition-all cursor-pointer ${
                activeLevel === 1
                  ? 'border-[#0D9488] bg-[#F0FDFA] text-[#134E4A] shadow-lg scale-105 ring-2 ring-[#0D9488]/30'
                  : 'border-[#E6DCB8] bg-white text-stone-700 hover:border-[#0D9488]/60 hover:bg-[#F0FDFA]/50'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">🕌</span>
                <span className="font-black uppercase tracking-wider text-[11px] text-[#0F766E]">
                  Seviye 1
                </span>
              </div>
              <div className="font-bold text-sm sm:text-base leading-tight">
                Temel: Keşif İstasyonu
              </div>
              <div className="text-[11px] text-[#115E59] font-medium mt-0.5">Görsel & Somut Miras</div>
            </button>

            {/* Level 2 Tab - Anadolu Terracotta / Toprak & Kına */}
            <button
              onClick={() => handleLevelClick(2)}
              className={`flex-1 min-w-[200px] p-3.5 rounded-2xl border-4 text-left transition-all cursor-pointer ${
                activeLevel === 2
                  ? 'border-[#B45309] bg-[#FFFBEB] text-[#78350F] shadow-lg scale-105 ring-2 ring-[#B45309]/30'
                  : 'border-[#E6DCB8] bg-white text-stone-700 hover:border-[#B45309]/60 hover:bg-[#FFFBEB]/50'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">📜</span>
                <span className="font-black uppercase tracking-wider text-[11px] text-[#9A3412]">
                  Seviye 2
                </span>
              </div>
              <div className="font-bold text-sm sm:text-base leading-tight">
                Orta: Sözlü Tarih
              </div>
              <div className="text-[11px] text-[#92400E] font-medium mt-0.5">Sözel Miras & Kuşaklar Köprüsü</div>
            </button>

            {/* Level 3 Tab - Selçuklu Laciverti & Çini Mavisi */}
            <button
              onClick={() => handleLevelClick(3)}
              className={`flex-1 min-w-[200px] p-3.5 rounded-2xl border-4 text-left transition-all cursor-pointer ${
                activeLevel === 3
                  ? 'border-[#1E3A8A] bg-[#EFF6FF] text-[#1E3A8A] shadow-lg scale-105 ring-2 ring-[#1E3A8A]/30'
                  : 'border-[#E6DCB8] bg-white text-stone-700 hover:border-[#1E3A8A]/60 hover:bg-[#EFF6FF]/50'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">🏺</span>
                <span className="font-black uppercase tracking-wider text-[11px] text-[#1D4ED8]">
                  Seviye 3
                </span>
              </div>
              <div className="font-bold text-sm sm:text-base leading-tight">
                İleri: Analiz Laboratuvarı
              </div>
              <div className="text-[11px] text-[#1E40AF] font-medium mt-0.5">Dijital Miras & İnovasyon</div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
