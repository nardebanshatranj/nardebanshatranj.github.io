import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const repoName = 'nardebanshatranj.github.io'
const isGitHubPages = process.env.GITHUB_PAGES === 'true'
const isOrgRootSite = repoName.endsWith('.github.io')

export default defineConfig({
  plugins: [react()],
  base: isGitHubPages ? (isOrgRootSite ? '/' : `/${repoName}/`) : '/',
})
