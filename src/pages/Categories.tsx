import { categories } from '../data/content'
import CategoryCard from '../components/CategoryCard'
import { siteConfig } from '../config/site'

export default function Categories() {
  return (
    <div className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 animate-slide-up">
          <p className="text-gold-400 text-sm font-medium mb-3">{siteConfig.brandName}</p>
          <h1 className="section-title mb-4">آموزش‌های شطرنج</h1>
          <p className="text-gray-400 max-w-2xl leading-relaxed">
            محتوای آموزشی به پنج دسته تقسیم شده است. هر دسته شامل درس‌های تخصصی
            با سطح‌بندی مبتدی، متوسط و پیشرفته می‌باشد.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <CategoryCard key={cat.id} category={cat} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
