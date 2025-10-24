import { db } from './firebase.js';
import { ref as dbRef, onValue } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js';

const postsEl = document.getElementById('posts');

function renderPosts(posts){
  if (!postsEl) return;
  postsEl.innerHTML = '';
  if (!posts.length) {
    postsEl.innerHTML = '<div class="muted">No posts yet. Be the first!</div>';
    return;
  }
  posts.forEach(p=>{
    const div = document.createElement('div');
    div.className = 'post card';

    const wrapper = document.createElement('div');
    wrapper.className = 'post-row';

    const placeholder = document.createElement('div');
    placeholder.className = 'img-placeholder';
    const spinner = document.createElement('div');
    spinner.className = 'spinner';
    placeholder.appendChild(spinner);

    const img = document.createElement('img');
    img.alt = 'post image';
    img.className = 'loading';
    img.src = p.imageUrl || '';
    img.addEventListener('load', ()=>{
      img.classList.remove('loading');
      if (placeholder && placeholder.parentNode) placeholder.parentNode.removeChild(placeholder);
    });
    img.addEventListener('error', ()=>{
      if (placeholder) placeholder.textContent = 'Image failed to load';
    });

    wrapper.appendChild(placeholder);
    wrapper.appendChild(img);

    const meta = document.createElement('div');
    meta.className = 'meta';
    const nameEl = document.createElement('div');
    nameEl.innerText = p.displayName || 'Anonymous';
    const timeEl = document.createElement('div');
    timeEl.className = 'muted';
    timeEl.innerText = p.createdAt ? new Date(p.createdAt).toLocaleString() : '';
    meta.appendChild(nameEl);
    meta.appendChild(timeEl);

    const caption = document.createElement('div');
    caption.className = 'caption';
    caption.innerText = p.caption || '';

    div.appendChild(wrapper);
    div.appendChild(meta);
    div.appendChild(caption);
    postsEl.appendChild(div);
  });
}

const postsRef = dbRef(db, 'posts');
onValue(postsRef, (snap)=>{
  const data = snap.val() || {};
  const arr = Object.keys(data).map(k=>({ id:k, ...(data[k]) }));

  arr.forEach(x=>{
    if (!x.createdAt) x._ts = 0;
    else if (typeof x.createdAt === 'number') x._ts = x.createdAt;
    else if (typeof x.createdAt === 'object') {

      x._ts = x.createdAt.timestamp || x.createdAt._seconds || 0;

      if (!x._ts && x.createdAt.toMillis) {
        try { x._ts = x.createdAt.toMillis(); } catch(e){ x._ts = 0; }
      }
    } else x._ts = 0;
  });
  arr.sort((a,b)=> b._ts - a._ts);

  arr.forEach(x=>{ x.createdAt = x._ts ? Number(x._ts) : null; });
  renderPosts(arr);
});

function escapeHtml(s){
  return String(s||'').replace(/[&<>"']/g, (c)=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;" })[c]);
}
function escapeAttr(s){ return String(s||'').replace(/"/g,'&quot;'); }
