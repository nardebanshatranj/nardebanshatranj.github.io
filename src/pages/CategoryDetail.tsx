import { Link, useParams } from 'react-router-dom'
import { getCategoryById } from '../data/content'
import DifficultyBadge from '../components/DifficultyBadge'
import { CategoryIcon } from '../components/icons/Icons'

export default function CategoryDetail() {
  const { categoryId } = useParams()
  const category = getCategoryById(categoryId!)

  if (!category) {
    return (
      <div className="py-20 text-center">
        <p className="text-gray-400 mb-4">دسته‌بندی یافت نشد.</p>
        <Link to="/categories" className="btn-secondary">بازگشت</Link>
      </div>
    )
  }

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="text-sm text-gray-500 mb-8 animate-fade-in">
          <Link to="/categories" className="hover:text-gold-400 transition-colors">آموزش‌ها</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-300">{category.title}</span>
        </nav>

        <div className="mb-12 animate-slide-up">
          <div className={`inline-flex w-16 h-16 rounded-2xl ${category.gradient} items-center justify-center text-gold-400 mb-6 border border-white/5`}>
            <CategoryIcon id={category.iconId} className="w-8 h-8" />
          </div>
          <h1 className="section-title mb-4">{category.title}</h1>
          <p className="text-gray-400 leading-relaxed max-w-2xl">{category.description}</p>
        </div>

        <div className="space-y-4">
          {category.lessons.map((lesson, i) => (
            <Link
              key={lesson.id}
              to={`/categories/${category.id}/${lesson.id}`}
              className={`card-luxury flex items-start gap-5 group animate-slide-up-${Math.min(i + 1, 5)}`}
            >
              <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-gold-500/20 to-gold-600/10 border border-gold-500/20 flex items-center justify-center text-gold-400 font-bold">
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-gray-100 group-hover:text-gold-400 transition-colors">
                    {lesson.title}
                  </h3>
                  <DifficultyBadge difficulty={lesson.difficulty} />
                </div>
                <p className="text-gray-400 text-sm mb-2">{lesson.description}</p>
                <span className="text-xs text-gray-500">{lesson.duration}</span>
              </div>
              <svg className="w-5 h-5 text-gold-500 opacity-0 group-hover:opacity-100 transition-opacity self-center" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
