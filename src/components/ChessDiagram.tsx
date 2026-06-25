const PIECES: Record<string, string> = {
  K: '♔', Q: '♕', R: '♖', B: '♗', N: '♘', P: '♙',
  k: '♚', q: '♛', r: '♜', b: '♝', n: '♞', p: '♟',
}

const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

export interface ChessDiagramProps {
  /** 8 rows from rank 8 to rank 1, each row 8 squares */
  position: (string | null)[][]
  highlights?: string[]
  caption?: string
  size?: 'sm' | 'md' | 'lg'
}

function squareName(row: number, col: number) {
  return `${FILES[col]}${8 - row}`
}

export default function ChessDiagram({ position, highlights = [], caption, size = 'md' }: ChessDiagramProps) {
  const sizeClass = { sm: 'max-w-xs', md: 'max-w-sm', lg: 'max-w-md' }[size]

  return (
    <figure className={`${sizeClass} mx-auto my-6`}>
      <div className="rounded-xl overflow-hidden ring-1 ring-gold-500/20 shadow-2xl shadow-black/40">
        <div className="grid grid-cols-8">
          {position.map((row, ri) =>
            row.map((piece, ci) => {
              const isLight = (ri + ci) % 2 === 0
              const sq = squareName(ri, ci)
              const isHighlight = highlights.includes(sq)
              const isWhite = piece === piece?.toUpperCase()

              return (
                <div
                  key={sq}
                  className={`aspect-square flex items-center justify-center relative ${
                    isHighlight
                      ? 'bg-emerald-500/40 ring-2 ring-inset ring-emerald-400/60'
                      : isLight
                        ? 'bg-board-light'
                        : 'bg-board-dark'
                  }`}
                >
                  {piece && (
                    <span
                      className={`text-xl sm:text-2xl md:text-3xl select-none drop-shadow-sm ${
                        isWhite ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {PIECES[piece]}
                    </span>
                  )}
                  <span className="absolute bottom-0.5 left-0.5 text-[8px] text-black/20 font-mono hidden sm:block">
                    {sq}
                  </span>
                </div>
              )
            }),
          )}
        </div>
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-gray-400 leading-relaxed">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

/** Common positions for reuse in lessons */
export const diagrams = {
  initial: {
    position: [
      ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
      ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
      ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
    ] as (string | null)[][],
    caption: 'چیدمان اولیه صفحه شطرنج',
  },
  knightMove: {
    position: [
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, 'N', null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ] as (string | null)[][],
    highlights: ['c6', 'd7', 'f7', 'g6', 'g4', 'f3', 'd3', 'c4'],
    caption: 'خانه‌های قابل حرکت اسب از e4',
  },
  fork: {
    position: [
      ['r', null, null, null, 'k', null, null, null],
      [null, null, 'N', null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ] as (string | null)[][],
    highlights: ['c7', 'e8', 'a8'],
    caption: 'چنگال اسبی — حمله همزمان به شاه و رخ',
  },
  italian: {
    position: [
      ['r', 'n', 'b', 'q', 'k', 'b', null, 'r'],
      ['p', 'p', 'p', 'p', 'p', 'n', 'p', 'p'],
      [null, null, null, null, null, null, null, null],
      [null, null, 'b', null, null, null, null, null],
      [null, null, null, null, 'P', null, null, null],
      [null, null, null, null, null, 'N', null, null],
      ['P', 'P', 'P', 'P', null, 'P', 'P', 'P'],
      ['R', 'N', 'B', 'Q', 'K', null, 'B', 'R'],
    ] as (string | null)[][],
    highlights: ['c4', 'f7'],
    caption: 'گشایش ایتالیایی — فیل c4 به f7 فشار می‌آورد',
  },
  castling: {
    position: [
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      ['P', 'P', 'P', 'P', null, 'P', 'P', 'P'],
      ['R', null, 'B', 'Q', 'K', 'B', 'N', 'R'],
    ] as (string | null)[][],
    highlights: ['e1', 'g1', 'f1', 'h1'],
    caption: 'قلعه‌رانی کوتاه سفید — شاه به g1، رخ به f1',
  },
  backRank: {
    position: [
      [null, null, null, null, 'k', null, null, null],
      ['p', 'p', 'p', null, null, 'p', 'p', 'p'],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, 'R'],
    ] as (string | null)[][],
    highlights: ['e8', 'h8'],
    caption: 'مات تخت — شاه در ردیف ۸ گیر افتاده',
  },
  center: {
    position: [
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, 'P', null, null, null, null],
      [null, null, 'p', null, 'p', null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ] as (string | null)[][],
    highlights: ['d4', 'e4', 'd5', 'e5'],
    caption: 'کنترل مرکز — خانه‌های d4، e4، d5 و e5',
  },
}
