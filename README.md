# Halal Restaurant Finder Finland

Front-end app that lists halal restaurants from a **published Google Sheet (CSV)**, with search, cuisine filters, and an interactive map (React Leaflet). Built for the Neuralflex trainee task: React + Vite, no backend.

## Live demo

Replace with your Railway URL after deployment:

`https://YOUR-APP.up.railway.app`

## Repository

Replace with your public GitHub URL:

`https://github.com/YOUR_USERNAME/halal-finder`

## Tech stack

- React (Vite)
- React Leaflet + Leaflet
- Tailwind CSS
- Fetch API + custom CSV parser (`sheetParser`) — no CSV npm package for parsing

## Run locally

1. **Clone and install**

   ```bash
   git clone https://github.com/YOUR_USERNAME/halal-finder.git
   cd halal-finder
   npm install
   ```

2. **Environment**

   Copy `.env.example` to `.env` and set your published sheet CSV URL:

   ```env
   VITE_SHEET_URL=https://docs.google.com/spreadsheets/d/e/.../pub?output=csv
   ```

3. **Start dev server**

   ```bash
   npm run dev
   ```

4. **Production build**

   ```bash
   npm run build
   npm run preview
   ```

## Project layout

- `src/app/App.jsx` — main screen (list + map, detail view, search, filters)
- `src/features/restaurants/components/` — map, cards, filters, skeleton
- `src/features/restaurants/hooks/useRestaurants.js` — loads CSV, loading/error state
- `src/features/restaurants/utils/sheetParser.js` — CSV → objects
- `src/features/restaurants/services/restaurantService.js` — `fetch` to the sheet URL

## Deploy (Railway)

Connect the GitHub repo, set `VITE_SHEET_URL` in Railway variables, build command `npm run build`, publish directory `dist` (or your host’s equivalent). Share the live URL and repo link for submission.

## Author

Mudasir Ahmad
