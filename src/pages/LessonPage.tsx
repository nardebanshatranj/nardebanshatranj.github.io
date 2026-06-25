import { Link, useParams } from 'react-router-dom'
import { getCategoryById, getLesson } from '../data/content'
import DifficultyBadge from '../components/DifficultyBadge'
import ChessDiagram, { diagrams } from '../components/ChessDiagram'
import { IconLightbulb, IconCheck } from '../components/icons/Icons'

export default function LessonPage() {
  const { categoryId, lessonId } = useParams()
  const category = getCategoryById(categoryId!)
  const lesson = getLesson(categoryId!, lessonId!)

  if (!category || !lesson) {
    return (
      <div className="py-20 text-center">
        <p className="text-gray-400 mb-4">درس یافت نشد.</p>
        <Link to="/categories" className="btn-secondary">بازگشت</Link>
      </div>
    )
  }

  const lessonIndex = category.lessons.findIndex((l) => l.id === lessonId)
  const prevLesson = lessonIndex > 0 ? category.lessons[lessonIndex - 1] : null
  const nextLesson = lessonIndex < category.lessons.length - 1 ? category.lessons[lessonIndex + 1] : null

  return (
    <article className="py-12 md:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="text-sm text-gray-500 mb-8 animate-fade-in">
          <Link to="/categories" className="hover:text-gold-400 transition-colors">آموزش‌ها</Link>
          <span className="mx-2">/</span>
          <Link to={`/categories/${category.id}`} className="hover:text-gold-400 transition-colors">
            {category.title}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-300">{lesson.title}</span>
        </nav>

        <header className="mb-10 animate-slide-up">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <DifficultyBadge difficulty={lesson.difficulty} />
            <span className="text-sm text-gray-500 flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 3" />
              </svg>
              {lesson.duration}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-100 mb-4">{lesson.title}</h1>
          <p className="text-gray-400 leading-relaxed">{lesson.description}</p>
        </header>

        <div className="space-y-12">
          {lesson.content.map((section, si) => (
            <section
              key={section.heading}
              className={`animate-slide-up-${Math.min(si + 1, 5)}`}
            >
              <h2 className="text-xl font-bold text-gold-400 mb-5 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-sm font-bold text-gold-400">
                  {si + 1}
                </span>
                {section.heading}
              </h2>

              {section.diagram && diagrams[section.diagram] && (() => {
                const d = diagrams[section.diagram]
                return (
                  <ChessDiagram
                    position={d.position}
                    highlights={'highlights' in d ? d.highlights : undefined}
                    caption={d.caption}
                    size="md"
                  />
                )
              })()}

              <div className="space-y-4">
                {section.paragraphs.map((p) => (
                  <p key={p.slice(0, 30)} className="text-gray-300 leading-[1.8]">
                    {p}
                  </p>
                ))}
              </div>

              {section.highlight && (
                <div className="mt-6 p-5 rounded-xl bg-gold-500/10 border border-gold-500/20">
                  <p className="text-gold-300 text-sm leading-relaxed flex items-start gap-3">
                    <IconLightbulb className="w-5 h-5 flex-shrink-0 mt-0.5 text-gold-400" />
                    {section.highlight}
                  </p>
                </div>
              )}

              {section.tips && (
                <ul className="mt-6 space-y-3">
                  {section.tips.map((tip) => (
                    <li key={tip.slice(0, 30)} className="flex items-start gap-3 text-sm text-gray-400">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center mt-0.5">
                        <IconCheck className="w-3 h-3 text-emerald-400" />
                      </span>
                      {tip}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <div className="mt-14 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between gap-4">
          {prevLesson ? (
            <Link
              to={`/categories/${category.id}/${prevLesson.id}`}
              className="btn-secondary text-sm"
            >
              → {prevLesson.title}
            </Link>
          ) : (
            <div />
          )}
          {nextLesson ? (
            <Link
              to={`/categories/${category.id}/${nextLesson.id}`}
              className="btn-primary text-sm"
            >
              {nextLesson.title} ←
            </Link>
          ) : (
            <Link to="/quiz" className="btn-primary text-sm">
              رفتن به آزمون ←
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}
