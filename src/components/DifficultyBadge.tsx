interface DifficultyBadgeProps {
  difficulty: 'مبتدی' | 'متوسط' | 'پیشرفته'
}

const colors = {
  'مبتدی': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'متوسط': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  'پیشرفته': 'bg-rose-500/10 text-rose-400 border-rose-500/20',
}

export default function DifficultyBadge({ difficulty }: DifficultyBadgeProps) {
  return (
    <span className={`badge border ${colors[difficulty]}`}>
      {difficulty}
    </span>
  )
}
