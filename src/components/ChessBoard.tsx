const PIECES: Record<string, string> = {
  r: '♜', n: '♞', b: '♝', q: '♛', k: '♚', p: '♟',
  R: '♖', N: '♘', B: '♗', Q: '♕', K: '♔', P: '♙',
}

const INITIAL = [
  ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
  ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
]

interface ChessBoardProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  animated?: boolean
}

const sizeClasses = {
  sm: 'w-48 h-48',
  md: 'w-64 h-64 md:w-80 md:h-80',
  lg: 'w-72 h-72 md:w-96 md:h-96',
}

export default function ChessBoard({ size = 'md', className = '', animated = false }: ChessBoardProps) {
  return (
    <div
      className={`${sizeClasses[size]} ${className} ${
        animated ? 'animate-float' : ''
      } rounded-xl overflow-hidden shadow-2xl shadow-black/50 ring-1 ring-white/10`}
    >
      <div className="grid grid-cols-8 grid-rows-8 w-full h-full">
        {INITIAL.map((row, ri) =>
          row.map((piece, ci) => {
            const isLight = (ri + ci) % 2 === 0
            return (
              <div
                key={`${ri}-${ci}`}
                className={`flex items-center justify-center ${
                  isLight ? 'bg-board-light' : 'bg-board-dark'
                }`}
              >
                {piece && (
                  <span
                    className={`text-lg sm:text-xl md:text-2xl select-none ${
                      piece === piece.toUpperCase() ? 'text-white drop-shadow-md' : 'text-gray-900'
                    }`}
                  >
                    {PIECES[piece]}
                  </span>
                )}
              </div>
            )
          }),
        )}
      </div>
    </div>
  )
}
