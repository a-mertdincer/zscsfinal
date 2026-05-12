export type FlashcardTopic = "numpy" | "pandas" | "matplotlib" | "general";

export interface Flashcard {
  id: string;
  topic: FlashcardTopic;
  front: string;
  back: string;
  codeExample?: string;
}

export const flashcards: Flashcard[] = [
  // NUMPY (13)
  {
    id: "np-1",
    topic: "numpy",
    front: "np.arange(start, stop, step)'de stop dahil mi?",
    back: "HAYIR. arange(1,5) → [1,2,3,4]. Stop değeri DAHİL DEĞİL.",
    codeExample: "np.arange(1, 5)   # [1 2 3 4]",
  },
  {
    id: "np-2",
    topic: "numpy",
    front: "np.random.randint(1, 101, 4) ne yapar?",
    back: "1 ile 100 arasında (101 dahil değil) 4 tane rastgele tamsayı üretir.",
  },
  {
    id: "np-3",
    topic: "numpy",
    front: "np.zeros(5) ile np.ones((3,2)) farkı?",
    back: "zeros(5) → 1D array [0,0,0,0,0]. ones((3,2)) → 3x2'lik 2D array, hepsi 1.",
  },
  {
    id: "np-4",
    topic: "numpy",
    front: ".shape attribute'u 2D array için ne döner?",
    back: "(satır_sayısı, sütun_sayısı). Örnek: shape=(3,4) → 3 satır, 4 sütun.",
  },
  {
    id: "np-5",
    topic: "numpy",
    front: "table[1, 2] ile table[1][2] aynı mı?",
    back: "Evet, ikisi de aynı elemanı verir. table[1,2] daha kısa ve önerilen.",
  },
  {
    id: "np-6",
    topic: "numpy",
    front: "np.max vs np.argmax farkı?",
    back: "max → en büyük DEĞER. argmax → en büyük değerin INDEX'i.",
    codeExample: "arr = [3,1,4,1,5,9,2]\nmax → 9\nargmax → 5",
  },
  {
    id: "np-7",
    topic: "numpy",
    front: "np.sum(table, axis=0) ne yapar?",
    back: "Sütun toplamlarını verir (her sütun için ayrı toplam).",
  },
  {
    id: "np-8",
    topic: "numpy",
    front: "np.sum(table, axis=1) ne yapar?",
    back: "Satır toplamlarını verir.",
  },
  {
    id: "np-9",
    topic: "numpy",
    front: "arr.sort() ne döner?",
    back: "None! Array'i yerinde (in-place) sıralar. `arr = arr.sort()` YAPMA, array'i kaybedersin.",
  },
  {
    id: "np-10",
    topic: "numpy",
    front: "np.unique(arr) ne yapar?",
    back: "Benzersiz elemanları sıralanmış olarak döner.",
  },
  {
    id: "np-11",
    topic: "numpy",
    front: "Boolean mask ile filtreleme syntax'i?",
    back: "arr[arr > 10] → 10'dan büyük elemanları seçer.",
    codeExample: "rainfall[rainfall > 10]",
  },
  {
    id: "np-12",
    topic: "numpy",
    front: "np.where(arr > 10) ne döner?",
    back: "Tuple döner, ilk elemanı index'lerin array'i. np.where(...)[0] ile al.",
  },
  {
    id: "np-13",
    topic: "numpy",
    front: "sum(arr > 10) ne sayar?",
    back: "Koşulu sağlayan eleman sayısı (True=1, False=0).",
  },

  // PANDAS (13)
  {
    id: "pd-1",
    topic: "pandas",
    front: "pd.Series vs pd.DataFrame?",
    back: "Series = tek sütun (etiketli). DataFrame = tablo (birden çok Series).",
  },
  {
    id: "pd-2",
    topic: "pandas",
    front: "Sözlükten DataFrame nasıl?",
    back: "pd.DataFrame({'col1':[1,2], 'col2':[3,4]}). Key'ler sütun adı, value'lar liste.",
  },
  {
    id: "pd-3",
    topic: "pandas",
    front: "fillna ile dropna farkı?",
    back: "fillna(x) → NaN'leri x ile doldurur. dropna() → NaN olan satırları siler.",
  },
  {
    id: "pd-4",
    topic: "pandas",
    front: "inplace=True ne işe yarar?",
    back: "Orijinal DataFrame'i değiştirir, yeni döndürmez. df.dropna(inplace=True).",
  },
  {
    id: "pd-5",
    topic: "pandas",
    front: "loc[] vs iloc[] farkı?",
    back: "loc → ETİKET bazlı (son DAHİL). iloc → KONUM/integer bazlı (son dahil değil).",
  },
  {
    id: "pd-6",
    topic: "pandas",
    front: "df.loc[0:3] kaç satır döner?",
    back: "4 satır! loc'ta son dahil. iloc[0:3] olsaydı 3 satır olurdu.",
  },
  {
    id: "pd-7",
    topic: "pandas",
    front: "Birden çok koşul filtrelerken syntax?",
    back: "df[(df.a > 10) & (df.b < 50)]. PARANTEZ ZORUNLU. & = ve, | = veya.",
  },
  {
    id: "pd-8",
    topic: "pandas",
    front: "df.salary vs df['salary']?",
    back: "Aynı sonucu verir. Sütun adında boşluk varsa df['col name'] kullanman gerek.",
  },
  {
    id: "pd-9",
    topic: "pandas",
    front: "to_excel'de index=None niye gerekli?",
    back: "Yoksa satır indexleri de excel'e yazılır. Genellikle istenmez.",
  },
  {
    id: "pd-10",
    topic: "pandas",
    front: "df.drop(0, axis=0) vs df.drop('col', axis=1)?",
    back: "axis=0 → satır siler. axis=1 → sütun siler.",
  },
  {
    id: "pd-11",
    topic: "pandas",
    front: "set_index ne yapar?",
    back: "Bir sütunu DataFrame'in index'i olarak ayarlar. df.set_index('id', inplace=True).",
  },
  {
    id: "pd-12",
    topic: "pandas",
    front: "sort_values ile sıralama?",
    back: "df.sort_values('age') yeni df döner. inplace=True ile orijinali değiştirirsin.",
  },
  {
    id: "pd-13",
    topic: "pandas",
    front: "head() ve tail() default değeri?",
    back: "5 satır. head(3) → ilk 3, tail(3) → son 3.",
  },

  // MATPLOTLIB (9)
  {
    id: "mp-1",
    topic: "matplotlib",
    front: "Plot başlamadan önce hangi 2 komut?",
    back: "plt.figure(1) ve plt.clf(). Figüre aç, temizle.",
  },
  {
    id: "mp-2",
    topic: "matplotlib",
    front: "subplot(2,3,4) ne demek?",
    back: "2 satır 3 sütun grid, 4. pozisyonu aktif et (soldan sağa, üstten alta).",
  },
  {
    id: "mp-3",
    topic: "matplotlib",
    front: "'r--o' format string'i ne anlatır?",
    back: "Kırmızı (r), kesikli (--) çizgi, daire (o) marker.",
  },
  {
    id: "mp-4",
    topic: "matplotlib",
    front: "Pie chart'ta yüzdeleri nasıl gösterirsin?",
    back: "plt.pie(values, autopct='%1.1f%%') — 1 ondalık basamak.",
  },
  {
    id: "mp-5",
    topic: "matplotlib",
    front: "Pie'da bir dilimi dışarı çıkarmak?",
    back: "explode=[0,0.1,0,0] → ikinci dilim 0.1 dışarı çıkar.",
  },
  {
    id: "mp-6",
    topic: "matplotlib",
    front: "Yan yana iki bar grafiği nasıl?",
    back: "plt.bar(x, y1, width=0.3, align='edge'); plt.bar(x, y2, width=-0.3, align='edge')",
  },
  {
    id: "mp-7",
    topic: "matplotlib",
    front: "Histogram default bin sayısı?",
    back: "10. plt.hist(data, bins=3) ile değiştirirsin.",
  },
  {
    id: "mp-8",
    topic: "matplotlib",
    front: "plt.axis() parametresi?",
    back: "[xmin, xmax, ymin, ymax]. plt.axis([0,30,40,110]).",
  },
  {
    id: "mp-9",
    topic: "matplotlib",
    front: "Legend nasıl eklenir?",
    back: "plt.legend(['seri1', 'seri2']) — plot sırasıyla aynı sırada.",
  },

  // GENERAL / TUZAK (5)
  {
    id: "gn-1",
    topic: "general",
    front: "import numpy ve pandas alias'ları?",
    back: "import numpy as np  /  import pandas as pd  /  import matplotlib.pyplot as plt",
  },
  {
    id: "gn-2",
    topic: "general",
    front: "Sınav klasiği: arange(0, 10, 2) çıktısı?",
    back: "[0, 2, 4, 6, 8]. 10 DAHİL DEĞİL.",
  },
  {
    id: "gn-3",
    topic: "general",
    front: "Boolean indexing'de neden parantez şart?",
    back: "& ve | operatörlerinin önceliği yüksek. Parantez koymazsan yanlış sıralanır.",
  },
  {
    id: "gn-4",
    topic: "general",
    front: "Sample final tarzı: excel'i oku → NaN sil → * yerine 'Not Specified'?",
    back: "df=pd.read_excel('f.xlsx'); df.dropna(inplace=True); df.replace('*','Not Specified',inplace=True)",
  },
  {
    id: "gn-5",
    topic: "general",
    front: "20. order'a iloc ile nasıl ulaşılır?",
    back: "df.iloc[19]. 0-indexed olduğu için 20. order index 19.",
  },
];

export function getFlashcardsByTopic(topic: FlashcardTopic | "all"): Flashcard[] {
  if (topic === "all") return flashcards;
  return flashcards.filter((c) => c.topic === topic);
}
