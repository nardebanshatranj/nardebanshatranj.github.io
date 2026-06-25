import { Link, NavLink, Outlet } from 'react-router-dom'
import { useState } from 'react'
import Logo from './Logo'
import { siteConfig } from '../config/site'

const navLinks = [
  { to: '/', label: 'خانه' },
  { to: '/categories', label: 'آموزش‌ها' },
  { to: '/quiz', label: 'آزمون' },
]

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed inset-0 pointer-events-none overflow-hidden hidden md:block">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gold-500/[0.03] rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-indigo-500/[0.03] rounded-full blur-[120px]" />
      </div>

      <header className="sticky top-0 z-50 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link to="/" className="group transition-transform hover:scale-[1.02]">
              <Logo size="md" />
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-gold-500/10 text-gold-400 shadow-sm shadow-gold-500/5'
                        : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            <Link to="/quiz" className="hidden md:inline-flex btn-primary text-sm !py-2 !px-5">
              شروع آزمون
            </Link>

            <button
              type="button"
              className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="منو"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-white/5 px-4 py-4 space-y-2 animate-fade-in">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-lg text-sm font-medium ${
                    isActive ? 'bg-gold-500/10 text-gold-400' : 'text-gray-400'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link to="/quiz" onClick={() => setMenuOpen(false)} className="block btn-primary text-center text-sm">
              شروع آزمون
            </Link>
          </div>
        )}
      </header>

      <main className="flex-1 relative">
        <Outlet />
      </main>

      <footer className="relative border-t border-white/5 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <Logo size="sm" />
              <p className="text-sm text-gray-500 mt-4 leading-relaxed">
                {siteConfig.brandDescription}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-4">دسترسی سریع</h4>
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="text-sm text-gray-500 hover:text-gold-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-600">
              © {new Date().getFullYear()} {siteConfig.brandName} — تمامی حقوق محفوظ است
            </p>
            <p className="text-xs text-gray-600">
              {siteConfig.developer.credit}:{' '}
              {siteConfig.developer.url ? (
                <a
                  href={siteConfig.developer.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gold-400 transition-colors"
                >
                  {siteConfig.developer.name}
                </a>
              ) : (
                siteConfig.developer.name
              )}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
