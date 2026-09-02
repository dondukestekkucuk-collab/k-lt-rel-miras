'use client';

import React, { useState } from 'react';
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
  Lightbulb
} from 'lucide-react';
import { GLOSSARY_TERMS } from '@/lib/learningData';

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GlossaryModal({ isOpen, onClose }: GlossaryModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Hepsi');

  if (!isOpen) return null;

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl border border-slate-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Sosyal Bilgiler Kavram Sözlüğü
              </h3>
              <p className="text-xs text-slate-500">
                Kültürel Miras ve Yaşayan Geçmiş Temel Terimleri
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Kavram veya örnek ara (Örn: SOKÜM, Sözlü Tarih, İmece)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-amber-800 text-white font-semibold'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Terms List */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {filteredTerms.length === 0 ? (
            <div className="text-center py-8 text-slate-500 text-xs sm:text-sm">
              Aradığınız kritere uygun kavram bulunamadı.
            </div>
          ) : (
            filteredTerms.map((item) => (
              <div
                key={item.term}
                className="border border-slate-200 rounded-xl p-4 bg-white hover:border-amber-300 transition-colors"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    {getIcon(item.iconName)}
                    <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                      {item.term}
                    </h4>
                  </div>
                  <span className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
                    {item.category}
                  </span>
                </div>

                <div className="bg-amber-50/70 p-2.5 rounded-lg border border-amber-100 mb-2">
                  <p className="text-xs text-amber-950 font-medium leading-relaxed">
                    <strong>Basit Tanım:</strong> {item.simpleDefinition}
                  </p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-2">
                  <strong>Detaylı Açıklama:</strong> {item.detailedDefinition}
                </p>

                <div className="flex items-start gap-1.5 text-xs text-slate-700 bg-slate-50 p-2 rounded border border-slate-200">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>Günlük Hayattan Örnek:</strong> {item.example}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>MEB Maarif Modeli Sosyal Bilgiler Terimler Havuzu</span>
          <button
            onClick={onClose}
            className="bg-slate-800 text-white px-4 py-1.5 rounded-lg font-medium hover:bg-slate-900 transition-colors cursor-pointer"
          >
            Kapat
          </button>
        </div>

      </div>
    </div>
  );
}
