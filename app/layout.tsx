import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Kültürel Mirasımız ve Yaşayan Geçmiş - Sosyal Bilgiler Öğrenme Portalı',
  description: 'Sosyal Bilgiler dersi için farklılaştırılmış eğitim yaklaşımıyla 3 seviyede interaktif öğrenme istasyonları ve sözlü tarih etkinlikleri.',
  openGraph: {
    title: 'Kültürel Mirasımız ve Yaşayan Geçmiş - Sosyal Bilgiler',
    description: 'Sosyal Bilgiler dersi için 3 farklı seviyede interaktif öğrenme istasyonları.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kültürel Mirasımız ve Yaşayan Geçmiş - Sosyal Bilgiler',
    description: 'Sosyal Bilgiler dersi için 3 farklı seviyede interaktif öğrenme istasyonları.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="tr">
      <body suppressHydrationWarning className="bg-orange-50/60 text-slate-800 antialiased min-h-screen font-sans">
        {children}
      </body>
    </html>
  );
}
