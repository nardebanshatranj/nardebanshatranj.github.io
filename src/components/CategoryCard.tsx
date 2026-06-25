import { Link } from 'react-router-dom'
import type { Category } from '../data/content'
import { CategoryIcon } from './icons/Icons'

interface CategoryCardProps {
  category: Category
  index: number
}

export default function CategoryCard({ category, index }: CategoryCardProps) {
  return (
    <Link
      to={`/categories/${category.id}`}
      className={`card-luxury group block animate-slide-up-${Math.min(index + 1, 5)}`}
    >
      <div className={`w-14 h-14 rounded-2xl ${category.gradient} flex items-center justify-center text-gold-400 mb-5 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-gold-500/10`}>
        <CategoryIcon id={category.iconId} className="w-7 h-7" />
      </div>
      <h3 className="text-xl font-bold text-gray-100 mb-2 group-hover:text-gold-400 transition-colors">
        {category.title}
      </h3>
      <p className="text-gray-400 text-sm leading-relaxed mb-5">
        {category.description}
      </p>
      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <span className="text-xs text-gray-500">
          {category.lessonCount} درس تخصصی
        </span>
        <span className="text-gold-500 text-sm font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
          مشاهده
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  )
}
