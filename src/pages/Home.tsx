import { Link } from 'react-router-dom'
import ChessBoard from '../components/ChessBoard'
import CategoryCard from '../components/CategoryCard'
import { categories } from '../data/content'
import { siteConfig } from '../config/site'
import { IconBook, IconTarget, IconAward, IconDevice } from '../components/icons/Icons'

const features = [
  {
    Icon: IconBook,
    title: 'محتوای ساختاریافته',
    desc: 'درس‌های منظم از مبتدی تا پیشرفته با دسته‌بندی موضوعی',
  },
  {
    Icon: IconTarget,
    title: 'آزمون تعاملی',
    desc: 'سنجش یادگیری با سوالات چندگزینه‌ای و بازخورد فوری',
  },
  {
    Icon: IconAward,
    title: 'استاندارد FIDE',
    desc: 'بر اساس اصول رسمی فدراسیون بین‌المللی شطرنج',
  },
  {
    Icon: IconDevice,
    title: 'دسترسی آسان',
    desc: 'بدون نیاز به نصب — روی هر دستگاهی قابل استفاده',
  },
]

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gold-500/8 via-gold-500/2 to-transparent pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-slide-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-gold-400 border border-gold-500/10">
                <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
                {siteConfig.brandTagline}
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.15] tracking-tight">
                <span className="text-gradient">{siteConfig.brandName}</span>
                <br />
                <span className="text-gray-100">از مبتدی تا پیشرفته</span>
              </h1>

              <p className="text-lg text-gray-400 leading-relaxed max-w-xl">
                {siteConfig.brandDescription}
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/categories" className="btn-primary">
                  شروع یادگیری
                </Link>
                <Link to="/quiz" className="btn-secondary">
                  شرکت در آزمون
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-6">
                {siteConfig.stats.map((stat) => (
                  <div key={stat.label} className="text-center p-3 rounded-xl bg-surface-800/40 border border-white/5">
                    <p className="text-xl md:text-2xl font-bold text-gold-400">{stat.value}</p>
                    <p className="text-[11px] text-gray-500 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center animate-slide-up-2">
              <div className="relative">
                <div className="absolute -inset-8 bg-gold-500/10 rounded-[2rem] blur-3xl animate-glow hidden md:block" />
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-gold-500/20 via-transparent to-gold-600/10" />
                <ChessBoard size="lg" animated />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slide-up">
            <p className="text-gold-400 text-sm font-medium mb-3 tracking-wide">چرا {siteConfig.brandName}؟</p>
            <h2 className="section-title mb-4">یادگیری در سطح حرفه‌ای</h2>
            <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
              هر بخش با دقت طراحی شده تا مسیر یادگیری شطرنج را ساده، جذاب و عمیق کند.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div
                key={f.title}
                className={`card-luxury text-center animate-slide-up-${Math.min(i + 1, 5)}`}
              >
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400">
                  <f.Icon className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-gray-100 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
            <div>
              <p className="text-gold-400 text-sm font-medium mb-2">مسیر یادگیری</p>
              <h2 className="section-title mb-2">دسته‌بندی آموزش‌ها</h2>
              <p className="text-gray-400">از مقدمات تا استراتژی پیشرفته</p>
            </div>
            <Link to="/categories" className="btn-secondary text-sm">
              مشاهده همه
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, i) => (
              <CategoryCard key={cat.id} category={cat} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card-luxury text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gold-500/10 via-transparent to-indigo-500/5 pointer-events-none" />
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />
            <div className="relative space-y-6 py-4">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400">
                <IconTarget className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold text-gradient">آماده سنجش دانش هستید؟</h2>
              <p className="text-gray-400 max-w-lg mx-auto leading-relaxed">
                با شرکت در آزمون ۱۲ سوالی، سطح یادگیری خود را بسنجید و بازخورد تخصصی دریافت کنید.
              </p>
              <Link to="/quiz" className="btn-primary">
                شروع آزمون
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
