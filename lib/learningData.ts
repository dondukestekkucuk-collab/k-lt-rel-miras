import { GlossaryTerm, QuizQuestion } from './types';

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    term: 'Kültürel Miras',
    simpleDefinition: 'Geçmiş kuşaklardan bize kalan ve geleceğe aktarmamız gereken tüm değerler bütünüdür.',
    detailedDefinition: 'Bir toplumun tarih boyunca ürettiği, benliğini yansıtan, hem maddi (somut) hem de manevi (somut olmayan) kıymetlerin tamamıdır.',
    example: 'Tarihi camiler, destanlar, halk oyunları, bayramlaşma gelenekleri.',
    iconName: 'Landmark',
    category: 'Somut Miras'
  },
  {
    term: 'Somut Kültürel Miras',
    simpleDefinition: 'Elle tutulabilen, gözle görülebilen tarihi yapı ve eşyalardır.',
    detailedDefinition: 'Tarihi yapılar, heykeller, anıtlar, antik kentler, yazmalar, el aletleri, giysiler ve günlük kullanım eşyalarını kapsayan fiziksel miras.',
    example: 'Efes Antik Kenti, Safranbolu Evleri, dedemizin köstekli saati, bakır ibrikler.',
    iconName: 'Building2',
    category: 'Somut Miras'
  },
  {
    term: 'Somut Olmayan Kültürel Miras (SOKÜM)',
    simpleDefinition: 'Elle tutulamayan; dilde, gelenekte, kutlamalarda yaşayan manevi değerlerimizdir.',
    detailedDefinition: 'Toplulukların ve bireylerin kültürel miraslarının bir parçası olarak tanımladıkları uygulamalar, temsiller, anlatımlar, bilgiler, beceriler ve bunlara ilişkin araç-gereçler bütünüdür.',
    example: 'Meddahlık geleneği, Ebru sanatı, Nevruz kutlamaları, Türk kahvesi kültürü, Âşıklık geleneği.',
    iconName: 'Sparkles',
    category: 'Somut Olmayan Miras'
  },
  {
    term: 'Sözlü Tarih',
    simpleDefinition: 'Geçmişi yaşamış büyüklerimizle görüşerek hatıralarını ve bilgileri kaydetme yöntemidir.',
    detailedDefinition: 'Yazılı kaynakların yetersiz kaldığı veya halkın gündelik yaşam hafızasını aydınlatmak amacıyla, tarihi olaylara tanıklık etmiş kişilerle yapılan planlı mülakat ve arşivleme çalışmasıdır.',
    example: 'Köydeki en yaşlı dede ile eski bayramları ve imece usulü hasat günlerini ses kaydına alarak yazmak.',
    iconName: 'Mic',
    category: 'Yöntem ve Bilim'
  },
  {
    term: 'Kuşaklar Arası Aktarım',
    simpleDefinition: 'Bilgi, görgü ve adetlerin dedelerden torunlara elden ele aktarılmasıdır.',
    detailedDefinition: 'Kültürün sürekliliğini sağlayan; aile ve toplum içinde büyüklerin tecrübe ve gelenekleri küçük kuşaklara sevgi, saygı ve yaşantı yoluyla devretmesi sürecidir.',
    example: 'Anneannenin torununa geleneksel mantı bükmeyi veya kilim dokumayı öğretmesi.',
    iconName: 'HeartHandshake',
    category: 'Somut Olmayan Miras'
  },
  {
    term: 'Etnografya',
    simpleDefinition: 'Toplumların geleneklerini, yaşayış tarzlarını ve kullandıkları aletleri inceleyen bilim dalıdır.',
    detailedDefinition: 'Kavimlerin, halkların kültürlerini, örf ve âdetlerini, giyim-kuşamlarını ve gündelik hayat nesnelerini tasvir ederek araştıran kültürel antropoloji dalı.',
    example: 'Etnografya müzelerinde sergilenen geleneksel gelinlikler, kılıçlar, el halıları.',
    iconName: 'Scroll',
    category: 'Yöntem ve Bilim'
  }
];

export const LEVEL_1_QUESTIONS: QuizQuestion[] = [
  {
    id: 'l1-q1',
    question: 'Evimizde dedemizden veya ninemizden kalan eski bir bakır cezve, dantel örtü veya sararmış bir fotoğraf bize neyi anlatır?',
    options: [
      'A) Artık kullanılmadığı için değersiz bir çöp olduğunu',
      'B) Ailemizin geçmişini ve o dönemdeki yaşantısını anlatan değerli bir kültürel miras olduğunu',
      'C) Sadece yeni eşya alana kadar saklanması gereken geçici bir nesne olduğunu',
      'D) Başka hiçbir ailede bulunmayan gizli bir eşya olduğunu'
    ],
    correctAnswer: 1,
    explanation: 'Harikasın! Eski eşyalar ve hatıralar, ailemizin ve toplumumuzun geçmişini bugüne taşıyan canlı köprülerdir.',
    conceptTag: 'Somut Aile Mirası'
  },
  {
    id: 'l1-q2',
    question: 'Aşağıdakilerden hangisi evimizde ya da çevremizde bulabileceğimiz elle tutulur somut bir kültürel miras örneğidir?',
    options: [
      'A) Ninemizin sakladığı el işlemeli çeyiz sandığı ve eski aile fotoğrafları',
      'B) Akşam televizyonda izlediğimiz yeni bir çizgi film',
      'C) İnternetten indirdiğimiz yeni bir oyun',
      'D) Markette satılan plastik ambalajlı ürünler'
    ],
    correctAnswer: 0,
    explanation: 'Tebrikler! El işlemeli çeyiz sandığı ve eski aile fotoğrafları, elle tutulup gözle görülebilen somut kültürel mirasımızdır.',
    conceptTag: 'Somut Miras'
  }
];

export const LEVEL_2_QUESTIONS: QuizQuestion[] = [
  {
    id: 'l2-q1',
    question: 'Geçmiş dönemlerde yaşamış aile büyüklerimizle görüşerek onların çocukluk bayramlarını, mahalle oyunlarını ve geleneklerini kaydetmek amacıyla yapılan çalışmaya ne ad verilir?',
    options: [
      'A) Anket taraması',
      'B) Sözlü tarih çalışması',
      'C) Arkeolojik kazı çalışması',
      'D) Coğrafi harita çizimi'
    ],
    correctAnswer: 1,
    explanation: 'Çok doğru! Yaşayan hafızayı ses, görüntü veya notlarla kayıt altına alma yöntemine Sosyal Bilgilerde "Sözlü Tarih" çalışması diyoruz.',
    conceptTag: 'Sözlü Tarih Yöntemi'
  },
  {
    id: 'l2-q2',
    question: 'Kuşaklar arası kültürel aktarımın (geleneklerin, bayramlaşmaların ve imece kültürünün) toplum üzerindeki en temel birleştirici işlevi aşağıdakilerden hangisidir?',
    options: [
      'A) İnsanları birbirinden uzaklaştırıp bireysel yaşamı teşvik etmek',
      'B) Toplumsal birlik, yardımlaşma ve aidiyet duygusunu güçlendirerek kültürel sürekliliği sağlamak',
      'C) Teknolojik aletlerin kullanımını tamamen durdurmak',
      'D) Eski eşyaları satarak maddi kazanç elde etmek'
    ],
    correctAnswer: 1,
    explanation: 'Harika bir çıkarım! Kültürel miras, bireyleri ortak değerler etrafında kenetler, yardımlaşmayı artırır ve milli kimliğin devamını sağlar.',
    conceptTag: 'Kültürel Aktarım & Toplumsal Bağlar'
  }
];

export const LEVEL_3_QUESTIONS: QuizQuestion[] = [
  {
    id: 'l3-q1',
    question: 'Geleneksel bir zanaatkârın (örneğin telkâri ustası veya ney yapımcısı) bilgi ve becerilerini dijital 3D modelleme, video arşivleme ve açık erişimli veri tabanlarına aktarmanın en kritik stratejik gerekçesi nedir?',
    options: [
      'A) Ustanın atölyesini kapatmasını zorunlu kılmak',
      'B) Somut olmayan kültürel mirasın taşıyıcıları azalsa bile bilginin kaybolmasını önleyerek küresel bellek ve gelecek nesiller için sürdürülebilirliğini sağlamak',
      'C) Yalnızca yabancı turistlere ücretli video satışı yapmak',
      'D) El emeği ürünlerin üretim maliyetini sıfırlamak'
    ],
    correctAnswer: 1,
    explanation: 'Mükemmel bir analitik bakış! UNESCO ilkelerine göre dijital arşivleme ve envanter çalışmaları, yaşayan insan hazinelerinin bilgi birikimini küresel tehditlere ve unutulmaya karşı koruma altına alır.',
    conceptTag: 'Dijitalleşme & Kültürel Bellek'
  },
  {
    id: 'l3-q2',
    question: 'Hızlı küreselleşmenin yerel kültürler üzerinde yarattığı "tek-tipleşme" (kültürel homojenleşme) riskine karşı, yerel yönetimlerin ve sivil toplumun izlemesi gereken en dengeli sürdürülebilir politika hangisidir?',
    options: [
      'A) Dış dünyayla tüm kültürel ve ekonomik iletişimi tamamen kesmek',
      'B) Yerel kimliği, somut ve somut olmayan mirası eko-turizm, yaratıcı endüstriler ve eğitimle harmanlayarak dinamik biçimde yaşatmak ve katma değere dönüştürmek',
      'C) Geleneksel olan her şeyi müzeye kapatıp halkın gündelik hayatından çıkarmak',
      'D) Yerel adetleri tamamen unutup sadece küresel popüler kültürü benimsemek'
    ],
    correctAnswer: 1,
    explanation: 'Çok yerinde ve vizyoner bir değerlendirme! Kültürel miras koruma altına alınırken yaşayan bir ekosistem olarak değerlendirilmeli; hem yerel kalkınmayı beslemeli hem de özgün kimliğini korumalıdır.',
    conceptTag: 'Küreselleşme & Sürdürülebilir Kalkınma'
  }
];
