# VIN Decoder

Single-page React application for decoding vehicle VIN codes via the NHTSA (vPIC) open API.

## Live demo

- `https://<your-project>.vercel.app/`

## GitHub repository description (copy/paste)

VIN Decoder (React SPA) — decode vehicle details by VIN via NHTSA vPIC API. Live demo: `https://<your-project>.vercel.app/`

## Features

- VIN decode page (`/`):
  - VIN form with minimal validation (required, max 17 chars, allowed symbols only; forbidden: `I`, `O`, `Q`)
  - Display decoded results as `Variable` / `Value` pairs (only items with filled `Value`)
  - Show API response `Message` in UI
  - Keep history of last 3 decoded VINs and allow re-apply from history
- Variables pages:
  - `/variables` — full list of all available NHTSA vehicle variables with descriptions
  - `/variables/:variableId` — details page for a selected variable

## Tech Stack

- React + TypeScript + Vite
- React Router (Data Router)
- TanStack React Query
- Axios
- CSS Modules
- Prettier

## Local run

```bash
npm install
npm run dev
```

App will be available at the URL shown in the terminal output (usually `http://localhost:5173/`).

## Scripts

- `npm run dev` - start dev server
- `npm run build` - type-check + production build
- `npm run lint` - ESLint
- `npm run format` - format the codebase with Prettier
- `npm run format:check` - verify formatting (CI-friendly)
- `npm run preview` - preview production build locally
