'use client';

import React from 'react';
import { Lightbulb, BookCheck } from 'lucide-react';

interface TeacherGuidanceBannerProps {
  activeLevel: 1 | 2 | 3;
}

export default function TeacherGuidanceBanner({ activeLevel }: TeacherGuidanceBannerProps) {
  const getLevelInfo = () => {
    switch (activeLevel) {
      case 1:
        return {
          title: 'Öğretmeninden Not: Somut ve Görsel Keşif Rehberi',
          description: 'Sevgili öğrencim! Bu istasyonda acele etmene gerek yok. Evdeki eski eşyalara dokun, fotoğrafları incele ve ailenin yaşayan hatıralarını somutlaştırarak keşfet. Zorlanırsan her zaman bir büyüğünden yardım alabilirsin.',
          outcomes: ['Somut kültürel miras nesnelerini tanır', 'Aile tarihi eşyalarını adım adım inceler', 'Kişisel hatıraların kültürel değerini fark eder'],
          borderColor: 'border-emerald-300',
          bgColor: 'bg-emerald-50/80',
          badgeBg: 'bg-emerald-500 text-white',
          tagColor: 'text-emerald-800'
        };
      case 2:
        return {
          title: 'Öğretmeninden Not: Sözel Anlatı ve Sözlü Tarih Rehberi',
          description: 'Sevgili öğrencim! Bu istasyonda bir tarih araştırmacısı gibi çalışacaksın. Aile büyüklerinle sohbet ederken onların anılarına kulak ver; kaydettiğin her cümle geleceğe aktarılacak bir kültürel köprüdür.',
          outcomes: ['Kuşaklar arası kültürel aktarımı analiz eder', 'Planlı bir sözlü tarih mülakatı yürütür', 'Gelenek ve göreneklerin toplumsal dayanışmadaki rolünü kavrar'],
          borderColor: 'border-sky-300',
          bgColor: 'bg-sky-50/80',
          badgeBg: 'bg-sky-500 text-white',
          tagColor: 'text-sky-800'
        };
      case 3:
        return {
          title: 'Öğretmeninden Not: Analitik Düşünme ve Proje İnovasyonu Rehberi',
          description: 'Sevgili genç araştırmacı! Bu istasyonda küresel değişimler karşısında yerel kültürümüzü nasıl koruyabileceğimizi ve dijital teknolojileri kültürel miras için nasıl kullanabileceğimizi eleştirel bir gözle inceliyoruz.',
          outcomes: ['Küreselleşme ve kültürel tektipleşme risklerini değerlendirir', 'Somut olmayan mirasın dijitalleşme stratejilerini tasarlar', 'UNESCO kriterlerine uygun koruma projeleri geliştirir'],
          borderColor: 'border-indigo-300',
          bgColor: 'bg-indigo-50/80',
          badgeBg: 'bg-indigo-500 text-white',
          tagColor: 'text-indigo-800'
        };
    }
  };

  const info = getLevelInfo();

  return (
    <div className={`rounded-3xl p-5 sm:p-6 border-2 ${info.bgColor} ${info.borderColor} shadow-xs`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        <div className="flex items-start gap-3.5">
          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 mt-0.5 shadow-xs ${info.badgeBg}`}>
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-black text-slate-900 mb-1 tracking-tight">
              {info.title}
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-3xl font-normal">
              {info.description}
            </p>
          </div>
        </div>

        <div className="shrink-0 flex sm:flex-col items-start gap-1 text-[11px] font-medium text-slate-600 bg-white p-3 rounded-2xl border border-slate-200/90 shadow-xs">
          <span className="font-bold text-slate-900 flex items-center gap-1">
            <BookCheck className="w-3.5 h-3.5 text-orange-600" />
            Hedef Maarif Kazanımları:
          </span>
          <ul className="list-disc list-inside space-y-0.5 text-slate-600 text-[10.5px]">
            {info.outcomes.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}
