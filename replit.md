# Windpomp Liquors

A React-based web storefront for Windpomp Liquors, the official national distributor for Kaia Distillery's premium spirits in South Africa.

## Tech Stack

- **Frontend**: React 19 with Vite 7
- **Routing**: React Router Dom v7
- **Styling**: CSS (index.css, App.css)
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Backend/BaaS**: Firebase (Firestore, Auth, Storage)
- **Icons**: Lucide React

## Project Structure

```
src/
  assets/       - Static images (logos, SVGs)
  components/   - Reusable UI (Navbar, Footer)
  hooks/        - Custom hooks (useContent.js for Firestore sync)
  pages/        - Route components (Home, Shop, About, Admin, Inquiry, Sales)
  store/        - Zustand global state (cartStore.js)
  App.jsx       - Main router and Visual Engine Bridge for admin live-preview
  firebase.js   - Firebase config and initialization
  main.jsx      - App entry point
```

## Development

```bash
npm run dev      # Start dev server on port 5000
npm run build    # Production build to dist/
npm run lint     # Run ESLint
```

## Configuration

- Dev server runs on `0.0.0.0:5000` with `allowedHosts: true` for Replit proxy compatibility (Vite 7 requires boolean `true`, not string `'all'`)
- Firebase config is in `src/firebase.js`
- Firebase rules: `firestore.rules`, `storage.rules`, `database.rules.json`

## Deployment

Configured as a static site deployment:
- Build command: `npm run build`
- Public directory: `dist`
