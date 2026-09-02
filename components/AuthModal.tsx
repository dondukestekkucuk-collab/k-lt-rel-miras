'use client';

import React, { useState } from 'react';
import { 
  X, 
  LogIn, 
  UserPlus, 
  Lock, 
  User, 
  Sparkles, 
  GraduationCap, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { StudentSession } from '@/lib/types';
import confetti from 'canvas-confetti';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (session: StudentSession) => void;
  initialMode?: 'login' | 'register';
}

export default function AuthModal({
  isOpen,
  onClose,
  onAuthSuccess,
  initialMode = 'login',
}: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  
  // Login form state
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Register form state
  const [regFullName, setRegFullName] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regPassword, setRegPassword] = useState('');
  
  // Status states
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginUsername.trim() || !loginPassword.trim()) {
      setErrorMsg('Lütfen kullanıcı adı ve şifrenizi giriniz.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: loginUsername.trim(),
          password: loginPassword.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Giriş yapılamadı.');
      }

      setSuccessMsg(data.message || 'Giriş başarılı!');
      try {
        confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
      } catch {}

      setTimeout(() => {
        onAuthSuccess(data.session);
        onClose();
      }, 700);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Bağlantı hatası oluştu.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regUsername.trim() || !regPassword.trim() || !regFullName.trim()) {
      setErrorMsg('Lütfen tüm alanları eksiksiz doldurunuz.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: regFullName.trim(),
          username: regUsername.trim(),
          password: regPassword.trim(),
          grade: '5. Sınıf',
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Kayıt yapılamadı.');
      }

      setSuccessMsg('Hesabınız başarıyla oluşturuldu! Hoş geldiniz.');
      try {
        confetti({ particleCount: 60, spread: 80, origin: { y: 0.6 } });
      } catch {}

      setTimeout(() => {
        onAuthSuccess(data.session);
        onClose();
      }, 700);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Bağlantı hatası oluştu.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs animate-fadeIn">
      <div 
        className="bg-[#FAF7F2] w-full max-w-md rounded-3xl shadow-2xl border-4 border-[#B45309] overflow-hidden flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#741D15] via-[#8C291E] to-[#9A3412] text-white p-5 flex items-center justify-between border-b border-[#FDE68A]/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center text-amber-200 shadow-inner">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-base sm:text-lg tracking-tight text-white flex items-center gap-1.5">
                Miras Gezgini Öğrenci Portalı
              </h3>
              <p className="text-xs text-amber-100">
                5. Sınıf Kültürel Miras & Sosyal Bilgiler
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-xl transition-colors cursor-pointer"
            aria-label="Kapat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-[#E6DCB8] bg-[#FFFBEB]">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setErrorMsg('');
              setSuccessMsg('');
            }}
            className={`flex-1 py-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              mode === 'login'
                ? 'text-[#741D15] border-b-3 border-[#741D15] bg-[#FAF7F2]'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            <LogIn className="w-4 h-4" />
            <span>Giriş Yap</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setMode('register');
              setErrorMsg('');
              setSuccessMsg('');
            }}
            className={`flex-1 py-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              mode === 'register'
                ? 'text-[#741D15] border-b-3 border-[#741D15] bg-[#FAF7F2]'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>Yeni Kayıt Ol</span>
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 bg-[#FDFBF7]">
          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2 animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          )}

          {mode === 'login' ? (
            /* Login Form */
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Kullanıcı Adı
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    placeholder="Örn: ahmet_5a"
                    required
                    className="w-full pl-10 pr-4 py-2.5 bg-white border-2 border-[#E6DCB8] rounded-xl text-sm focus:border-[#B45309] outline-none text-stone-800 font-medium placeholder-stone-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Şifre
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-10 pr-4 py-2.5 bg-white border-2 border-[#E6DCB8] rounded-xl text-sm focus:border-[#B45309] outline-none text-stone-800 font-medium placeholder-stone-400"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-[#9A3412] to-[#B45309] hover:from-[#7C2D12] hover:to-[#92400E] text-white py-3 rounded-xl font-bold text-sm transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  <LogIn className="w-4 h-4" />
                  <span>{isLoading ? 'Giriş Yapılıyor...' : 'Giriş Yap ve Devam Et'}</span>
                </button>
              </div>

              <p className="text-center text-xs text-stone-500 pt-2 font-medium">
                Henüz bir hesabın yok mu?{' '}
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className="text-[#9A3412] font-bold underline cursor-pointer hover:text-[#741D15]"
                >
                  Buradan Kayıt Ol
                </button>
              </p>
            </form>
          ) : (
            /* Register Form */
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Öğrenci Adı ve Soyadı
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={regFullName}
                    onChange={(e) => setRegFullName(e.target.value)}
                    placeholder="Örn: Ahmet Yılmaz"
                    required
                    className="w-full pl-10 pr-4 py-2.5 bg-white border-2 border-[#E6DCB8] rounded-xl text-sm focus:border-[#B45309] outline-none text-stone-800 font-medium placeholder-stone-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Kullanıcı Adı (Rumuz veya Numara)
                </label>
                <div className="relative">
                  <Sparkles className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={regUsername}
                    onChange={(e) => setRegUsername(e.target.value)}
                    placeholder="Örn: ahmet5a"
                    required
                    className="w-full pl-10 pr-4 py-2.5 bg-white border-2 border-[#E6DCB8] rounded-xl text-sm focus:border-[#B45309] outline-none text-stone-800 font-medium placeholder-stone-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Şifre Belirleyin
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="En az 4 karakter"
                    required
                    className="w-full pl-10 pr-4 py-2.5 bg-white border-2 border-[#E6DCB8] rounded-xl text-sm focus:border-[#B45309] outline-none text-stone-800 font-medium placeholder-stone-400"
                  />
                </div>
              </div>

              <div className="bg-[#FFFBEB] p-2.5 rounded-xl border border-[#FDE68A] flex items-center justify-between text-xs">
                <span className="text-stone-600 font-medium">Sınıf Seviyesi:</span>
                <span className="bg-[#FEF3C7] text-[#9A3412] font-black px-2.5 py-0.5 rounded-full border border-amber-300">
                  5. Sınıf Sosyal Bilgiler
                </span>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-[#9A3412] to-[#B45309] hover:from-[#7C2D12] hover:to-[#92400E] text-white py-3 rounded-xl font-bold text-sm transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>{isLoading ? 'Kaydediliyor...' : 'Hesap Oluştur ve Başla'}</span>
                </button>
              </div>

              <p className="text-center text-xs text-stone-500 pt-1 font-medium">
                Zaten bir hesabın var mı?{' '}
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="text-[#9A3412] font-bold underline cursor-pointer hover:text-[#741D15]"
                >
                  Giriş Yap
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
