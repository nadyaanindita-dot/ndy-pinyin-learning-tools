import React, { useState } from 'react';
import { Volume2, Award, RotateCcw, Check, X, ArrowRight, ArrowLeft, Sparkles, BookOpen } from 'lucide-react';
import { PRACTICE_QUESTIONS, PracticeQuestion } from '../data/practiceData';
import { SHENGMU_LIST } from '../data/shengmuData';
import { playChineseSpeech } from '../utils/audio';

export const PracticeSection: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'quiz' | 'flashcards' | 'builder'>('quiz');

  // Quiz states
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Flashcard states
  const allWords = React.useMemo(() => {
    return SHENGMU_LIST.flatMap((s) => [...s.sampleWords1Syllable, ...s.sampleWords2Syllable]);
  }, []);
  const [flashcardIdx, setFlashcardIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Builder states
  const [builderInit, setBuilderInit] = useState('b');
  const [builderVowel, setBuilderVowel] = useState('ēi');

  const currentQ: PracticeQuestion = PRACTICE_QUESTIONS[currentQuestionIdx];

  const handleSelectOption = (opt: string) => {
    if (hasSubmitted) return;
    setSelectedAnswer(opt);
  };

  const handleCheckAnswer = () => {
    if (!selectedAnswer) return;
    setHasSubmitted(true);
    if (selectedAnswer === currentQ.correctPinyin) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIdx < PRACTICE_QUESTIONS.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
      setSelectedAnswer(null);
      setHasSubmitted(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleResetQuiz = () => {
    setCurrentQuestionIdx(0);
    setSelectedAnswer(null);
    setHasSubmitted(false);
    setScore(0);
    setQuizFinished(false);
  };

  const currentFlashcard = allWords[flashcardIdx];

  const handlePlayCurrentWord = (text: string) => {
    playChineseSpeech(text);
  };

  return (
    <section id="latihan" className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header and Context */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          <span>Bagian 06</span>
          <span aria-hidden="true">·</span>
          <span>Praktik Interaktif & Pengujian Mandiri</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
          Latihan Membaca Kata Dasar untuk Pemula
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-3xl">
          Uji pemahaman fonetik Anda melalui kuis pendengaran & tebak pinyin, kartu belajar membaca kosakata dasar
          (flashcards), serta laboratorium perakit silabel interaktif.
        </p>
      </div>

      {/* Mode Switcher */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <button
          onClick={() => setActiveSubTab('quiz')}
          className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'quiz'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Kuis Tebak Pinyin & Nada</span>
        </button>

        <button
          onClick={() => setActiveSubTab('flashcards')}
          className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'flashcards'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Kartu Kosakata (Flashcards)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('builder')}
          className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'builder'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Perakit Silabel (Sound Lab)</span>
        </button>
      </div>

      {/* MODE 1: Kuis Tebak Pinyin */}
      {activeSubTab === 'quiz' && (
        <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
          {!quizFinished ? (
            <>
              {/* Question Progress Header */}
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-3">
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  Pertanyaan {currentQuestionIdx + 1} dari {PRACTICE_QUESTIONS.length}
                </span>
                <span className="font-mono tabular-nums">
                  Skor Sementara: {score}/{currentQuestionIdx}
                </span>
              </div>

              {/* Question Card */}
              <div className="text-center space-y-3 py-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800">
                <div className="text-4xl sm:text-5xl font-chinese font-bold text-slate-900 dark:text-slate-100">
                  {currentQ.hanzi}
                </div>
                <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  Arti: <strong>{currentQ.indonesianMeaning}</strong> ({currentQ.englishMeaning})
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => playChineseSpeech(currentQ.audioPrompt)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-transform active:scale-95 cursor-pointer"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Putar Audio Kata</span>
                  </button>
                </div>
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                <div className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                  Pilih Pinyin & Nada yang Tepat:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentQ.options.map((opt, idx) => {
                    const isSelected = selectedAnswer === opt;
                    const isCorrect = opt === currentQ.correctPinyin;

                    let btnClass =
                      'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700';

                    if (isSelected && !hasSubmitted) {
                      btnClass = 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-700 dark:text-emerald-300 ring-2 ring-emerald-500';
                    } else if (hasSubmitted) {
                      if (isCorrect) {
                        btnClass = 'bg-emerald-600 text-white border-emerald-600 font-bold';
                      } else if (isSelected && !isCorrect) {
                        btnClass = 'bg-red-600 text-white border-red-600';
                      } else {
                        btnClass = 'opacity-40 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(opt)}
                        disabled={hasSubmitted}
                        className={`p-3 rounded-lg border text-sm font-mono font-medium transition-all flex items-center justify-between cursor-pointer ${btnClass}`}
                      >
                        <span>{opt}</span>
                        {hasSubmitted && isCorrect && <Check className="w-4 h-4 text-white" />}
                        {hasSubmitted && isSelected && !isCorrect && <X className="w-4 h-4 text-white" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action & Feedback */}
              {!hasSubmitted ? (
                <button
                  onClick={handleCheckAnswer}
                  disabled={!selectedAnswer}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold text-sm rounded-lg transition-colors cursor-pointer"
                >
                  Periksa Jawaban
                </button>
              ) : (
                <div className="space-y-4 pt-2">
                  <div
                    className={`p-3 rounded-lg text-xs ${
                      selectedAnswer === currentQ.correctPinyin
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                        : 'bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                    }`}
                  >
                    <div className="font-bold mb-1">
                      {selectedAnswer === currentQ.correctPinyin
                        ? '✓ Jawaban Anda Benar!'
                        : '✕ Jawaban Kurang Tepat!'}
                    </div>
                    <p className="leading-relaxed">{currentQ.explanation}</p>
                    <div className="mt-1 font-mono text-[11px]">
                      Konversi nada: {currentQ.correctNumbered} · Bunyi fonetik: {currentQ.phoneticGuide}
                    </div>
                  </div>

                  <button
                    onClick={handleNextQuestion}
                    className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 font-semibold text-sm rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Pertanyaan Berikutnya</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          ) : (
            /* Quiz Completed View */
            <div className="text-center py-8 space-y-4">
              <Award className="w-16 h-16 text-emerald-500 mx-auto" />
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                Latihan Membaca Selesai!
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Skor akhir Anda: <strong className="text-emerald-600 font-mono text-lg">{score}</strong> dari{' '}
                {PRACTICE_QUESTIONS.length} pertanyaan benar!
              </p>
              <button
                onClick={handleResetQuiz}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-lg transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Ulangi Latihan</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* MODE 2: Flashcards Kosakata Dasar */}
      {activeSubTab === 'flashcards' && (
        <div className="max-w-xl mx-auto space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>
              Kartu {flashcardIdx + 1} dari {allWords.length} Kosakata
            </span>
            <span>Klik kartu untuk membalik & melihat pinyin</span>
          </div>

          {/* Flip Card */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full h-80 bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-200 dark:border-slate-800 shadow-md p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-emerald-500 transition-all select-none relative"
          >
            {!isFlipped ? (
              /* Front of card */
              <div className="space-y-4">
                <div className="text-6xl sm:text-7xl font-chinese font-bold text-slate-900 dark:text-slate-100">
                  {currentFlashcard.hanzi}
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Konsonan Inisial: Shengmu [{currentFlashcard.shengmu}]
                </div>
                <div className="text-xs text-slate-400">
                  (Klik untuk memeriksa lafal Pinyin & artinya)
                </div>
              </div>
            ) : (
              /* Back of card */
              <div className="space-y-3">
                <div className="text-4xl font-chinese font-bold text-slate-900 dark:text-slate-100">
                  {currentFlashcard.hanzi}
                </div>
                <div className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
                  {currentFlashcard.pinyin}
                </div>
                <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
                  Konversi: {currentFlashcard.pinyinNumbered} · {currentFlashcard.pinyinPhoneticId}
                </div>
                <div className="text-base font-semibold text-slate-800 dark:text-slate-200">
                  {currentFlashcard.indonesian}
                </div>
                <div className="text-xs text-slate-500">{currentFlashcard.english}</div>
                {currentFlashcard.notes && (
                  <div className="text-[11px] text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 p-2 rounded-lg border border-amber-200 dark:border-amber-900/40">
                    💡 {currentFlashcard.notes}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Flashcard Action Controls */}
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={() => {
                setIsFlipped(false);
                setFlashcardIdx((prev) => (prev > 0 ? prev - 1 : allWords.length - 1));
              }}
              className="px-4 py-2 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium border border-slate-200 dark:border-slate-800 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Sebelumnya</span>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePlayCurrentWord(currentFlashcard.hanzi);
              }}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm transition-transform active:scale-95 cursor-pointer"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Dengarkan Pelafalan</span>
            </button>

            <button
              onClick={() => {
                setIsFlipped(false);
                setFlashcardIdx((prev) => (prev < allWords.length - 1 ? prev + 1 : 0));
              }}
              className="px-4 py-2 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium border border-slate-200 dark:border-slate-800 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Berikutnya</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* MODE 3: Laboratorium Perakit Silabel */}
      {activeSubTab === 'builder' && (
        <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">
              Eksperimen Kombinasi Shengmu & Yunmu
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Pilih konsonan dan vokal bernada untuk menggabungkan silabel secara dinamis.
            </p>
          </div>

          {/* Builder Result Screen */}
          <div className="p-6 bg-slate-50 dark:bg-slate-950 rounded-xl text-center border border-slate-100 dark:border-slate-800 space-y-3">
            <div className="text-xs text-slate-400">Hasil Gabungan Silabel:</div>
            <div className="text-5xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400 tracking-wider">
              {builderInit + builderVowel}
            </div>
            <div>
              <button
                onClick={() => playChineseSpeech(builderInit + builderVowel)}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-sm inline-flex items-center gap-2 cursor-pointer"
              >
                <Volume2 className="w-4 h-4" />
                <span>Ucapkan Silabel Ini</span>
              </button>
            </div>
          </div>

          {/* Shengmu Selector */}
          <div className="space-y-2">
            <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              1. Pilih Konsonan Awal (Shengmu):
            </div>
            <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto p-2 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800">
              {SHENGMU_LIST.map((s) => (
                <button
                  key={s.symbol}
                  onClick={() => setBuilderInit(s.symbol)}
                  className={`w-9 h-9 rounded-md font-mono text-xs font-bold transition-all cursor-pointer ${
                    builderInit === s.symbol
                      ? 'bg-emerald-600 text-white shadow-xs scale-105'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {s.symbol}
                </button>
              ))}
            </div>
          </div>

          {/* Vowel + Tone Selector */}
          <div className="space-y-2">
            <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              2. Pilih Vokal & Nada (Yunmu):
            </div>
            <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto p-2 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800">
              {[
                'ā', 'á', 'ǎ', 'à',
                'ō', 'ó', 'ǒ', 'ò',
                'ē', 'é', 'ě', 'è',
                'ī', 'í', 'ǐ', 'ì',
                'ū', 'ú', 'ǔ', 'ù',
                'ǖ', 'ǘ', 'ǚ', 'ǜ',
                'āi', 'ái', 'ǎi', 'ài',
                'ēi', 'éi', 'ěi', 'èi',
                'āo', 'áo', 'ǎo', 'ào',
                'ōu', 'óu', 'ǒu', 'òu',
                'ān', 'án', 'ǎn', 'àn',
                'ēn', 'én', 'ěn', 'èn',
                'āng', 'áng', 'ǎng', 'àng',
                'ēng', 'éng', 'ěng', 'èng',
                'ōng', 'óng', 'ǒng', 'òng',
              ].map((v) => (
                <button
                  key={v}
                  onClick={() => setBuilderVowel(v)}
                  className={`px-2.5 py-1.5 rounded-md font-mono text-xs font-medium transition-all cursor-pointer ${
                    builderVowel === v
                      ? 'bg-emerald-600 text-white shadow-xs font-bold'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
