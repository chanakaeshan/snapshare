# SnapImg — Prompt Log (prompts.md)

This file logs the prompts used to generate code (stepwise prompt design + prompt chaining). Each entry includes the Gemini prompt used and a brief note about the generated output.

---

## Step 0 — Project scaffold
Prompt:
"Create a minimal static web app scaffold for a photo-sharing app called 'SnapImg'. Use plain HTML, CSS, and ES module JavaScript. Add a top-level `index.html`, a `styles.css`, and a `src/` directory. Do not use frameworks. Add placeholders for Firebase configuration and ImgBB API key. The app should include an auth area, an uploader form, and a main feed area." 

Note: Generated `index.html`, `styles.css`, and `src/app.js` scaffold. Verified layout is minimal and functional.

---

## Step 1 — Firebase initialization
Prompt:
"Generate `src/firebase.js` that initializes Firebase using the Firebase JS SDK v9 modular (CDN ES module imports). Export `auth` and `db` (Realtime Database) objects. Include config placeholders and a short comment explaining where to replace values." 

Note: Created `src/firebase.js` using CDN imports for `firebase-app`, `firebase-auth`, and `firebase-database` (v9.22.1).

---

## Step 2 — Authentication UI and logic
Prompt:
"Generate `src/auth.js` which renders a sign-up and sign-in form into `#auth-area`. Use Firebase Authentication (email/password). Use `createUserWithEmailAndPassword`, `signInWithEmailAndPassword`, `signOut`, and `onAuthStateChanged`. When signed in, show display name and a sign-out button and reveal the uploader area. Use only plain DOM manipulation and no frameworks. Provide basic input validation and user-friendly error messages." 

Note: Created `src/auth.js`. It handles auth state and toggles `#uploader` visibility.

---

## Step 3 — Image upload component (ImgBB)
Prompt:
"Generate `src/upload.js`. Provide a function to upload a selected image file to ImgBB via their REST API and return a hosted image URL. Convert the file to base64 client-side. After successful upload, push a post object to Firebase Realtime Database `/posts` with fields: `imageUrl`, `caption`, `uid`, `displayName`, `createdAt` (serverTimestamp). Add UI status messages and clear the form on success. Use the ImgBB API key placeholder `<IMGBB_API_KEY>`." 

Note: Created `src/upload.js` that uploads to ImgBB and writes to Realtime Database. Reminder: replace ImgBB key.

---

## Step 4 — Main Feed (Realtime Database listener)
Prompt:
"Generate `src/feed.js` which listens to `/posts` in Realtime Database and renders posts to `#posts`. Sort posts newest-first. Show image, caption, poster display name, and created timestamp formatted client-side. Keep rendering simple and accessible." 

Note: Created `src/feed.js` using `onValue` and a client-side sort to display newest posts first.

---

## Step 5 — Styling and polish
Prompt:
"Provide `styles.css` with a simple card-based layout, responsive image sizing, and accessible typography. Keep colors minimal and professional. Ensure uploader is hidden when signed out." 

Note: Created `styles.css`.

---

## Step 6 — UX improvements and validation
Prompt:
"Improve `src/auth.js` to show inline error messages instead of alerts, add basic client-side validation for signup/signin fields, and ensure the uploader area toggles safely using `onAuthStateChanged`. Update `src/upload.js` to validate file type and give clearer status messages, and make DOM queries resilient when elements might not exist. Return clear error messages to the UI and log detailed errors to console for debugging." 

Note: Updated `src/auth.js` and `src/upload.js` to include inline errors and basic validation. This reduces modal alerts and improves usability.

---

## Step 7 — Feed timestamp normalization
Prompt:
"Update `src/feed.js` to normalize different `createdAt` shapes from Realtime Database; coerce server timestamps to numbers and sort posts by a normalized timestamp `_ts` before rendering. Guard DOM access and ensure rendering does not fail if `#posts` is missing." 

Note: Updated `src/feed.js` to coerce timestamps, sort by normalized `_ts`, and render the posts with friendly timestamps.

---

## Gemini prompt sequence & suggested commit messages

Below are the exact Gemini prompts (expanded) to paste into Firebase Studio's Gemini assistant to reproduce the code changes in this repository. After each prompt I also include a suggested Git commit message you should use for the generated code. Use the prompts in order (stepwise prompt design). Each prompt is written to be self-contained and explicit about the target file(s) to generate or modify.

1) Scaffold project (if not already created)
Prompt to paste:
"Create a minimal static web app scaffold for a photo-sharing app called 'SnapImg'. Generate `index.html`, `styles.css`, and `src/app.js`. `index.html` should include a header with `#auth-area`, a `#uploader` section with a file input and caption, a `#feed` section with `#posts`, and load `src/app.js` as an ES module. Keep markup semantic and accessible. Don't add any external frameworks — vanilla HTML/CSS/JS only. Provide minimal responsive styles in `styles.css`."
Suggested commit message:
feat(scaffold): add base HTML/CSS/JS scaffold for SnapImg

2) Firebase initialization
Prompt to paste:
"Generate `src/firebase.js` that initializes Firebase using the Firebase JS SDK v9 (modular) via CDN ES module imports. Export `auth` and `db` (Realtime Database) objects. Put placeholder config values and a short comment telling the developer where to paste their Firebase config. Use the same import versions used elsewhere in the project (9.22.1)."
Suggested commit message:
feat(firebase): add Firebase v9 modular init (auth + database)

3) Authentication UI & logic
Prompt to paste:
"Generate `src/auth.js`. This module should render sign-up and sign-in forms into `#auth-area`. Use Firebase Authentication (email/password) functions: `createUserWithEmailAndPassword`, `signInWithEmailAndPassword`, `signOut`, `onAuthStateChanged`, and `updateProfile`. Show inline validation and error messages (no alert() popups). When signed in, show the display name and a sign-out button and reveal `#uploader`. Ensure DOM queries guard against missing elements. Keep all DOM work in vanilla JS."
Suggested commit message:
feat(auth): add email/password auth UI and handlers (inline errors)

4) Image upload + ImgBB integration
Prompt to paste:
"Generate `src/upload.js`. Add a form submit handler that: validates the selected file is an image, reads the file to base64, uploads it to ImgBB using the REST API (endpoint `https://api.imgbb.com/1/upload?key=IMGBB_KEY`), receives the hosted image URL, and writes a post object to Firebase Realtime Database at `/posts` with fields: `imageUrl`, `caption`, `uid`, `displayName`, and `createdAt` (use `serverTimestamp()` from the RTDB SDK). Provide clear UI status messages and do not use alert(). Also add a client-side preview: when a file is selected, show it in an `#preview-img` element. Use placeholders for the ImgBB API key and include an explanation comment at the top."
Suggested commit message:
feat(upload): add ImgBB upload flow + preview and DB write

5) Main feed listener and render
Prompt to paste:
"Generate `src/feed.js` that listens to `/posts` in the Firebase Realtime Database using `onValue`. Build a renderer that sorts posts newest-first by a normalized timestamp, handles various `createdAt` shapes returned by RTDB (numbers or objects), and renders each post showing the image, caption, poster display name, and a friendly timestamp. Make DOM access resilient and avoid framework usage."
Suggested commit message:
feat(feed): add realtime feed listener and renderer (newest-first)

6) Styling and layout polish
Prompt to paste:
"Update `styles.css` to provide a clean, card-based layout, accessible typography, responsive images, and small header polish. Add CSS classes for: `.preview`, `.img-placeholder`, `.spinner`, `img.loading` and `.form-error`. Create a CSS spinner animation and styles to show a placeholder while images load. Keep styles minimal and professional (light background, white cards, blue accent)."
Suggested commit message:
style(ui): add image-loading placeholders, spinner, and minor header polish

7) UX improvements (validation & error display)
Prompt to paste:
"Improve `src/auth.js` and `src/upload.js` to replace alert() calls with inline error messages (`.form-error`) and `#upload-status`. Add client-side checks for required fields and file types. Ensure the uploader is only visible when the user is authenticated via `onAuthStateChanged`. Keep changes small and focused on UX."
Suggested commit message:
fix(ui): inline validation and better error/status messaging for auth and uploads

8) Realtime Database rules (dev example)
Prompt to paste:
"Create `database.rules.json` for Firebase Realtime Database with a simple development rule set: allow public reads but require authenticated users (`auth != null`) to write. Keep a short note that this is for development only and should be hardened before production."
Suggested commit message:
chore(firebase): add development Realtime Database rules

9) Final smoke test & README notes
Prompt to paste:
"Add README updates mentioning the placeholders to replace (`src/firebase.js` config and `src/upload.js` ImgBB key), and include quick local dev steps (`python -m http.server` or Firebase Hosting). Add a short checklist of manual tests to run: sign up, sign in, upload image, verify post appears in feed."
Suggested commit message:
docs(readme): add setup steps and manual test checklist

Usage notes for commits
- For each Gemini-generated change, create a single commit using the suggested message above. When you run Gemini in Firebase Studio, copy the exact prompt, generate the code into the target file, review quickly, then commit with the message.
- Keep each commit focused (one feature per commit). The commit message should start with a conventional prefix (feat/fix/chore/docs/style) followed by a short description.



## Commit message examples (prompt-driven)
- feat: scaffold project + prompts.md — "Scaffolded app and created prompts.md (prompt: ... )"
- feat(auth): add Firebase auth UI via Gemini prompt — "Generated auth handlers and UI" 
- feat(upload): add ImgBB upload + DB write — "Generated upload flow (ImgBB + Realtime DB)"

---

## Usage notes
- Replace placeholders in `src/firebase.js` with your Firebase project's config.
- Replace `<IMGBB_API_KEY>` in `src/upload.js` with your ImgBB API key.
- Use Firebase Hosting or open `index.html` locally for development (Firebase config required for runtime features).
