import fs from 'node:fs'
import path from 'node:path'
import { categories, quizQuestions } from './content-data.mjs'

const ROOT = path.resolve(import.meta.dirname, '..')
const CATEGORY_ORDER = ['basics', 'openings', 'tactics', 'endgame', 'strategy']
const CATEGORIES_DIR = path.join(ROOT, 'content/categories')

fs.mkdirSync(CATEGORIES_DIR, { recursive: true })

for (const cat of categories) {
  const { lessonCount: _lessonCount, ...data } = cat
  const payload = {
    ...data,
    sort: CATEGORY_ORDER.indexOf(cat.id) + 1,
  }

  fs.writeFileSync(
    path.join(CATEGORIES_DIR, `${cat.id}.json`),
    JSON.stringify(payload, null, 2),
    'utf8',
  )
}

fs.writeFileSync(
  path.join(ROOT, 'content/quiz.json'),
  JSON.stringify({ questions: quizQuestions }, null, 2),
  'utf8',
)

console.log(`Seeded ${categories.length} categories and ${quizQuestions.length} quiz questions`)
