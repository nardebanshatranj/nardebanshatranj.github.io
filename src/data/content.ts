import type { Category, Lesson, QuizQuestion } from './content-types'
import contentData from './generated/content.json'

export type {
  Category,
  ContentData,
  Lesson,
  LessonSection,
  QuizQuestion,
} from './content-types'

export const categories: Category[] = contentData.categories as Category[]
export const quizQuestions: QuizQuestion[] = contentData.quizQuestions as QuizQuestion[]

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id)
}

export function getLesson(categoryId: string, lessonId: string): Lesson | undefined {
  const category = getCategoryById(categoryId)
  return category?.lessons.find((l) => l.id === lessonId)
}
