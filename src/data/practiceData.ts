export interface PracticeQuestion {
  id: string;
  hanzi: string;
  audioPrompt: string;
  indonesianMeaning: string;
  englishMeaning: string;
  correctPinyin: string;
  correctNumbered: string;
  phoneticGuide: string;
  options: string[];
  explanation: string;
  category: 'shengmu' | 'tone' | 'syllable';
}

export const PRACTICE_QUESTIONS: PracticeQuestion[] = [
  {
    id: 'pq-1',
    hanzi: '书包',
    audioPrompt: '书包',
    indonesianMeaning: 'Tas ransel sekolah',
    englishMeaning: 'Schoolbag',
    correctPinyin: 'shūbāo',
    correctNumbered: 'shu1 bao1',
    phoneticGuide: '[sru-pau]',
    options: ['shūbāo', 'sūbāo', 'zhūpāo', 'chūbāo'],
    explanation: 'Shengmu "sh" adalah konsonan retrofleks (lidah ditekuk ke atas), dan "b" adalah non-aspirasi diucapkan seperti "p" ringan.',
    category: 'shengmu',
  },
  {
    id: 'pq-2',
    hanzi: '苹果',
    audioPrompt: '苹果',
    indonesianMeaning: 'Apel (buah)',
    englishMeaning: 'Apple',
    correctPinyin: 'píngguǒ',
    correctNumbered: 'ping2 guo3',
    phoneticGuide: '[pʰing-kuo]',
    options: ['píngguǒ', 'bíngguǒ', 'pīngkuǒ', 'pínggǒu'],
    explanation: 'Shengmu "p" adalah aspirasi kuat [pʰ] dengan hembusan nafas, diikuti nada 2 naik (píng) dan nada 3 turun-naik (guǒ).',
    category: 'shengmu',
  },
  {
    id: 'pq-3',
    hanzi: '手表',
    audioPrompt: '手表',
    indonesianMeaning: 'Jam tangan (nada 3+3 sandhi)',
    englishMeaning: 'Wristwatch',
    correctPinyin: 'shǒubiǎo (dilafalkan: shóubiǎo)',
    correctNumbered: 'shou3 biao3 -> shou2 biao3',
    phoneticGuide: '[srou-piau]',
    options: ['shóubiǎo', 'shǒubiào', 'sǒubiǎo', 'zhǒupiǎo'],
    explanation: 'Dua nada ke-3 berurutan (shǒu + biǎo) mengalami sandhi nada, di mana kata pertama wajib dilafalkan menjadi nada 2 (shóu).',
    category: 'tone',
  },
  {
    id: 'pq-4',
    hanzi: '衣服',
    audioPrompt: '衣服',
    indonesianMeaning: 'Pakaian / Baju (nada netral)',
    englishMeaning: 'Clothes',
    correctPinyin: 'yīfu',
    correctNumbered: 'yi1 fu5',
    phoneticGuide: '[i-fu]',
    options: ['yīfu', 'yīfú', 'yífu', 'yǐfù'],
    explanation: 'Kata "yīfu" memiliki nada ke-1 pada "yī" dan nada netral (qīngshēng) pada "fu". Ketinggian nada netral meluncur jatuh ke tingkat rendah.',
    category: 'tone',
  },
  {
    id: 'pq-5',
    hanzi: '筷子',
    audioPrompt: '筷子',
    indonesianMeaning: 'Sumpit makan',
    englishMeaning: 'Chopsticks',
    correctPinyin: 'kuàizi',
    correctNumbered: 'kuai4 zi5',
    phoneticGuide: '[kʰuai-ze]',
    options: ['kuàizi', 'guàizi', 'kuàisī', 'kuǎizhi'],
    explanation: 'Shengmu "k" beraspirasi kuat, diakhiri akhiran morfem "-zi" yang dibaca netral ringan.',
    category: 'syllable',
  },
  {
    id: 'pq-6',
    hanzi: '桌子',
    audioPrompt: '桌子',
    indonesianMeaning: 'Meja belajar / Meja tulis',
    englishMeaning: 'Table / Desk',
    correctPinyin: 'zhuōzi',
    correctNumbered: 'zhuo1 zi5',
    phoneticGuide: '[cruo-ze]',
    options: ['zhuōzi', 'zuōzi', 'chōuzi', 'zhuózi'],
    explanation: 'Shengmu "zh" diucapkan dengan ujung lidah melengkung ke atas (retroflex) tanpa desah nafas kuat.',
    category: 'shengmu',
  },
  {
    id: 'pq-7',
    hanzi: '雨伞',
    audioPrompt: '雨伞',
    indonesianMeaning: 'Payung hujan (sandhi 3+3)',
    englishMeaning: 'Rain umbrella',
    correctPinyin: 'yǔsǎn (dilafalkan: yúsǎn)',
    correctNumbered: 'yu3 san3 -> yu2 san3',
    phoneticGuide: '[yü-san]',
    options: ['yúsǎn', 'yǔsàn', 'wǔsǎn', 'yùsān'],
    explanation: '"yǔ" (nada 3) dan "sǎn" (nada 3) menghasilkan sandhi nada 3+3: kata pertama berubah pelafalannya menjadi nada 2 "yú".',
    category: 'tone',
  },
  {
    id: 'pq-8',
    hanzi: '鞋子',
    audioPrompt: '鞋子',
    indonesianMeaning: 'Sepatu',
    englishMeaning: 'Shoes',
    correctPinyin: 'xiézi',
    correctNumbered: 'xie2 zi5',
    phoneticGuide: '[sye-ze]',
    options: ['xiézi', 'xiēzi', 'qiézi', 'siézi'],
    explanation: 'Shengmu "x" berpasangan dengan vokal "ie" bernada ke-2 naik (xié), disusul akhiran benda netral "zi".',
    category: 'syllable',
  },
];
