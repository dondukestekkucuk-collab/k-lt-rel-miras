'use client';

import React, { useState } from 'react';
import { 
  BookOpen, 
  Mic, 
  HeartHandshake, 
  CheckCircle2, 
  HelpCircle, 
  Sparkles, 
  Users, 
  Info, 
  Printer, 
  Save, 
  History,
  FileSpreadsheet,
  FileText
} from 'lucide-react';
import { LEVEL_2_QUESTIONS } from '@/lib/learningData';
import { StudentSession } from '@/lib/types';
import confetti from 'canvas-confetti';

interface Level2IntermediateProps {
  session: StudentSession;
  onUpdateOralHistory: (questionKey: string, answer: string) => void;
  onToggleTaskComplete: (taskId: string) => void;
  onAnswerQuiz: (questionId: string, isCorrect: boolean) => void;
  onOpenReport: () => void;
}

export default function Level2Intermediate({
  session,
  onUpdateOralHistory,
  onToggleTaskComplete,
  onAnswerQuiz,
  onOpenReport,
}: Level2IntermediateProps) {
  // Quiz states
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submittedQuiz, setSubmittedQuiz] = useState<Record<string, boolean>>({});

  // 5 Oral History Questions State
  const [intervieweeName, setIntervieweeName] = useState(session.oralHistoryAnswers['interviewee_name'] || '');
  const [intervieweeAge, setIntervieweeAge] = useState(session.oralHistoryAnswers['interviewee_age'] || '');
  const [intervieweeRelation, setIntervieweeRelation] = useState(session.oralHistoryAnswers['interviewee_relation'] || '');
  
  const [q1, setQ1] = useState(session.oralHistoryAnswers['l2-q1'] || '');
  const [q2, setQ2] = useState(session.oralHistoryAnswers['l2-q2'] || '');
  const [q3, setQ3] = useState(session.oralHistoryAnswers['l2-q3'] || '');
  const [q4, setQ4] = useState(session.oralHistoryAnswers['l2-q4'] || '');
  const [q5, setQ5] = useState(session.oralHistoryAnswers['l2-q5'] || '');

  const [savedSuccessMsg, setSavedSuccessMsg] = useState('');

  const handleSaveInterview = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateOralHistory('interviewee_name', intervieweeName);
    onUpdateOralHistory('interviewee_age', intervieweeAge);
    onUpdateOralHistory('interviewee_relation', intervieweeRelation);
    onUpdateOralHistory('l2-q1', q1);
    onUpdateOralHistory('l2-q2', q2);
    onUpdateOralHistory('l2-q3', q3);
    onUpdateOralHistory('l2-q4', q4);
    onUpdateOralHistory('l2-q5', q5);

    // Check if at least 3 questions answered
    const answeredCount = [q1, q2, q3, q4, q5].filter(ans => ans.trim().length > 3).length;
    if (answeredCount >= 2 && !session.completedTasks.includes('l2-oral-history')) {
      onToggleTaskComplete('l2-oral-history');
      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.75 }
        });
      } catch {}
    }

    setSavedSuccessMsg('Sözlü tarih çalışmanız başarıyla kaydedildi! Raporunuzu görüntüleyebilirsiniz.');
    setTimeout(() => setSavedSuccessMsg(''), 4000);
  };

  const handleSelectQuizOption = (questionId: string, optionIdx: number) => {
    if (submittedQuiz[questionId]) return;
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleCheckQuiz = (questionId: string) => {
    const selected = selectedAnswers[questionId];
    if (selected === undefined) return;
    
    setSubmittedQuiz(prev => ({ ...prev, [questionId]: true }));
    const question = LEVEL_2_QUESTIONS.find(q => q.id === questionId);
    const isCorrect = question?.correctAnswer === selected;
    
    onAnswerQuiz(questionId, isCorrect);
    
    if (isCorrect) {
      try {
        confetti({
          particleCount: 40,
          spread: 70,
          origin: { y: 0.7 }
        });
      } catch {}
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Outer Main Container */}
      <div className="bg-white rounded-3xl border-4 border-[#B45309] p-6 sm:p-8 shadow-sm space-y-8">

        {/* 1. Header Hero Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-[#FFFBEB] p-6 rounded-2xl border-2 border-[#FDE68A]">
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#9A3412] bg-[#FEF3C7] px-2.5 py-1 rounded-full mb-2 border border-[#FDE68A]">
                <BookOpen className="w-3.5 h-3.5 text-[#B45309]" />
                Seviye 2: Sözel ve Anlatı İstasyonu
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#451A03] mb-2 uppercase tracking-tight">
                Kuşaklar Arası Köprü: Yaşayan Bellek
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-[#78350F] font-medium">
                Sevgili öğrencim! Kültürümüz yalnızca binalarda değil; büyüklerimizin anlattığı hatıralarda, bayramlaşmalarda, imece usulü dayanışmada ve mutfak kokularında yaşar. Sözlü tarih yöntemiyle geçmişin canlı şahitlerini dinlemeye hazır mısın?
              </p>
            </div>

            {/* 3 Step Guide */}
            <div className="space-y-3">
              <div className="flex items-center gap-3.5 bg-white p-3.5 rounded-2xl shadow-xs border-2 border-[#FDE68A]">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#8C291E] to-[#B45309] flex items-center justify-center text-amber-100 font-black italic shrink-0 shadow-xs">
                  1
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-[#451A03]">Görüşme Öncesi Hazırlık</p>
                  <p className="text-xs text-stone-600">Görüşülecek kişiyi belirle, randevu al ve sorularını önceden hazırla.</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 bg-white p-3.5 rounded-2xl shadow-xs border-2 border-[#FDE68A]">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#8C291E] to-[#B45309] flex items-center justify-center text-amber-100 font-black italic shrink-0 shadow-xs">
                  2
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-[#451A03]">Görüşme ve Kayıt</p>
                  <p className="text-xs text-stone-600">Nezaketle dinle, sözünü kesme, izin alarak ses veya not kaydı al.</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 bg-white p-3.5 rounded-2xl shadow-xs border-2 border-[#FDE68A]">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#8C291E] to-[#B45309] flex items-center justify-center text-amber-100 font-black italic shrink-0 shadow-xs">
                  3
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-[#451A03]">Raporlaştırma ve Arşiv</p>
                  <p className="text-xs text-stone-600">Toplanan bilgileri düzenle, kültürel mirası aile arşivine kazandır.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Highlight Box */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#8C291E] to-[#B45309] rounded-3xl p-6 text-white shadow-md flex flex-col justify-between h-full border border-amber-300/30">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-6 h-6 text-amber-200" />
                <h3 className="font-black text-lg sm:text-xl tracking-tight">Sözlü Tarih Kazanımları</h3>
              </div>
              <p className="text-xs text-amber-100 mb-4 leading-relaxed font-normal">
                Bir tarih araştırmacısı gibi sahadan canlı verileri topla ve kaydet:
              </p>

              <ul className="space-y-3.5">
                <li className="flex items-start gap-3 bg-[#5C140E]/60 p-3 rounded-2xl border border-amber-400/30">
                  <span className="text-2xl">👴</span>
                  <div>
                    <p className="font-bold text-xs sm:text-sm text-white">Canlı Tarih Mülakatı</p>
                    <p className="text-xs text-sky-100 opacity-90">Bir aile büyüğünle çocukluğu hakkında röportaj yap.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 bg-sky-600/70 p-3 rounded-2xl border border-sky-400/40">
                  <span className="text-2xl">🎉</span>
                  <div>
                    <p className="font-bold text-xs sm:text-sm text-white">Gelenek & Bayram Analizi</p>
                    <p className="text-xs text-sky-100 opacity-90">Eski bayram veya düğün geleneklerini karşılaştır.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 bg-sky-600/70 p-3 rounded-2xl border border-sky-400/40">
                  <span className="text-2xl">🤝</span>
                  <div>
                    <p className="font-bold text-xs sm:text-sm text-white">İmece ve Dayanışma</p>
                    <p className="text-xs text-sky-100 opacity-90">Komşuluk ve yardımlaşma adetlerini belgele.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 2. MEB Sosyal Bilgiler Müfredat Anlatımı: Somut ve Soyut Bağlar */}
        <div className="bg-sky-50/50 rounded-2xl border-2 border-sky-100 p-5 sm:p-6">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-sky-200">
            <Sparkles className="w-5 h-5 text-sky-700" />
            <h3 className="text-base sm:text-lg font-black text-sky-950">
              Kültürel Aktarım ve Toplumsal Birlik
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white border-2 border-sky-100 rounded-2xl p-4 shadow-xs">
              <h4 className="font-bold text-sky-950 text-sm mb-1.5 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
                Somut Kültürel Miras
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tarihi köprüler, hanlar, camiler, etnografik eşyalar, el dokuması kilimler ve çeşmeler gibi fiziksel varlığı olan unsurlardır.
              </p>
            </div>

            <div className="bg-white border-2 border-sky-100 rounded-2xl p-4 shadow-xs">
              <h4 className="font-bold text-sky-950 text-sm mb-1.5 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-500"></span>
                Somut Olmayan Kültürel Miras (SOKÜM)
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Bayramlaşma adabı, düğün gelenekleri, aşure dağıtımı, yardımlaşma (imece), türküler, ninniler ve fıkralar gibi yaşayan manevi değerlerimizdir.
              </p>
            </div>
          </div>
        </div>

        {/* 3. Mini Sözlü Tarih Görüşme Formu */}
        <div className="bg-white rounded-2xl border-2 border-sky-200 p-5 sm:p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-sky-100">
            <div>
              <h3 className="text-base sm:text-lg font-black text-sky-950 flex items-center gap-2">
                <span>Mini Sözlü Tarih Görüşme Formu</span>
                <Mic className="w-4 h-4 text-sky-600" />
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Aile büyüğünle röportaj yap ve anlattıklarını kaydederek raporunu oluştur
              </p>
            </div>

            <div className="flex items-center gap-2">
              {session.completedTasks.includes('l2-oral-history') && (
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Görüşme Kayıtlı
                </span>
              )}
              <button
                type="button"
                onClick={onOpenReport}
                className="text-xs font-bold bg-sky-50 hover:bg-sky-100 text-sky-700 px-3 py-1.5 rounded-xl border border-sky-200 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Raporu Önizle</span>
              </button>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-sky-50/70 border-2 border-sky-100 rounded-xl p-4 text-xs text-sky-950 leading-relaxed flex items-start gap-2.5">
            <Info className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
            <div>
              <strong>Sözlü Tarih İpuçları:</strong> Görüşmeye başlamadan önce büyüğünden izin al, nazik ve sabırlı bir dil kullan. Konuşurken sözünü kesme, verdiği cevapların kilit noktalarını aşağıdaki soru kutularına not et.
            </div>
          </div>

          <form onSubmit={handleSaveInterview} className="space-y-6">
            
            {/* Interviewee Metadata */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-sky-50/40 p-4 rounded-2xl border-2 border-sky-100">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Görüşülen Kişinin Adı Soyadı:
                </label>
                <input
                  type="text"
                  placeholder="Örn: Ahmet Yılmaz"
                  value={intervieweeName}
                  onChange={(e) => setIntervieweeName(e.target.value)}
                  className="w-full text-xs sm:text-sm bg-white border-2 border-sky-100 rounded-xl px-3 py-2 text-slate-800 focus:border-sky-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Yaşı / Doğum Yılı:
                </label>
                <input
                  type="text"
                  placeholder="Örn: 72 yaşında (1954)"
                  value={intervieweeAge}
                  onChange={(e) => setIntervieweeAge(e.target.value)}
                  className="w-full text-xs sm:text-sm bg-white border-2 border-sky-100 rounded-xl px-3 py-2 text-slate-800 focus:border-sky-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Akrabalık / Yakınlık Derecesi:
                </label>
                <input
                  type="text"
                  placeholder="Örn: Dedem / Anneannem"
                  value={intervieweeRelation}
                  onChange={(e) => setIntervieweeRelation(e.target.value)}
                  className="w-full text-xs sm:text-sm bg-white border-2 border-sky-100 rounded-xl px-3 py-2 text-slate-800 focus:border-sky-500 focus:outline-hidden"
                />
              </div>
            </div>

            {/* 5 Questions */}
            <div className="space-y-4">
              
              {/* Soru 1 */}
              <div className="border-2 border-sky-100 rounded-2xl p-4 bg-white hover:border-sky-300 transition-colors">
                <label className="block text-xs sm:text-sm font-bold text-slate-900 mb-1.5">
                  1. Soru: &quot;Çocukluğunuzdaki bayram hazırlıkları ve bayramlaşma adetleri nasıldı? Günümüz bayramlarıyla hangi farklar var?&quot;
                </label>
                <textarea
                  rows={2}
                  placeholder="Büyüğünüzün anlattıklarını özetleyiniz (yeni bayramlık elbiseler, mendil içinde harçlık verme, el öpme ziyaretleri vb.)..."
                  value={q1}
                  onChange={(e) => setQ1(e.target.value)}
                  className="w-full text-xs sm:text-sm bg-slate-50/60 border-2 border-sky-100 rounded-xl p-3 text-slate-800 focus:border-sky-500 focus:outline-hidden"
                />
              </div>

              {/* Soru 2 */}
              <div className="border-2 border-sky-100 rounded-2xl p-4 bg-white hover:border-sky-300 transition-colors">
                <label className="block text-xs sm:text-sm font-bold text-slate-900 mb-1.5">
                  2. Soru: &quot;Gençliğinizde köyünüzde veya mahallenizde imece (dayanışma) usulüyle birlikte hangi işler yapılırdı?&quot;
                </label>
                <textarea
                  rows={2}
                  placeholder="Örn: Kışlık tarhana/salça yapımı, ev yapımı, ekin biçme, yufka açma günleri..."
                  value={q2}
                  onChange={(e) => setQ2(e.target.value)}
                  className="w-full text-xs sm:text-sm bg-slate-50/60 border-2 border-sky-100 rounded-xl p-3 text-slate-800 focus:border-sky-500 focus:outline-hidden"
                />
              </div>

              {/* Soru 3 */}
              <div className="border-2 border-sky-100 rounded-2xl p-4 bg-white hover:border-sky-300 transition-colors">
                <label className="block text-xs sm:text-sm font-bold text-slate-900 mb-1.5">
                  3. Soru: &quot;O dönemde sokakta arkadaşlarınızla oynadığınız en popüler geleneksel oyun hangisiydi ve nasıl oynanırdı?&quot;
                </label>
                <textarea
                  rows={2}
                  placeholder="Örn: Çelik çomak, saklambaç, yakar top, beştaş, bilye, mendil kapmaca..."
                  value={q3}
                  onChange={(e) => setQ3(e.target.value)}
                  className="w-full text-xs sm:text-sm bg-slate-50/60 border-2 border-sky-100 rounded-xl p-3 text-slate-800 focus:border-sky-500 focus:outline-hidden"
                />
              </div>

              {/* Soru 4 */}
              <div className="border-2 border-sky-100 rounded-2xl p-4 bg-white hover:border-sky-300 transition-colors">
                <label className="block text-xs sm:text-sm font-bold text-slate-900 mb-1.5">
                  4. Soru: &quot;Eski dönemlerde aile ve komşuluk ilişkilerinde kutlanan özel günler nasıl gerçekleşirdi?&quot;
                </label>
                <textarea
                  rows={2}
                  placeholder="Örn: 3 gün süren düğünler, kına geceleri, maniler, komşuların yemek getirerek destek olması..."
                  value={q4}
                  onChange={(e) => setQ4(e.target.value)}
                  className="w-full text-xs sm:text-sm bg-slate-50/60 border-2 border-sky-100 rounded-xl p-3 text-slate-800 focus:border-sky-500 focus:outline-hidden"
                />
              </div>

              {/* Soru 5 */}
              <div className="border-2 border-sky-100 rounded-2xl p-4 bg-white hover:border-sky-300 transition-colors">
                <label className="block text-xs sm:text-sm font-bold text-slate-900 mb-1.5">
                  5. Soru: &quot;Çocukluğunuzda çevrenizde olup da günümüzde artık kaybolmuş ya da unutulmaya yüz tutmuş bir meslek var mı?&quot;
                </label>
                <textarea
                  rows={2}
                  placeholder="Örn: Kalaycılık, semercilik, taş değirmencilik, sepet örme, su tulumbacılığı..."
                  value={q5}
                  onChange={(e) => setQ5(e.target.value)}
                  className="w-full text-xs sm:text-sm bg-slate-50/60 border-2 border-sky-100 rounded-xl p-3 text-slate-800 focus:border-sky-500 focus:outline-hidden"
                />
              </div>

            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 text-white text-xs sm:text-sm font-bold px-6 py-2.5 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Sözlü Tarih Görüşmesini Kaydet</span>
              </button>

              {savedSuccessMsg && (
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                  {savedSuccessMsg}
                </span>
              )}
            </div>

          </form>
        </div>

        {/* 4. Öğretmen Kontrol Soruları */}
        <div className="bg-sky-50/60 rounded-2xl border-2 border-sky-200 p-5 sm:p-6 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-sky-200">
            <div>
              <h3 className="text-base sm:text-lg font-black text-sky-950">
                Seviye 2 Kontrol Soruları (2 Soru)
              </h3>
              <p className="text-xs text-slate-600">
                Müfredat kazanımlarını pekiştirmek için doğru seçeneği işaretle ve &quot;Cevabımı Kontrol Et&quot;e tıkla
              </p>
            </div>
            <span className="text-xs font-bold bg-amber-100 text-amber-900 px-3 py-1 rounded-full border border-amber-200">
              Kavram Kontrolü
            </span>
          </div>

          <div className="space-y-4">
            {LEVEL_2_QUESTIONS.map((q, idx) => {
              const isSubmitted = submittedQuiz[q.id];
              const chosen = selectedAnswers[q.id];
              const isCorrect = chosen === q.correctAnswer;

              return (
                <div 
                  key={q.id}
                  className="border-2 border-sky-100 rounded-2xl p-5 bg-white shadow-xs"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-sky-500 text-white text-[11px] font-black px-2 py-0.5 rounded-md">
                      Soru {idx + 1}
                    </span>
                    <span className="text-[11px] text-slate-500 font-semibold">
                      Kazanım: {q.conceptTag}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm font-bold text-slate-900 mb-3.5 leading-relaxed">
                    {q.question}
                  </p>

                  {/* Options */}
                  <div className="space-y-2 mb-3.5">
                    {q.options.map((opt, optIdx) => {
                      let optionStyle = 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-sky-50/50 hover:border-sky-200';
                      if (isSubmitted) {
                        if (optIdx === q.correctAnswer) {
                          optionStyle = 'bg-sky-100 border-sky-500 text-sky-950 font-bold';
                        } else if (chosen === optIdx) {
                          optionStyle = 'bg-rose-100 border-rose-400 text-rose-950';
                        }
                      } else if (chosen === optIdx) {
                        optionStyle = 'bg-sky-50 border-sky-500 text-sky-950 font-bold ring-2 ring-sky-400';
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
                      className="bg-sky-500 hover:bg-sky-600 disabled:opacity-40 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
                    >
                      Cevabımı Kontrol Et
                    </button>
                  ) : (
                    <div className={`p-3.5 rounded-xl text-xs leading-relaxed border-2 ${
                      isCorrect ? 'bg-sky-100 text-sky-950 border-sky-300' : 'bg-rose-100 text-rose-950 border-rose-300'
                    }`}>
                      <div className="font-bold flex items-center gap-1.5 mb-1">
                        {isCorrect ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-sky-700" />
                            <span>Tebrikler! Doğru cevapladın.</span>
                          </>
                        ) : (
                          <>
                            <Info className="w-4 h-4 text-rose-700" />
                            <span>Doğru seçenek: {String.fromCharCode(65 + q.correctAnswer)} şıkkı.</span>
                          </>
                        )}
                      </div>
                      <p className="mt-1 text-slate-800">
                        💡 <strong>Öğretmen Değerlendirmesi:</strong> {q.explanation}
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
