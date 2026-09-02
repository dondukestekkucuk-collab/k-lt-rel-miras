'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Level1Basic from '@/components/Level1Basic';
import Level2Intermediate from '@/components/Level2Intermediate';
import Level3Advanced from '@/components/Level3Advanced';
import GlossaryModal from '@/components/GlossaryModal';
import OralHistoryReportModal from '@/components/OralHistoryReportModal';
import Chat from '@/components/Chat';
import AuthModal from '@/components/AuthModal';
import TeacherGuidanceBanner from '@/components/TeacherGuidanceBanner';
import { StudentSession } from '@/lib/types';
import { 
  Compass, 
  BookOpen, 
  Award, 
  CheckCircle2, 
  Sparkles, 
  HeartHandshake, 
  Layers, 
  GraduationCap,
  FileText,
  Bot
} from 'lucide-react';
import confetti from 'canvas-confetti';

const STORAGE_KEY = 'sosyal_bilgiler_ogrenci_oturum_v1';

const defaultSession: StudentSession = {
  username: '',
  fullName: '',
  grade: '5. Sınıf',
  isLoggedIn: false,
  loginTime: '',
  completedTasks: [],
  quizScores: {},
  oralHistoryAnswers: {},
  projectAnswers: {},
};

export default function HomePage() {
  const [session, setSession] = useState<StudentSession>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          return JSON.parse(stored);
        }
      } catch (e) {
        console.error('Failed to parse session:', e);
      }
    }
    return defaultSession;
  });
  const [activeLevel, setActiveLevel] = useState<1 | 2 | 3>(1);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  // Save to local storage on state change and sync to PostgreSQL
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    } catch (e) {
      console.error('Failed to save session:', e);
    }

    // Database sync
    if (session.isLoggedIn && session.userId) {
      fetch('/api/auth/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session }),
      }).catch(err => console.error('Database auto-sync error:', err));
    }
  }, [session]);

  const handleOpenAuth = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  // Logout handler
  const handleLogout = () => {
    setSession(defaultSession);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  // Level 1 Task / Text Answers
  const handleUpdateTaskAnswer = (taskId: string, answer: string) => {
    setSession(prev => ({
      ...prev,
      oralHistoryAnswers: {
        ...prev.oralHistoryAnswers,
        [taskId]: answer
      }
    }));
  };

  // Level 2 Oral History form answers
  const handleUpdateOralHistory = (key: string, answer: string) => {
    setSession(prev => ({
      ...prev,
      oralHistoryAnswers: {
        ...prev.oralHistoryAnswers,
        [key]: answer
      }
    }));
  };

  // Level 3 Project form answers
  const handleUpdateProjectAnswer = (projectId: string, answer: string) => {
    setSession(prev => ({
      ...prev,
      projectAnswers: {
        ...prev.projectAnswers,
        [projectId]: answer
      }
    }));
  };

  // Toggle complete task
  const handleToggleTaskComplete = (taskId: string) => {
    setSession(prev => {
      const exists = prev.completedTasks.includes(taskId);
      const updatedList = exists
        ? prev.completedTasks.filter(t => t !== taskId)
        : [...prev.completedTasks, taskId];
      return { ...prev, completedTasks: updatedList };
    });
  };

  // Quiz score recording
  const handleAnswerQuiz = (questionId: string, isCorrect: boolean) => {
    setSession(prev => {
      const updatedScores = {
        ...prev.quizScores,
        [questionId]: isCorrect ? 100 : 0
      };
      // Mark as completed task if not yet
      const taskKey = `quiz-${questionId}`;
      const completedTasks = prev.completedTasks.includes(taskKey)
        ? prev.completedTasks
        : [...prev.completedTasks, taskKey];

      return {
        ...prev,
        quizScores: updatedScores,
        completedTasks
      };
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] font-sans text-stone-800">
      
      {/* Header with Student Login & Level Navigation */}
      <Header
        session={session}
        onOpenAuthModal={handleOpenAuth}
        onLogout={handleLogout}
        activeLevel={activeLevel}
        onSelectLevel={setActiveLevel}
        onOpenGlossary={() => setIsGlossaryOpen(true)}
        onOpenReport={() => setIsReportOpen(true)}
        onOpenChat={() => setIsChatOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
        
        {/* Welcome / Teacher Guidance Banner */}
        <TeacherGuidanceBanner activeLevel={activeLevel} />

        {/* Station Content based on Active Level */}
        {activeLevel === 1 && (
          <Level1Basic
            session={session}
            onUpdateTaskAnswer={handleUpdateTaskAnswer}
            onToggleTaskComplete={handleToggleTaskComplete}
            onAnswerQuiz={handleAnswerQuiz}
          />
        )}

        {activeLevel === 2 && (
          <Level2Intermediate
            session={session}
            onUpdateOralHistory={handleUpdateOralHistory}
            onToggleTaskComplete={handleToggleTaskComplete}
            onAnswerQuiz={handleAnswerQuiz}
            onOpenReport={() => setIsReportOpen(true)}
          />
        )}

        {activeLevel === 3 && (
          <Level3Advanced
            session={session}
            onUpdateProjectAnswer={handleUpdateProjectAnswer}
            onToggleTaskComplete={handleToggleTaskComplete}
            onAnswerQuiz={handleAnswerQuiz}
            onOpenReport={() => setIsReportOpen(true)}
          />
        )}

        {/* Floating Quick Action / Report Access for logged-in students */}
        {session.isLoggedIn && (
          <div className="bg-[#FFFDF9] border-3 border-[#B45309] p-6 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#8C291E] to-[#B45309] flex items-center justify-center text-amber-100 shrink-0 shadow-md border border-amber-300/30">
                <Award className="w-7 h-7 text-amber-200" />
              </div>
              <div>
                <h4 className="font-black text-base sm:text-lg text-[#451A03]">
                  {session.fullName || session.username}, İstasyon Çalışman Harika İlerliyor!
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 font-medium">
                  Toplam {session.completedTasks.length} adet görev ve test tamamladın. Çalışmanı resmi bir dosya ve sertifika olarak görüntüleyebilirsin.
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsReportOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#9A3412] to-[#B45309] hover:from-[#7C2D12] hover:to-[#92400E] text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-2xl transition-all shadow-md active:scale-95 cursor-pointer shrink-0 border border-amber-500/30"
            >
              <FileText className="w-4 h-4" />
              <span>Sözlü Tarih & Çalışma Dosyası</span>
            </button>
          </div>
        )}

      </main>

      {/* Floating AI Teacher Chat Launcher Button - Ottoman Crimson & Gold */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsChatOpen(true)}
          className="flex items-center gap-2.5 bg-gradient-to-r from-[#741D15] via-[#8C291E] to-[#9A3412] hover:from-[#5C140E] hover:to-[#7C2D12] text-amber-100 px-5 py-3.5 rounded-full font-black text-sm shadow-xl hover:shadow-2xl border-2 border-amber-400/50 transition-all cursor-pointer hover:scale-105 active:scale-95 group"
          title="Sosyal Bilgiler Yapay Zekâ Öğretmenine Soru Sor"
        >
          <div className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center text-amber-200 group-hover:rotate-12 transition-transform">
            <Bot className="w-4 h-4" />
          </div>
          <span className="text-white font-bold">Öğretmene Sor</span>
          <span className="bg-gradient-to-r from-amber-400 to-amber-300 text-[#5C140E] text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider border border-amber-200">
            YZ
          </span>
        </button>
      </div>

      {/* Footer - Seljuk / Anatolian Motif Dark Bronze */}
      <footer className="bg-[#1C1917] text-stone-400 text-xs py-8 mt-12 border-t-4 border-[#B45309]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-amber-100 font-bold text-sm">
            <GraduationCap className="w-5 h-5 text-[#F59E0B]" />
            <span>5. Sınıf Sosyal Bilgiler Kültürel Miras Portalı</span>
          </div>

          <div className="text-center sm:text-right text-stone-400 space-y-1">
            <p className="text-stone-300 font-medium">
              T.C. Millî Eğitim Bakanlığı • Türkiye Yüzyılı Maarif Modeli Sosyal Bilgiler Öğretim Programı Uyumlu
            </p>
            <p className="text-[11px] text-stone-400">
              Kültürel Mirasımız ve Yaşayan Geçmiş: Somut & Somut Olmayan Miras • Sözlü Tarih ve Etnografya Yöntemi
            </p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialMode={authMode}
        onAuthSuccess={(newSession) => {
          setSession(newSession);
        }}
      />

      <GlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
      />

      <OralHistoryReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        session={session}
      />

      <Chat
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        session={session}
      />

    </div>
  );
}
