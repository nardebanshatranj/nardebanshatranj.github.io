import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { quizQuestions } from '../data/content'
import { siteConfig } from '../config/site'
import { IconTarget, IconTrophy, IconAward, IconLightbulb } from '../components/icons/Icons'

type QuizPhase = 'intro' | 'active' | 'result'

interface Answer {
  questionId: number
  selectedIndex: number
  correct: boolean
}

function getGrade(score: number, total: number): {
  label: string
  color: string
  Icon: typeof IconTrophy
} {
  const pct = (score / total) * 100
  if (pct >= 90) return { label: 'عالی — عملکرد درخشان', color: 'text-emerald-400', Icon: IconTrophy }
  if (pct >= 70) return { label: 'خوب — پیشرفت قابل توجه', color: 'text-gold-400', Icon: IconAward }
  if (pct >= 50) return { label: 'قابل قبول — نیاز به مرور', color: 'text-amber-400', Icon: IconTarget }
  return { label: 'نیاز به تمرین بیشتر', color: 'text-rose-400', Icon: IconTarget }
}

export default function Quiz() {
  const [phase, setPhase] = useState<QuizPhase>('intro')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)

  const currentQuestion = quizQuestions[currentIndex]
  const totalQuestions = quizQuestions.length

  const startQuiz = useCallback(() => {
    setPhase('active')
    setCurrentIndex(0)
    setAnswers([])
    setSelectedOption(null)
    setShowExplanation(false)
  }, [])

  const handleSelect = (index: number) => {
    if (showExplanation) return
    setSelectedOption(index)
  }

  const handleConfirm = () => {
    if (selectedOption === null) return
    const correct = selectedOption === currentQuestion.correctIndex
    setAnswers((prev) => [
      ...prev,
      { questionId: currentQuestion.id, selectedIndex: selectedOption, correct },
    ])
    setShowExplanation(true)
  }

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((i) => i + 1)
      setSelectedOption(null)
      setShowExplanation(false)
    } else {
      setPhase('result')
    }
  }

  const score = answers.filter((a) => a.correct).length
  const grade = getGrade(score, totalQuestions)
  const GradeIcon = grade.Icon
  const progress = phase === 'active' ? ((currentIndex + (showExplanation ? 1 : 0)) / totalQuestions) * 100 : 0

  if (phase === 'intro') {
    return (
      <div className="py-12 md:py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card-luxury text-center space-y-6 animate-slide-up">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400">
              <IconTarget className="w-10 h-10" />
            </div>
            <h1 className="section-title">آزمون سنجش دانش</h1>
            <p className="text-gray-400 leading-relaxed">
              آزمون {siteConfig.brandName} شامل {totalQuestions} سوال چندگزینه‌ای از مباحث مختلف شطرنج است.
              پس از هر سوال، پاسخ صحیح و توضیح تخصصی ارائه می‌شود.
            </p>

            <div className="grid grid-cols-3 gap-4 py-4">
              {[
                { label: 'تعداد سوال', value: totalQuestions },
                { label: 'نوع', value: 'چندگزینه‌ای' },
                { label: 'بازخورد', value: 'فوری' },
              ].map((item) => (
                <div key={item.label} className="p-4 rounded-xl bg-surface-700/40 border border-white/5">
                  <p className="text-lg font-bold text-gold-400">{item.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{item.label}</p>
                </div>
              ))}
            </div>

            <button type="button" onClick={startQuiz} className="btn-primary w-full sm:w-auto">
              شروع آزمون
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (phase === 'result') {
    const pct = Math.round((score / totalQuestions) * 100)

    return (
      <div className="py-12 md:py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card-luxury text-center space-y-6 animate-slide-up">
            <div className={`w-20 h-20 mx-auto rounded-2xl bg-surface-700/50 border border-white/5 flex items-center justify-center ${grade.color}`}>
              <GradeIcon className="w-10 h-10" />
            </div>
            <h1 className="section-title">نتیجه آزمون</h1>

            <div className="relative w-44 h-44 mx-auto">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="6" className="text-surface-600" />
                <circle
                  cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="6"
                  strokeDasharray={`${pct * 2.64} 264`}
                  strokeLinecap="round"
                  className="text-gold-500 transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-gold-400">{pct}٪</span>
                <span className="text-sm text-gray-500">{score} از {totalQuestions}</span>
              </div>
            </div>

            <p className={`text-lg font-bold ${grade.color}`}>{grade.label}</p>

            <div className="text-right space-y-2 max-h-64 overflow-y-auto">
              {quizQuestions.map((q, i) => {
                const answer = answers.find((a) => a.questionId === q.id)
                return (
                  <div
                    key={q.id}
                    className={`p-3 rounded-xl text-sm flex items-start gap-3 border ${
                      answer?.correct
                        ? 'bg-emerald-500/5 border-emerald-500/20'
                        : 'bg-rose-500/5 border-rose-500/20'
                    }`}
                  >
                    <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      answer?.correct ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                    }`}>
                      {answer?.correct ? '✓' : '✗'}
                    </span>
                    <div>
                      <p className="text-gray-300">{i + 1}. {q.question}</p>
                      {!answer?.correct && (
                        <p className="text-gray-500 text-xs mt-1">{q.explanation}</p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <button type="button" onClick={startQuiz} className="btn-primary">
                آزمون مجدد
              </button>
              <Link to="/categories" className="btn-secondary">
                مرور درس‌ها
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 animate-fade-in">
          <div className="flex justify-between text-sm text-gray-500 mb-3">
            <span>سوال {currentIndex + 1} از {totalQuestions}</span>
            <span className="badge bg-gold-500/10 text-gold-400 border border-gold-500/20">{currentQuestion.category}</span>
          </div>
          <div className="h-1.5 bg-surface-600 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-l from-gold-500 to-gold-400 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="card-luxury space-y-6 animate-slide-up">
          <h2 className="text-xl font-bold text-gray-100 leading-relaxed">
            {currentQuestion.question}
          </h2>

          <div className="space-y-3">
            {currentQuestion.options.map((option, i) => {
              let optionClass = 'border-white/5 hover:border-gold-500/30 hover:bg-white/[0.02]'

              if (selectedOption === i && !showExplanation) {
                optionClass = 'border-gold-500/50 bg-gold-500/10'
              }

              if (showExplanation) {
                if (i === currentQuestion.correctIndex) {
                  optionClass = 'border-emerald-500/50 bg-emerald-500/10'
                } else if (i === selectedOption) {
                  optionClass = 'border-rose-500/50 bg-rose-500/10'
                } else {
                  optionClass = 'border-white/5 opacity-40'
                }
              }

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleSelect(i)}
                  disabled={showExplanation}
                  className={`w-full text-right p-4 rounded-xl border transition-all duration-200 ${optionClass}`}
                >
                  <span className="inline-flex items-center gap-3">
                    <span className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold ${
                      showExplanation && i === currentQuestion.correctIndex
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : showExplanation && i === selectedOption
                          ? 'bg-rose-500/20 text-rose-400'
                          : 'bg-surface-600/80 text-gray-400'
                    }`}>
                      {['الف', 'ب', 'ج', 'د'][i]}
                    </span>
                    <span className="text-gray-200">{option}</span>
                  </span>
                </button>
              )
            })}
          </div>

          {showExplanation && (
            <div className="p-5 rounded-xl bg-gold-500/10 border border-gold-500/20 animate-fade-in">
              <p className="text-gold-300 text-sm leading-relaxed flex items-start gap-3">
                <IconLightbulb className="w-5 h-5 flex-shrink-0 text-gold-400" />
                {currentQuestion.explanation}
              </p>
            </div>
          )}

          <div className="flex justify-end pt-2">
            {!showExplanation ? (
              <button
                type="button"
                onClick={handleConfirm}
                disabled={selectedOption === null}
                className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
              >
                تأیید پاسخ
              </button>
            ) : (
              <button type="button" onClick={handleNext} className="btn-primary">
                {currentIndex < totalQuestions - 1 ? 'سوال بعدی' : 'مشاهده نتیجه'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
