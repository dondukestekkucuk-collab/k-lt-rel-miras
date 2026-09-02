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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl border border-slate-200">
        
        {/* Modal Controls (Not printed) */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 print:hidden bg-slate-50 rounded-t-2xl">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-800" />
            <span className="font-bold text-slate-800 text-sm">
              Öğrenci Çalışma ve Sözlü Tarih Raporu
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 bg-amber-700 hover:bg-amber-800 text-white text-xs font-semibold px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Yazdır / PDF Kaydet</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Certificate & Report Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-900" id="printable-report">
          
          {/* Top Document Header */}
          <div className="text-center border-b-2 border-amber-800 pb-5">
            <div className="text-xs font-semibold tracking-widest text-amber-900 uppercase mb-1">
              T.C. Millî Eğitim Bakanlığı Sosyal Bilgiler Dersi
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              KÜLTÜREL MİRAS & SÖZLÜ TARİH ÇALIŞMA DOSYASI
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Türkiye Yüzyılı Maarif Modeli • Farklılaştırılmış Öğrenme ve Yaşayan Geçmiş Etkinliği
            </p>
          </div>

          {/* Student Info Card */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-amber-50/50 p-4 rounded-xl border border-amber-200 text-xs">
            <div>
              <span className="text-slate-500 block">Öğrenci Adı:</span>
              <strong className="text-slate-900 text-sm">{session.username || 'Misafir Öğrenci'}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Sınıf Seviyesi:</span>
              <strong className="text-slate-900 text-sm">{session.grade || '6. Sınıf'}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Tamamlanan Görev:</span>
              <strong className="text-emerald-700 text-sm">{session.completedTasks.length} Etkinlik</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Tarih:</span>
              <strong className="text-slate-900 text-sm">
                {new Date().toLocaleDateString('tr-TR')}
              </strong>
            </div>
          </div>

          {/* Sözlü Tarih Mülakat Bilgileri */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-1 border-b border-slate-200">
              <Scroll className="w-4 h-4 text-amber-800" />
              <h3 className="font-bold text-sm text-slate-900">
                Sözlü Tarih Mülakatı Kaydı
              </h3>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 text-xs grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div>
                <span className="text-slate-500">Görüşülen Kişi:</span>{' '}
                <strong className="text-slate-800">{intervieweeName}</strong>
              </div>
              <div>
                <span className="text-slate-500">Yaşı / Dönemi:</span>{' '}
                <strong className="text-slate-800">{intervieweeAge}</strong>
              </div>
              <div>
                <span className="text-slate-500">Akrabalık / Yakınlık:</span>{' '}
                <strong className="text-slate-800">{intervieweeRelation}</strong>
              </div>
            </div>

            {/* Mülakat Soruları ve Cevapları */}
            <div className="space-y-3 text-xs">
              <div className="border border-slate-200 rounded-lg p-3 bg-white">
                <p className="font-bold text-slate-900 mb-1">
                  1. Çocukluk Bayramları ve Eski Kutlamalar:
                </p>
                <p className="text-slate-700 whitespace-pre-wrap">{q1}</p>
              </div>

              <div className="border border-slate-200 rounded-lg p-3 bg-white">
                <p className="font-bold text-slate-900 mb-1">
                  2. İmece Usulü Yardımlaşma ve Köy/Mahalle Dayanışması:
                </p>
                <p className="text-slate-700 whitespace-pre-wrap">{q2}</p>
              </div>

              <div className="border border-slate-200 rounded-lg p-3 bg-white">
                <p className="font-bold text-slate-900 mb-1">
                  3. Geleneksel Çocuk Oyunları ve Eğlenceler:
                </p>
                <p className="text-slate-700 whitespace-pre-wrap">{q3}</p>
              </div>

              <div className="border border-slate-200 rounded-lg p-3 bg-white">
                <p className="font-bold text-slate-900 mb-1">
                  4. Özel Günler (Düğün, Asker Uğurlama, Kutlamalar):
                </p>
                <p className="text-slate-700 whitespace-pre-wrap">{q4}</p>
              </div>

              <div className="border border-slate-200 rounded-lg p-3 bg-white">
                <p className="font-bold text-slate-900 mb-1">
                  5. Unutulmaya Yüz Tutmuş Geleneksel Meslekler / Zanaatlar:
                </p>
                <p className="text-slate-700 whitespace-pre-wrap">{q5}</p>
              </div>
            </div>
          </div>

          {/* Öğretmen Onay ve Değerlendirme Damgası */}
          <div className="mt-6 pt-4 border-t border-dashed border-slate-300 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2 text-emerald-800 bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-200">
              <Award className="w-4 h-4 text-emerald-600" />
              <span>
                <strong>Öğretmen Görüşü:</strong> Kültürel mirasımızın korunmasına ve sözlü tarih araştırmasına yaptığınız değerli katkı için tebrik ederiz.
              </span>
            </div>

            <div className="text-right shrink-0">
              <div className="text-slate-500">Sosyal Bilgiler Zümresi</div>
              <div className="font-bold text-slate-800">Öğretmen Onayı: ✔ Başarılı</div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
