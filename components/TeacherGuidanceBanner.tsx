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
          title: 'Öğretmeninden Not: Somut ve Görsel Miras Keşif Rehberi',
          description: 'Sevgili öğrencim! Bu istasyonda acele etmene gerek yok. Çevrendeki ve evindeki tarihi yapılara, eski eşyalara ve fotoğraflara dikkatle bak. Somut kültürel mirasımızın izlerini adım adım keşfet.',
          outcomes: ['Somut kültürel miras nesnelerini tanır', 'Tarihi yapı ve eşyaları inceler', 'Kişisel ve ailesel hatıraların değerini kavrar'],
          borderColor: 'border-[#0D9488]/40',
          bgColor: 'bg-[#F0FDFA]/90',
          badgeBg: 'bg-gradient-to-br from-[#0F766E] to-[#0D9488] text-white',
          tagColor: 'text-[#115E59]'
        };
      case 2:
        return {
          title: 'Öğretmeninden Not: Sözel Anlatı ve Sözlü Tarih Rehberi',
          description: 'Sevgili öğrencim! Bu istasyonda bir sözlü tarih araştırmacısı gibi çalışacaksın. Aile büyüklerinle sohbet ederken onların anılarına kulak ver; kaydettiğin her hatıra yaşayan geçmişimizin bir parçasıdır.',
          outcomes: ['Kuşaklar arası kültürel aktarımı analiz eder', 'Planlı bir sözlü tarih mülakatı yürütür', 'Gelenek ve göreneklerin dayanışmadaki rolünü kavrar'],
          borderColor: 'border-[#B45309]/40',
          bgColor: 'bg-[#FFFBEB]/90',
          badgeBg: 'bg-gradient-to-br from-[#8C291E] to-[#B45309] text-amber-100',
          tagColor: 'text-[#9A3412]'
        };
      case 3:
        return {
          title: 'Öğretmeninden Not: Analitik Düşünme ve Dijital Miras Laboratuvarı',
          description: 'Sevgili genç araştırmacı! Bu istasyonda kültürel değerlerimizi geleceğe taşımak için dijital arşivleme, müze teknolojileri ve koruma yöntemlerini yenilikçi bir bakış açısıyla inceliyoruz.',
          outcomes: ['Kültürel mirasın korunma yollarını açıklar', 'Somut olmayan mirasın dijitalleşme fikirlerini tasarlar', 'UNESCO listesindeki değerlerimizi analiz eder'],
          borderColor: 'border-[#1E3A8A]/40',
          bgColor: 'bg-[#EFF6FF]/90',
          badgeBg: 'bg-gradient-to-br from-[#1E3A8A] to-[#2563EB] text-white',
          tagColor: 'text-[#1E40AF]'
        };
    }
  };

  const info = getLevelInfo();

  return (
    <div className={`rounded-3xl p-5 sm:p-6 border-2 ${info.bgColor} ${info.borderColor} shadow-sm`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        <div className="flex items-start gap-3.5">
          <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 mt-0.5 shadow-md ${info.badgeBg}`}>
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-black text-stone-900 mb-1 tracking-tight">
              {info.title}
            </h4>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed max-w-3xl font-medium">
              {info.description}
            </p>
          </div>
        </div>

        <div className="shrink-0 flex sm:flex-col items-start gap-1 text-[11px] font-medium text-stone-700 bg-white/90 p-3.5 rounded-2xl border border-[#E6DCB8] shadow-xs">
          <span className="font-bold text-stone-900 flex items-center gap-1">
            <BookCheck className="w-3.5 h-3.5 text-[#9A3412]" />
            Hedef Maarif Kazanımları:
          </span>
          <ul className="list-disc list-inside space-y-0.5 text-stone-600 text-[10.5px]">
            {info.outcomes.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}
