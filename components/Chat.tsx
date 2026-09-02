'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  RefreshCw, 
  X, 
  Copy, 
  Check, 
  GraduationCap,
  Volume2,
  VolumeX,
  Square
} from 'lucide-react';
import { StudentSession } from '@/lib/types';
import { SpeechReader, sounds } from '@/lib/audio';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

interface ChatProps {
  isOpen: boolean;
  onClose: () => void;
  session: StudentSession;
}

const SUGGESTED_PROMPTS = [
  'Somut ve somut olmayan kültürel miras arasındaki farkı günlük hayattan bir örnekle açıklar mısınız?',
  'Sözlü tarih mülakatı yaparken dedeme ve nineme hangi soruları sormalıyım?',
  'UNESCO Somut Olmayan Kültürel Miras listemizdeki Türk Kahvesi veya Ebru Sanatı hakkında bilgi verir misiniz?',
  'Tarihi eserleri ve müzeleri korumak için bir 5. sınıf öğrencisi olarak neler yapabilirim?'
];

export default function Chat({ isOpen, onClose, session }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>(() => [
    {
      id: 'welcome-init',
      sender: 'assistant',
      text: `Merhaba ${session.fullName || session.username || 'sevgili öğrencim'}! 👋 Ben senin Sosyal Bilgiler Yapay Zekâ Öğretmenin.\n\nKültürel mirasımız, somut ve somut olmayan değerlerimiz, sözlü tarih adımları veya dersimizle ilgili merak ettiğin her konuyu bana sorabilirsin. Sana nasıl yardımcı olabilirim?\n\n🎯 **Öğretmenin Mini Başlangıç Görevi:**\n1. Yaşadığın çevrede gördüğün en eski tarihi yapının adını biliyor musun?\n2. Ailende geçmişten günümüze aktarılan özel bir gelenek veya eşya var mı?`,
      timestamp: 'Şimdi'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);
  const messageCounter = useRef(1);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Stop speech when modal closes
  useEffect(() => {
    if (!isOpen) {
      SpeechReader.stop();
      setSpeakingMsgId(null);
    }
  }, [isOpen]);

  // Auto-scroll on new message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  const handleToggleSpeech = (msgId: string, text: string) => {
    if (speakingMsgId === msgId) {
      SpeechReader.stop();
      setSpeakingMsgId(null);
    } else {
      sounds.playClick();
      setSpeakingMsgId(msgId);
      SpeechReader.speak(
        text,
        () => setSpeakingMsgId(null),
        () => setSpeakingMsgId(null)
      );
    }
  };

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputValue;
    if (!textToSend.trim() || isLoading) return;

    sounds.playClick();
    messageCounter.current += 1;
    const currentCount = messageCounter.current;
    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMsg: Message = {
      id: `user-msg-${currentCount}`,
      sender: 'user',
      text: textToSend.trim(),
      timestamp: timeString
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: textToSend.trim(),
          history: messages.map(m => ({ sender: m.sender, text: m.text })),
          studentName: session.fullName || session.username,
          gradeLevel: session.grade,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Sunucudan yanıt alınamadı.');
      }

      sounds.playSuccess();
      messageCounter.current += 1;
      const assistantMsg: Message = {
        id: `assistant-msg-${messageCounter.current}`,
        sender: 'assistant',
        text: data.reply || 'Cevap üretilemedi.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: unknown) {
      const errorText = err instanceof Error ? err.message : 'Bağlantı hatası oluştu.';
      messageCounter.current += 1;
      const errorMsg: Message = {
        id: `error-msg-${messageCounter.current}`,
        sender: 'assistant',
        text: `⚠️ Yanıt alınırken bir sorun oluştu: ${errorText}\n\nLütfen tekrar deneyiniz veya internet bağlantınızı kontrol ediniz.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearHistory = () => {
    messageCounter.current += 1;
    setMessages([
      {
        id: `welcome-clear-${messageCounter.current}`,
        sender: 'assistant',
        text: `Sohbet geçmişi temizlendi. Sosyal Bilgiler dersimizle ilgili aklına takılan yeni bir soru sormaya hazırsın ${session.username}! 🌟`,
        timestamp: 'Şimdi'
      }
    ]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/70 backdrop-blur-xs animate-fadeIn">
      <div 
        className="bg-[#FAF7F2] w-full max-w-2xl rounded-3xl shadow-2xl border-4 border-[#B45309] flex flex-col h-[90vh] max-h-[720px] overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="chat-teacher-title"
      >
        {/* Chat Header - Ottoman Heritage Maroon & Gold */}
        <div className="bg-gradient-to-r from-[#741D15] via-[#8C291E] to-[#9A3412] text-white p-4 sm:px-6 flex items-center justify-between shadow-md shrink-0 border-b border-[#FDE68A]/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center text-amber-200 shadow-inner">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 id="chat-teacher-title" className="font-black text-base sm:text-lg tracking-tight text-white flex items-center gap-1.5">
                  5. Sınıf Sosyal Bilgiler YZ Öğretmeni
                </h3>
                <span className="bg-[#5C140E] text-amber-200 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-400/40">
                  MEB Uyumlu
                </span>
              </div>
              <p className="text-xs text-amber-100">
                Kültürel Miras & Yaşayan Geçmiş Rehberi
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleClearHistory}
              className="text-amber-100 hover:text-white hover:bg-white/15 p-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1"
              title="Sohbeti Temizle"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="hidden sm:inline">Temizle</span>
            </button>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-xl transition-colors cursor-pointer"
              aria-label="Kapat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Student Session Context Banner */}
        <div className="bg-[#FFFBEB] border-b border-[#FDE68A] px-4 py-2 flex items-center justify-between text-xs text-stone-700 shrink-0">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-[#B45309]" />
            <span className="font-bold text-[#78350F]">
              {session.isLoggedIn ? `${session.username} (${session.grade})` : '5. Sınıf Öğrencisi'}
            </span>
          </div>
          <span className="text-[11px] text-[#9A3412] font-semibold">
            🏛️ Kültürel Miras & Sözlü Tarih Sorularını Sor
          </span>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#FDFBF7]">
          {messages.map((msg) => {
            const isAssistant = msg.sender === 'assistant';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isAssistant ? 'justify-start' : 'justify-end'}`}
              >
                {isAssistant && (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#8C291E] to-[#B45309] text-amber-100 flex items-center justify-center shrink-0 shadow-xs mt-1 border border-amber-300/40">
                    <Bot className="w-5 h-5" />
                  </div>
                )}

                <div className={`max-w-[85%] flex flex-col ${isAssistant ? 'items-start' : 'items-end'}`}>
                  <div
                    className={`p-4 rounded-2xl text-sm shadow-xs ${
                      isAssistant
                        ? 'bg-white border-2 border-[#E6DCB8] text-stone-800 rounded-tl-none whitespace-pre-wrap leading-relaxed'
                        : 'bg-gradient-to-r from-[#9A3412] to-[#B45309] text-white rounded-tr-none font-medium'
                    }`}
                  >
                    {msg.text}
                  </div>

                  <div className="flex items-center gap-2 mt-1 px-1">
                    <span className="text-[10px] text-stone-400 font-medium">
                      {msg.timestamp}
                    </span>
                    {isAssistant && (
                      <div className="flex items-center gap-2">
                        {/* Listen Voice Button */}
                        <button
                          onClick={() => handleToggleSpeech(msg.id, msg.text)}
                          className={`p-1 rounded-md cursor-pointer text-[11px] flex items-center gap-1 transition-colors ${
                            speakingMsgId === msg.id
                              ? 'bg-amber-200 text-[#741D15] font-bold animate-pulse'
                              : 'text-stone-500 hover:text-stone-800 hover:bg-stone-200/60'
                          }`}
                          title={speakingMsgId === msg.id ? 'Okumayı Durdur' : 'Sesli Dinle'}
                        >
                          {speakingMsgId === msg.id ? (
                            <>
                              <Square className="w-3 h-3 text-[#741D15] fill-[#741D15]" />
                              <span>Durdur</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-3.5 h-3.5 text-[#B45309]" />
                              <span>Sesli Dinle</span>
                            </>
                          )}
                        </button>

                        {/* Copy Button */}
                        <button
                          onClick={() => handleCopy(msg.id, msg.text)}
                          className="text-stone-400 hover:text-stone-700 transition-colors p-0.5 rounded cursor-pointer text-[11px] flex items-center gap-0.5"
                          title="Metni Kopyala"
                        >
                          {copiedId === msg.id ? (
                            <Check className="w-3 h-3 text-emerald-600" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                          <span className="text-[10px]">{copiedId === msg.id ? 'Kopyalandı' : 'Kopyala'}</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {!isAssistant && (
                  <div className="w-8 h-8 rounded-xl bg-stone-800 text-amber-100 flex items-center justify-center shrink-0 shadow-xs mt-1">
                    <User className="w-5 h-5" />
                  </div>
                )}
              </div>
            );
          })}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex gap-3 justify-start items-center">
              <div className="w-8 h-8 rounded-xl bg-[#8C291E] text-amber-100 flex items-center justify-center shrink-0 shadow-xs">
                <Bot className="w-5 h-5 animate-bounce" />
              </div>
              <div className="bg-white border-2 border-[#E6DCB8] p-3.5 rounded-2xl rounded-tl-none flex items-center gap-2 text-xs font-semibold text-stone-700 shadow-xs">
                <Sparkles className="w-4 h-4 text-[#B45309] animate-spin" />
                <span>Öğretmeniniz yanıtı hazırlıyor...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Prompts */}
        <div className="p-3 bg-[#FAF7F2] border-t border-[#E6DCB8] shrink-0">
          <div className="text-[11px] font-bold text-[#78350F] mb-1.5 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#B45309]" />
            <span>Hızlı Örnek Sorular (Tıklayıp Sorabilirsin):</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
            {SUGGESTED_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                disabled={isLoading}
                onClick={() => handleSendMessage(prompt)}
                className="text-xs bg-white hover:bg-[#FFFBEB] text-stone-700 hover:text-[#78350F] font-semibold px-3 py-1.5 rounded-xl border border-[#E6DCB8] transition-all text-left whitespace-nowrap shrink-0 shadow-2xs cursor-pointer active:scale-95 disabled:opacity-50"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 sm:p-4 bg-[#FAF7F2] border-t-2 border-[#E6DCB8] flex items-center gap-2 shrink-0"
        >
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Sosyal Bilgiler öğretmeninize kültürel mirasla ilgili soru sorun..."
            disabled={isLoading}
            className="flex-1 bg-white border-2 border-[#E6DCB8] rounded-2xl px-4 py-2.5 text-sm outline-none focus:border-[#B45309] focus:bg-white text-stone-800 placeholder-stone-400 transition-all font-medium disabled:opacity-60 shadow-2xs"
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="bg-gradient-to-r from-[#9A3412] to-[#B45309] hover:from-[#7C2D12] hover:to-[#92400E] disabled:bg-stone-300 text-white p-2.5 sm:px-5 sm:py-2.5 rounded-2xl font-bold text-sm transition-all shadow-md active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer disabled:cursor-not-allowed shrink-0 border border-amber-600/30"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Gönder</span>
          </button>
        </form>
      </div>
    </div>
  );
}
