# OCHST Academic Hub — Phase 1 (Frontend Prototype)

Digital timetable and reminder system for students of Oyo State College of
Health Science and Technology, Ibadan. This is the Phase 1 frontend-only
build: no backend, no auth, no database — everything runs on local mock
data plus LocalStorage for reminders and theme preference.

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL (typically http://localhost:5173).

To type-check and build for production:

```bash
npm run build
npm run preview
```

## Stack

React + Vite + TypeScript + Tailwind CSS + React Router + Lucide icons.

## Notes

- Login/Register are demo-only: submitting either simply navigates to
  `/dashboard`. No credentials are checked.
- Reminders you create, edit, delete or complete persist in the browser's
  LocalStorage under `ochst-reminders-v1`. Theme preference persists under
  `ochst-theme`.
- Dashboard "Today" content is computed from the real current date/time,
  so what you see will shift day to day — this is intentional so the demo
  always feels live.
- This sandbox had no network access, so `npm install` could not be run
  here to verify the build end-to-end. Every file was hand-audited for
  import/export and type consistency, but please run `npm run build`
  locally as a first check.
