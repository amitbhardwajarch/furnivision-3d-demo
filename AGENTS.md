# Furnivision 3D — Codex Instructions

## Project
Next.js 16 App Router project for a 3D furniture simulation website.

## Goal
Build a 3D ecommerce furniture platform where users can:
- View GLB furniture models
- Place furniture inside room templates
- Move and rotate furniture
- Compare furniture in different rooms
- Save simulated designs
- Prepare for AR preview and checkout

## Tech Stack
- Next.js App Router
- TypeScript
- React Three Fiber
- Drei
- Three.js
- Tailwind CSS
- Framer Motion
- Lucide React

## Rules for Codex
- Do not remove 3D functionality.
- Keep `app/page.tsx` as a client component.
- Store `.glb` models in `public/models`.
- Reference models as `/models/file-name.glb`.
- Prefer reusable components.
- Maintain mobile responsiveness.
- Avoid introducing ShadCN imports unless components are installed.
- Test with `npm run dev` and `npm run build`.