# SnapImg — Prompt Log (prompts.md)

This file logs the prompts used to generate code (stepwise prompt design + prompt chaining). Each entry includes the Gemini prompt used and a brief note about the generated output.

---

## Step 0 — Project scaffold
Prompt:
"Create a minimal static web app scaffold for a photo-sharing app called 'SnapImg'. Use plain HTML, CSS, and ES module JavaScript. Add a top-level `index.html`, a `styles.css`, and a `src/` directory. Do not use frameworks. Add placeholders for Firebase configuration and ImgBB API key. The app should include an auth area, an uploader form, and a main feed area." 

Note: Generated `index.html`, `styles.css`, and `src/app.js` scaffold. Verified layout is minimal and functional.

---

## Step 1 — Firebase initialisation
Prompt:
"Generate `src/firebase.js` that initialises Firebase using the Firebase JS SDK v9 modular (CDN ES module imports). Export `auth` and `db` (Realtime Database) objects. Include config placeholders and a short comment explaining where to replace values." 

Note: Created `src/firebase.js` using CDN imports for `firebase-app`, `firebase-auth`, and `firebase-database` (v9.22.1).

---

## Step 2 — Authentication UI and logic
Prompt:
"Generate `src/auth.js` which renders a sign-up and sign-in form into `#auth-area`. Use Firebase Authentication (email/password). Use `createUserWithEmailAndPassword`, `signInWithEmailAndPassword`, `signOut`, and `onAuthStateChanged`. When signed in, show the display name and a sign-out button and reveal the uploader area. Use only plain DOM manipulation and no frameworks. Provide basic input validation and user-friendly error messages." 

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
"Improve `src/auth.js` to show inline error messages instead of alerts, add basic client-side validation for signup/signin fields, and ensure the uploader area toggles safely using `onAuthStateChanged`. Update `src/upload.js` to validate file type and give clearer status messages, and make DOM queries resilient when elements might not exist. Return clear error messages to the UI and log detailed errors to the console for debugging." 

Note: Updated `src/auth.js` and `src/upload.js` to include inline errors and basic validation. This reduces modal alerts and improves usability.

---

## Step 7 — Feed timestamp normalisation
Prompt:
"Update `src/feed.js` to normalise different `createdAt` shapes from Realtime Database; coerce server timestamps to numbers and sort posts by a normalised timestamp `_ts` before rendering. Guard DOM access and ensure rendering does not fail if `#posts` is missing." 

Note: Updated `src/feed.js` to coerce timestamps, sort by normalised `_ts`, and render the posts with friendly timestamps.

---

