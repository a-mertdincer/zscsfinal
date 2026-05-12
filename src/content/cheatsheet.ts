export interface CheatItem {
  code: string;
  note?: string;
}

export interface CheatSection {
  id: string;
  emoji: string;
  title: string;
  color: "emerald" | "sky" | "amber" | "violet" | "rose";
  items: CheatItem[];
}

export const trapWarnings: string[] = [
  "arange(1, 5) → [1,2,3,4] — SON DAHİL DEĞİL",
  "iloc → son dahil değil. loc → son DAHİL.",
  "Boolean filter'da parantez şart: (a > 10) & (b < 5)",
  "plt.figure() + plt.clf() — plotlar üst üste binmesin",
  "inplace=True'yu unutma (dropna, replace, set_index)",
  "to_excel'de index=None",
  "np.argmax → INDEX döner, değer değil",
  "arr.sort() → None döner, in-place sıralar",
  "Sütun adında boşluk varsa df['col name'] kullan",
  "20. order → iloc[19] (0-indexed)",
];

export const cheatsheet: CheatSection[] = [
  {
    id: "imports",
    emoji: "📦",
    title: "IMPORTS",
    color: "violet",
    items: [
      { code: "import numpy as np" },
      { code: "import pandas as pd" },
      { code: "import matplotlib.pyplot as plt" },
    ],
  },
  {
    id: "numpy-create",
    emoji: "🔢",
    title: "NUMPY ARRAY OLUŞTURMA",
    color: "emerald",
    items: [
      { code: "np.array([1,2,3])", note: "listeden" },
      { code: "np.arange(1, 10, 2)", note: "[1,3,5,7,9] — son dahil değil" },
      { code: "np.zeros(5) / np.ones(5)", note: "placeholder" },
      { code: "np.random.randint(1, 101, 4)", note: "1-100 arası 4 random int" },
      { code: "np.random.rand(5)", note: "0-1 arası 5 random float" },
    ],
  },
  {
    id: "numpy-attrs",
    emoji: "📐",
    title: "ARRAY ATTRIBUTES (parantezsiz!)",
    color: "emerald",
    items: [
      { code: ".dtype  .ndim  .shape  .size" },
    ],
  },
  {
    id: "numpy-access",
    emoji: "🎯",
    title: "ACCESSING",
    color: "emerald",
    items: [
      { code: "arr[2]", note: "tek eleman" },
      { code: "arr[1:4:2]", note: "slice — son dahil değil" },
      { code: "table[1, 2]", note: "2D, satır 1 sütun 2" },
      { code: "table[:, 0]", note: "ilk sütun" },
      { code: "table[0, :]", note: "ilk satır" },
    ],
  },
  {
    id: "numpy-ops",
    emoji: "⚙️",
    title: "ELEMENT OPERATIONS",
    color: "emerald",
    items: [
      { code: "arr * 2", note: "her elemanı 2 ile çarp" },
      { code: "arr1 + arr2", note: "element-wise toplam" },
      { code: "np.abs(arr)", note: "mutlak değer" },
    ],
  },
  {
    id: "numpy-funcs",
    emoji: "📊",
    title: "BUILT-IN FUNCS",
    color: "emerald",
    items: [
      { code: "np.sum / mean / max / min / argmax / argmin" },
      { code: "np.sum(t, axis=0)", note: "sütun toplamı" },
      { code: "np.sum(t, axis=1)", note: "satır toplamı" },
      { code: "arr.sort()", note: "in-place, None döner" },
      { code: "np.unique(arr)", note: "benzersiz, sorted" },
    ],
  },
  {
    id: "boolean",
    emoji: "🎭",
    title: "BOOLEAN",
    color: "emerald",
    items: [
      { code: "arr[arr > 10]", note: "filtrele" },
      { code: "sum(arr > 10)", note: "kaç tane true" },
      { code: "np.where(arr > 10)[0]", note: "index'ler" },
    ],
  },
  {
    id: "pandas-create",
    emoji: "🐼",
    title: "PANDAS — OLUŞTURMA",
    color: "sky",
    items: [
      { code: "pd.Series([10,20,30])" },
      { code: "pd.DataFrame({'col1':[1,2], 'col2':[3,4]})" },
      { code: "pd.read_excel('f.xlsx')" },
      { code: "pd.read_csv('f.csv')" },
    ],
  },
  {
    id: "pandas-clean",
    emoji: "🐼",
    title: "PANDAS — TEMİZLEME",
    color: "sky",
    items: [
      { code: "df.fillna(-1)" },
      { code: "df.dropna(inplace=True)" },
      { code: "df.replace('*', 'X', inplace=True)" },
      { code: "df.set_index('id', inplace=True)" },
      { code: "df.sort_values('age', inplace=True)" },
    ],
  },
  {
    id: "pandas-select",
    emoji: "🐼",
    title: "PANDAS — SEÇİM",
    color: "sky",
    items: [
      { code: "df.head(3) / df.tail(3)" },
      { code: "df['col']  /  df.col" },
      { code: "df[['col1','col2']]" },
      { code: "df.iloc[0:3, 1:3]", note: "son dahil değil" },
      { code: "df.loc[0:3, 'col']", note: "son DAHİL" },
      { code: "df[df.salary > 100000]" },
      { code: "df[(df.a > 10) & (df.b < 50)]" },
      { code: "df[(df.team=='X') | (df.role=='Y')]" },
    ],
  },
  {
    id: "pandas-derive",
    emoji: "🐼",
    title: "PANDAS — TÜRETME",
    color: "sky",
    items: [
      { code: "df['new'] = df.a * df.b" },
      { code: "df.loc[:, 'new'] = ..." },
      { code: "df.drop('col', axis=1)" },
      { code: "df.drop(0, axis=0)" },
      { code: "df.to_excel('out.xlsx', index=None)" },
    ],
  },
  {
    id: "plot-setup",
    emoji: "📈",
    title: "MATPLOTLIB — KURULUM",
    color: "amber",
    items: [
      { code: "plt.figure(1)" },
      { code: "plt.clf()" },
    ],
  },
  {
    id: "plot-plots",
    emoji: "📈",
    title: "MATPLOTLIB — PLOTLAR",
    color: "amber",
    items: [
      { code: "plt.plot(x, y, 'r--o')", note: "line" },
      { code: "plt.pie(vals, labels=names, autopct='%1.1f%%', explode=[0,0.1,0])" },
      { code: "plt.bar(x, y, color='green')" },
      { code: "plt.bar(x, y, width=0.3, align='edge')", note: "yan yana için" },
      { code: "plt.hist(data, bins=3, color='purple', edgecolor='black')" },
    ],
  },
  {
    id: "plot-decor",
    emoji: "📈",
    title: "MATPLOTLIB — SÜSLEME",
    color: "amber",
    items: [
      { code: "plt.title('...')" },
      { code: "plt.xlabel / plt.ylabel" },
      { code: "plt.legend(['s1','s2'])" },
      { code: "plt.grid(True)" },
      { code: "plt.axis([xmin, xmax, ymin, ymax])" },
      { code: "plt.subplot(2, 1, 1)", note: "2 satır 1 sütun, ilk" },
    ],
  },
];
