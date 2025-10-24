import { auth } from './firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js';

const signinForm = document.getElementById('page-signin-form');
if (signinForm) {
  const emailInput = document.getElementById('page-signin-email');
  const passInput = document.getElementById('page-signin-pass');
  const errorEl = document.getElementById('page-signin-error');
  signinForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorEl.textContent = '';
    const email = emailInput.value.trim();
    const password = passInput.value;
    if (!email || !password) { errorEl.textContent = 'Email and password are required.'; return; }
    try {
      await signInWithEmailAndPassword(auth, email, password);

      window.location.href = 'index.html';
    } catch (err) {
      errorEl.textContent = err.message || 'Sign in failed';
    }
  });
}

const signupForm = document.getElementById('page-signup-form');
if (signupForm) {
  const nameInput = document.getElementById('page-signup-name');
  const emailInput = document.getElementById('page-signup-email');
  const passInput = document.getElementById('page-signup-pass');
  const errorEl = document.getElementById('page-signup-error');
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorEl.textContent = '';
    const displayName = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passInput.value;
    if (!displayName || !email || !password) { errorEl.textContent = 'All fields are required.'; return; }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName });
      window.location.href = 'index.html';
    } catch (err) {
      errorEl.textContent = err.message || 'Registration failed';
    }
  });
}
