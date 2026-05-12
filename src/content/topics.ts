export type TopicColor = "emerald" | "sky" | "amber" | "violet";

export interface TopicSection {
  id: string;
  title: string;
  explanation: string;
  code?: string;
  output?: string;
  tip?: string;
}

export interface Exercise {
  id: string;
  prompt: string;
  starter?: string;
  solution: string;
  expectedOutput?: string;
  hints: string[];
}

export type QuizChoice = { id: string; label: string };

export interface QuizQuestion {
  id: string;
  type: "mcq" | "predict" | "find-error";
  question: string;
  code?: string;
  choices?: QuizChoice[];
  answerId?: string;
  expectedAnswer?: string;
  explanation: string;
}

export interface Topic {
  id: string;
  week: string;
  title: string;
  subtitle: string;
  color: TopicColor;
  icon: "grid" | "filter" | "database" | "table" | "chart" | "workflow";
  sections: TopicSection[];
  exercises: Exercise[];
  quiz: QuizQuestion[];
}

export const topics: Topic[] = [
  {
    id: "numpy-basics",
    week: "Hafta 9",
    title: "NumPy Temelleri",
    subtitle: "Array, shape, slicing, axis — Python listesinin steroidli versiyonu.",
    color: "emerald",
    icon: "grid",
    sections: [
      {
        id: "what-is-numpy",
        title: "NumPy nedir, niye var?",
        explanation:
          "NumPy, Python'da sayılarla çalışmak için yapılmış bir kütüphane. Python listesi her tipi karıştırabilir, NumPy array ise **tek tip** ve **sabit boyut** ister. Bir Excel sütununu düşün — hepsi sayı, hepsi aynı uzunlukta. NumPy de öyle. Bu yüzden işlemler hem hızlı hem temiz: bütün array'i bir kerede çarpabilirsin, döngü kurman gerekmez.",
        code: `import numpy as np

liste = [1, 2, 3, 4]
arr = np.array([1, 2, 3, 4])

print(liste * 2)   # listeyi 2 kez yan yana koyar
print(arr * 2)     # her elemanı 2 ile çarpar`,
        output: `[1, 2, 3, 4, 1, 2, 3, 4]
[2 4 6 8]`,
        tip: "import numpy as np — bu kısaltma standart. Sınavda 'np' görürsen NumPy demek.",
      },
      {
        id: "array-creation",
        title: "Array oluşturma — 4 yol",
        explanation:
          "Array'i hazır listeden de yapabilirsin, sıfırdan da. En çok kullandığın 4 yol var:\n\n1) **Listeden**: `np.array([1,2,3])`\n2) **Aralıktan**: `np.arange(başla, dur, adım)` — `dur` DAHİL DEĞİL.\n3) **Placeholder**: `np.zeros(5)` veya `np.ones(5)` — önce yeri aç, sonra doldur.\n4) **Rastgele**: `np.random.randint(1, 101, 4)` — 1 ile 100 arasında 4 int (101 dahil değil).",
        code: `np.array([1, 2, 3])              # [1 2 3]
np.arange(1, 10, 2)              # [1 3 5 7 9]
np.zeros(5)                      # [0. 0. 0. 0. 0.]
np.ones(5)                       # [1. 1. 1. 1. 1.]
np.random.randint(1, 101, 4)     # 1-100 arası 4 rastgele int
np.random.rand(5)                # 0-1 arası 5 rastgele float`,
        tip: "arange(1, 5) → [1,2,3,4]. SON DAHİL DEĞİL. Sınavda kafa karıştıran klasik tuzak.",
      },
      {
        id: "attributes",
        title: "Array attributes (parantezsiz!)",
        explanation:
          "Array'in özelliklerini öğrenmek için 4 attribute kullanırsın. Bunlar fonksiyon değil, **özellik** — yani parantez koymazsın.\n\n- `.dtype` → eleman tipi (int64, float64...)\n- `.ndim` → kaç boyutlu (1D, 2D, ...)\n- `.shape` → boyut tuple'ı: 2D için (satır, sütun)\n- `.size` → toplam eleman sayısı",
        code: `arr = np.array([[1, 2, 3], [4, 5, 6]])
print(arr.dtype)   # int64
print(arr.ndim)    # 2
print(arr.shape)   # (2, 3)
print(arr.size)    # 6`,
        tip: "Parantez koyarsan hata alırsın. shape() değil, shape.",
      },
      {
        id: "2d-arrays",
        title: "2D Array — matris / tablo",
        explanation:
          "Liste içinde liste verirsen 2D array olur. Her iç liste bir satır.\n\n`shape = (satır_sayısı, sütun_sayısı)`. Eleman seçmek için `table[satır, sütun]` syntax'ı en temizi.",
        code: `table = np.array([[1, 2, 3],
                  [4, 5, 6]])

print(table.shape)   # (2, 3) → 2 satır 3 sütun
print(table[1, 2])   # 6 → 2. satır (index 1), 3. sütun (index 2)
print(table[0])      # [1 2 3] → ilk satır`,
        tip: "0-indexed unutma. İlk satır = index 0, ikinci satır = index 1.",
      },
      {
        id: "indexing-slicing",
        title: "Indexing ve Slicing",
        explanation:
          "Slice syntax'i: `arr[başla:dur:adım]`. `dur` DAHİL DEĞİL. 2D'de iki dimension için ayrı slice:\n- `table[:, 0]` → tüm satırlar, 0. sütun → **ilk sütun**\n- `table[0, :]` → 0. satır, tüm sütunlar → **ilk satır**\n- `table[1:3, 0:2]` → 1-2. satır, 0-1. sütun",
        code: `arr = np.array([10, 20, 30, 40, 50])
print(arr[1:4])     # [20 30 40]
print(arr[::2])     # [10 30 50]

table = np.array([[1,2,3],[4,5,6],[7,8,9]])
print(table[:, 0])    # [1 4 7] → ilk sütun
print(table[0, :])    # [1 2 3] → ilk satır
print(table[1:3, 0:2])
# [[4 5]
#  [7 8]]`,
        tip: "Slice'da son index dahil DEĞİL. loc'ta tam tersi olacak — şimdiden aklının köşesine yaz.",
      },
      {
        id: "element-ops",
        title: "Element-wise operations",
        explanation:
          "NumPy'ın asıl gücü: döngü kurmadan tüm array üzerinde işlem yaparsın. `arr * 2` → her elemanı 2 ile çarpar. İki array arasında işlem yaparsan eleman-eleman eşleşir.",
        code: `a = np.array([1, 2, 3, 4])
b = np.array([10, 20, 30, 40])

print(a * 2)       # [2 4 6 8]
print(a + b)       # [11 22 33 44]
print(a ** 2)      # [1 4 9 16]
print(np.abs(np.array([-3, -1, 2])))  # [3 1 2]`,
        tip: "Hiçbir for döngüsü yok. NumPy vektörize işliyor, hem temiz hem hızlı.",
      },
      {
        id: "builtin-funcs",
        title: "Built-in functions — sum, mean, argmax",
        explanation:
          "Her array'in üstünde `np.sum`, `np.mean`, `np.max`, `np.min`, `np.argmax`, `np.argmin` çalışır.\n\n2D'de `axis` parametresi var:\n- `axis=0` → SÜTUNLARI topla (yukarıdan aşağıya)\n- `axis=1` → SATIRLARI topla (soldan sağa)\n\n**argmax çok önemli:** max'ın **index**'ini verir, değerini değil.",
        code: `arr = np.array([3, 1, 4, 1, 5, 9, 2])
print(np.max(arr))      # 9  (değer)
print(np.argmax(arr))   # 5  (9'un index'i)
print(np.mean(arr))     # 3.57

t = np.array([[1, 2, 3],
              [4, 5, 6]])
print(np.sum(t, axis=0))   # [5 7 9]   — sütun toplamı
print(np.sum(t, axis=1))   # [6 15]    — satır toplamı`,
        tip: "axis=0 sütun, axis=1 satır. Tersini hatırlamaya çalış: 0 = vertically squish.",
      },
      {
        id: "sort-unique",
        title: "sort ve unique",
        explanation:
          "`arr.sort()` array'i **yerinde** sıralar ve `None` döner. `arr = arr.sort()` YAPMA — None'a eşitlersin, array'i kaybedersin.\n\n`np.unique(arr)` benzersiz elemanları **sıralı** olarak yeni bir array döner.",
        code: `arr = np.array([3, 1, 4, 1, 5, 9, 2, 6, 5])
arr.sort()
print(arr)                # [1 1 2 3 4 5 5 6 9]

print(np.unique(arr))     # [1 2 3 4 5 6 9]`,
        tip: "arr.sort() — return değeri yok (None). np.unique — yeni array döner.",
      },
    ],
    exercises: [
      {
        id: "ex1-temps",
        prompt:
          "5 günlük rastgele sıcaklık (0-40 arası) oluştur. Ortalamayı bul. Ortalamadan yüksek günlerin index'lerini ekrana yazdır.",
        solution: `temps = np.random.randint(0, 41, 5)
avg = np.mean(temps)
hot_days = np.where(temps > avg)[0]
print(temps)
print("Ortalama:", avg)
print("Sıcak günler (index):", hot_days)`,
        hints: [
          "Önce np.random.randint(0, 41, 5) ile array yap. Sonra ortalama lazım.",
          "Boolean mask ile `np.where(temps > avg)` index'leri verir.",
          "`np.where(...)` tuple döner; `[0]` ile içindeki array'i alırsın.",
        ],
      },
      {
        id: "ex1-axis",
        prompt:
          "3x4'lük bir tablonun her SÜTUNUNUN ortalamasını bul. Hangi sütunun ortalaması en yüksek?",
        solution: `t = np.random.randint(0, 100, (3, 4))
col_means = np.mean(t, axis=0)
print(col_means)
print("En yüksek ortalama sütunu:", np.argmax(col_means))`,
        hints: [
          "Sütun bazlı ortalama için axis parametresi gerekli.",
          "Sütun = axis=0. Satır = axis=1.",
          "Sonra argmax ile en büyüğün index'ini al.",
        ],
      },
    ],
    quiz: [
      {
        id: "q1",
        type: "mcq",
        question: "np.arange(1, 5) ne döner?",
        choices: [
          { id: "a", label: "[1, 2, 3, 4, 5]" },
          { id: "b", label: "[1, 2, 3, 4]" },
          { id: "c", label: "[0, 1, 2, 3, 4]" },
          { id: "d", label: "[1, 5]" },
        ],
        answerId: "b",
        explanation: "np.arange'da son sayı DAHİL DEĞİL. 1'den başla, 5'ten önce dur.",
      },
      {
        id: "q2",
        type: "predict",
        question: "Bu kodun çıktısı ne?",
        code: `arr = np.array([3, 1, 4, 1, 5, 9, 2])
print(np.argmax(arr))`,
        expectedAnswer: "5",
        explanation: "argmax MAKSIMUM'un INDEX'ini verir. En büyük değer 9, onun index'i 5.",
      },
      {
        id: "q3",
        type: "mcq",
        question: "np.sum(t, axis=0) bir 2D array için ne yapar?",
        choices: [
          { id: "a", label: "Tüm elemanları toplar" },
          { id: "b", label: "Satır toplamlarını verir" },
          { id: "c", label: "Sütun toplamlarını verir" },
          { id: "d", label: "İlk satırı verir" },
        ],
        answerId: "c",
        explanation: "axis=0 → sütun bazlı işlem. axis=1 → satır bazlı işlem.",
      },
      {
        id: "q4",
        type: "find-error",
        question: "Bu kodun çıktısı niye [None]?",
        code: `arr = np.array([3, 1, 2])
arr = arr.sort()
print(arr)`,
        expectedAnswer: "sort() None döner",
        explanation: "arr.sort() yerinde (in-place) sıralar ve None döner. arr = arr.sort() yazınca arr'ı None'a eşitlersin. Sadece arr.sort() de, sonra print(arr).",
      },
    ],
  },

  {
    id: "boolean-indexing",
    week: "Hafta 9",
    title: "Boolean Indexing",
    subtitle: "Maske ile filtreleme — True olanları seç.",
    color: "emerald",
    icon: "filter",
    sections: [
      {
        id: "boolean-array",
        title: "Boolean array nedir?",
        explanation:
          "`arr > 10` yazdığında NumPy sana **True/False'lık bir array** döner. Bu bir maske gibi — her pozisyon için 'bu koşul tutuyor mu' sorusunun cevabı. Sonra bu maskeyi köşeli parantezin içine atınca, sadece True olan elemanlar gelir.",
        code: `arr = np.array([4, 6, 5, 8, 17, 11, 17])
mask = arr > 10
print(mask)
# [False False False False  True  True  True]`,
        tip: "Boolean array, sayı array'iyle aynı uzunlukta. Her eleman için bir T/F.",
      },
      {
        id: "boolean-filter",
        title: "Filtreleme — köşeli parantez içinde mask",
        explanation:
          "Bir array'in indexine başka bir boolean array koyarsan, True olan pozisyonlardakileri alırsın. Bu CS125'in en sık kullandığı pattern.",
        code: `arr = np.array([4, 6, 5, 8, 17, 11, 17])
print(arr[arr > 10])
# [17 11 17]`,
        tip: "Aynı array'i hem koşul hem seçim için kullanıyoruz: arr[arr > 10].",
      },
      {
        id: "sum-counting",
        title: "sum() ile sayma",
        explanation:
          "Python'da True=1, False=0. Yani `sum(boolean_array)` sana KAÇ TANE True olduğunu verir.",
        code: `arr = np.array([4, 6, 5, 8, 17, 11, 17])
print(sum(arr > 10))   # 3`,
        tip: "len(arr[arr>10]) de aynı sonucu verir ama sum(...) daha kısa.",
      },
      {
        id: "np-where",
        title: "np.where() — index'leri al",
        explanation:
          "Koşulu sağlayan elemanların **INDEX**'lerini istiyorsan `np.where(...)` kullan. Tuple döner — array'i içinden `[0]` ile alırsın.",
        code: `arr = np.array([4, 6, 5, 8, 17, 11, 17])
print(np.where(arr > 10))      # (array([4, 5, 6]),)
print(np.where(arr > 10)[0])   # [4 5 6]`,
        tip: "Tuple döndüğü için [0] gerekiyor. argmax tek index, where birden fazla index verir.",
      },
      {
        id: "rainfall-example",
        title: "Pratik örnek — rainfall",
        explanation:
          "Tüm parçaları bir araya koyalım. Bir hafta boyunca yağış var — 10mm'den fazla yağan günleri bulmamız gerek. Hem değerleri, hem index'leri, hem sayıları, hem gün isimlerini almak istiyoruz.",
        code: `import numpy as np

rainfall = np.array([4, 6, 5, 8, 17, 11, 17])
days = np.array(['Mon','Tue','Wed','Thu','Fri','Sat','Sun'])

is_over = rainfall > 10
print(is_over)
# [False False False False  True  True  True]

values_over = rainfall[is_over]
print(values_over)            # [17 11 17]

indexes = np.where(rainfall > 10)
print(indexes)                # (array([4, 5, 6]),)

count = sum(is_over)
print(count)                  # 3

rainy_days = days[is_over]
print(rainy_days)             # ['Fri' 'Sat' 'Sun']`,
        output: `[False False False False  True  True  True]
[17 11 17]
(array([4, 5, 6]),)
3
['Fri' 'Sat' 'Sun']`,
        tip: "Aynı boolean mask'i farklı array'lere de uygulayabilirsin (rainfall ve days, ikisi de aynı uzunlukta).",
      },
    ],
    exercises: [
      {
        id: "ex-rain",
        prompt:
          "5 günlük yağış verisi: [3, 12, 8, 20, 5]. 10mm'den fazla yağan günlerin index'lerini ve değerlerini yazdır.",
        solution: `r = np.array([3, 12, 8, 20, 5])
print("Index:", np.where(r > 10)[0])
print("Değerler:", r[r > 10])`,
        hints: [
          "İki ayrı şey istiyor: index'ler için np.where, değerler için boolean mask.",
          "np.where(r > 10) tuple döner, [0] ile içine gir.",
          "Değerler için r[r > 10] doğrudan istediğini verir.",
        ],
      },
    ],
    quiz: [
      {
        id: "q1",
        type: "predict",
        question: "Bu kodun çıktısı ne?",
        code: `arr = np.array([4, 6, 5, 8, 17, 11, 17])
print(sum(arr > 10))`,
        expectedAnswer: "3",
        explanation: "True=1, False=0. 17, 11, 17 olmak üzere 3 tane True var.",
      },
      {
        id: "q2",
        type: "mcq",
        question: "np.where(arr > 10) ne döner?",
        choices: [
          { id: "a", label: "10'dan büyük değerleri" },
          { id: "b", label: "10'dan büyük olanların index'lerini içeren tuple" },
          { id: "c", label: "True/False array" },
          { id: "d", label: "Koşulu sağlayan eleman sayısı" },
        ],
        answerId: "b",
        explanation: "np.where index'leri verir, üstelik tuple olarak. [0] ile array'e ulaşırsın.",
      },
      {
        id: "q3",
        type: "predict",
        question: "Bu kodun çıktısı?",
        code: `arr = np.array([10, 20, 30, 40])
mask = arr > 15
print(arr[mask])`,
        expectedAnswer: "[20 30 40]",
        explanation: "mask = [False True True True]. arr[mask] → True olan pozisyonları seçer.",
      },
    ],
  },

  {
    id: "pandas-series-dataframe",
    week: "Hafta 10",
    title: "Pandas — Series & DataFrame",
    subtitle: "Etiketli array, etiketli tablo. Excel'in Python versiyonu.",
    color: "sky",
    icon: "database",
    sections: [
      {
        id: "pandas-intro",
        title: "Pandas nedir?",
        explanation:
          "Pandas NumPy'ın üstüne kurulu. NumPy = sayı array'i (etiket yok). Pandas = etiketli tablo (her sütun isimli). Excel'in Python versiyonu diye düşün — okuyabiliyorsun, filtreliyebiliyorsun, yazabiliyorsun.",
        code: `import pandas as pd
import numpy as np`,
        tip: "import pandas as pd — alias standart. 'pd' sınavda görünür.",
      },
      {
        id: "series",
        title: "Series — tek sütun",
        explanation:
          "`pd.Series` tek bir sütun gibi. NumPy array + index (etiket) bir arada. Default index 0, 1, 2... ama istediğin etiketi verebilirsin.",
        code: `s1 = pd.Series([10, 20, 30])
print(s1)
# 0    10
# 1    20
# 2    30

s2 = pd.Series([10, 20, 30], index=['a', 'b', 'c'])
print(s2)
# a    10
# b    20
# c    30`,
        tip: "Index, Series'in 'isim' kısmı. dict mantığı — her değerin bir key'i var.",
      },
      {
        id: "series-nan",
        title: "Series'te NaN — eksik veri",
        explanation:
          "İki Series'i topladığında ortak index'lerde toplanır, olmayanlarda NaN olur. NaN = 'Not a Number' = bilinmiyor.\n\n- `dropna()` → NaN olanları çıkar, yeni Series döner.\n- `fillna(0)` → NaN'leri 0 ile doldur, yeni Series döner.\n\nİkisi de orijinali değiştirmez!",
        code: `a = pd.Series([1, 2, 3], index=['x', 'y', 'z'])
b = pd.Series([10, 20, 30], index=['y', 'z', 'w'])

print(a + b)
# w     NaN
# x     NaN
# y    12.0
# z    23.0

print((a + b).dropna())   # NaN'siz versiyon
print((a + b).fillna(0))  # NaN'ler 0 oldu`,
        tip: "dropna ve fillna yeni Series döner. Orijinali değiştirmek için inplace=True veya yeniden atama.",
      },
      {
        id: "dataframe",
        title: "DataFrame — tablo",
        explanation:
          "DataFrame, birden çok Series'in yan yana gelmiş hali. En kolay yolu: **sözlükten** oluşturmak. Key'ler sütun adı, value'lar (liste) sütun içeriği.",
        code: `df = pd.DataFrame({
    'isim': ['Ali', 'Veli', 'Ayşe'],
    'yas':  [25, 30, 28],
    'sehir':['Ankara', 'İstanbul', 'İzmir']
})
print(df)
#    isim  yas     sehir
# 0   Ali   25    Ankara
# 1  Veli   30  İstanbul
# 2  Ayşe   28     İzmir`,
        tip: "Listeler aynı uzunlukta olmalı, yoksa hata alırsın.",
      },
      {
        id: "read-files",
        title: "Dosyadan okuma — read_excel & read_csv",
        explanation:
          "Veri çoğunlukla dosyadan gelir. CS125 sınavında Excel ve CSV en sık karşılaşacağın iki format.",
        code: `df = pd.read_excel('file.xlsx')
df = pd.read_csv('file.csv')`,
        tip: "Dosya adında uzantıyı (.xlsx, .csv) unutma. Sınavda bu çok kaçırılan bir detay.",
      },
      {
        id: "add-drop-columns",
        title: "Sütun/satır ekleme & silme",
        explanation:
          "Yeni sütun ekleme = sözlük benzeri: `df['yeni'] = ...`\n\nSilme: `df.drop(label, axis=0veya1)`\n- `axis=0` → SATIR sil\n- `axis=1` → SÜTUN sil\n\nDikkat: `drop` yeni DataFrame döner. Orijinali değiştirmek istersen `inplace=True`.",
        code: `df['yas_x2'] = df['yas'] * 2     # yeni sütun
df = df.drop('yas', axis=1)       # sütun sil
df = df.drop(0, axis=0)           # 0. satırı sil`,
        tip: "axis=0 satır, axis=1 sütun. drop'un parametresi label/index, sayı veya isim.",
      },
      {
        id: "write-files",
        title: "Yazma — to_excel / to_csv",
        explanation:
          "DataFrame'i dosyaya yazmak için `to_excel`, `to_csv`. **Önemli:** `index=None` koymazsan satır indexleri de dosyaya yazılır. Genellikle istemezsin.",
        code: `df.to_excel('out.xlsx', index=None)
df.to_csv('out.csv', index=None)`,
        tip: "index=None — yoksa Excel'in ilk sütununda 0, 1, 2... görürsün. Sınavda bu unutulur.",
      },
    ],
    exercises: [
      {
        id: "ex-build-df",
        prompt:
          "3 çalışan: ['Ali', 'Veli', 'Ayşe'], maaşları [5000, 7000, 6000]. DataFrame yap, 'bonus' sütunu olarak maaşın %10'unu ekle.",
        solution: `df = pd.DataFrame({
    'isim': ['Ali', 'Veli', 'Ayşe'],
    'maas': [5000, 7000, 6000]
})
df['bonus'] = df['maas'] * 0.1
print(df)`,
        hints: [
          "Sözlükten DataFrame: pd.DataFrame({...}).",
          "Yeni sütun: df['yeni_isim'] = hesaplama.",
          "df['maas'] * 0.1 — element-wise işlem.",
        ],
      },
      {
        id: "ex-nan",
        prompt:
          "Series([1,2,np.nan,4]) ve Series([10,np.nan,30,40]). İkisini topla. Önce NaN olanları sil, sonra yazdır.",
        solution: `import numpy as np
a = pd.Series([1, 2, np.nan, 4])
b = pd.Series([10, np.nan, 30, 40])
print((a + b).dropna())`,
        hints: [
          "Series'leri direkt topla.",
          "dropna() yeni Series döner, orijinali değiştirmez.",
          "(a+b).dropna() — chain et.",
        ],
      },
    ],
    quiz: [
      {
        id: "q1",
        type: "mcq",
        question: "pd.Series ile pd.DataFrame farkı ne?",
        choices: [
          { id: "a", label: "İkisi de aynı şey" },
          { id: "b", label: "Series = tek sütun. DataFrame = tablo." },
          { id: "c", label: "Series sadece sayı, DataFrame string tutar." },
          { id: "d", label: "Series 1D ama indexsiz." },
        ],
        answerId: "b",
        explanation: "Series tek bir sütun (etiketli). DataFrame birden çok Series'in tablo halinde birleşmesi.",
      },
      {
        id: "q2",
        type: "find-error",
        question: "Bu kodun problemi ne?",
        code: `df.to_excel('out.xlsx')`,
        expectedAnswer: "index=None unutulmuş",
        explanation: "index=None koymazsan Excel'in ilk sütununda satır indexleri (0,1,2...) görürsün. Genellikle istenmez.",
      },
      {
        id: "q3",
        type: "mcq",
        question: "df.drop('yas', axis=1) ne yapar?",
        choices: [
          { id: "a", label: "0. satırı siler" },
          { id: "b", label: "'yas' adlı satırı siler" },
          { id: "c", label: "'yas' sütununu siler ve yeni df döner" },
          { id: "d", label: "Yas sütununu inplace değiştirir" },
        ],
        answerId: "c",
        explanation: "axis=1 = sütun. drop yeni DataFrame döner; orijinali değiştirmek için inplace=True.",
      },
    ],
  },

  {
    id: "pandas-manipulation",
    week: "Hafta 11",
    title: "Pandas — loc, iloc, Filtreleme",
    subtitle: "Asıl iş burada başlıyor: veri seçme, filtreleme, temizleme.",
    color: "sky",
    icon: "table",
    sections: [
      {
        id: "head-tail",
        title: "head() ve tail() — göz at",
        explanation:
          "Veriyi ilk açtığında hep `head()` ile bir bak. Default ilk 5 satırı verir. `tail()` son 5'i. Parametre ver, istediğin kadar al.",
        code: `df.head()      # ilk 5
df.head(3)     # ilk 3
df.tail(2)     # son 2`,
        tip: "İlk satırda hep head() çalıştır — sütun adlarını, veri yapısını görürsün.",
      },
      {
        id: "brackets",
        title: "Köşeli parantez [ ] ile seçim",
        explanation:
          "Tek sütun: `df['salary']` ya da `df.salary`. İkisi aynı. Boşluklu sütun adlarında **mutlaka köşeli parantez** kullan: `df['col name']`.\n\nÇoklu sütun: **iç içe liste**: `df[['salary', 'name']]`.",
        code: `df['salary']                    # tek sütun (Series)
df.salary                       # aynı şey (nokta ile)
df[['salary', 'name']]          # çoklu sütun (DataFrame)
df[0:3]                         # ilk 3 satır (default integer index)`,
        tip: "df[['col1','col2']] — iç içe liste! Dış [ ] DataFrame indexleme, iç [ ] sütun listesi.",
      },
      {
        id: "iloc",
        title: "iloc[] — integer position",
        explanation:
          "**iloc** = integer location. Konum bazlı, NumPy gibi davranır. **Son index DAHİL DEĞİL.**",
        code: `df.iloc[0]              # ilk satır
df.iloc[-1]             # son satır
df.iloc[0:3]            # ilk 3 satır (0,1,2)
df.iloc[0:3, 1:3]       # satır 0-2, sütun 1-2`,
        tip: "iloc → NumPy mantığı. Son dahil DEĞİL.",
      },
      {
        id: "loc",
        title: "loc[] — label-based",
        explanation:
          "**loc** = label location. Etiket bazlı çalışır. Burada bir tuzak var: **son index DAHİL!**\n\n`df.loc[0:3]` → index'i 0, 1, 2, **3** olan satırlar (4 satır).",
        code: `df.loc[0]                       # index'i 0 olan satır
df.loc[0:3]                     # 0,1,2,3 → 4 SATIR
df.loc[0, 'name']               # 0. satır, 'name' sütunu
df.loc[:, ['name', 'salary']]   # tüm satır, iki sütun`,
        tip: "loc son DAHİL, iloc son dahil değil. Sınavda iki kez bak.",
      },
      {
        id: "loc-filter",
        title: "loc[] ile filtreleme — bool + sütun",
        explanation:
          "Asıl güç burada: `df.loc[koşul, sütunlar]`. Önce hangi satırlar (boolean), sonra hangi sütunlar.",
        code: `# Maaşı 100K'dan büyük olanların name ve salary'si
df.loc[df.salary > 100000, ['name', 'salary']]`,
        tip: "Önce satır, sonra sütun. Virgülle ayır.",
      },
      {
        id: "bool-multi",
        title: "Boolean filter — çoklu koşul",
        explanation:
          "Birden çok koşul birleştirmek için Python'un `and`/`or`'unu DEĞİL, NumPy'ın `&`/`|`'sını kullan. **Parantez ZORUNLU.**\n\n- `&` = ve\n- `|` = veya\n- `~` = değil",
        code: `df[(df.salary > 60000) & (df.salary < 100000)]
df[(df.team == 'Legal') | (df.role == 'Manager')]
df[~(df.team == 'IT')]`,
        tip: "Parantez koymazsan operator precedence yüzünden hata alırsın. & ve | bit-wise, & ve | önceliği yüksek.",
      },
      {
        id: "cleaning",
        title: "Veri temizleme — fillna, dropna, replace",
        explanation:
          "Gerçek dünya verisi her zaman kirli. Bu üçlü en sık kullanacakların:\n\n- `fillna(x)` → NaN'leri x ile doldur\n- `dropna()` → NaN olan SATIRLARI sil\n- `replace(eski, yeni)` → bir değeri başkasıyla değiştir\n\n`inplace=True` orijinali değiştirir, yoksa yeni DataFrame döner.",
        code: `df.fillna(-1)                          # NaN → -1 (yeni df)
df.dropna(inplace=True)                # NaN olan satırları sil (orijinal)
df.replace('*', 'Belirsiz', inplace=True)`,
        tip: "Sınav klasiği: replace('*', 'Not Specified', inplace=True). inplace UNUTMA.",
      },
      {
        id: "sort-setindex",
        title: "sort_values, set_index",
        explanation:
          "Sıralama ve index ayarlama:\n\n- `sort_values('col')` → o sütuna göre sırala\n- `set_index('col')` → bir sütunu DataFrame'in index'i yap",
        code: `df.sort_values('age')                  # yeni df döner
df.sort_values('age', inplace=True)    # orijinali değiştir
df.set_index('id', inplace=True)       # 'id' artık index`,
        tip: "Default ascending. azalan istersen sort_values('age', ascending=False).",
      },
    ],
    exercises: [
      {
        id: "ex-doctor",
        prompt:
          "doctor_data.xlsx'i oku. num_patients > 1500 OLAN ve specialty == 'Cardiology' olan doktorların adlarını yazdır.",
        solution: `df = pd.read_excel('doctor_data.xlsx')
result = df.loc[(df.num_patients > 1500) & (df.specialty == 'Cardiology'), 'name']
print(result)`,
        hints: [
          "İki koşul birleşik — & ile bağla. PARANTEZ ZORUNLU.",
          "loc kullan: önce koşul, sonra sütun.",
          "df.loc[(c1) & (c2), 'name'] formu işine yarar.",
        ],
      },
      {
        id: "ex-clean",
        prompt:
          "Bir df'de '*' işaretleri Not Specified ile değişsin, NaN olan satırlar silinsin, orijinal df değişsin.",
        solution: `df.replace('*', 'Not Specified', inplace=True)
df.dropna(inplace=True)`,
        hints: [
          "replace ve dropna'yı sırayla çağır.",
          "İkisinde de inplace=True olmalı.",
          "Sıra: önce replace, sonra dropna — yoksa Not Specified'lar yanlışlıkla NaN gibi düşünülmez ama temiz.",
        ],
      },
    ],
    quiz: [
      {
        id: "q1",
        type: "mcq",
        question: "df.loc[0:3] kaç satır döner?",
        choices: [
          { id: "a", label: "3" },
          { id: "b", label: "4" },
          { id: "c", label: "0" },
          { id: "d", label: "Hata verir" },
        ],
        answerId: "b",
        explanation: "loc'ta son DAHİL. 0, 1, 2, 3 → 4 satır. iloc[0:3] olsaydı 3 satır olurdu.",
      },
      {
        id: "q2",
        type: "find-error",
        question: "Bu kodda ne yanlış?",
        code: `df[df.salary > 60000 & df.salary < 100000]`,
        expectedAnswer: "Parantez eksik",
        explanation:
          "Operator precedence yüzünden & önce hesaplanır. Doğrusu: df[(df.salary > 60000) & (df.salary < 100000)].",
      },
      {
        id: "q3",
        type: "predict",
        question: "df.replace('*', 'X') komutu df'yi değiştirir mi?",
        choices: [
          { id: "a", label: "Evet, orijinal df değişir" },
          { id: "b", label: "Hayır, yeni df döner. inplace=True olmadan orijinal aynı kalır." },
          { id: "c", label: "Hata verir" },
          { id: "d", label: "Sadece görüntüde değişir" },
        ],
        answerId: "b",
        explanation: "Default inplace=False. Orijinali değiştirmek için inplace=True veya df = df.replace(...).",
      },
      {
        id: "q4",
        type: "mcq",
        question: "df.iloc[0:3, 1:3] ne döner?",
        choices: [
          { id: "a", label: "İlk 3 satır, 1-3 arası sütunlar (sütun 1, 2)" },
          { id: "b", label: "İlk 4 satır, 1-3 arası sütunlar" },
          { id: "c", label: "Hatalı syntax" },
          { id: "d", label: "Tüm satır, ilk 3 sütun" },
        ],
        answerId: "a",
        explanation: "iloc → son dahil değil. Satır 0,1,2 ve sütun 1,2 — yani 3 satır 2 sütun.",
      },
    ],
  },

  {
    id: "matplotlib",
    week: "Hafta 11-12",
    title: "Matplotlib — Görselleştirme",
    subtitle: "Çiz, etiketle, başlık koy. Sınavda subplot + pie/bar/hist klasik.",
    color: "amber",
    icon: "chart",
    sections: [
      {
        id: "setup",
        title: "Plot kurulumu — figure & clf",
        explanation:
          "Her plot başlamadan iki komut: `plt.figure(1)` (1 no'lu figüre'i aç) ve `plt.clf()` (önceki çizimi temizle). Yoksa eski plot üstüne yeni plot biner.",
        code: `import matplotlib.pyplot as plt

plt.figure(1)
plt.clf()
# ... plot komutları ...
plt.show()`,
        tip: "Sınavda figure() ve clf() unutulursa plotlar üst üste biner.",
      },
      {
        id: "plot-line",
        title: "plot() — line chart",
        explanation:
          "En temel grafik: çizgi grafiği. `plt.plot(x, y)` x ekseninde x, y ekseninde y. Format string ile renk/marker/stil verebilirsin.",
        code: `x = [1, 2, 3, 4]
y = [10, 25, 15, 30]
plt.plot(x, y)
plt.plot(x, y, 'r--o')   # kırmızı, dashed, daire marker`,
        tip: "Format string sırası: renk + stil + marker. 'r--o' = kırmızı kesikli daire.",
      },
      {
        id: "format-string",
        title: "Format string tablosu",
        explanation:
          "**Renk:** b(mavi) g(yeşil) r(kırmızı) k(siyah) m(magenta) y(sarı) c(cyan)\n\n**Marker:** o(daire) *(yıldız) s(kare) ^(üçgen) d(elmas) x + .\n\n**Stil:** -(düz) --(dashed) :(dotted) -.(dashdot)\n\nSıra: renk + stil + marker → `'ko:'` = siyah dotted daire",
        code: `plt.plot(x, y, 'b-')      # mavi düz
plt.plot(x, y, 'g--')     # yeşil dashed
plt.plot(x, y, 'ro')      # kırmızı daire (çizgisiz)
plt.plot(x, y, 'k-.s')    # siyah dashdot kare`,
        tip: "k = blacK (b mavi olduğu için). m = magenta. Bu iki harf karıştırılır.",
      },
      {
        id: "labels",
        title: "Title, label, legend, grid, axis",
        explanation:
          "Plot süslemesi her sınavda var. Eksik bırakırsan puan kaçar.",
        code: `plt.title('Aylık Satış')
plt.xlabel('Ay')
plt.ylabel('TL')
plt.legend(['Ürün A', 'Ürün B'])
plt.grid(True)
plt.axis([0, 12, 0, 1000])   # [xmin, xmax, ymin, ymax]`,
        tip: "legend sırası plot sırasıyla eşleşir. axis tek parantez içinde 4 sayı: [xmin, xmax, ymin, ymax].",
      },
      {
        id: "subplot",
        title: "subplot — grid içinde grafik",
        explanation:
          "`plt.subplot(rows, cols, position)` — figüre'ı grid'e böler, hangi hücreye çizeceğini söyler. Position 1'den başlar, **soldan sağa, üstten alta**.",
        code: `plt.figure(1)
plt.clf()

plt.subplot(2, 1, 1)   # 2 satır 1 sütun, 1. plot
plt.plot([1,2,3], [4,5,6])
plt.title('Üst')

plt.subplot(2, 1, 2)   # 2. plot
plt.plot([1,2,3], [6,5,4])
plt.title('Alt')`,
        tip: "subplot(3,1,2) → 3 satır 1 sütun, 2. (ortadaki). Eğer subplot(3,1,1) ve subplot(3,1,3) çağrılırsa orta hücre boş kalır.",
      },
      {
        id: "pie",
        title: "Pie chart — pasta",
        explanation:
          "Pie chart toplama oranını gösterir. `autopct` yüzde formatı, `explode` bir dilimi dışarı çıkarır.",
        code: `values = [30, 20, 25, 15, 10]
names  = ['A', 'B', 'C', 'D', 'E']

plt.pie(values, labels=names,
        autopct='%1.1f%%',
        explode=[0, 0.1, 0, 0, 0])`,
        tip: "autopct='%1.1f%%' → 1 ondalık (örn: 23.4%). explode aynı uzunlukta liste — kaç dilim varsa o kadar değer.",
      },
      {
        id: "bar",
        title: "Bar chart — tek & yan yana",
        explanation:
          "Tek bar: `plt.bar(kategoriler, değerler)`.\n\nİki seri yan yana yapmak için: `width=0.3, align='edge'` ile bir tanesini sağa, `width=-0.3, align='edge'` ile diğerini sola kaydır.",
        code: `categories = ['Q1', 'Q2', 'Q3']
vals1 = [100, 150, 120]
vals2 = [80, 130, 110]

# tek bar
plt.bar(categories, vals1, color='green')

# yan yana
plt.bar(categories, vals1, width=0.3, align='edge', color='green')
plt.bar(categories, vals2, width=-0.3, align='edge', color='purple')`,
        tip: "Yan yana için biri pozitif biri negatif width — align='edge' kritik.",
      },
      {
        id: "hist",
        title: "Histogram",
        explanation:
          "Histogram sayısal verinin **dağılımını** gösterir. `bins` parametresi kaç kutuya bölüneceği. Default 10.",
        code: `data = np.random.randint(1, 100, 50)
plt.hist(data, bins=5, color='purple', edgecolor='black')`,
        tip: "bins büyürse kutular incelir, daha detaylı. Az olursa kabaca dağılım.",
      },
    ],
    exercises: [
      {
        id: "ex-pie-bar",
        prompt:
          "3 ürün ['A','B','C'], satış miktarı [120, 80, 200]. Üst subplot'a pie chart (yüzdelerle), alt subplot'a bar chart koy.",
        solution: `import matplotlib.pyplot as plt

products = ['A', 'B', 'C']
sales = [120, 80, 200]

plt.figure(1)
plt.clf()

plt.subplot(2, 1, 1)
plt.pie(sales, labels=products, autopct='%1.1f%%')
plt.title('Satış Dağılımı')

plt.subplot(2, 1, 2)
plt.bar(products, sales, color='teal')
plt.title('Satışlar')
plt.ylabel('Adet')

plt.show()`,
        hints: [
          "Önce plt.figure(1) ve plt.clf().",
          "subplot(2,1,1) ve subplot(2,1,2) — iki satır.",
          "Pie için autopct='%1.1f%%' — yüzde göstergesi.",
        ],
      },
    ],
    quiz: [
      {
        id: "q1",
        type: "mcq",
        question: "'r--o' format string ne anlamına gelir?",
        choices: [
          { id: "a", label: "Mavi düz çizgi, daire marker" },
          { id: "b", label: "Kırmızı kesikli çizgi, daire marker" },
          { id: "c", label: "Kırmızı düz çizgi, O harfi" },
          { id: "d", label: "Hatalı format" },
        ],
        answerId: "b",
        explanation: "r=red, --=dashed, o=daire marker. Sıra: renk-stil-marker.",
      },
      {
        id: "q2",
        type: "predict",
        question: "subplot(2, 3, 4) ne demek?",
        expectedAnswer: "2 satır 3 sütunluk grid, 4. pozisyon (alt-sol)",
        explanation:
          "(satır, sütun, pozisyon). 2x3 = 6 hücre. Position 1'den 6'ya kadar, soldan sağa, üstten alta. 4 → ikinci satırın ilk hücresi.",
      },
      {
        id: "q3",
        type: "mcq",
        question: "Plot başlamadan hangi 2 komut çağrılır?",
        choices: [
          { id: "a", label: "plt.start() ve plt.clean()" },
          { id: "b", label: "plt.show() ve plt.reset()" },
          { id: "c", label: "plt.figure(1) ve plt.clf()" },
          { id: "d", label: "plt.new() ve plt.delete()" },
        ],
        answerId: "c",
        explanation: "figure(1) figüre'ı aç, clf() önceki çizimi temizle.",
      },
    ],
  },

  {
    id: "combined-workflow",
    week: "Hafta 13-14",
    title: "Tam Akış — Sınav Sorusu Çözümü",
    subtitle: "Oku → Temizle → Filtrele → Türet → Çiz. Bütün bunlar tek soruda.",
    color: "violet",
    icon: "workflow",
    sections: [
      {
        id: "anatomy",
        title: "Sınav sorusunun anatomisi",
        explanation:
          "CS125 finalinde tipik bir Pandas sorusu 5 adımdan oluşur:\n\n1. **Oku** — `read_excel` / `read_csv`\n2. **Temizle** — `dropna`, `replace`, `fillna`\n3. **Filtrele** — boolean mask, `loc`\n4. **Türet** — yeni sütun, sıralama, `set_index`\n5. **Çiz** — `figure → clf → subplot → plot/bar/pie → label`\n\nHer adımı ayrı bir 'mini-iş' olarak düşünürsen panik yapma.",
        tip: "Soruyu okurken bu 5 adımı satırlara böl. Her satırı tek tek yaz.",
      },
      {
        id: "step-1-read",
        title: "Adım 1 — Oku ve göz at",
        explanation:
          "İlk satır her zaman: dosyayı oku ve ne içerdiğine bak. Sütun adları, NaN var mı, hangi tipler var?",
        code: `df = pd.read_excel('data.xlsx')
df.head()
df.shape
df.columns`,
        tip: ".shape sana (satır, sütun) tuple'ı verir. Beklenenle uyuşuyor mu kontrol et.",
      },
      {
        id: "step-2-clean",
        title: "Adım 2 — Temizle",
        explanation:
          "NaN'leri sil ya da doldur. '*' veya '?' gibi placeholder'ları değiştir. Sütun tipini lazımsa dönüştür.",
        code: `df.dropna(inplace=True)
df.replace('*', 'Not Specified', inplace=True)
df.fillna(0, inplace=True)`,
        tip: "inplace=True olmadan değişiklik kalmaz. Sınav kasıtla bunu unutturmaya çalışır.",
      },
      {
        id: "step-3-filter",
        title: "Adım 3 — Filtrele",
        explanation:
          "Boolean mask ya da `loc` ile koşula uyan satırları al. İki koşulda `&` veya `|`. PARANTEZ!",
        code: `# Tek koşul
high = df[df.salary > 100000]

# Çoklu koşul
mid = df[(df.salary > 60000) & (df.salary < 100000)]

# loc ile satır + sütun
df.loc[df.salary > 100000, ['name', 'salary']]`,
        tip: "Sonucu yeni bir değişkene at — orijinal df'i kaybetme.",
      },
      {
        id: "step-4-derive",
        title: "Adım 4 — Türet",
        explanation:
          "Yeni sütun hesapla, sırala, gerekirse index'i değiştir.",
        code: `df['profit'] = df.unit_price * df.quantity
df.sort_values('profit', inplace=True)
df.set_index('id', inplace=True)`,
        tip: "Bir kez sıraladıktan sonra .iloc[0] artık 'en küçük' demek.",
      },
      {
        id: "step-5-plot",
        title: "Adım 5 — Çiz",
        explanation:
          "Şablon hep aynı: figure → clf → (subplot) → plot/bar/pie/hist → title/label/legend → show.",
        code: `plt.figure(1)
plt.clf()

plt.subplot(2, 1, 1)
plt.plot(df.month, df.sales, 'g-o')
plt.title('Aylık Satış')
plt.xlabel('Ay')
plt.ylabel('TL')

plt.subplot(2, 1, 2)
plt.bar(df.product, df.profit, color='orange')
plt.title('Ürün Bazlı Kar')

plt.show()`,
        tip: "Her subplot'a kendi title/label'ı koy. legend gerekiyorsa plot'tan hemen sonra.",
      },
      {
        id: "doctor-example",
        title: "Tam örnek — Doctor data",
        explanation:
          "Final review Q2'deki doctor_data.xlsx örneğini adım adım:\n\n**Soru:** Hastane verisinde NaN'leri sil, '*'ları 'Not Specified' yap, 1500'den fazla hastası olan Cardiology doktorlarını listele, hospital_index'i yeni index yap, en çok hasta gören doktorun adını yazdır.",
        code: `import pandas as pd
import matplotlib.pyplot as plt

# 1) OKU
df = pd.read_excel('doctor_data.xlsx')

# 2) TEMİZLE
df.dropna(inplace=True)
df.replace('*', 'Not Specified', inplace=True)

# 3) FİLTRELE
cardio = df.loc[
    (df.num_patients > 1500) & (df.specialty == 'Cardiology'),
    ['name', 'num_patients']
]
print(cardio)

# 4) TÜRET
df.set_index('hospital_index', inplace=True)
top = df.loc[df.num_patients == df.num_patients.max(), 'name']
print("En çok hasta gören:", top)

# 5) ÇİZ
plt.figure(1); plt.clf()
plt.bar(df.specialty.unique(),
        df.groupby('specialty').num_patients.sum())
plt.xlabel('Branş'); plt.ylabel('Toplam Hasta')
plt.show()`,
        tip: "Her satırın yanında ne yaptığını yorumla kafanda. Bu satır gerçekten ne yapıyor?",
      },
      {
        id: "superstore-example",
        title: "Tam örnek — Superstore (sample final)",
        explanation:
          "Sample final Q2: superstore.xlsx, çok adımlı klasik sınav sorusu.\n\nAdım adım:",
        code: `import pandas as pd
import matplotlib.pyplot as plt

# (a) Oku
df_store = pd.read_excel('superstore.xlsx')

# (b) NaN sil
df_store.dropna(inplace=True)

# (c) '*' → 'Not Specified'
df_store.replace('*', 'Not Specified', inplace=True)

# (d) 20. order'ın müşteri adı ve sales'i
row20 = df_store.iloc[19]
print(row20['customer_name'], row20['sales'])

# (e) priority='Low' ve quantity>40
sel = df_store[
    (df_store.priority == 'Low') & (df_store.quantity > 40)
]
print(sel)

# (f) profit sütunu
df_store['profit'] = df_store.unit_price * df_store.quantity

# (g) quantity'e göre sırala
df_store.sort_values('quantity', inplace=True)

# (h) Technology ve Office Supplies ayır
df_tech   = df_store[df_store.category == 'Technology']
df_office = df_store[df_store.category == 'Office Supplies']

# (i) Tech'te minimum quantity'li müşteriler
min_q = df_tech.quantity.min()
print(df_tech.loc[df_tech.quantity == min_q, 'customer_name'])

# (j) Plot
plt.figure(1); plt.clf()

plt.subplot(3, 1, 1)
plt.plot(df_tech.quantity, df_tech.sales, 'g-')
plt.title('Tech: quantity vs sales')

plt.subplot(3, 1, 3)
plt.pie([len(df_tech), len(df_office)],
        labels=['Tech', 'Office'], autopct='%1.1f%%')
plt.title('Sipariş dağılımı')

plt.show()`,
        tip: "20. order = iloc[19] (0-indexed!). subplot(3,1,1) ve subplot(3,1,3) — ortadaki hücre soruda boş bırakılmış.",
      },
    ],
    exercises: [
      {
        id: "ex-flow",
        prompt:
          "students.xlsx oku, NaN'leri sil, GPA > 3.0 olanları seç, isimleri yazdır.",
        solution: `df = pd.read_excel('students.xlsx')
df.dropna(inplace=True)
result = df.loc[df.GPA > 3.0, 'name']
print(result)`,
        hints: [
          "Üç adım: oku, temizle, filtrele.",
          "dropna(inplace=True) — orijinali değiştir.",
          "loc ile satır+sütun: df.loc[koşul, 'name'].",
        ],
      },
    ],
    quiz: [
      {
        id: "q1",
        type: "mcq",
        question: "Sınav sorusunun 5 adımı sırasıyla?",
        choices: [
          { id: "a", label: "Çiz → Oku → Temizle → Filtrele → Türet" },
          { id: "b", label: "Oku → Temizle → Filtrele → Türet → Çiz" },
          { id: "c", label: "Oku → Çiz → Filtrele → Türet → Temizle" },
          { id: "d", label: "Filtrele → Oku → Temizle → Türet → Çiz" },
        ],
        answerId: "b",
        explanation: "Doğal akış: önce veriyi al, temizle, ihtiyaç olanı çek, türet, son olarak görselleştir.",
      },
      {
        id: "q2",
        type: "predict",
        question: "df.iloc[19] hangi siparişi verir (Superstore Q2'de)?",
        expectedAnswer: "20. order (0-indexed)",
        explanation: "iloc 0-indexed. Index 19 → 20. satır.",
      },
    ],
  },
];

export function getTopic(id: string): Topic | undefined {
  return topics.find((t) => t.id === id);
}

export const TOPIC_COLOR_CLASSES: Record<TopicColor, { text: string; bg: string; border: string; ring: string }> = {
  emerald: {
    text: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    ring: "ring-emerald-500/40",
  },
  sky: {
    text: "text-sky-400",
    bg: "bg-sky-500/10",
    border: "border-sky-500/30",
    ring: "ring-sky-500/40",
  },
  amber: {
    text: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    ring: "ring-amber-500/40",
  },
  violet: {
    text: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/30",
    ring: "ring-violet-500/40",
  },
};
