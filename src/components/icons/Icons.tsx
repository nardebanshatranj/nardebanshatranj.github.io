import type { ReactElement } from 'react'

interface IconProps {
  className?: string
}

export function IconChessKing({ className = 'w-6 h-6' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v3M9 6h6M10 6v2M14 6v2M8 10h8l-1 11H9L8 10z" />
      <circle cx="12" cy="3" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function IconBook({ className = 'w-6 h-6' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6.5A2.5 2.5 0 016.5 4H20v16H6.5A2.5 2.5 0 014 17.5v-11z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 17.5A2.5 2.5 0 016.5 20H20M8 8h8M8 12h6" />
    </svg>
  )
}

export function IconTarget({ className = 'w-6 h-6' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function IconAward({ className = 'w-6 h-6' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="9" r="5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 13.5L7 21l5-2.5L17 21l-1.5-7.5" />
    </svg>
  )
}

export function IconDevice({ className = 'w-6 h-6' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <path strokeLinecap="round" d="M10 18h4" />
    </svg>
  )
}

export function IconTrophy({ className = 'w-6 h-6' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 4h8v3a4 4 0 01-8 0V4zM5 4h3v1a3 3 0 01-3 3H4a1 1 0 01-1-1V5a1 1 0 011-1h1zM19 4h-3v1a3 3 0 003 3h1a1 1 0 001-1V5a1 1 0 00-1-1h-1z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 11v3M9 20h6M10 14h4v3a2 2 0 01-4 0v-3z" />
    </svg>
  )
}

export function IconLightbulb({ className = 'w-6 h-6' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 18h6M10 22h4M12 2a6 6 0 00-3 11v1h6v-1a6 6 0 00-3-11z" />
    </svg>
  )
}

export function IconCheck({ className = 'w-4 h-4' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

export function IconArrowLeft({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  )
}

export type CategoryIconId = 'pawn' | 'knight' | 'tactics' | 'rook' | 'queen'

export function CategoryIcon({ id, className = 'w-7 h-7' }: { id: CategoryIconId; className?: string }) {
  const icons: Record<CategoryIconId, ReactElement> = {
    pawn: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="5" r="2.5" />
        <path d="M9 8.5c0-1 1.5-1.5 3-1.5s3 .5 3 1.5c0 1.5-1 2.5-2 3.5L12 20l-3-8c-1-1-2-2-2-3.5z" />
      </svg>
    ),
    knight: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 19H6v-1.5c0-1 .5-2 1.5-2.5 1-.5 2-1.5 2.5-3 .5-1 .5-2.5 0-4-.5-1.5-1.5-2.5-2.5-3.5 1-.5 2-1 3-1 2 0 3.5 1.5 4 3.5.5 2 0 4-1 5.5 2 .5 3.5 2 4 3.5V19z" />
      </svg>
    ),
    tactics: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" />
      </svg>
    ),
    rook: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M7 19V9H5V7h3V5h8v2h3v2h-2v10H7zm2-2h6v-8H9v8zM8 5h8v1H8V5z" />
      </svg>
    ),
    queen: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="4" r="1.5" />
        <circle cx="7" cy="6" r="1.2" />
        <circle cx="17" cy="6" r="1.2" />
        <circle cx="5" cy="9" r="1" />
        <circle cx="19" cy="9" r="1" />
        <path d="M6 10c0-1 2-2 6-2s6 1 6 2l-2 10H8L6 10z" />
      </svg>
    ),
  }
  return icons[id]
}
