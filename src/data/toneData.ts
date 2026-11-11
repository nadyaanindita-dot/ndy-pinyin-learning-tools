import { SpecialToneExample, ToneItem } from '../types/pinyin';

export const TONES_LIST: ToneItem[] = [
  {
    toneNumber: 1,
    chineseName: '第一声 (阴平)',
    pinyinName: 'Dì-yī shēng (Yīnpíng)',
    pitchContour: '55',
    symbol: 'ˉ (mā)',
    descriptionId: 'Tinggi dan Datar: Suara stabil di frekuensi tinggi tanpa naik atau turun, seperti menyanyi nada panjang "laaaa".',
    descriptionEn: 'High and Level: Maintained steadily at pitch level 5-5 without falling or rising.',
    pitchCurve: [5, 5, 5, 5, 5],
  },
  {
    toneNumber: 2,
    chineseName: '第二声 (阳平)',
    pinyinName: 'Dì-èr shēng (Yángpíng)',
    pitchContour: '35',
    symbol: 'ˊ (má)',
    descriptionId: 'Menaik: Suara meluncur naik dari tingkat sedang ke tinggi, persis seperti intonasi bertanya kaget dalam bahasa Indonesia ("Hah?! / Ya?!").',
    descriptionEn: 'Rising: Glides from mid pitch 3 up to high pitch 5, resembling a questioning inflection ("What?!").',
    pitchCurve: [3, 3.4, 3.9, 4.4, 5],
  },
  {
    toneNumber: 3,
    chineseName: '第三声 (上声)',
    pinyinName: 'Dì-sān shēng (Shǎngshēng)',
    pitchContour: '214',
    symbol: 'ˇ (mǎ)',
    descriptionId: 'Turun-Naik (Lekuk Rendah): Suara turun dari nada rendah ke dasar paling rendah lalu memantul naik. Dalam percakapan cepat, sering diucapkan setengah nada 3 (turun rendah 21).',
    descriptionEn: 'Dipping / Low: Drops from low-mid 2 down to deep baseline 1, then rebounds upward to 4.',
    pitchCurve: [2.5, 1.8, 1.0, 2.2, 4.0],
  },
  {
    toneNumber: 4,
    chineseName: '第四声 (去声)',
    pinyinName: 'Dì-sì shēng (Qùshēng)',
    pitchContour: '51',
    symbol: 'ˋ (mà)',
    descriptionId: 'Turun Cepat dan Tegas: Meluncur tajam dari tingkat tertinggi ke paling rendah, seperti hentakan perintah tegas ("Stop! / Ayo!").',
    descriptionEn: 'Falling / Sharp: Drops forcefully from highest pitch 5 down to lowest 1, like a firm command.',
    pitchCurve: [5, 4.0, 3.0, 2.0, 1.0],
  },
  {
    toneNumber: 5,
    chineseName: '轻声 (轻音)',
    pinyinName: 'Qīngshēng (Neutral tone)',
    pitchContour: '·',
    symbol: 'tanpa tanda (ma)',
    descriptionId: 'Ringan dan Pendek: Diucapkan sangat santai, cepat, dan lembut tanpa tanda diakritik. Ketinggian nadanya ditentukan oleh nada suku kata sebelumnya.',
    descriptionEn: 'Neutral / Soft: Short, unaccented, and gentle; its pitch height is dictated by the preceding syllable.',
    pitchCurve: [3, 2.5, 2.2],
  },
];

/**
 * 5 Contoh Kosakata dengan Nada Netral (轻声 Qīngshēng)
 * Dilengkapi pola perubahan nada pada masing-masing kombinasi (1+0, 2+0, 3+0, 4+0, serta akhiran kata benda)
 * Tidak mengandung angka dan tidak mengandung warna, namun sangat reusable untuk materi angka & warna!
 */
export const NEUTRAL_TONE_EXAMPLES: SpecialToneExample[] = [
  {
    id: 'neutral-1',
    hanzi: '衣服',
    originalPinyin: 'yī fú',
    spokenPinyin: 'yīfu',
    numberedPinyin: 'yi1 fu5',
    phoneticId: '[i-fu] (i datar tinggi + fu pendek rendah)',
    english: 'Clothes / Clothing garment',
    indonesian: 'Pakaian / Baju',
    combinationRule: 'Kombinasi Nada 1 + Nada Netral (55 + 2)',
    pitchExplanation:
      'Pola Nada 1 (55) + Netral: Karena suku kata pertama bernada tinggi stabil (level 5), nada netral yang mengikutinya meluncur jatuh ke tingkat nada rendah (level 2). Pengucapannya terdengar seperti tangga nada yang turun santai: nada pertama ditekan kuat lalu kata kedua melemah dan melandai ke bawah.',
    category: 'neutral_tone',
  },
  {
    id: 'neutral-2',
    hanzi: '盒子',
    originalPinyin: 'hé zǐ',
    spokenPinyin: 'hézi',
    numberedPinyin: 'he2 zi5',
    phoneticId: '[xe-ze] (he naik sedang + ze mengambang tengah)',
    english: 'Box / Small case / Container',
    indonesian: 'Kotak / Wadah tempat penyimpanan',
    combinationRule: 'Kombinasi Nada 2 + Nada Netral (35 + 3)',
    pitchExplanation:
      'Pola Nada 2 (35) + Netral: Suku kata pertama naik dari nada tengah ke tinggi (35). Nada netral di belakangnya tidak jatuh ke dasar, melainkan mendarat di frekuensi tengah (level 3). Ini memberikan kesan suara yang mengambang lembut setelah intonasi menaik.',
    category: 'neutral_tone',
  },
  {
    id: 'neutral-3',
    hanzi: '椅子',
    originalPinyin: 'yǐ zǐ',
    spokenPinyin: 'yǐzi',
    numberedPinyin: 'yi3 zi5',
    phoneticId: '[i-ze] (i turun rendah + ze memantul tinggi)',
    english: 'Chair / Seat',
    indonesian: 'Kursi duduk',
    combinationRule: 'Kombinasi Nada 3 + Nada Netral (21 + 4)',
    pitchExplanation:
      'Pola Nada 3 (21) + Netral: Sangat unik! Suku kata pertama diucapkan sebagai "setengah nada 3" (hanya turun rendah 21 tanpa memantul naik). Karena suku kata pertama berakhir di nada yang sangat rendah, nada netral yang menyusul justru terdengar relatif TINGGI (level 4) sebagai pelepasan alami pita suara!',
    category: 'neutral_tone',
  },
  {
    id: 'neutral-4',
    hanzi: '裤子',
    originalPinyin: 'kù zǐ',
    spokenPinyin: 'kùzi',
    numberedPinyin: 'ku4 zi5',
    phoneticId: '[kʰu-ze] (ku hentak jatuh tajam + ze paling dasar rendah)',
    english: 'Trousers / Pants',
    indonesian: 'Celana panjang',
    combinationRule: 'Kombinasi Nada 4 + Nada Netral (51 + 1)',
    pitchExplanation:
      'Pola Nada 4 (51) + Netral: Suku kata pertama dihentakkan tajam dari puncak (5) ke dasar (1). Akibatnya, nada netral yang mengikutinya berada di tingkat paling bawah (level 1) dan diucapkan ekstra pendek serta nyaris tak terdengar, laksana sisa nafas setelah hentakan.',
    category: 'neutral_tone',
  },
  {
    id: 'neutral-5',
    hanzi: '杯子',
    originalPinyin: 'bēi zǐ',
    spokenPinyin: 'bēizi',
    numberedPinyin: 'bei1 zi5',
    phoneticId: '[pei-ze] (pei datar tinggi + ze akhiran benda ringan)',
    english: 'Cup / Drinking glass / Mug',
    indonesian: 'Cangkir / Gelas minum',
    combinationRule: 'Akhiran Benda Nominal (-zi) Nada Netral',
    pitchExplanation:
      'Pola Akhiran Morfem Pembentuk Kata (-子, -头, -们): Dalam tata bahasa Mandarin, morfem sufiks benda seperti "-zi" selalu dilemahkan menjadi nada netral (qīngshēng). Ini berfungsi menandai ritme gramatikal kata benda konkret, memudahkan pembelajar membedakan akar kata dan imbuhan.',
    category: 'neutral_tone',
  },
];

/**
 * 5 Contoh Kosakata Sandhi Nada 3+3 (Perubahan Nada 3+3 -> 2+3)
 * Dilengkapi pola perubahan nada pada masing-masing kombinasi
 * Tidak mengandung angka dan tidak mengandung warna, sangat berguna untuk materi angka & warna nantinya!
 */
export const TONE_3_3_SANDHI_EXAMPLES: SpecialToneExample[] = [
  {
    id: 'sandhi-1',
    hanzi: '你好',
    originalPinyin: 'nǐ hǎo',
    spokenPinyin: 'ní hǎo',
    numberedPinyin: 'ni3 hao3 -> ni2 hao3',
    phoneticId: '[ni (nada 2 naik) - xau (nada 3 turun-naik)]',
    english: 'Hello / Greetings (You are good)',
    indonesian: 'Halo / Salam sejahtera',
    combinationRule: 'Aturan Dasar Sandhi 3 + 3 ➔ 2 + 3',
    pitchExplanation:
      'Secara teoretis, nǐ (nada 3: 214) dan hǎo (nada 3: 214) sama-sama memiliki lekukan nada rendah. Mengucapkan dua nada 214 berturut-turut membutuhkan usaha otot pita suara yang berat dan memperlambat bicara. Oleh karena itu, nǐ berubah menjadi nada ke-2 (35: ní) yang meluncur naik, sedangkan hǎo tetap nada ke-3 (214). Catatan: dalam tulisan Pinyin resmi tetap ditulis "nǐ hǎo", tetapi wajib dilafalkan "ní hǎo".',
    category: 'sandhi_3_3',
  },
  {
    id: 'sandhi-2',
    hanzi: '手表',
    originalPinyin: 'shǒu biǎo',
    spokenPinyin: 'shóu biǎo',
    numberedPinyin: 'shou3 biao3 -> shou2 biao3',
    phoneticId: '[srou (nada 2 naik) - piau (nada 3 turun-naik)]',
    english: 'Wristwatch / Watch',
    indonesian: 'Jam tangan',
    combinationRule: 'Kata Benda Gabungan: Nada 3 + 3 ➔ 2 + 3',
    pitchExplanation:
      'Kata "shǒu" (tangan, nada 3) dan "biǎo" (alat ukur/jam, nada 3) membentuk kata majemuk jam tangan. Saat digabungkan, nada "shǒu" meluncur naik menjadi "shóu" (nada 2: 35), disambung dengan "biǎo" yang berlekuk (nada 3: 214). Sangat ideal dipasangkan dengan materi hitungan nanti (contoh: 2 buah jam tangan).',
    category: 'sandhi_3_3',
  },
  {
    id: 'sandhi-3',
    hanzi: '水果',
    originalPinyin: 'shuǐ guǒ',
    spokenPinyin: 'shuí guǒ',
    numberedPinyin: 'shui3 guo3 -> shui2 guo3',
    phoneticId: '[suei (nada 2 naik) - kuo (nada 3 turun-naik)]',
    english: 'Fruit / Fresh fruits',
    indonesian: 'Buah-buahan',
    combinationRule: 'Kata Benda Makanan: Nada 3 + 3 ➔ 2 + 3',
    pitchExplanation:
      '"shuǐ" (air, nada 3) bertemu "guǒ" (hasil/buah, nada 3). Karena dua silabel berturut-turut bernada 3, silabel pertama "shuǐ" otomatis berubah lafalnya menjadi "shuí" (nada 2: 35). Kontur naik ini membuat pelafalan mengalir mulus ke nada 3 pada "guǒ". Kata ini kelak sering dipakai saat belajar menghitung buah dan menyebut warna buah!',
    category: 'sandhi_3_3',
  },
  {
    id: 'sandhi-4',
    hanzi: '雨伞',
    originalPinyin: 'yǔ sǎn',
    spokenPinyin: 'yú sǎn',
    numberedPinyin: 'yu3 san3 -> yu2 san3',
    phoneticId: '[yü (nada 2 naik) - san (nada 3 turun-naik)]',
    english: 'Umbrella / Rain parasol',
    indonesian: 'Payung hujan',
    combinationRule: 'Kata Benda Benda Sehari-hari: Nada 3 + 3 ➔ 2 + 3',
    pitchExplanation:
      '"yǔ" (hujan, nada 3) bertemu "sǎn" (payung, nada 3). Lafal "yǔ" bertransformasi menjadi nada ke-2 "yú" (35: nada menaik). Ini menghasilkan irama yang harmonis: [naik] + [turun-naik], bukan [turun-naik] + [turun-naik] yang terputus-putus. Nanti pada materi warna, kata payung ini sangat aplikatif (contoh: payung biru, payung merah).',
    category: 'sandhi_3_3',
  },
  {
    id: 'sandhi-5',
    hanzi: '可以',
    originalPinyin: 'kě yǐ',
    spokenPinyin: 'ké yǐ',
    numberedPinyin: 'ke3 yi3 -> ke2 yi3',
    phoneticId: '[kʰe (nada 2 naik) - i (nada 3 turun-naik)]',
    english: 'Can / May / Able to / Permitted',
    indonesian: 'Bisa / Boleh / Dapat',
    combinationRule: 'Kata Kerja Bantu: Nada 3 + 3 ➔ 2 + 3',
    pitchExplanation:
      '"kě" (nada 3) dan "yǐ" (nada 3) adalah kata bantu yang sangat sering dipakai. Pelafalan wajib berubah menjadi "ké yǐ". Pola kontur nada bergerak dari 35 (naik) ke 214 (turun lalu naik). Di dalam kalimat berhitung atau memilih warna nantinya, kata ini menjadi struktur penting seperti "bolehkah saya mengambil 3 buah...?"',
    category: 'sandhi_3_3',
  },
];
