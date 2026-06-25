import { siteConfig } from '../config/site'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  showTagline?: boolean
}

export default function Logo({ size = 'md', showTagline = true }: LogoProps) {
  const sizes = {
    sm: { icon: 'text-xl', name: 'text-base', tag: 'text-[10px]' },
    md: { icon: 'text-3xl', name: 'text-xl', tag: 'text-xs' },
    lg: { icon: 'text-4xl', name: 'text-2xl', tag: 'text-sm' },
  }
  const s = sizes[size]

  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <div className="absolute inset-0 bg-gold-500/20 rounded-xl blur-md" />
        <div className={`relative ${s.icon} w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-lg shadow-gold-500/20`}>
          <span className="text-surface-900 font-bold">♔</span>
        </div>
      </div>
      <div>
        <span className={`${s.name} font-bold text-gradient block leading-tight`}>
          {siteConfig.brandName}
        </span>
        {showTagline && (
          <span className={`${s.tag} text-gray-500 hidden lg:block max-w-[220px] xl:max-w-none leading-snug`}>
            {siteConfig.brandTagline}
          </span>
        )}
      </div>
    </div>
  )
}
