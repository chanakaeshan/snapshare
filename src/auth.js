import { auth } from './firebase.js';
import { signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js';

const authArea = document.getElementById('auth-area');

function renderSignedOut() {
  authArea.innerHTML = `
    <div class="signed-out">
      <a href="login.html" class="auth-link">Login</a>
      <a href="register.html" class="auth-link">Register</a>
    </div>
  `;
}

function renderSignedIn(user) {
  const name = user.displayName || user.email || user.uid;
  authArea.innerHTML = `
    <div class="signed-in">
      <span>Welcome, <strong>${escapeHtml(name)}</strong></span>
      <button id="signout">Sign out</button>
    </div>
  `;
  document.getElementById('signout').addEventListener('click', () => signOut(auth));

  const uploader = document.getElementById('uploader');
  if (uploader) uploader.classList.remove('hidden');
}

function renderAuthState(user) {
  if (user) {
    renderSignedIn(user);
  } else {
    renderSignedOut();
    const uploader = document.getElementById('uploader');
    if (uploader) uploader.classList.add('hidden');
  }
}

onAuthStateChanged(auth, (user) => {
  renderAuthState(user);
});

function escapeHtml(s){
  return String(s).replace(/[&<>"']/g, (c)=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;" })[c]);
}
