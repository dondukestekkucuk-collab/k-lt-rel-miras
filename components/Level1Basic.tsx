'use client';

import React, { useState, useEffect } from 'react';
import { 
  Eye, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle, 
  Camera, 
  Palette, 
  Clock, 
  MessageSquare, 
  Search, 
  Heart, 
  Award,
  ChevronRight,
  Info,
  BookMarked,
  RotateCcw,
  RefreshCw
} from 'lucide-react';
import { LEVEL_1_QUESTIONS } from '@/lib/learningData';
import { StudentSession } from '@/lib/types';
import { sounds } from '@/lib/audio';
import confetti from 'canvas-confetti';

interface Level1BasicProps {
  session: StudentSession;
  onUpdateTaskAnswer: (taskId: string, answer: string) => void;
  onToggleTaskComplete: (taskId: string) => void;
  onAnswerQuiz: (questionId: string, isCorrect: boolean) => void;
}

export default function Level1Basic({
  session,
  onUpdateTaskAnswer,
  onToggleTaskComplete,
  onAnswerQuiz,
}: Level1BasicProps) {
  // Quiz states
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submittedQuiz, setSubmittedQuiz] = useState<Record<string, boolean>>({});

  // Local task responses for Level 1
  const [task1Answer, setTask1Answer] = useState(session.oralHistoryAnswers['l1-task1'] || '');
  const [task2Answer, setTask2Answer] = useState(session.oralHistoryAnswers['l1-task2'] || '');
  const [task3Answer, setTask3Answer] = useState(session.oralHistoryAnswers['l1-task3'] || '');

  // Synchronize with session when reset or changed
  useEffect(() => {
    setTask1Answer(session.oralHistoryAnswers['l1-task1'] || '');
    setTask2Answer(session.oralHistoryAnswers['l1-task2'] || '');
    setTask3Answer(session.oralHistoryAnswers['l1-task3'] || '');
    if (Object.keys(session.quizScores || {}).length === 0) {
      setSubmittedQuiz({});
      setSelectedAnswers({});
    }
  }, [session.oralHistoryAnswers, session.quizScores]);

  const handleSaveTask = (taskId: string, text: string) => {
    sounds.playClick();
    onUpdateTaskAnswer(taskId, text);
    if (text.trim().length > 2) {
      if (!session.completedTasks.includes(taskId)) {
        onToggleTaskComplete(taskId);
        sounds.playSuccess();
        try {
          confetti({
            particleCount: 35,
            spread: 60,
            origin: { y: 0.8 }
          });
        } catch {}
      } else {
        sounds.playClick();
      }
    }
  };

  const handleSelectQuizOption = (questionId: string, optionIdx: number) => {
    sounds.playClick();
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleCheckQuiz = (questionId: string) => {
    const selected = selectedAnswers[questionId];
    if (selected === undefined) return;
    
    setSubmittedQuiz(prev => ({ ...prev, [questionId]: true }));
    const question = LEVEL_1_QUESTIONS.find(q => q.id === questionId);
    const isCorrect = question?.correctAnswer === selected;
    
    onAnswerQuiz(questionId, isCorrect);
    
    if (isCorrect) {
      sounds.playSuccess();
      try {
        confetti({
          particleCount: 40,
          spread: 70,
          origin: { y: 0.7 }
        });
      } catch {}
    } else {
      sounds.playClick();
    }
  };

  const handleRetryQuestion = (questionId: string) => {
    sounds.playClick();
    setSubmittedQuiz(prev => {
      const updated = { ...prev };
      delete updated[questionId];
      return updated;
    });
  };

  const handleResetAllQuiz = () => {
    sounds.playClick();
    if (window.confirm('Bu istasyondaki test sorularını sıfırlayıp baştan çözmek istiyor musunuz?')) {
      setSubmittedQuiz({});
      setSelectedAnswers({});
      sounds.playSuccess();
    }
  };

  const handleResetTasks = () => {
    sounds.playClick();
    if (window.confirm('Bu istasyondaki tüm yazılı cevapları temizleyip yeniden pratik yapmak istiyor musunuz?')) {
      setTask1Answer('');
      setTask2Answer('');
      setTask3Answer('');
      onUpdateTaskAnswer('l1-task1', '');
      onUpdateTaskAnswer('l1-task2', '');
      onUpdateTaskAnswer('l1-task3', '');
      sounds.playSuccess();
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Outer Main Container */}
      <div className="bg-white rounded-3xl border-4 border-emerald-400 p-6 sm:p-8 shadow-sm space-y-8">

        {/* 1. Header Hero Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-emerald-50 p-6 rounded-2xl border-2 border-emerald-100">
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-full mb-2">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                Seviye 1: Keşif İstasyonu
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-emerald-900 mb-2 uppercase tracking-tight">
                Geçmişin İzlerini Bulalım!
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-emerald-800 font-medium">
                Kültürel miras, büyüklerimizin bize bıraktığı değerli hediyelerdir. Tıpkı bir hazine avı gibi, evindeki eski eşyaları inceleyerek geçmişe keyifli bir yolculuk yapabilirsin!
              </p>
            </div>

            {/* 3 Step Guide */}
            <div className="space-y-3">
              <div className="flex items-center gap-3.5 bg-white p-3.5 rounded-2xl shadow-xs border-2 border-emerald-100">
                <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center text-white font-black italic shrink-0 shadow-xs">
                  1
                </div>
                <p className="text-xs sm:text-sm font-semibold text-emerald-950">
                  Evdeki bir büyüğüne eski bir eşyayı sor ve hikayesini dinle.
                </p>
              </div>

              <div className="flex items-center gap-3.5 bg-white p-3.5 rounded-2xl shadow-xs border-2 border-emerald-100">
                <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center text-white font-black italic shrink-0 shadow-xs">
                  2
                </div>
                <p className="text-xs sm:text-sm font-semibold text-emerald-950">
                  O eşyanın kime ait olduğunu ve ne amaçla kullanıldığını öğren.
                </p>
              </div>

              <div className="flex items-center gap-3.5 bg-white p-3.5 rounded-2xl shadow-xs border-2 border-emerald-100">
                <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center text-white font-black italic shrink-0 shadow-xs">
                  3
                </div>
                <p className="text-xs sm:text-sm font-semibold text-emerald-950">
                  Eşyanın resmini çiz, fotoğrafını çek ve hissettirdiği duyguyu not et.
                </p>
              </div>
            </div>
          </div>

          {/* Right Highlight Box */}
          <div className="lg:col-span-5 bg-emerald-600 rounded-3xl p-6 text-white shadow-md flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-6 h-6 text-emerald-200" />
                <h3 className="font-black text-lg sm:text-xl tracking-tight">Günün 3 Keşif Görevi</h3>
              </div>
              <p className="text-xs text-emerald-100 mb-4 leading-relaxed font-normal">
                Bu istasyonda evindeki canlı tarihi gün yüzüne çıkaracak 3 eğlenceli görev seni bekliyor:
              </p>

              <ul className="space-y-3.5">
                <li className="flex items-start gap-3 bg-emerald-700/60 p-3 rounded-2xl border border-emerald-500/40">
                  <span className="text-2xl">🏠</span>
                  <div>
                    <p className="font-bold text-xs sm:text-sm text-white">Ev Müzesi Avı</p>
                    <p className="text-xs text-emerald-100 opacity-90">Evdeki en eski eşyayı veya fotoğrafı bul.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 bg-emerald-700/60 p-3 rounded-2xl border border-emerald-500/40">
                  <span className="text-2xl">👵</span>
                  <div>
                    <p className="font-bold text-xs sm:text-sm text-white">Dede & Nine Sözlüğü</p>
                    <p className="text-xs text-emerald-100 opacity-90">Eskiden kullanılan 1-2 özel kelime öğren.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 bg-emerald-700/60 p-3 rounded-2xl border border-emerald-500/40">
                  <span className="text-2xl">🎨</span>
                  <div>
                    <p className="font-bold text-xs sm:text-sm text-white">Hatıra Sandığı</p>
                    <p className="text-xs text-emerald-100 opacity-90">Geleceğe bırakmak istediğin bir hatıranı seç.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 2. Somut Örnekler Grid */}
        <div className="bg-emerald-50/50 rounded-2xl border-2 border-emerald-100 p-5 sm:p-6">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-emerald-200">
            <Sparkles className="w-5 h-5 text-emerald-700" />
            <h3 className="text-base sm:text-lg font-black text-emerald-950">
              Somut Miras Örnekleri (Gözümüzle Gördüğümüz Değerler)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white border-2 border-emerald-100 rounded-2xl p-4 shadow-xs">
              <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center mb-2.5 font-bold">
                🧶
              </div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">
                El Dokuması & Danteller
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Ninemizin gençliğinde ilmek ilmek işlediği el emeği örtüler, ailemizin geçmişteki zevkini ve sabrını yansıtır.
              </p>
            </div>

            <div className="bg-white border-2 border-emerald-100 rounded-2xl p-4 shadow-xs">
              <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center mb-2.5 font-bold">
                📷
              </div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">
                Eski Aile Albümleri
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Siyah-beyaz bayram fotoğrafları büyüklerimizin o dönemdeki kıyafetlerini ve yaşam tarzını bize canlı gösterir.
              </p>
            </div>

            <div className="bg-white border-2 border-emerald-100 rounded-2xl p-4 shadow-xs">
              <div className="w-9 h-9 rounded-xl bg-teal-500 text-white flex items-center justify-center mb-2.5 font-bold">
                ☕
              </div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">
                Bakır Cezve & Köstekli Saat
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Eski mutfak eşyaları veya dedelerimizin saatleri, teknolojisiz günlerdeki günlük hayatı anlatan sessiz tanıklardır.
              </p>
            </div>
          </div>
        </div>

        {/* 3. Görev Formları */}
        <div className="bg-white rounded-2xl border-2 border-emerald-200 p-5 sm:p-6 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-emerald-100">
            <div>
              <h3 className="text-base sm:text-lg font-black text-emerald-950">
                Seviye 1 Görev İstasyonu (Cevaplarını Yaz & Kaydet)
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Her görevi tamamladığında &quot;Görevi Kaydet&quot; butonuna bas
              </p>
            </div>
            <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200">
              Uygulama Alanı
            </span>
          </div>

          <div className="space-y-4">
            {/* Görev 1 */}
            <div className={`p-4.5 rounded-2xl border-2 transition-all ${
              session.completedTasks.includes('l1-task1')
                ? 'bg-emerald-50/80 border-emerald-400'
                : 'bg-slate-50/80 border-slate-200'
            }`}>
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-emerald-600 shrink-0" />
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                    Görev 1: &quot;Evimdeki Canlı Tarih Avı&quot;
                  </h4>
                </div>
                {session.completedTasks.includes('l1-task1') && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Tamamlandı
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                Evinde bulabileceğin en eski eşyayı veya fotoğrafı bul. Bu eşyanın adı ne ve kime ait?
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  placeholder="Örnek: Dedemin 50 yıllık köstekli saati..."
                  value={task1Answer}
                  onChange={(e) => setTask1Answer(e.target.value)}
                  className="text-xs sm:text-sm bg-white border-2 border-emerald-100 rounded-xl px-3 py-2 text-slate-800 flex-1 focus:border-emerald-500 focus:outline-hidden"
                />
                <button
                  type="button"
                  onClick={() => handleSaveTask('l1-task1', task1Answer)}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer shrink-0"
                >
                  Görevi Kaydet
                </button>
              </div>
            </div>

            {/* Görev 2 */}
            <div className={`p-4.5 rounded-2xl border-2 transition-all ${
              session.completedTasks.includes('l1-task2')
                ? 'bg-emerald-50/80 border-emerald-400'
                : 'bg-slate-50/80 border-slate-200'
            }`}>
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                    Görev 2: &quot;Dede ve Nine Sözlüğü&quot;
                  </h4>
                </div>
                {session.completedTasks.includes('l1-task2') && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Tamamlandı
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                Ailendeki bir büyüğüne sorarak eskiden çok kullanılan ama günümüzde az duyduğun 1 veya 2 kelime öğren ve buraya yaz.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  placeholder="Örnek: İmece (Birlikte yardımlaşma), Çıkrık..."
                  value={task2Answer}
                  onChange={(e) => setTask2Answer(e.target.value)}
                  className="text-xs sm:text-sm bg-white border-2 border-emerald-100 rounded-xl px-3 py-2 text-slate-800 flex-1 focus:border-emerald-500 focus:outline-hidden"
                />
                <button
                  type="button"
                  onClick={() => handleSaveTask('l1-task2', task2Answer)}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer shrink-0"
                >
                  Görevi Kaydet
                </button>
              </div>
            </div>

            {/* Görev 3 */}
            <div className={`p-4.5 rounded-2xl border-2 transition-all ${
              session.completedTasks.includes('l1-task3')
                ? 'bg-emerald-50/80 border-emerald-400'
                : 'bg-slate-50/80 border-slate-200'
            }`}>
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-emerald-600 shrink-0" />
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                    Görev 3: &quot;Benim Hatıra Sandığım&quot;
                  </h4>
                </div>
                {session.completedTasks.includes('l1-task3') && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Tamamlandı
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                Sen gelecekteki çocuklarına kendi çocukluğundan hangi eşyanı saklayıp hatıra olarak bırakmak istersin?
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  placeholder="Örnek: İlk okuma kitabım ve en sevdiğim oyuncağım..."
                  value={task3Answer}
                  onChange={(e) => setTask3Answer(e.target.value)}
                  className="text-xs sm:text-sm bg-white border-2 border-emerald-100 rounded-xl px-3 py-2 text-slate-800 flex-1 focus:border-emerald-500 focus:outline-hidden"
                />
                <button
                  type="button"
                  onClick={() => handleSaveTask('l1-task3', task3Answer)}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer shrink-0"
                >
                  Görevi Kaydet
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Öğretmen Kontrol Soruları */}
        <div className="bg-emerald-50/60 rounded-2xl border-2 border-emerald-200 p-5 sm:p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-emerald-200">
            <div>
              <h3 className="text-base sm:text-lg font-black text-emerald-950">
                Öğretmeninden Kontrol Soruları (2 Soru)
              </h3>
              <p className="text-xs text-slate-600">
                Doğru seçeneği işaretle ve &quot;Cevabımı Kontrol Et&quot; butonuna tıkla. Dilediğin kadar tekrar çözebilirsin.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleResetAllQuiz}
                className="text-xs font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 px-3 py-1.5 rounded-xl border border-emerald-300 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                title="Tüm Test Sorularını Sıfırla"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Testi Baştan Çöz</span>
              </button>
              <span className="text-xs font-bold bg-amber-100 text-amber-900 px-3 py-1 rounded-full border border-amber-200">
                Mikro Test
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {LEVEL_1_QUESTIONS.map((q, idx) => {
              const isSubmitted = submittedQuiz[q.id];
              const chosen = selectedAnswers[q.id];
              const isCorrect = chosen === q.correctAnswer;

              return (
                <div 
                  key={q.id}
                  className="border-2 border-emerald-100 rounded-2xl p-5 bg-white shadow-xs"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="bg-emerald-500 text-white text-[11px] font-black px-2 py-0.5 rounded-md">
                        Soru {idx + 1}
                      </span>
                      <span className="text-[11px] text-slate-500 font-semibold">
                        Konu: {q.conceptTag}
                      </span>
                    </div>

                    {isSubmitted && (
                      <button
                        type="button"
                        onClick={() => handleRetryQuestion(q.id)}
                        className="text-[11px] font-bold text-emerald-700 hover:text-emerald-900 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Soruyu Tekrar Çöz</span>
                      </button>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm font-bold text-slate-900 mb-3.5 leading-relaxed">
                    {q.question}
                  </p>

                  {/* Options */}
                  <div className="space-y-2 mb-3.5">
                    {q.options.map((opt, optIdx) => {
                      let optionStyle = 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-emerald-50/50 hover:border-emerald-200';
                      if (isSubmitted) {
                        if (optIdx === q.correctAnswer) {
                          optionStyle = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold';
                        } else if (chosen === optIdx) {
                          optionStyle = 'bg-rose-100 border-rose-400 text-rose-950';
                        }
                      } else if (chosen === optIdx) {
                        optionStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-400';
                      }

                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => handleSelectQuizOption(q.id, optIdx)}
                          className={`w-full text-left p-3 rounded-xl border-2 text-xs sm:text-sm transition-all flex items-start gap-2.5 cursor-pointer ${optionStyle}`}
                        >
                          <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span className="leading-snug">{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Submit button & Feedback */}
                  {!isSubmitted ? (
                    <button
                      type="button"
                      onClick={() => handleCheckQuiz(q.id)}
                      disabled={chosen === undefined}
                      className="bg-emerald-500 hover:bg-emerald-600 disabled:opacity-40 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
                    >
                      Cevabımı Kontrol Et
                    </button>
                  ) : (
                    <div className={`p-3.5 rounded-xl text-xs leading-relaxed border-2 ${
                      isCorrect ? 'bg-emerald-100 text-emerald-950 border-emerald-300' : 'bg-rose-100 text-rose-950 border-rose-300'
                    }`}>
                      <div className="font-bold flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1.5">
                          {isCorrect ? (
                            <>
                              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                              <span>Doğru Cevap! Aferin sana.</span>
                            </>
                          ) : (
                            <>
                              <Info className="w-4 h-4 text-rose-700" />
                              <span>Doğru seçenek: {String.fromCharCode(65 + q.correctAnswer)} şıkkıydı.</span>
                            </>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRetryQuestion(q.id)}
                          className="px-2.5 py-1 bg-white/80 hover:bg-white text-stone-800 font-bold rounded-lg text-[11px] border border-stone-300 transition-all cursor-pointer inline-flex items-center gap-1 shadow-2xs"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Tekrar Dene</span>
                        </button>
                      </div>
                      <p className="mt-1 text-slate-800">
                        💡 <strong>Öğretmenin Açıklaması:</strong> {q.explanation}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
