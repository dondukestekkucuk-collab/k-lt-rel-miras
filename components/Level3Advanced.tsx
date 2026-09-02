'use client';

import React, { useState } from 'react';
import { 
  Compass, 
  Globe2, 
  Laptop, 
  MapPin, 
  Cpu, 
  ShieldCheck, 
  Lightbulb, 
  CheckCircle2, 
  HelpCircle, 
  Sparkles, 
  TrendingUp, 
  Send, 
  Layers,
  Info,
  Building,
  Target,
  Printer,
  RotateCcw
} from 'lucide-react';
import { LEVEL_3_QUESTIONS } from '@/lib/learningData';
import { StudentSession } from '@/lib/types';
import { sounds } from '@/lib/audio';
import confetti from 'canvas-confetti';

interface Level3AdvancedProps {
  session: StudentSession;
  onUpdateProjectAnswer: (projectId: string, answer: string) => void;
  onToggleTaskComplete: (taskId: string) => void;
  onAnswerQuiz: (questionId: string, isCorrect: boolean) => void;
  onOpenReport?: () => void;
}

export default function Level3Advanced({
  session,
  onUpdateProjectAnswer,
  onToggleTaskComplete,
  onAnswerQuiz,
  onOpenReport,
}: Level3AdvancedProps) {
  // Quiz states
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submittedQuiz, setSubmittedQuiz] = useState<Record<string, boolean>>({});

  // 3 Advanced Project Challenge States
  const [project1, setProject1] = useState(session.projectAnswers['l3-p1'] || '');
  const [project2, setProject2] = useState(session.projectAnswers['l3-p2'] || '');
  const [project3, setProject3] = useState(session.projectAnswers['l3-p3'] || '');

  const handleSaveProject = (projectId: string, text: string) => {
    sounds.playClick();
    onUpdateProjectAnswer(projectId, text);
    if (text.trim().length > 10) {
      if (!session.completedTasks.includes(projectId)) {
        onToggleTaskComplete(projectId);
        sounds.playSuccess();
        try {
          confetti({
            particleCount: 45,
            spread: 70,
            origin: { y: 0.75 }
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
    const question = LEVEL_3_QUESTIONS.find(q => q.id === questionId);
    const isCorrect = question?.correctAnswer === selected;
    
    onAnswerQuiz(questionId, isCorrect);
    
    if (isCorrect) {
      sounds.playSuccess();
      try {
        confetti({
          particleCount: 50,
          spread: 80,
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
    if (window.confirm('Bu istasyondaki tüm analiz sorularını sıfırlayıp baştan çözmek istiyor musunuz?')) {
      setSubmittedQuiz({});
      setSelectedAnswers({});
      sounds.playSuccess();
    }
  };

  const handleResetProjects = () => {
    sounds.playClick();
    if (window.confirm('3 Dijital Miras Proje cevabınızı temizleyip yeniden fikir geliştirmek istiyor musunuz?')) {
      setProject1('');
      setProject2('');
      setProject3('');
      onUpdateProjectAnswer('l3-p1', '');
      onUpdateProjectAnswer('l3-p2', '');
      onUpdateProjectAnswer('l3-p3', '');
      sounds.playSuccess();
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Outer Main Container */}
      <div className="bg-white rounded-3xl border-4 border-indigo-500 p-6 sm:p-8 shadow-sm space-y-8">

        {/* 1. Header Hero Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-indigo-50 p-6 rounded-2xl border-2 border-indigo-100">
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-indigo-700 bg-indigo-100/80 px-2.5 py-1 rounded-full mb-2">
                <Compass className="w-3.5 h-3.5 text-indigo-600" />
                Seviye 3: Analitik ve Araştırma İstasyonu
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-indigo-950 mb-2 uppercase tracking-tight">
                Geleceğin Mirasçıları: Dijital Çağda Kültürel İnovasyon
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-indigo-900 font-medium">
                Sevgili genç araştırmacı! Kültürel mirası yalnızca geçmişin nostaljik bir hatırası olarak değil, geleceği inşa eden bir inovasyon, kimlik ve sürdürülebilir kalkınma gücü olarak analiz etmeye hazır mısın?
              </p>
            </div>

            {/* 3 Step Guide */}
            <div className="space-y-3">
              <div className="flex items-center gap-3.5 bg-white p-3.5 rounded-2xl shadow-xs border-2 border-indigo-100">
                <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-black italic shrink-0 shadow-xs">
                  1
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-indigo-950">1. Teşhis & Risk Analizi</p>
                  <p className="text-xs text-slate-600">Hedef kültürel miras unsurunun mevcut durumunu ve yok olma risklerini tespit et.</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 bg-white p-3.5 rounded-2xl shadow-xs border-2 border-indigo-100">
                <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-black italic shrink-0 shadow-xs">
                  2
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-indigo-950">2. Dijital Belgeleme & Modelleme</p>
                  <p className="text-xs text-slate-600">3D tarama, fotogrametri ve ses kayıtlarıyla standartlaştırılmış metaveri oluştur.</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 bg-white p-3.5 rounded-2xl shadow-xs border-2 border-indigo-100">
                <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-black italic shrink-0 shadow-xs">
                  3
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-indigo-950">3. Sürdürülebilir Eylem & Katma Değer</p>
                  <p className="text-xs text-slate-600">Miras öğesini dijital sergiye veya eko-turizm atölyesine dönüştürerek yaşat.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Highlight Box */}
          <div className="lg:col-span-5 bg-indigo-600 rounded-3xl p-6 text-white shadow-md flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-6 h-6 text-indigo-200" />
                <h3 className="font-black text-lg sm:text-xl tracking-tight">İnovasyon Odakları</h3>
              </div>
              <p className="text-xs text-indigo-100 mb-4 leading-relaxed font-normal">
                Akademik ve eleştirel düşünme araçlarıyla geleceğin projelerini yönet:
              </p>

              <ul className="space-y-3.5">
                <li className="flex items-start gap-3 bg-indigo-700/80 p-3 rounded-2xl border border-indigo-400/40">
                  <span className="text-2xl">🏛️</span>
                  <div>
                    <p className="font-bold text-xs sm:text-sm text-white">Sanal Sergi & 3D Miras</p>
                    <p className="text-xs text-indigo-100 opacity-90">Kültürel eserleri dijital ikizleri ve AR ile dünyaya aç.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 bg-indigo-700/80 p-3 rounded-2xl border border-indigo-400/40">
                  <span className="text-2xl">🌿</span>
                  <div>
                    <p className="font-bold text-xs sm:text-sm text-white">Eko-Turizm & Zanaat</p>
                    <p className="text-xs text-indigo-100 opacity-90">Yerel halka ekonomik kalkınma sağlayan atölyeler kur.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 bg-indigo-700/80 p-3 rounded-2xl border border-indigo-400/40">
                  <span className="text-2xl">🌍</span>
                  <div>
                    <p className="font-bold text-xs sm:text-sm text-white">UNESCO Miras Adaylığı</p>
                    <p className="text-xs text-indigo-100 opacity-90">Evrensel insanlık değeri taşıyan unsurları tescille.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 2. Akademik ve Eleştirel Açıklama */}
        <div className="bg-indigo-50/50 rounded-2xl border-2 border-indigo-100 p-5 sm:p-6">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-indigo-200">
            <Globe2 className="w-5 h-5 text-indigo-700" />
            <h3 className="text-base sm:text-lg font-black text-indigo-950">
              Küreselleşme, Dijitalleşme ve Kültürel Mirasın Dönüşümü
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white border-2 border-indigo-100 rounded-2xl p-4 shadow-xs">
              <h4 className="font-bold text-indigo-950 text-sm mb-1.5 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                Küreselleşme & Kültürel Tektipleşme Riski
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Hızlı tüketim alışkanlıkları ve küresel medya, yerel dilleri ve ritüelleri marjinalleştirebilir. Buna karşı en etkili strateji &quot;Glokalizasyon&quot; (küresel düşünen fakat yerel köklerine bağlı kalan bilinç) geliştirmektir.
              </p>
            </div>

            <div className="bg-white border-2 border-indigo-100 rounded-2xl p-4 shadow-xs">
              <h4 className="font-bold text-indigo-950 text-sm mb-1.5 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-500"></span>
                Dijital Arşivcilik & Açık Veri Devrimi
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                3D LiDAR tarama, fotogrametri, artırılmış gerçeklik (AR) ve blokzincir tabanlı telif kayıtları sayesinde fiziksel olarak tahrip olma riski taşıyan anıtlar dijital belleğe kazandırılmaktadır.
              </p>
            </div>
          </div>
        </div>

        {/* 3. Geleceğin Kariyer Alanları */}
        <div className="bg-white rounded-2xl border-2 border-indigo-100 p-5 sm:p-6 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-indigo-100">
            <Building className="w-5 h-5 text-indigo-700" />
            <h3 className="text-base sm:text-lg font-black text-indigo-950">
              Geleceğin Kariyer Alanları ve Uygulama Sahaları
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="border-2 border-indigo-100 rounded-2xl p-4 bg-indigo-50/40">
              <Building className="w-5 h-5 text-indigo-700 mb-2" />
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-1">
                Dijital Müzecilik & Küratörlük
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Sanal turlar, etkileşimli sergi alanları ve yapay zekâ destekli tarihi canlandırmalar tasarlamak.
              </p>
            </div>

            <div className="border-2 border-indigo-100 rounded-2xl p-4 bg-indigo-50/40">
              <MapPin className="w-5 h-5 text-indigo-700 mb-2" />
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-1">
                Yerel Kalkınma & Eko-Turizm
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tarihi köylerin el sanatları mirasını koruyarak yöre halkına sürdürülebilir gelir kazandırmak.
              </p>
            </div>

            <div className="border-2 border-indigo-100 rounded-2xl p-4 bg-indigo-50/40">
              <ShieldCheck className="w-5 h-5 text-indigo-700 mb-2" />
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-1">
                Kültür Diplomasisi & UNESCO
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Ülkemizin zengin kültür hazinelerini uluslararası platformlarda temsil edip tescil dosyaları hazırlamak.
              </p>
            </div>
          </div>
        </div>

        {/* 4. Seviye 3 İnovasyon Laboratuvarı */}
        <div className="bg-white rounded-2xl border-2 border-indigo-200 p-5 sm:p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-indigo-100">
            <div>
              <h3 className="text-base sm:text-lg font-black text-indigo-950 flex items-center gap-2">
                <span>Seviye 3 İnovasyon Laboratuvarı (3 İleri Proje Görevi)</span>
                <Laptop className="w-4 h-4 text-indigo-600" />
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Stratejik planlarını hazırla ve &quot;Projeyi Gönder & Kaydet&quot; butonuna tıkla
              </p>
            </div>
            <button
              type="button"
              onClick={onOpenReport}
              className="text-xs font-bold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-xl border border-indigo-200 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Raporu Önizle</span>
            </button>
          </div>

          <div className="space-y-5">
            {/* Proje 1 */}
            <div className={`p-5 rounded-2xl border-2 transition-all ${
              session.completedTasks.includes('l3-p1')
                ? 'bg-indigo-50/60 border-indigo-400'
                : 'bg-white border-indigo-100'
            }`}>
              <div className="flex items-start justify-between gap-3 mb-2.5">
                <div className="flex items-center gap-2">
                  <Laptop className="w-4 h-4 text-indigo-700 shrink-0" />
                  <h4 className="text-xs sm:text-sm font-black text-slate-900">
                    Proje 1: &quot;Dijital Kültürel Bellek ve Sanal Sergi Tasarımı&quot;
                  </h4>
                </div>
                {session.completedTasks.includes('l3-p1') && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Kaydedildi
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                <strong>Senaryo:</strong> Yaşadığın şehrin unutulmaya yüz tutmuş bir geleneği veya mimari eseri için sanal bir etkileşimli sergi planla. Sergi hangi bölümlerden oluşacak? Ziyaretçiler sanal ortamda neler deneyimleyecek?
              </p>
              <textarea
                rows={3}
                placeholder="Sanal sergi planınızı, kullanılacak teknolojileri (3D tur, sesli rehber, avatar vb.) buraya yazınız..."
                value={project1}
                onChange={(e) => setProject1(e.target.value)}
                className="w-full text-xs sm:text-sm bg-slate-50/60 border-2 border-indigo-100 rounded-xl p-3 text-slate-800 focus:border-indigo-500 focus:outline-hidden mb-2.5"
              />
              <button
                type="button"
                onClick={() => handleSaveProject('l3-p1', project1)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
              >
                Projeyi Gönder & Kaydet
              </button>
            </div>

            {/* Proje 2 */}
            <div className={`p-5 rounded-2xl border-2 transition-all ${
              session.completedTasks.includes('l3-p2')
                ? 'bg-indigo-50/60 border-indigo-400'
                : 'bg-white border-indigo-100'
            }`}>
              <div className="flex items-start justify-between gap-3 mb-2.5">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-indigo-700 shrink-0" />
                  <h4 className="text-xs sm:text-sm font-black text-slate-900">
                    Proje 2: &quot;Yerel Somut Olmayan Miras İçin Sürdürülebilir Eko-Turizm Modeli&quot;
                  </h4>
                </div>
                {session.completedTasks.includes('l3-p2') && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Kaydedildi
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                <strong>Senaryo:</strong> Bir köyde yapılan geleneksel bir zanaatı genç nesillere aktarırken yerel halka gelir sağlayacak bir turizm ve atölye projesi tasarla.
              </p>
              <textarea
                rows={3}
                placeholder="Projenin hedef kitlesi, atölye aşamaları ve köye sağlayacağı ekonomik/kültürel faydaları yazınız..."
                value={project2}
                onChange={(e) => setProject2(e.target.value)}
                className="w-full text-xs sm:text-sm bg-slate-50/60 border-2 border-indigo-100 rounded-xl p-3 text-slate-800 focus:border-indigo-500 focus:outline-hidden mb-2.5"
              />
              <button
                type="button"
                onClick={() => handleSaveProject('l3-p2', project2)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
              >
                Projeyi Gönder & Kaydet
              </button>
            </div>

            {/* Proje 3 */}
            <div className={`p-5 rounded-2xl border-2 transition-all ${
              session.completedTasks.includes('l3-p3')
                ? 'bg-indigo-50/60 border-indigo-400'
                : 'bg-white border-indigo-100'
            }`}>
              <div className="flex items-start justify-between gap-3 mb-2.5">
                <div className="flex items-center gap-2">
                  <Globe2 className="w-4 h-4 text-indigo-700 shrink-0" />
                  <h4 className="text-xs sm:text-sm font-black text-slate-900">
                    Proje 3: &quot;UNESCO Somut Olmayan Miras Aday Dosyası Simülatörü&quot;
                  </h4>
                </div>
                {session.completedTasks.includes('l3-p3') && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Kaydedildi
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                <strong>Senaryo:</strong> Türkiye&apos;den UNESCO İnsanlığın Somut Olmayan Kültürel Mirası Temsili Listesi&apos;ne girmesini önerdiğin bir kültürel değeri seç ve 3 maddelik gerekçe raporu yaz.
              </p>
              <textarea
                rows={3}
                placeholder="Aday gösterdiğin mirasın adı, evrensel değeri ve neden insanlık mirası sayılması gerektiğine dair gerekçelerin..."
                value={project3}
                onChange={(e) => setProject3(e.target.value)}
                className="w-full text-xs sm:text-sm bg-slate-50/60 border-2 border-indigo-100 rounded-xl p-3 text-slate-800 focus:border-indigo-500 focus:outline-hidden mb-2.5"
              />
              <button
                type="button"
                onClick={() => handleSaveProject('l3-p3', project3)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
              >
                Projeyi Gönder & Kaydet
              </button>
            </div>
          </div>
        </div>

        {/* 5. Öğretmen Kontrol Soruları */}
        <div className="bg-indigo-50/60 rounded-2xl border-2 border-indigo-200 p-5 sm:p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-indigo-200">
            <div>
              <h3 className="text-base sm:text-lg font-black text-indigo-950">
                Seviye 3 Analiz & İnovasyon Testi (2 Soru)
              </h3>
              <p className="text-xs text-slate-600">
                Analitik çıkarım yaparak doğru seçeneği işaretle ve &quot;Cevabımı Kontrol Et&quot;e tıkla. Dilediğin kadar tekrar çözebilirsin.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleResetAllQuiz}
                className="text-xs font-bold text-indigo-800 bg-indigo-100 hover:bg-indigo-200 px-3 py-1.5 rounded-xl border border-indigo-300 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                title="Tüm Test Sorularını Sıfırla"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Testi Baştan Çöz</span>
              </button>
              <span className="text-xs font-bold bg-amber-100 text-amber-900 px-3 py-1 rounded-full border border-amber-200">
                İleri Analiz
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {LEVEL_3_QUESTIONS.map((q, idx) => {
              const isSubmitted = submittedQuiz[q.id];
              const chosen = selectedAnswers[q.id];
              const isCorrect = chosen === q.correctAnswer;

              return (
                <div 
                  key={q.id}
                  className="border-2 border-indigo-100 rounded-2xl p-5 bg-white shadow-xs"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="bg-indigo-600 text-white text-[11px] font-black px-2 py-0.5 rounded-md">
                        Soru {idx + 1}
                      </span>
                      <span className="text-[11px] text-slate-500 font-semibold">
                        Analitik Odak: {q.conceptTag}
                      </span>
                    </div>

                    {isSubmitted && (
                      <button
                        type="button"
                        onClick={() => handleRetryQuestion(q.id)}
                        className="text-[11px] font-bold text-indigo-700 hover:text-indigo-900 hover:underline flex items-center gap-1 cursor-pointer"
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
                      let optionStyle = 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-indigo-50/50 hover:border-indigo-200';
                      if (isSubmitted) {
                        if (optIdx === q.correctAnswer) {
                          optionStyle = 'bg-indigo-100 border-indigo-500 text-indigo-950 font-bold';
                        } else if (chosen === optIdx) {
                          optionStyle = 'bg-rose-100 border-rose-400 text-rose-950';
                        }
                      } else if (chosen === optIdx) {
                        optionStyle = 'bg-indigo-50 border-indigo-500 text-indigo-950 font-bold ring-2 ring-indigo-400';
                      }

                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => handleSelectQuizOption(q.id, optIdx)}
                          disabled={isSubmitted}
                          className={`w-full text-left p-3 rounded-xl border-2 text-xs sm:text-sm transition-all flex items-start gap-2.5 cursor-pointer disabled:cursor-default ${optionStyle}`}
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
                      className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
                    >
                      Cevabımı Kontrol Et
                    </button>
                  ) : (
                    <div className={`p-3.5 rounded-xl text-xs leading-relaxed border-2 ${
                      isCorrect ? 'bg-indigo-100 text-indigo-950 border-indigo-300' : 'bg-rose-100 text-rose-950 border-rose-300'
                    }`}>
                      <div className="font-bold flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1.5">
                          {isCorrect ? (
                            <>
                              <CheckCircle2 className="w-4 h-4 text-indigo-700" />
                              <span>Mükemmel Analiz! Doğru yanıt.</span>
                            </>
                          ) : (
                            <>
                              <Info className="w-4 h-4 text-rose-700" />
                              <span>Doğru yanıt: {String.fromCharCode(65 + q.correctAnswer)} şıkkı.</span>
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
                        💡 <strong>Öğretmen Analiz Notu:</strong> {q.explanation}
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
