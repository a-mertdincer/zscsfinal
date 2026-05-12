export interface ExamStep {
  label: string;
  prompt: string;
  hint: string;
  solution: string;
}

export interface ExamQuestion {
  id: string;
  category: "sample-final" | "review";
  title: string;
  subtitle: string;
  context: string;
  intro: string;
  setupCode?: string;
  steps: ExamStep[];
  fullSolution: string;
  whyExplanation: string;
}

export const examQuestions: ExamQuestion[] = [
  {
    id: "sf-q1-flower",
    category: "sample-final",
    title: "Sample Final — Q1: Flower Shop",
    subtitle: "NumPy klasiği: array oluştur, hesapla, filtrele, argmax/argmin.",
    context:
      "Bir çiçekçi 6 çeşit çiçek satıyor. Her çeşidin birim fiyatı ve satılan demet sayısı var. Bunlardan birkaç bilgi çıkar.",
    intro:
      "Bu soru tipik bir 'NumPy temel' sorusu. Listeden array yap, element-wise işlem, boolean filter, argmax/argmin. 6 alt-sorudan oluşuyor. Hepsini sırayla çöz.",
    setupCode: `flower_list = ["orchid","tulip","rose","carnation","lily","anemone"]
price_list = [5.25, 2.28, 3.33, 1.75, 2.45, 4.38]
quantity_list = [1, 8, 1, 5, 3, 10]`,
    steps: [
      {
        label: "(a) 3 numpy array oluştur",
        prompt: "Üç listeden üç numpy array yap: flowers, unit_price, quantity.",
        hint: "np.array(list) ile dönüştür. Her biri için ayrı satır.",
        solution: `flowers = np.array(flower_list)
unit_price = np.array(price_list)
quantity = np.array(quantity_list)`,
      },
      {
        label: "(b) sale_price hesapla",
        prompt: "Her çiçeğin satış fiyatı = unit_price * quantity. Bunu hesapla.",
        hint: "Element-wise çarpım. Döngüye gerek yok.",
        solution: `sale_price = unit_price * quantity
print(sale_price)
# [ 5.25 18.24  3.33  8.75  7.35 43.8 ]`,
      },
      {
        label: "(c) Demet olarak satılanlar (quantity > 1)",
        prompt: "Bir taneden fazla satılan çiçek isimlerini yazdır.",
        hint: "Boolean mask: flowers[quantity > 1].",
        solution: `print(flowers[quantity > 1])
# ['tulip' 'carnation' 'lily' 'anemone']`,
      },
      {
        label: "(d) En pahalı çiçek",
        prompt: "sale_price'a göre en pahalı çiçeğin adını bul.",
        hint: "argmax sale_price'ın index'ini verir, sonra flowers[index].",
        solution: `idx = np.argmax(sale_price)
print(flowers[idx])
# anemone`,
      },
      {
        label: "(e) En ucuz birim fiyatlının 4 demet fiyatı",
        prompt: "En düşük unit_price'a sahip çiçeğin 4 demetinin fiyatı kaç?",
        hint: "argmin ile en ucuzun index'ini bul, unit_price[index] * 4.",
        solution: `min_idx = np.argmin(unit_price)
print(unit_price[min_idx] * 4)
# 7.0`,
      },
      {
        label: "(f) 8 dolardan fazla satan kaç çiçek?",
        prompt: "sale_price > 8 olan kaç çiçek var?",
        hint: "sum(sale_price > 8). True=1, False=0.",
        solution: `print(sum(sale_price > 8))
# 3`,
      },
    ],
    fullSolution: `import numpy as np

flower_list = ["orchid","tulip","rose","carnation","lily","anemone"]
price_list = [5.25, 2.28, 3.33, 1.75, 2.45, 4.38]
quantity_list = [1, 8, 1, 5, 3, 10]

# (a)
flowers = np.array(flower_list)
unit_price = np.array(price_list)
quantity = np.array(quantity_list)

# (b)
sale_price = unit_price * quantity

# (c)
print(flowers[quantity > 1])

# (d)
print(flowers[np.argmax(sale_price)])

# (e)
print(unit_price[np.argmin(unit_price)] * 4)

# (f)
print(sum(sale_price > 8))`,
    whyExplanation:
      "Her adımda NumPy'ın 'tek satırda iş bitir' gücünü kullandık. argmax/argmin INDEX döner — değer için flowers[index]. Boolean indexing ile döngüsüz filtreleme. sum(boolean) → kaç tane True olduğunu sayar.",
  },

  {
    id: "sf-q2-superstore",
    category: "sample-final",
    title: "Sample Final — Q2: Superstore",
    subtitle: "Pandas + Plot. 11 alt-adım. Sınavın en uzun sorusu tipinde.",
    context:
      "Bir mağaza zincirinin sipariş verisi var. NaN'ler, '*'lar, kategori farklılıkları... Hepsini temizle, analiz et, çiz.",
    intro:
      "Bu klasik 'tam akış' sorusu: oku → temizle → filtrele → türet → çiz. 11 alt-sorudan oluşuyor. Her adımı tek başına basit, hepsini birbirine bağlamak önemli.",
    steps: [
      {
        label: "(a) superstore.xlsx oku → df_store",
        prompt: "Excel'i oku, df_store değişkenine ata.",
        hint: "pd.read_excel ile.",
        solution: `df_store = pd.read_excel('superstore.xlsx')`,
      },
      {
        label: "(b) NaN olan satırları sil",
        prompt: "Orijinal df_store'da NaN içeren satırlar silinsin.",
        hint: "dropna(inplace=True) — inplace UNUTMA.",
        solution: `df_store.dropna(inplace=True)`,
      },
      {
        label: "(c) '*' → 'Not Specified'",
        prompt: "Tüm '*' değerlerini 'Not Specified' ile değiştir.",
        hint: "df.replace('*', 'Not Specified', inplace=True)",
        solution: `df_store.replace('*', 'Not Specified', inplace=True)`,
      },
      {
        label: "(d) 20. order'ın müşteri adı ve sales",
        prompt: "20. siparişin müşteri adını ve sales'ini göster.",
        hint: "20. order → iloc[19] (0-indexed!).",
        solution: `row = df_store.iloc[19]
print(row['customer_name'], row['sales'])`,
      },
      {
        label: "(e) priority='Low' ve quantity>40",
        prompt: "Priority düşük ve quantity 40'tan fazla olan siparişler.",
        hint: "İki koşul, & ile, PARANTEZ ZORUNLU.",
        solution: `result = df_store[(df_store.priority == 'Low') & (df_store.quantity > 40)]
print(result)`,
      },
      {
        label: "(f) profit sütunu ekle",
        prompt: "profit = unit_price * quantity. Yeni sütun olarak ekle.",
        hint: "df['profit'] = df.unit_price * df.quantity",
        solution: `df_store['profit'] = df_store.unit_price * df_store.quantity`,
      },
      {
        label: "(g) quantity'e göre sırala",
        prompt: "Orijinal df_store, quantity'e göre sıralı olsun.",
        hint: "sort_values('quantity', inplace=True).",
        solution: `df_store.sort_values('quantity', inplace=True)`,
      },
      {
        label: "(h) Technology → df_tech",
        prompt: "category == 'Technology' olan siparişleri df_tech'e ata.",
        hint: "Boolean mask ile filtrele.",
        solution: `df_tech = df_store[df_store.category == 'Technology']`,
      },
      {
        label: "(i) Office Supplies → df_office",
        prompt: "category == 'Office Supplies' olanlar df_office'e ata.",
        hint: "Aynı pattern.",
        solution: `df_office = df_store[df_store.category == 'Office Supplies']`,
      },
      {
        label: "(j) Tech'te min quantity'li müşteriler",
        prompt: "Technology kategorisinde en az quantity'i olan müşterilerin adı.",
        hint: "Önce min'i bul, sonra eşitlik koşuluyla filtrele.",
        solution: `min_q = df_tech.quantity.min()
print(df_tech.loc[df_tech.quantity == min_q, 'customer_name'])`,
      },
      {
        label: "(k) Grafikleri çiz",
        prompt:
          "subplot(3,1,1) → Tech için quantity vs sales line. subplot(3,1,3) → Tech vs Office pie chart.",
        hint:
          "subplot(3,1,1) ve subplot(3,1,3) — ortadaki hücre boş. figure(1) + clf() unutma.",
        solution: `plt.figure(1)
plt.clf()

plt.subplot(3, 1, 1)
plt.plot(df_tech.quantity, df_tech.sales, 'g-')
plt.title('Technology: quantity vs sales')
plt.xlabel('Quantity')
plt.ylabel('Sales')

plt.subplot(3, 1, 3)
plt.pie([len(df_tech), len(df_office)],
        labels=['Technology', 'Office Supplies'],
        autopct='%1.1f%%')
plt.title('Sipariş dağılımı')

plt.show()`,
      },
    ],
    fullSolution: `import pandas as pd
import matplotlib.pyplot as plt

# (a)
df_store = pd.read_excel('superstore.xlsx')

# (b)
df_store.dropna(inplace=True)

# (c)
df_store.replace('*', 'Not Specified', inplace=True)

# (d)
row = df_store.iloc[19]
print(row['customer_name'], row['sales'])

# (e)
print(df_store[(df_store.priority == 'Low') & (df_store.quantity > 40)])

# (f)
df_store['profit'] = df_store.unit_price * df_store.quantity

# (g)
df_store.sort_values('quantity', inplace=True)

# (h, i)
df_tech   = df_store[df_store.category == 'Technology']
df_office = df_store[df_store.category == 'Office Supplies']

# (j)
min_q = df_tech.quantity.min()
print(df_tech.loc[df_tech.quantity == min_q, 'customer_name'])

# (k)
plt.figure(1)
plt.clf()

plt.subplot(3, 1, 1)
plt.plot(df_tech.quantity, df_tech.sales, 'g-')
plt.title('Technology: quantity vs sales')
plt.xlabel('Quantity'); plt.ylabel('Sales')

plt.subplot(3, 1, 3)
plt.pie([len(df_tech), len(df_office)],
        labels=['Technology', 'Office Supplies'],
        autopct='%1.1f%%')
plt.title('Sipariş dağılımı')

plt.show()`,
    whyExplanation:
      "Bu, gerçek sınav yapısının ders kitabı örneği: oku, temizle, filtrele, türet, çiz. inplace=True her temizleme adımında. iloc[19] çünkü 20. order 0-indexed. Boolean filter'da parantez. subplot(3,1,1) ve subplot(3,1,3) — orta boş kalır, soruda öyle istemiş.",
  },

  {
    id: "rev-q1-numpy",
    category: "review",
    title: "Review Q1: NumPy — Komisyon",
    subtitle: "arange, element-wise, boolean mask, np.where.",
    context:
      "Bir satış ekibinin komisyon oranları ve satışları var. Bazı hesaplar yapacaksın.",
    intro:
      "Klasik NumPy alıştırması: arange ile küçük adım, eleman-eleman çarpım, koşullu filtreleme.",
    setupCode: `# Komisyon oranları: 0.1, 0.2, 0.3, 0.4, 0.5
# Satışlar: [1500, 650, 6500, 5000, 1000]`,
    steps: [
      {
        label: "(a) Komisyon oranları array'i",
        prompt: "0.1, 0.2, 0.3, 0.4, 0.5 değerlerini arange ile yap.",
        hint: "np.arange(0.1, 0.6, 0.1). Son DAHİL DEĞİL, 0.5'i kapsamak için 0.6 yaz.",
        solution: `rates = np.arange(0.1, 0.6, 0.1)
print(rates)   # [0.1 0.2 0.3 0.4 0.5]`,
      },
      {
        label: "(b) Komisyon tutarları",
        prompt: "Her satış için komisyon = sales * rate.",
        hint: "Element-wise çarpım.",
        solution: `sales = np.array([1500, 650, 6500, 5000, 1000])
commission = sales * rates
print(commission)
# [ 150. 130. 1950. 2000. 500.]`,
      },
      {
        label: "(c) 5000'den büyük satışlar",
        prompt: "5000'den büyük olan satışları yazdır.",
        hint: "Boolean mask: sales[sales > 5000].",
        solution: `print(sales[sales > 5000])   # [6500]`,
      },
      {
        label: "(d) 1000'den küçük/eşit komisyonların index'leri",
        prompt: "Komisyonu 1000'den küçük veya eşit olan index'leri bul.",
        hint: "np.where(commission <= 1000)[0].",
        solution: `idx = np.where(commission <= 1000)[0]
print(idx)   # [0 1 4]`,
      },
    ],
    fullSolution: `import numpy as np

rates = np.arange(0.1, 0.6, 0.1)
sales = np.array([1500, 650, 6500, 5000, 1000])

commission = sales * rates
print("Komisyon:", commission)

print("5000+ satış:", sales[sales > 5000])
print("Düşük komisyon index:", np.where(commission <= 1000)[0])`,
    whyExplanation:
      "arange(0.1, 0.6, 0.1) — son DAHİL DEĞİL, 0.5 dahil olsun diye 0.6 yazıyoruz. Float'lı arange'da ufak yuvarlama hataları olabilir, sınavda problem yok. np.where index için, boolean filter değer için.",
  },

  {
    id: "rev-q2-doctor",
    category: "review",
    title: "Review Q2: Pandas — Doctor Data",
    subtitle: "Oku, temizle, filtrele, set_index, max, grafik.",
    context:
      "Bir hastane verisi: doktorlar, branşları, hasta sayıları. Her şeyi temizle ve analiz et.",
    intro:
      "Full Pandas akışı. 8 adım: read → clean → filter → derive → analyze → plot.",
    steps: [
      {
        label: "(a) doctor_data.xlsx oku",
        prompt: "Excel'i oku ve göz at.",
        hint: "pd.read_excel + head().",
        solution: `df = pd.read_excel('doctor_data.xlsx')
print(df.head())`,
      },
      {
        label: "(b) NaN sil + '*' değiştir",
        prompt: "NaN olan satırları sil, '*' yerine 'Not Specified' yaz.",
        hint: "dropna(inplace=True), replace('*','Not Specified', inplace=True).",
        solution: `df.dropna(inplace=True)
df.replace('*', 'Not Specified', inplace=True)`,
      },
      {
        label: "(c) num_patients > 1500 & specialty=='Cardiology'",
        prompt: "İki koşula uyan doktorların adı ve hasta sayısı.",
        hint: "loc[(c1)&(c2), ['name','num_patients']]. PARANTEZ!",
        solution: `result = df.loc[
    (df.num_patients > 1500) & (df.specialty == 'Cardiology'),
    ['name', 'num_patients']
]
print(result)`,
      },
      {
        label: "(d) hospital_index'i index yap",
        prompt: "hospital_index sütunu df'in index'i olsun.",
        hint: "set_index('hospital_index', inplace=True).",
        solution: `df.set_index('hospital_index', inplace=True)`,
      },
      {
        label: "(e) En çok hasta gören doktor",
        prompt: "Maksimum num_patients'a sahip doktorun adı.",
        hint: "df.loc[df.num_patients == df.num_patients.max(), 'name'].",
        solution: `print(df.loc[df.num_patients == df.num_patients.max(), 'name'])`,
      },
      {
        label: "(f) Yeni sütun: avg_per_year",
        prompt: "num_patients / years_active sütununu ekle.",
        hint: "Element-wise bölme.",
        solution: `df['avg_per_year'] = df.num_patients / df.years_active`,
      },
      {
        label: "(g) Bar chart: branşa göre toplam hasta",
        prompt: "Specialty'lere göre toplam hasta sayısını bar olarak çiz.",
        hint: "groupby + sum, ya da unique kategorileri için ayrı topla.",
        solution: `totals = df.groupby('specialty').num_patients.sum()
plt.figure(1); plt.clf()
plt.bar(totals.index, totals.values, color='steelblue')
plt.xlabel('Branş'); plt.ylabel('Toplam hasta')
plt.title('Branşa göre hasta yükü')
plt.show()`,
      },
      {
        label: "(h) Yaz: temizlenmiş veriyi cleaned.xlsx'e",
        prompt: "Son halini bir Excel dosyasına kaydet (index yazma).",
        hint: "to_excel('cleaned.xlsx', index=None).",
        solution: `df.to_excel('cleaned.xlsx', index=None)`,
      },
    ],
    fullSolution: `import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_excel('doctor_data.xlsx')
df.dropna(inplace=True)
df.replace('*', 'Not Specified', inplace=True)

# Filtre
print(df.loc[
    (df.num_patients > 1500) & (df.specialty == 'Cardiology'),
    ['name', 'num_patients']
])

df.set_index('hospital_index', inplace=True)

print("En çok hasta:", df.loc[df.num_patients == df.num_patients.max(), 'name'])

df['avg_per_year'] = df.num_patients / df.years_active

totals = df.groupby('specialty').num_patients.sum()

plt.figure(1); plt.clf()
plt.bar(totals.index, totals.values, color='steelblue')
plt.xlabel('Branş'); plt.ylabel('Toplam hasta')
plt.title('Branşa göre hasta yükü')
plt.show()

df.to_excel('cleaned.xlsx', index=None)`,
    whyExplanation:
      "groupby alışkın olmayabilirsin — basit: specialty bazında num_patients'ları topla. Eğer groupby yoksa, unique + for döngüsü de olur. set_index'ten sonra eski sütun gider, dikkat. to_excel'de index=None unutursan ekstra sütun gelir.",
  },

  {
    id: "rev-q3-top50",
    category: "review",
    title: "Review Q3: Plotting — Top 50 Music",
    subtitle: "Filtre + subplot + pie + histogram + line.",
    context:
      "Top 50 müzik listesi. EDM şarkıları filtrelenecek, dağılımları görselleştirilecek, iki sanatçı karşılaştırılacak.",
    intro:
      "Plotting odaklı bir soru. Üç farklı grafik tipi: pie, histogram, line.",
    steps: [
      {
        label: "(a) Veriyi oku",
        prompt: "top50.xlsx oku.",
        hint: "pd.read_excel.",
        solution: `df = pd.read_excel('top50.xlsx')`,
      },
      {
        label: "(b) EDM olanları filtrele",
        prompt: "genre == 'EDM' olanları df_edm'e ata.",
        hint: "Boolean filter.",
        solution: `df_edm = df[df.genre == 'EDM']`,
      },
      {
        label: "(c) Subplot 1: EDM genre dağılımı pie",
        prompt: "subplot(2,1,1): EDM şarkılarının sanatçıya göre dağılımı (pie).",
        hint: "value_counts ya da groupby. autopct ile yüzde.",
        solution: `counts = df_edm.artist.value_counts()
plt.subplot(2, 1, 1)
plt.pie(counts.values, labels=counts.index, autopct='%1.1f%%')
plt.title('EDM Sanatçı Dağılımı')`,
      },
      {
        label: "(d) Subplot 2: BPM histogram",
        prompt: "subplot(2,1,2): tüm şarkıların BPM histogram'ı.",
        hint: "plt.hist(df.bpm, bins=...).",
        solution: `plt.subplot(2, 1, 2)
plt.hist(df.bpm, bins=10, color='purple', edgecolor='black')
plt.xlabel('BPM'); plt.ylabel('Şarkı Sayısı')
plt.title('BPM Dağılımı')`,
      },
      {
        label: "(e) Ed Sheeran ve Billie Eilish için line plot",
        prompt: "Yeni bir figüre: iki sanatçının popularity'sini line olarak.",
        hint: "Filtreyi iki kez yap, iki plot, legend.",
        solution: `ed = df[df.artist == 'Ed Sheeran']
billie = df[df.artist == 'Billie Eilish']

plt.figure(2); plt.clf()
plt.plot(ed.track, ed.popularity, 'b-o', label='Ed Sheeran')
plt.plot(billie.track, billie.popularity, 'r-s', label='Billie Eilish')
plt.legend()
plt.title('Popularity Karşılaştırma')
plt.xlabel('Şarkı'); plt.ylabel('Popularity')`,
      },
    ],
    fullSolution: `import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_excel('top50.xlsx')
df_edm = df[df.genre == 'EDM']

plt.figure(1); plt.clf()

plt.subplot(2, 1, 1)
counts = df_edm.artist.value_counts()
plt.pie(counts.values, labels=counts.index, autopct='%1.1f%%')
plt.title('EDM Sanatçı Dağılımı')

plt.subplot(2, 1, 2)
plt.hist(df.bpm, bins=10, color='purple', edgecolor='black')
plt.xlabel('BPM'); plt.ylabel('Şarkı sayısı')
plt.title('BPM Dağılımı')

plt.show()

# İkinci figüre
ed = df[df.artist == 'Ed Sheeran']
billie = df[df.artist == 'Billie Eilish']

plt.figure(2); plt.clf()
plt.plot(ed.track, ed.popularity, 'b-o', label='Ed Sheeran')
plt.plot(billie.track, billie.popularity, 'r-s', label='Billie Eilish')
plt.legend()
plt.title('Popularity karşılaştırma')
plt.xlabel('Şarkı'); plt.ylabel('Popularity')
plt.show()`,
    whyExplanation:
      "value_counts() çok kullanışlı — bir sütundaki her unique değerin kaç kez geçtiğini Series olarak verir. Otomatik sıralı geliyor. pie ve histogram için ideal. İki ayrı figure() kullanarak iki ayrı pencere açıyoruz.",
  },
];

export function getExamQuestion(id: string): ExamQuestion | undefined {
  return examQuestions.find((q) => q.id === id);
}
