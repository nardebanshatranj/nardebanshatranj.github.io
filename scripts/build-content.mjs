import fs from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '..')
const CATEGORIES_DIR = path.join(ROOT, 'content/categories')
const QUIZ_FILE = path.join(ROOT, 'content/quiz.json')
const OUT_FILE = path.join(ROOT, 'src/data/generated/content.json')

const CATEGORY_ORDER = ['basics', 'openings', 'tactics', 'endgame', 'strategy']

function toStringList(items) {
  if (!items) return undefined
  return items
    .map((item) => {
      if (typeof item === 'string') return item
      return item.paragraph ?? item.tip ?? item.option ?? item.text ?? ''
    })
    .filter(Boolean)
}

function normalizeSection(section) {
  const normalized = { ...section }
  const paragraphs = toStringList(section.paragraphs)
  const tips = toStringList(section.tips)
  if (paragraphs) normalized.paragraphs = paragraphs
  if (tips) normalized.tips = tips
  else delete normalized.tips
  if (!normalized.highlight) delete normalized.highlight
  if (!normalized.diagram) delete normalized.diagram
  return normalized
}

function normalizeLesson(lesson) {
  return {
    ...lesson,
    content: (lesson.content ?? []).map(normalizeSection),
  }
}

function normalizeCategory(raw) {
  const { sort: _sort, lessonCount: _count, ...category } = raw
  const lessons = (category.lessons ?? []).map(normalizeLesson)
  return {
    ...category,
    lessons,
    lessonCount: lessons.length,
  }
}

function normalizeQuestion(question) {
  return {
    ...question,
    options: toStringList(question.options) ?? [],
  }
}

function loadCategories() {
  if (!fs.existsSync(CATEGORIES_DIR)) {
    throw new Error(`Missing ${CATEGORIES_DIR}. Run: npm run cms:seed`)
  }

  const files = fs.readdirSync(CATEGORIES_DIR).filter((f) => f.endsWith('.json'))
  const categories = files.map((file) => {
    const raw = JSON.parse(fs.readFileSync(path.join(CATEGORIES_DIR, file), 'utf8'))
    return normalizeCategory(raw)
  })

  categories.sort((a, b) => {
    const ai = CATEGORY_ORDER.indexOf(a.id)
    const bi = CATEGORY_ORDER.indexOf(b.id)
    if (ai === -1 && bi === -1) return a.id.localeCompare(b.id)
    if (ai === -1) return 1
    if (bi === -1) return -1
    return ai - bi
  })

  return categories
}

function loadQuiz() {
  if (!fs.existsSync(QUIZ_FILE)) {
    throw new Error(`Missing ${QUIZ_FILE}. Run: npm run cms:seed`)
  }

  const raw = JSON.parse(fs.readFileSync(QUIZ_FILE, 'utf8'))
  const questions = (raw.questions ?? []).map(normalizeQuestion)
  questions.sort((a, b) => a.id - b.id)
  return questions
}

const categories = loadCategories()
const quizQuestions = loadQuiz()

fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true })
fs.writeFileSync(
  OUT_FILE,
  JSON.stringify({ categories, quizQuestions }, null, 2),
  'utf8',
)

console.log(`Built content: ${categories.length} categories, ${quizQuestions.length} quiz questions`)
