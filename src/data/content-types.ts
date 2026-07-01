export interface Lesson {
  id: string
  title: string
  description: string
  duration: string
  difficulty: 'مبتدی' | 'متوسط' | 'پیشرفته'
  content: LessonSection[]
}

export interface LessonSection {
  heading: string
  paragraphs: string[]
  tips?: string[]
  highlight?: string
  diagram?: 'initial' | 'knightMove' | 'fork' | 'italian' | 'castling' | 'backRank' | 'center'
}

export interface Category {
  id: string
  title: string
  description: string
  iconId: 'pawn' | 'knight' | 'tactics' | 'rook' | 'queen'
  color: string
  gradient: string
  lessonCount: number
  lessons: Lesson[]
}

export interface QuizQuestion {
  id: number
  category: string
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

export interface ContentData {
  categories: Category[]
  quizQuestions: QuizQuestion[]
}
