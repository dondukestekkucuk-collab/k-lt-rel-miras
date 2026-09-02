'use client';

import React from 'react';
import { 
  X, 
  Printer, 
  Award, 
  CheckCircle2, 
  Calendar, 
  User, 
  FileText, 
  Download,
  Scroll
} from 'lucide-react';
import { StudentSession } from '@/lib/types';

interface OralHistoryReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  session: StudentSession;
}

export default function OralHistoryReportModal({
  isOpen,
  onClose,
  session,
}: OralHistoryReportModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const intervieweeName = session.oralHistoryAnswers['interviewee_name'] || 'Belirtilmedi';
  const intervieweeAge = session.oralHistoryAnswers['interviewee_age'] || 'Belirtilmedi';
  const intervieweeRelation = session.oralHistoryAnswers['interviewee_relation'] || 'Belirtilmedi';

  const q1 = session.oralHistoryAnswers['l2-q1'] || 'Henüz cevaplanmadı.';
  const q2 = session.oralHistoryAnswers['l2-q2'] || 'Henüz cevaplanmadı.';
  const q3 = session.oralHistoryAnswers['l2-q3'] || 'Henüz cevaplanmadı.';
  const q4 = session.oralHistoryAnswers['l2-q4'] || 'Henüz cevaplanmadı.';
  const q5 = session.oralHistoryAnswers['l2-q5'] || 'Henüz cevaplanmadı.';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FAF7F2] rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl border-4 border-[#B45309] overflow-hidden">
        
        {/* Modal Action Bar (Screen Only) */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#741D15] via-[#8C291E] to-[#9A3412] text-white border-b border-[#FDE68A]/30">
          <div className="flex items-center gap-2.5">
            <FileText className="w-5 h-5 text-amber-200" />
            <span className="font-black text-amber-100 text-sm tracking-tight">
              5. Sınıf Öğrenci Kültürel Miras & Sözlü Tarih Dosyası
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-[#5C140E] text-xs font-black px-4 py-1.5 rounded-xl transition-all cursor-pointer shadow-xs active:scale-95 border border-amber-200"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Yazdır / PDF Kaydet</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-xl hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Certificate & Report Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-stone-900 bg-[#FDFBF7]" id="printable-report">
          
          {/* Top Document Header */}
          <div className="text-center border-b-2 border-[#B45309] pb-5">
            <div className="text-xs font-bold tracking-widest text-[#9A3412] uppercase mb-1">
              T.C. Millî Eğitim Bakanlığı 5. Sınıf Sosyal Bilgiler Dersi
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#451A03]">
              KÜLTÜREL MİRAS & SÖZLÜ TARİH ÇALIŞMA DOSYASI
            </h2>
            <p className="text-xs text-stone-500 mt-1 font-medium">
              Türkiye Yüzyılı Maarif Modeli • Farklılaştırılmış İstasyon Öğrenme ve Yaşayan Geçmiş Etkinliği
            </p>
          </div>

          {/* Student Info Card */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#FFFBEB] p-4 rounded-2xl border-2 border-[#FDE68A] text-xs">
            <div>
              <span className="text-stone-500 block font-medium">Öğrenci Adı:</span>
              <strong className="text-[#451A03] text-sm font-black">{session.username || 'Misafir Öğrenci'}</strong>
            </div>
            <div>
              <span className="text-stone-500 block font-medium">Sınıf Seviyesi:</span>
              <strong className="text-[#78350F] text-sm font-black">{session.grade || '5. Sınıf'}</strong>
            </div>
            <div>
              <span className="text-stone-500 block font-medium">Tamamlanan Görev:</span>
              <strong className="text-[#0F766E] text-sm font-black">{session.completedTasks.length} Etkinlik</strong>
            </div>
            <div>
              <span className="text-stone-500 block font-medium">Tarih:</span>
              <strong className="text-stone-900 text-sm font-bold">
                {new Date().toLocaleDateString('tr-TR')}
              </strong>
            </div>
          </div>

          {/* Sözlü Tarih Mülakat Bilgileri */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-1 border-b-2 border-[#E6DCB8]">
              <Scroll className="w-4 h-4 text-[#9A3412]" />
              <h3 className="font-bold text-sm text-[#451A03]">
                Sözlü Tarih Mülakatı Kayıt Özeti
              </h3>
            </div>

            <div className="bg-[#FAF7F2] p-3.5 rounded-xl border border-[#E6DCB8] text-xs grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div>
                <span className="text-stone-500 font-medium">Görüşülen Kişi:</span>{' '}
                <strong className="text-stone-900 font-bold">{intervieweeName}</strong>
              </div>
              <div>
                <span className="text-stone-500 font-medium">Yaşı / Dönemi:</span>{' '}
                <strong className="text-stone-900 font-bold">{intervieweeAge}</strong>
              </div>
              <div>
                <span className="text-stone-500 font-medium">Akrabalık / Yakınlık:</span>{' '}
                <strong className="text-stone-900 font-bold">{intervieweeRelation}</strong>
              </div>
            </div>

            {/* Mülakat Soruları ve Cevapları */}
            <div className="space-y-3 text-xs">
              <div className="border border-[#E6DCB8] rounded-xl p-3.5 bg-white shadow-2xs">
                <p className="font-bold text-[#78350F] mb-1">
                  1. Çocukluk Bayramları ve Eski Kutlamalar:
                </p>
                <p className="text-stone-700 whitespace-pre-wrap">{q1}</p>
              </div>

              <div className="border border-[#E6DCB8] rounded-xl p-3.5 bg-white shadow-2xs">
                <p className="font-bold text-[#78350F] mb-1">
                  2. İmece Usulü Yardımlaşma ve Köy/Mahalle Dayanışması:
                </p>
                <p className="text-stone-700 whitespace-pre-wrap">{q2}</p>
              </div>

              <div className="border border-[#E6DCB8] rounded-xl p-3.5 bg-white shadow-2xs">
                <p className="font-bold text-[#78350F] mb-1">
                  3. Geleneksel Çocuk Oyunları ve Eğlenceler:
                </p>
                <p className="text-stone-700 whitespace-pre-wrap">{q3}</p>
              </div>

              <div className="border border-[#E6DCB8] rounded-xl p-3.5 bg-white shadow-2xs">
                <p className="font-bold text-[#78350F] mb-1">
                  4. Özel Günler (Düğün, Asker Uğurlama, Kutlamalar):
                </p>
                <p className="text-stone-700 whitespace-pre-wrap">{q4}</p>
              </div>

              <div className="border border-[#E6DCB8] rounded-xl p-3.5 bg-white shadow-2xs">
                <p className="font-bold text-[#78350F] mb-1">
                  5. Unutulmaya Yüz Tutmuş Geleneksel Meslekler / Zanaatlar:
                </p>
                <p className="text-stone-700 whitespace-pre-wrap">{q5}</p>
              </div>
            </div>
          </div>

          {/* Öğretmen Onay ve Değerlendirme Damgası */}
          <div className="mt-6 pt-4 border-t-2 border-dashed border-[#B45309]/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2 text-[#0F766E] bg-[#F0FDFA] px-3.5 py-2.5 rounded-xl border border-[#0D9488]/30">
              <Award className="w-5 h-5 text-[#0D9488] shrink-0" />
              <span>
                <strong>Öğretmen Görüşü:</strong> Kültürel mirasımızın korunmasına ve 5. sınıf sözlü tarih araştırmasına yaptığınız değerli katkı için tebrik ederiz.
              </span>
            </div>

            <div className="text-right shrink-0">
              <div className="text-stone-500 font-medium">5. Sınıf Sosyal Bilgiler Zümresi</div>
              <div className="font-black text-[#8C291E]">Öğretmen Onayı: ✔ Başarılı</div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
