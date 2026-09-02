'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, 
  Search, 
  BookOpen, 
  Building2, 
  Sparkles, 
  Mic, 
  HeartHandshake, 
  Scroll, 
  Landmark,
  Lightbulb,
  Volume2,
  Square
} from 'lucide-react';
import { GLOSSARY_TERMS } from '@/lib/learningData';
import { SpeechReader, sounds } from '@/lib/audio';

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GlossaryModal({ isOpen, onClose }: GlossaryModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Hepsi');
  const [speakingTerm, setSpeakingTerm] = useState<string | null>(null);

  // Stop speech on close
  useEffect(() => {
    if (!isOpen) {
      SpeechReader.stop();
      setSpeakingTerm(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleToggleTermSpeech = (term: string, definition: string, example: string) => {
    if (speakingTerm === term) {
      SpeechReader.stop();
      setSpeakingTerm(null);
    } else {
      sounds.playClick();
      setSpeakingTerm(term);
      const textToRead = `${term}. Tanımı: ${definition}. Günlük hayattan örnek: ${example}`;
      SpeechReader.speak(
        textToRead,
        () => setSpeakingTerm(null),
        () => setSpeakingTerm(null)
      );
    }
  };

  const categories = ['Hepsi', 'Somut Miras', 'Somut Olmayan Miras', 'Yöntem ve Bilim'];

  const filteredTerms = GLOSSARY_TERMS.filter(item => {
    const matchesSearch = item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.simpleDefinition.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.detailedDefinition.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.example.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Hepsi' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Landmark': return <Landmark className="w-5 h-5 text-amber-700" />;
      case 'Building2': return <Building2 className="w-5 h-5 text-amber-700" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-purple-700" />;
      case 'Mic': return <Mic className="w-5 h-5 text-emerald-700" />;
      case 'HeartHandshake': return <HeartHandshake className="w-5 h-5 text-rose-700" />;
      case 'Scroll': return <Scroll className="w-5 h-5 text-indigo-700" />;
      default: return <BookOpen className="w-5 h-5 text-amber-700" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FAF7F2] rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl border-4 border-[#B45309] overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 bg-gradient-to-r from-[#741D15] via-[#8C291E] to-[#9A3412] text-white border-b border-[#FDE68A]/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/15 border border-white/20 text-amber-200 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Sosyal Bilgiler Kültürel Miras Sözlüğü
              </h3>
              <p className="text-xs text-amber-100">
                Somut, Somut Olmayan Miras ve Sözlü Tarih Kavramları
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="p-4 bg-[#FFFBEB] border-b border-[#E6DCB8] space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Kavram veya örnek ara (Örn: SOKÜM, Sözlü Tarih, Etnografya)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white border-2 border-[#E6DCB8] rounded-xl focus:outline-hidden focus:border-[#B45309] text-stone-800 placeholder-stone-400 shadow-2xs"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-thin">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl whitespace-nowrap font-bold transition-all cursor-pointer text-xs ${
                  selectedCategory === cat
                    ? 'bg-[#8C291E] text-white shadow-xs border border-[#741D15]'
                    : 'bg-white text-stone-700 border border-[#E6DCB8] hover:bg-[#FAF7F2]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Terms List */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1 bg-[#FDFBF7]">
          {filteredTerms.length === 0 ? (
            <div className="text-center py-8 text-stone-500 text-xs sm:text-sm">
              Aradığınız kritere uygun kavram bulunamadı.
            </div>
          ) : (
            filteredTerms.map((item) => (
              <div
                key={item.term}
                className="border-2 border-[#E6DCB8] rounded-2xl p-4 bg-white hover:border-[#B45309] transition-all shadow-2xs"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    {getIcon(item.iconName)}
                    <h4 className="font-bold text-[#451A03] text-sm sm:text-base">
                      {item.term}
                    </h4>
                    <button
                      type="button"
                      onClick={() => handleToggleTermSpeech(item.term, item.simpleDefinition, item.example)}
                      className={`p-1 rounded-md text-xs font-semibold cursor-pointer transition-colors flex items-center gap-1 ${
                        speakingTerm === item.term
                          ? 'bg-amber-300 text-[#741D15] animate-pulse font-bold'
                          : 'text-stone-400 hover:text-stone-800 hover:bg-stone-100'
                      }`}
                      title={speakingTerm === item.term ? 'Okumayı Durdur' : 'Kavramı Sesli Dinle'}
                    >
                      {speakingTerm === item.term ? (
                        <>
                          <Square className="w-3 h-3 text-[#741D15] fill-[#741D15]" />
                          <span className="text-[10px]">Durdur</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5 text-[#B45309]" />
                          <span className="text-[10px] hidden sm:inline">Dinle</span>
                        </>
                      )}
                    </button>
                  </div>
                  <span className="text-[10px] font-bold bg-[#FEF3C7] text-[#78350F] px-2.5 py-0.5 rounded-full border border-amber-300">
                    {item.category}
                  </span>
                </div>

                <div className="bg-[#FFFBEB] p-3 rounded-xl border border-[#FDE68A] mb-2">
                  <p className="text-xs text-[#78350F] font-semibold leading-relaxed">
                    <strong>Basit Tanım:</strong> {item.simpleDefinition}
                  </p>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed mb-2 font-medium">
                  <strong className="text-stone-800">Detaylı Açıklama:</strong> {item.detailedDefinition}
                </p>

                <div className="flex items-start gap-2 text-xs text-stone-700 bg-[#FAF7F2] p-2.5 rounded-xl border border-[#E6DCB8]">
                  <Lightbulb className="w-3.5 h-3.5 text-[#B45309] shrink-0 mt-0.5" />
                  <span><strong>Günlük Hayattan Örnek:</strong> {item.example}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#E6DCB8] bg-[#FAF7F2] flex items-center justify-between text-xs text-stone-600">
          <span className="font-medium">5. Sınıf MEB Maarif Modeli Kültürel Miras Terimleri</span>
          <button
            onClick={onClose}
            className="bg-gradient-to-r from-[#9A3412] to-[#B45309] text-white px-5 py-2 rounded-xl font-bold hover:from-[#7C2D12] hover:to-[#92400E] transition-all cursor-pointer shadow-xs active:scale-95"
          >
            Kapat
          </button>
        </div>

      </div>
    </div>
  );
}
