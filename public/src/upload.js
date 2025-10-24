import { auth, db } from './firebase.js';
import { ref as dbRef, push, set, serverTimestamp } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js';

const IMGBB_KEY = 'c63371291a3f97b273d9250a9cd7e1ee';

const form = document.getElementById('post-form');
const fileInput = document.getElementById('image-file');
const captionInput = document.getElementById('caption');
const statusEl = document.getElementById('upload-status');
const previewImg = document.getElementById('preview-img');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const file = fileInput.files[0];
    if (!file) {
      statusEl.textContent = 'Please choose an image file.';
      return;
    }
    if (!file.type.startsWith('image/')) {
      statusEl.textContent = 'File must be an image.';
      return;
    }
    const caption = captionInput.value.trim();
    const user = auth.currentUser;
    if (!user) {
      statusEl.textContent = 'You must be signed in to post.';
      return;
    }

    statusEl.textContent = 'Uploading image...';
    try {
      const imageUrl = await uploadToImgBB(file);
 
      const postsRef = dbRef(db, 'posts');
      const newPostRef = push(postsRef);
      await set(newPostRef, {
        imageUrl,
        caption,
        uid: user.uid,
        displayName: user.displayName || null,
        createdAt: serverTimestamp()
      });
      statusEl.textContent = 'Posted successfully!';
      form.reset();
    } catch (err) {
      console.error(err);
      statusEl.textContent = 'Upload failed: ' + (err.message || err);
    }
    setTimeout(()=>statusEl.textContent = '', 3000);
  });
}


if (fileInput && previewImg) {
  fileInput.addEventListener('change', () => {
    const f = fileInput.files[0];
    if (!f) {
      previewImg.classList.add('hidden');
      previewImg.src = '';
      return;
    }
    if (!f.type.startsWith('image/')) {
      previewImg.classList.add('hidden');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      previewImg.src = reader.result;
      previewImg.classList.remove('hidden');
    };
    reader.readAsDataURL(f);
  });
}

async function uploadToImgBB(file){
  if (IMGBB_KEY === '<IMGBB_API_KEY>') throw new Error('ImgBB API key not configured. Set IMGBB_KEY in src/upload.js');

  const base64 = await fileToBase64(file);
  const formData = new FormData();
  formData.append('image', base64);
  const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`, {
    method: 'POST',
    body: formData
  });
  const data = await res.json();
  if (!res.ok || data.error) throw new Error((data.error && data.error.message) || 'ImgBB upload failed');
  return data.data.url;
}

function fileToBase64(file){
  return new Promise((resolve, reject)=>{
    const reader = new FileReader();
    reader.onload = ()=>{
      const result = reader.result.split(',')[1];
      resolve(result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
