# Space Travel

A React single-page app (SPA) for commanding an interplanetary evacuation. This implementation uses a mock API backed by `localStorage` to simulate a backend. It follows the provided spec: list spacecrafts, view details, build & destroy, list planets and dispatch spacecraft between them, with loading states and route redirects.

## Quickstart

```bash
# 1) Install deps
npm install

# 2) Run locally
npm run dev
# then open the printed localhost URL

# 3) Build for production
npm run build
npm run preview

# 4) (Optional) Clear mock data to start fresh
# In your browser DevTools console:
localStorage.clear()
``

This app uses `HashRouter` so it works out-of-the-box on GitHub Pages and similar static hosting without custom 404 handling.

## Project structure

```
src/
  components/       # Reusable UI building blocks (CSS modules + BEM)
  context/          # React Context for API/data + loading/error states
  pages/            # Route-level components
  routes/           # Route rendering (React Router v6)
  services/         # API wrapper and mock implementation
  styles/           # Global and app styles
```

## Mock API

Use the exported methods from `src/services/SpaceTravelApi.js`. They return `{ isError, data }` and emulate latency for the loading UI. The underlying implementation, `SpaceTravelMockApi.js`, persists to `localStorage` and seeds initial planets/spacecrafts if absent.

> In the original starter project, `SpaceTravelMockApi.js` is provided and marked "do not edit". This repo ships a drop-in equivalent so you can run the app standalone.

## Deploy to GitHub Pages (via Actions)

1. Create a new GitHub repository and push (instructions below).
2. In the repo, go to **Settings → Pages** and set **Source** to "Deploy from a branch" with "GitHub Actions".
3. Push to `main`. The provided workflow will build and publish the site to Pages.
4. Your site will be live at `https://<your-username>.github.io/<repo-name>/`.

### Included workflow

- See `.github/workflows/deploy.yml`. It builds the app and deploys to GitHub Pages on every push to `main`.

## How to push this project to GitHub

```bash
# In the project root:
git init
git add .
git commit -m "feat: initial Space Travel app"
# Replace USER and REPO with your values
git branch -M main
git remote add origin https://github.com/USER/REPO.git
git push -u origin main
```

## Notes

- The app seeds a few planets and ships. Use your browser's devtools "Application → Local Storage" to inspect and reset if needed.
- All unmatched routes redirect to the homepage.
- Form validation enforces required fields: **name**, **capacity**, **description**.
