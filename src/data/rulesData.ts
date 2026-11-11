import { PhoneticRule } from '../types/pinyin';

export const PHONETIC_RULES: PhoneticRule[] = [
  // 1. Aturan Titik Dua pada ü
  {
    id: 'rule-umlaut-drop',
    category: 'yunmu',
    title: '1. Aturan Penghilangan Titik Dua pada "ü" (Umlaut Rule)',
    summary: 'Titik dua pada vokal "ü" wajib dihilangkan saat bertemu konsonan j, q, x, dan y, tetapi tetap dipertahankan pada n dan l.',
    explanation: [
      'Konsonan j, q, x tidak pernah bisa bersanding dengan vokal "u" murni (belakang). Oleh karena itu, ketika Anda melihat tulisan "ju", "qu", "xu", dan "yu", huruf "u" tersebut sebenarnya adalah "ü" yang telah dilepas kedua titiknya.',
      'Sebaliknya, konsonan "n" dan "l" dapat berpasangan dengan "u" maupun "ü". Oleh karena itu, titik dua WAJIB tetap ditulis pada "nü" (wanita) dan "lü" (keledai/hijau) agar tidak tertukar dengan "nu" (marah) dan "lu" (jalan).',
    ],
    examples: [
      { before: 'j + ü', after: 'ju (tetap dibaca [tɕy])', note: 'Titik dua hilang' },
      { before: 'q + ü', after: 'qu (tetap dibaca [tɕʰy])', note: 'Titik dua hilang' },
      { before: 'x + ü', after: 'xu (tetap dibaca [ɕy])', note: 'Titik dua hilang' },
      { before: 'y + ü', after: 'yu (tetap dibaca [y])', note: 'Titik dua hilang' },
      { before: 'n + ü vs n + u', after: 'nǚ vs nǔ', note: 'Titik dipertahankan untuk membedakan arti' },
      { before: 'l + ü vs l + u', after: 'lǘ vs lú', note: 'Titik dipertahankan untuk membedakan arti' },
    ],
    warningTip: 'Ingat rumus jingle: "j, q, x, y berani menyapa, titik ü langsung disita!"',
  },

  // 2. Aturan Singkatan Vokal Tengah
  {
    id: 'rule-vowel-abbreviation',
    category: 'yunmu',
    title: '2. Aturan Singkatan Vokal Tengah (iou ➔ iu, uei ➔ ui, uen ➔ un)',
    summary: 'Tiga kombinasi vokal majemuk wajib disingkat dalam ejaan Pinyin standar ketika didahului konsonan.',
    explanation: [
      'Ketika vokal "iou", "uei", dan "uen" didahului oleh konsonan awal (shengmu), huruf vokal bagian tengah dihilangkan dalam penulisan ejaan pinyin untuk menghemat ruang.',
      'Meskipun huruf tengahnya tidak ditulis, saat melafalkan kata tersebut, vokal tengah masih sedikit terdengar mengalir lembut.',
    ],
    examples: [
      { before: 'd + iou', after: 'diū (bukan diou)', note: 'Vokal "o" dihilangkan' },
      { before: 'q + iou', after: 'qiú (bukan qiou)', note: 'Vokal "o" dihilangkan' },
      { before: 'd + uei', after: 'duì (bukan duei)', note: 'Vokal "e" dihilangkan' },
      { before: 'sh + uei', after: 'shuǐ (bukan shuei)', note: 'Vokal "e" dihilangkan' },
      { before: 'l + uen', after: 'lùn (bukan luen)', note: 'Vokal "e" dihilangkan' },
      { before: 'ch + uen', after: 'chūn (bukan chuen)', note: 'Vokal "e" dihilangkan' },
    ],
    warningTip: 'Catatan penting: Jangan membaca "ui" seperti "wi" bahasa Inggris murni; ingat bahwa ada vokal "e" yang terselip halus di dalamnya [uei]!',
  },

  // 3. Aturan Penempatan Tanda Nada
  {
    id: 'rule-tone-placement',
    category: 'shengdiao',
    title: '3. Aturan Urutan Penempatan Tanda Nada (Tone Placement Priority)',
    summary: 'Tanda nada selalu diletakkan pada vokal utama dengan urutan prioritas: a > o > e > i / u / ü.',
    explanation: [
      '1. Prioritas Utama: Cari huruf "a". Jika dalam suku kata terdapat huruf "a", tanda nada WAJIB diletakkan di atas huruf "a" (contoh: mā, bāo, huái).',
      '2. Jika tidak ada "a", cari huruf "o" atau "e". Letakkan tanda nada di atas huruf tersebut (contoh: hē, gǒu, shuō). Huruf "o" dan "e" tidak pernah muncul bersamaan dalam satu suku kata.',
      '3. Aturan Pasangan "i" dan "u": Jika huruf "i" dan "u" muncul berdampingan ("iu" atau "ui"), tanda nada SELALU diletakkan pada huruf vokal yang PALING BELAKANG (contoh: diū ➔ tanda di "u"; guì ➔ tanda di "i").',
      '4. Penghilangan Titik Huruf "i": Saat huruf "i" diberi tanda nada, titik di atas "i" wajib dihapus dan digantikan oleh tanda nada (ī, í, ǐ, ì).',
    ],
    examples: [
      { before: 'h + a + o (ada "a")', after: 'hǎo', note: 'Tanda nada di atas "a"' },
      { before: 'g + o + u (ada "o")', after: 'gǒu', note: 'Tanda nada di atas "o"' },
      { before: 'm + e + n (ada "e")', after: 'mén', note: 'Tanda nada di atas "e"' },
      { before: 'd + i + u ("i" dan "u")', after: 'diū', note: 'Tanda nada di huruf belakang ("u")' },
      { before: 's + h + u + i ("u" dan "i")', after: 'shuǐ', note: 'Tanda nada di huruf belakang ("i")' },
    ],
    warningTip: 'Hafalkan mantra ini: "Ada a jangan lewatkan; tak ada a cari o dan e; kalau i dan u bergandengan, tanda nada ditaruh di belakang!"',
  },

  // 4. Aturan Inisial Nol (y dan w)
  {
    id: 'rule-zero-initial',
    category: 'shengmu',
    title: '4. Aturan Tanpa Konsonan Awal / Inisial Nol (Zero Initial: y & w)',
    summary: 'Ketika sebuah suku kata tidak memiliki shengmu dan diawali vokal i, u, atau ü, digunakan huruf y atau w.',
    explanation: [
      'Dalam ejaan Pinyin, sebuah suku kata tidak boleh diawali oleh huruf vokal "i" atau "u" secara telanjang di awal kata.',
      '1. Jika diawali "i": Apabila hanya huruf "i" sendirian, tambahkan huruf "y" di depannya (i ➔ yi). Jika diikuti vokal lain, ubah "i" menjadi "y" (ia ➔ ya, ie ➔ ye, iao ➔ yao, iou ➔ you, ian ➔ yan, iang ➔ yang, iong ➔ yong). Khusus "in" dan "ing", tambahkan "y" di depan (in ➔ yin, ing ➔ ying).',
      '2. Jika diawali "u": Apabila hanya huruf "u" sendirian, tambahkan "w" di depan (u ➔ wu). Jika diikuti vokal lain, ubah "u" menjadi "w" (ua ➔ wa, uo ➔ wo, uai ➔ wai, uei ➔ wei, uan ➔ wan, uen ➔ wen, uang ➔ wang, ueng ➔ weng).',
      '3. Jika diawali "ü": Selalu tambahkan huruf "y" di depannya dan lepaskan titik duanya (ü ➔ yu, üe ➔ yue, üan ➔ yuan, ün ➔ yun).',
    ],
    examples: [
      { before: 'i ➔ yi', after: '衣服 (yīfu)', note: 'Ditambahkan y di depan' },
      { before: 'u ➔ wu', after: '屋 (wū)', note: 'Ditambahkan w di depan' },
      { before: 'ü ➔ yu', after: '雨伞 (yǔsǎn)', note: 'Ditambahkan y, titik ü hilang' },
      { before: 'ie ➔ ye', after: '爷爷 (yéye)', note: 'i diubah menjadi y' },
      { before: 'uo ➔ wo', after: '我们 (wǒmen)', note: 'u diubah menjadi w' },
    ],
  },

  // 5. Aturan Sandhi Nada 3+3
  {
    id: 'rule-sandhi-33',
    category: 'shengdiao',
    title: '5. Aturan Perubahan Nada 3+3 (Tone Sandhi 3+3 ➔ 2+3)',
    summary: 'Jika dua silabel bernada ke-3 bertemu berturut-turut, nada ke-3 yang pertama otomatis dilafalkan sebagai nada ke-2.',
    explanation: [
      'Pita suara manusia membutuhkan energi tinggi untuk mengucapkan nada ke-3 (214) yang turun ke dasar lalu naik kembali. Jika ada dua nada ke-3 berurutan (214 + 214), ritme bicara akan tersendat dan canggung.',
      'Maka dari itu, aturan fonetik Mandarin menetapkan: silabel pertama BERUBAH LAFAL menjadi nada ke-2 (35, nada naik), sementara silabel kedua TETAP nada ke-3 (214).',
      'PERHATIAN EJAAN: Dalam teks resmi buku dan kamus, tanda nada pada tulisan pinyin TETAP ditulis nada 3 (misal: tetap tertulis "nǐ hǎo"), namun pembaca WAJIB melafalkannya sebagai nada 2 "ní hǎo"!',
    ],
    examples: [
      { before: 'nǐ + hǎo (3+3)', after: 'ní hǎo (2+3)', hanzi: '你好', note: 'Halo / Apa kabar' },
      { before: 'shǒu + biǎo (3+3)', after: 'shóu biǎo (2+3)', hanzi: '手表', note: 'Jam tangan' },
      { before: 'shuǐ + guǒ (3+3)', after: 'shuí guǒ (2+3)', hanzi: '水果', note: 'Buah-buahan' },
      { before: 'yǔ + sǎn (3+3)', after: 'yú sǎn (2+3)', hanzi: '雨伞', note: 'Payung hujan' },
      { before: 'kě + yǐ (3+3)', after: 'ké yǐ (2+3)', hanzi: '可以', note: 'Boleh / Bisa' },
    ],
  },

  // 6. Aturan Perubahan Nada '一' (yī) dan '不' (bù)
  {
    id: 'rule-sandhi-yi-bu',
    category: 'shengdiao',
    title: '6. Aturan Khusus Perubahan Nada "一" (yī) dan "不" (bù)',
    summary: '"一" dan "不" memiliki aturan perubahan nada dinamis tergantung nada dari kata yang mengikutinya.',
    explanation: [
      'Aturan Karakter "一" (yī - nada 1 asli):',
      '  a. Tetap Nada 1 (yī): Saat berdiri sendiri, berhitung angka berurutan (yī, èr, sān), atau di akhir frasa.',
      '  b. Menjadi Nada 4 (yì): Jika diikuti kata bernada 1, 2, atau 3 (misal: 一天 yì tiān, 一年 yì nián, 一本 yì běn).',
      '  c. Menjadi Nada 2 (yí): Jika diikuti kata bernada 4 (misal: 一个 yí gè, 一样 yí yàng).',
      'Aturan Karakter "不" (bù - nada 4 asli):',
      '  a. Tetap Nada 4 (bù): Saat berdiri sendiri atau diikuti kata bernada 1, 2, atau 3 (misal: 不喝 bù hē, 不来 bù lái, 不好 bù hǎo).',
      '  b. Menjadi Nada 2 (bú): Jika diikuti kata yang juga bernada 4 (misal: 不是 bú shì, 不看 bú kàn).',
    ],
    examples: [
      { before: 'yī + tiān (1+1)', after: 'yì tiān (4+1)', note: '"一" menjadi nada 4' },
      { before: 'yī + gè (1+4)', after: 'yí gè (2+4)', note: '"一" menjadi nada 2' },
      { before: 'bù + hǎo (4+3)', after: 'bù hǎo (4+3)', note: '"不" tetap nada 4' },
      { before: 'bù + shì (4+4)', after: 'bú shì (2+4)', note: '"不" menjadi nada 2' },
    ],
  },

  // 7. Aturan Apostrof Pemisah Suku Kata
  {
    id: 'rule-apostrophe',
    category: 'spelling',
    title: '7. Aturan Tanda Pemisah Apostrof (\') (Syllable Dividing Mark)',
    summary: 'Apostrof digunakan ketika suku kata berikutnya diawali huruf vokal a, o, atau e untuk menghindari salah penggabungan.',
    explanation: [
      'Ketika sebuah suku kata bersambung dengan suku kata berikutnya yang diawali oleh vokal "a", "o", atau "e", batas antar suku kata bisa menjadi rancu dan salah dibaca.',
      'Untuk itu, tanda apostrof (\') disisipkan tepat di depan vokal tersebut.',
    ],
    examples: [
      { before: 'xi + an', after: "Xī'ān (Kota Xi'an)", note: 'Jika tanpa apostrof tertukar dengan "xiān" (satu suku kata: segar)' },
      { before: 'pi + ao', after: "pí'ǎo (jaket bulu)", note: 'Jika tanpa apostrof tertukar dengan "piǎo" (melayang)' },
      { before: 'tian + an + men', after: "Tiān'ānmén", note: 'Memisahkan kata tiān dan ān' },
    ],
  },
];
