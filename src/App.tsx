import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Categories from './pages/Categories'
import CategoryDetail from './pages/CategoryDetail'
import LessonPage from './pages/LessonPage'
import Quiz from './pages/Quiz'

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="categories" element={<Categories />} />
          <Route path="categories/:categoryId" element={<CategoryDetail />} />
          <Route path="categories/:categoryId/:lessonId" element={<LessonPage />} />
          <Route path="quiz" element={<Quiz />} />
        </Route>
      </Routes>
    </>
  )
}
