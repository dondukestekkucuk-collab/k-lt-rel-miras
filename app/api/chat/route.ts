import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

// Server-side Gemini API client lazy initializer
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

const TEACHER_SYSTEM_INSTRUCTION = `
Sen Türkiye'deki bir ortaokulda (5, 6, 7 ve 8. sınıf) görev yapan, sevecen, bilgili ve son derece rehber bir Sosyal Bilgiler Öğretmenisin.

GÖREV VE KURALLARIN:
1. Her zaman Türkçe yanıt ver.
2. MEB müfredatına (özellikle Türkiye Yüzyılı Maarif Modeli ve Sosyal Bilgiler Öğretim Programı) tam uyumlu, bilimsel ve pedagojik içerik üret.
3. 5-8. sınıf seviyesindeki öğrencilerin kolayca anlayabileceği, motive edici, nazik, merak uyandırıcı ve kapsayıcı bir öğretmen üslubu kullan.
4. Sosyal bilgiler kavramlarını (kültürel miras, somut ve somut olmayan miras, sözlü tarih mülakatları, coğrafi çevre, hak ve sorumluluklar, tarihi eserler, müzeler, dijital arşivleme vb.) öğrencilerin günlük hayatından, ailelerinden ve çevrelerinden somut örneklerle açıkla.
5. Farklılaştırılmış eğitim ilkelerine dikkat et; gerektiğinde basamaklı ve aşamalı ipuçları ver.
6. ÖNEMLİ: Her detaylı konu anlatımı, açıklama veya etkinlik önerinin sonunda, öğrencinin konuyu pekiştirmesi ve öğrenme çıktısını ölçmesi için "🎯 Öğretmenin Kontrol Görevi & Soruları (2 Adet)" başlığı altında mutlaka 2 adet kontrol sorusu veya pratik uygulama görevi ekle.
7. Tarihi ve coğrafi konularda yanlış ya da spekülatif bilgi vermekten kaçın; doğrulanmamış hususlarda "Bu konuyu ders kitabımızdan ve resmî MEB kaynaklarından da teyit edelim sevgili öğrencim" uyarısını nazikçe belirt.
`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, history, studentName, gradeLevel } = body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json(
        { error: 'Lütfen geçerli bir soru veya mesaj iletiniz.' },
        { status: 400 }
      );
    }

    const ai = getGeminiClient();
    if (!ai) {
      return NextResponse.json(
        {
          error: 'GEMINI_API_KEY yapılandırılmamış. Lütfen ortam değişkenlerini kontrol ediniz.',
          reply: 'Üzgünüm, şu anda Yapay Zekâ Öğretmen bağlantısı kurulamadı (GEMINI_API_KEY tanımlanmamış). Lütfen sistem yöneticiniz veya öğretmeninizle iletişime geçiniz.',
        },
        { status: 500 }
      );
    }

    // Build context prompt with student details if provided
    let contextualPrompt = '';
    if (studentName || gradeLevel) {
      contextualPrompt += `[Öğrenci Bilgisi: Adı: ${studentName || 'Öğrenci'}, Sınıfı: ${gradeLevel || 'Ortaokul'}]\n`;
    }

    // Include recent history if provided
    if (Array.isArray(history) && history.length > 0) {
      const recentHistory = history.slice(-6).map((item: { sender: string; text: string }) => {
        return `${item.sender === 'user' ? 'Öğrenci' : 'Öğretmen'}: ${item.text}`;
      }).join('\n');
      contextualPrompt += `[Önceki Konuşma Geçmişi]\n${recentHistory}\n\n`;
    }

    contextualPrompt += `Öğrencinin Yeni Sorusu/İsteği: ${message.trim()}`;

    // Call Gemini 3.7 Flash server-side
    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: contextualPrompt,
      config: {
        systemInstruction: TEACHER_SYSTEM_INSTRUCTION,
        temperature: 0.7,
        topP: 0.95,
      },
    });

    const replyText = response.text || 'Cevap oluşturulurken bir sorun oluştu.';

    return NextResponse.json({
      reply: replyText,
      status: 'success',
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Bilinmeyen bir sunucu hatası oluştu.';
    console.error('Gemini Chat API Error:', errorMessage);
    
    return NextResponse.json(
      {
        error: 'Yapay zekâ yanıtı üretilirken bir hata meydana geldi.',
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}
