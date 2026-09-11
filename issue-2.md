# 🏆 Issue: Implementasi Malam Penghargaan (Babak 4 - 6)

> **Prioritas:** High  
> **Estimasi:** 5 - 8 jam kerja  
> **Teknologi:** HTML, CSS (Vanilla), JavaScript (Vanilla), canvas-confetti (CDN)  
> **Target Device:** Mobile-first, responsif di HP  
> **Depends on:** Issue #1 (Babak 1 - 3 harus selesai terlebih dahulu)  

---

## 📋 Ringkasan

Melanjutkan pengalaman interaktif setelah user melewati Gate Teka-Teki. Saat user menekan tombol "Gunakan Tiket", halaman bertransisi ke bagian "Malam Penghargaan" yang terdiri dari 3 babak: Transisi Karpet Merah, Galeri Trofi Interaktif, dan Trofi Utama dengan Surat Ulang Tahun.

---

## 📁 File yang Harus Dimodifikasi / Ditambahkan

```
ultah/
├── index.html      ← Tambahkan section Babak 4, 5, 6 di bawah section existing
├── style.css       ← Tambahkan styling baru untuk tema luxury, trofi, modal, konfeti
└── script.js       ← Tambahkan logika Babak 4, 5, 6 — ganti fungsi useTicket()
```

> **PENTING:** Jangan ganti ulang kode Babak 1-3 yang sudah ada. Cukup **tambahkan** elemen baru dan **modifikasi** fungsi `useTicket()` di `script.js`.

---

## 🏗️ Tahapan Implementasi

### Tahap 1: Tambahkan HTML untuk Babak 4, 5, 6 (`index.html`)

**Tambahkan kode berikut di dalam `<main id="app">`, SETELAH `<section id="envelope-section">`:**

```html
<!-- ========== BABAK 4: Karpet Merah ========== -->
<section id="red-carpet" style="display: none;" aria-label="Malam Penghargaan">
  <div class="spotlight left"></div>
  <div class="spotlight right"></div>
  <div class="award-header fade-in-child">
    <p class="award-label">✦ MALAM PENGHARGAAN TAHUNAN ✦</p>
    <h1 id="award-title" class="award-title">
      [Nama]<br/>ke-[Umur]
    </h1>
    <p class="award-sub">Satu tahun lagi penuh kenangan bersama.</p>
  </div>

  <!-- Tombol lanjut ke galeri trofi -->
  <button id="btn-to-gallery" class="btn-luxury" type="button">
    Lihat Penghargaanmu 🏆
  </button>
</section>

<!-- ========== BABAK 5: Galeri Trofi Interaktif ========== -->
<section id="trophy-gallery" style="display: none;" aria-label="Galeri Trofi">
  <h2 class="gallery-title">🏅 Daftar Penghargaanmu</h2>
  <p class="gallery-sub">Klik setiap trofi untuk membuka pesannya!</p>

  <div class="trophy-grid">

    <!-- Trofi 1 -->
    <button class="trophy-card" id="trophy-1"
      aria-label="Buka trofi Teman Ngobrol Terbaik"
      data-trophy-id="1" type="button">
      <span class="trophy-icon">🗣️</span>
      <span class="trophy-name">Teman Ngobrol<br/>Terbaik</span>
      <span class="trophy-badge">🥇</span>
    </button>

    <!-- Trofi 2 -->
    <button class="trophy-card" id="trophy-2"
      aria-label="Buka trofi Senyum Paling Bikin Salting"
      data-trophy-id="2" type="button">
      <span class="trophy-icon">😊</span>
      <span class="trophy-name">Senyum Paling<br/>Bikin Salting</span>
      <span class="trophy-badge">🥇</span>
    </button>

    <!-- Trofi 3 -->
    <button class="trophy-card" id="trophy-3"
      aria-label="Buka trofi Orang Paling Sabar"
      data-trophy-id="3" type="button">
      <span class="trophy-icon">🧘</span>
      <span class="trophy-name">Orang Paling<br/>Sabar</span>
      <span class="trophy-badge">🥇</span>
    </button>

  </div>

  <!-- Trofi Utama -->
  <div class="main-trophy-wrapper">
    <button class="trophy-main" id="trophy-main"
      aria-label="Buka trofi utama Best Person of My Year" type="button">
      <div class="main-trophy-glow"></div>
      <span class="main-trophy-icon">🏆</span>
      <span class="main-trophy-label">Best Person<br/>of My Year</span>
      <span class="main-trophy-cta">✨ Klik untuk membuka ✨</span>
    </button>
  </div>
</section>

<!-- ========== MODAL: Trofi Mini ========== -->
<div id="modal-overlay" class="modal-overlay" style="display: none;" role="dialog" aria-modal="true">
  <div id="modal-box" class="modal-box">
    <button id="modal-close" class="modal-close" aria-label="Tutup modal">✕</button>
    <div id="modal-content"></div>
  </div>
</div>

<!-- ========== MODAL: Trofi Utama (Babak 6) ========== -->
<div id="modal-main-overlay" class="modal-overlay modal-main-overlay" style="display: none;" role="dialog" aria-modal="true">
  <div id="modal-main-box" class="modal-box modal-main-box">
    <button id="modal-main-close" class="modal-close" aria-label="Tutup modal utama">✕</button>
    <div class="modal-main-content">
      <div class="main-letter-header">
        <span class="letter-sparkle">✦ ✦ ✦</span>
        <h2>Selamat Ulang Tahun! 🎂</h2>
      </div>
      <div class="letter-body">
        <p class="letter-text">
          <!-- Ganti konten surat ini sesuai kebutuhan -->
          Dear [Nama],<br/><br/>
          Setahun lagi kamu sudah berhasil menjadi versi terbaik dari dirimu sendiri.
          Setiap hari bersamamu adalah hadiah yang tidak ternilai.<br/><br/>
          Semoga di usia yang baru ini, kamu terus bersinar, terus tertawa, dan terus bikin aku salting dengan senyummu. 😊<br/><br/>
          Terima kasih sudah ada. Terima kasih sudah menjadi kamu.<br/><br/>
          Dengan sepenuh hati,<br/>
          <em>— Aku 💛</em>
        </p>
      </div>
      <div class="letter-footer">
        <button id="btn-claim-gift" class="btn-claim" type="button">
          🎁 Klaim Hadiah Nyatamu
        </button>
      </div>
    </div>
  </div>
</div>
```

> **CATATAN PENTING:**
> - Ganti `[Nama]` dan `[Umur]` di `#award-title` dengan nama dan umur asli.
> - Ganti isi surat di `.letter-text` dengan pesan ulang tahun yang personal.
> - `#modal-overlay` digunakan untuk 3 trofi mini.
> - `#modal-main-overlay` digunakan khusus untuk Trofi Utama (Babak 6).
> - Tambahkan CDN canvas-confetti di `<head>`:
>   ```html
>   <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js"></script>
>   ```

---

### Tahap 2: Tambahkan Styling CSS (`style.css`)

Tambahkan semua blok CSS berikut di bagian **paling bawah** `style.css` yang sudah ada.

#### 2.1 — Tema Babak 4: Karpet Merah Mewah

```css
/* ===== BABAK 4: RED CARPET ===== */
#red-carpet {
  width: 100%;
  text-align: center;
  padding: 20px 0;
  position: relative;
  overflow: hidden;
}

/* Background tema luxury diatur di body saat babak 4 aktif */
body.luxury-mode {
  background-color: #1a0a00;
  background-image:
    radial-gradient(circle at 50% 0%, rgba(180, 40, 40, 0.25) 0%, transparent 60%),
    radial-gradient(circle at 20% 80%, rgba(180, 130, 0, 0.15) 0%, transparent 50%);
}

/* Spotlight kiri dan kanan */
.spotlight {
  position: fixed;
  top: -40%;
  width: 200px;
  height: 140vh;
  background: linear-gradient(to bottom, rgba(255, 220, 100, 0.12), transparent);
  pointer-events: none;
  z-index: 0;
  border-radius: 50%;
}
.spotlight.left {
  left: -60px;
  transform: rotate(-15deg);
  transform-origin: top center;
  animation: spotlightSwing 5s ease-in-out infinite alternate;
}
.spotlight.right {
  right: -60px;
  transform: rotate(15deg);
  transform-origin: top center;
  animation: spotlightSwing 5s ease-in-out infinite alternate-reverse;
}

@keyframes spotlightSwing {
  from { transform: rotate(-12deg); }
  to { transform: rotate(12deg); }
}

.award-header {
  position: relative;
  z-index: 1;
  margin-bottom: 40px;
}

.award-label {
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 3px;
  color: #b45309;
  margin-bottom: 12px;
}

.award-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 2.2rem;
  font-weight: 700;
  line-height: 1.25;
  background: linear-gradient(135deg, #fef08a 0%, #f59e0b 40%, #fde68a 70%, #d97706 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 12px;
  text-shadow: none;
}

.award-sub {
  font-size: 1rem;
  color: #94a3b8;
  font-style: italic;
}

/* Tombol luxury */
.btn-luxury {
  position: relative;
  z-index: 1;
  padding: 16px 36px;
  font-size: 1.05rem;
  font-weight: 700;
  font-family: inherit;
  color: #0f172a;
  background: linear-gradient(135deg, #fef08a 0%, #fbbf24 50%, #d97706 100%);
  border: none;
  border-radius: 14px;
  cursor: pointer;
  box-shadow: 0 6px 24px rgba(251, 191, 36, 0.5);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  letter-spacing: 0.5px;
}
.btn-luxury:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(251, 191, 36, 0.65);
}
.btn-luxury:active { transform: translateY(0); }
```

#### 2.2 — Galeri Trofi 3 Card (`#trophy-gallery`)

```css
/* ===== BABAK 5: GALERI TROFI ===== */
#trophy-gallery {
  width: 100%;
  text-align: center;
  padding: 10px 0 30px;
}

.gallery-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 1.6rem;
  font-weight: 700;
  background: linear-gradient(135deg, #fef08a, #d97706);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 6px;
}

.gallery-sub {
  font-size: 0.9rem;
  color: #94a3b8;
  margin-bottom: 24px;
}

/* Grid trofi mini (3 card sejajar) */
.trophy-grid {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-bottom: 36px;
}

.trophy-card {
  flex: 1;
  min-width: 0;
  background: rgba(30, 41, 59, 0.7);
  backdrop-filter: blur(10px);
  border: 1.5px solid rgba(251, 191, 36, 0.2);
  border-radius: 18px;
  padding: 18px 8px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
  position: relative;
}

.trophy-card:hover {
  transform: translateY(-6px);
  border-color: rgba(251, 191, 36, 0.7);
  box-shadow: 0 12px 30px rgba(251, 191, 36, 0.2);
}

.trophy-icon {
  font-size: 2rem;
  display: block;
}

.trophy-name {
  font-size: 0.78rem;
  font-weight: 600;
  color: #e2e8f0;
  line-height: 1.35;
  text-align: center;
}

.trophy-badge {
  font-size: 1rem;
}

/* Efek pop saat diklik */
.trophy-card.popped {
  animation: cardPop 0.3s ease;
}
@keyframes cardPop {
  0% { transform: scale(1); }
  50% { transform: scale(1.08); }
  100% { transform: scale(1); }
}
```

#### 2.3 — Trofi Utama

```css
/* ===== TROFI UTAMA ===== */
.main-trophy-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 8px;
}

.trophy-main {
  position: relative;
  background: linear-gradient(145deg, rgba(30, 41, 59, 0.85), rgba(15, 23, 42, 0.9));
  border: 2px solid rgba(251, 191, 36, 0.5);
  border-radius: 24px;
  padding: 32px 40px;
  text-align: center;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 100%;
  max-width: 300px;
  overflow: hidden;
}

.trophy-main:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 50px rgba(251, 191, 36, 0.35);
}

.main-trophy-glow {
  position: absolute;
  width: 150px;
  height: 150px;
  background: radial-gradient(circle, rgba(251, 191, 36, 0.25) 0%, transparent 70%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: glowPulse 2.5s ease-in-out infinite;
  pointer-events: none;
}

@keyframes glowPulse {
  0%, 100% { opacity: 0.4; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 1; transform: translate(-50%, -50%) scale(1.25); }
}

.main-trophy-icon {
  font-size: 3.6rem;
  display: block;
  filter: drop-shadow(0 0 16px rgba(251, 191, 36, 0.8));
  animation: trophyFloat 2.8s ease-in-out infinite;
  z-index: 1;
}

@keyframes trophyFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.main-trophy-label {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 1.25rem;
  font-weight: 700;
  background: linear-gradient(135deg, #fef08a, #f59e0b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.3;
  z-index: 1;
}

.main-trophy-cta {
  font-size: 0.82rem;
  color: #94a3b8;
  z-index: 1;
  margin-top: 4px;
}
```

#### 2.4 — Modal (Trofi Mini & Trofi Utama)

```css
/* ===== MODAL ===== */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-box {
  background: rgba(15, 23, 42, 0.97);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 20px;
  padding: 28px 24px;
  width: 100%;
  max-width: 380px;
  position: relative;
  animation: modalIn 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes modalIn {
  from { opacity: 0; transform: scale(0.9) translateY(20px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

.modal-close {
  position: absolute;
  top: 14px;
  right: 16px;
  background: rgba(51, 65, 85, 0.6);
  border: none;
  color: #94a3b8;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-size: 0.85rem;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
}
.modal-close:hover {
  background: #ef4444;
  color: #fff;
}

/* Modal Trofi Utama */
.modal-main-box {
  background: linear-gradient(145deg, #1a0a00 0%, #1e1008 100%);
  border-color: rgba(251, 191, 36, 0.35);
  max-width: 400px;
}

.main-letter-header {
  text-align: center;
  margin-bottom: 20px;
}

.letter-sparkle {
  display: block;
  font-size: 0.85rem;
  letter-spacing: 6px;
  color: #b45309;
  margin-bottom: 8px;
}

.main-letter-header h2 {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 1.6rem;
  font-weight: 700;
  background: linear-gradient(135deg, #fef08a, #f59e0b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.letter-body {
  border-top: 1px dashed rgba(180, 83, 9, 0.3);
  border-bottom: 1px dashed rgba(180, 83, 9, 0.3);
  padding: 20px 4px;
  margin-bottom: 24px;
}

.letter-text {
  font-size: 0.975rem;
  line-height: 1.75;
  color: #e2e8f0;
  text-align: left;
}

.letter-footer {
  display: flex;
  justify-content: center;
}

/* Tombol Klaim Hadiah */
.btn-claim {
  width: 100%;
  padding: 16px 24px;
  font-size: 1rem;
  font-weight: 700;
  font-family: inherit;
  color: #0f172a;
  background: linear-gradient(135deg, #fef08a, #fbbf24, #d97706);
  border: none;
  border-radius: 14px;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(251, 191, 36, 0.45);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  letter-spacing: 0.3px;
}
.btn-claim:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 28px rgba(251, 191, 36, 0.65);
}
.btn-claim:active { transform: translateY(0); }

/* Konten modal trofi mini */
.mini-trophy-modal {
  text-align: center;
}
.mini-trophy-modal .modal-trophy-icon {
  font-size: 3rem;
  display: block;
  margin-bottom: 12px;
}
.mini-trophy-modal h3 {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 1.25rem;
  color: #fbbf24;
  margin-bottom: 10px;
}
.mini-trophy-modal p {
  font-size: 0.95rem;
  line-height: 1.65;
  color: #cbd5e1;
}
/* Foto optional (kosongkan src jika belum ada) */
.mini-trophy-modal .trophy-photo {
  width: 100%;
  max-height: 180px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 14px;
}
```

#### 2.5 — Animasi Tambahan

```css
/* Animasi child element saat section muncul */
.fade-in-child {
  animation: fadeIn 0.8s ease forwards;
}

/* Staggered delay untuk trophy card */
.trophy-card:nth-child(1) { animation-delay: 0.05s; }
.trophy-card:nth-child(2) { animation-delay: 0.15s; }
.trophy-card:nth-child(3) { animation-delay: 0.25s; }
```

---

### Tahap 3: Modifikasi & Tambahkan JavaScript (`script.js`)

#### 3.1 — Tambahkan Data Konten Trofi di CONFIG

**Tambahkan ke dalam objek `CONFIG` yang sudah ada:**

```javascript
// Tambahkan properti ini ke dalam objek CONFIG yang sudah ada
trophies: {
  1: {
    icon: '🗣️',
    title: 'Teman Ngobrol Terbaik',
    // photo: 'foto1.jpg', // Uncomment jika ada foto
    message: 'Ngobrol sama kamu itu gak pernah ada habisnya. Dari hal receh sampai hal serius, kamu selalu dengerin dengan sabar. Makasih ya udah jadi tempat cerita yang paling nyaman! 💬'
  },
  2: {
    icon: '😊',
    title: 'Senyum Paling Bikin Salting',
    // photo: 'foto2.jpg', // Uncomment jika ada foto
    message: 'Sumpah, senyummu itu harusnya masuk daftar senjata terlarang. Tiap kamu senyum, semua logikaku langsung ilang. Jangan pernah berhenti senyum ya! 😅✨'
  },
  3: {
    icon: '🧘',
    title: 'Orang Paling Sabar',
    message: 'Bisa sabar ngadepin aku yang kayak gini itu udah butuh level kesabaran setara biksu. Kamu dapet penghargaan ini karena kamu emang pantas! Makasih ya sayang 🙏😂'
  }
}
```

#### 3.2 — Ganti Fungsi `useTicket()` yang Sudah Ada

**Cari fungsi `useTicket()` di `script.js` dan ganti seluruhnya dengan:**

```javascript
// ===========================
// BABAK 4: GUNAKAN TIKET → KARPET MERAH
// ===========================
function useTicket() {
  // Tutup modal tiket jika ada
  const modalMainOverlay = document.getElementById('modal-main-overlay');

  // Sembunyikan section envelope
  const envelopeSection = document.getElementById('envelope-section');
  const redCarpet = document.getElementById('red-carpet');

  envelopeSection.classList.add('fade-out');
  document.body.classList.add('luxury-mode');

  setTimeout(() => {
    envelopeSection.style.display = 'none';
    redCarpet.style.display = 'block';
    redCarpet.classList.add('fade-in');
  }, 500);
}
```

#### 3.3 — Tambahkan Semua Fungsi Baru untuk Babak 4, 5, 6

**Tambahkan blok kode berikut di bagian bawah `script.js`, SEBELUM `document.addEventListener('DOMContentLoaded', ...)`:**

```javascript
// ===========================
// BABAK 5: TRANSISI KE GALERI TROFI
// ===========================
function transitionToGallery() {
  const redCarpet = document.getElementById('red-carpet');
  const trophyGallery = document.getElementById('trophy-gallery');

  redCarpet.classList.add('fade-out');

  setTimeout(() => {
    redCarpet.style.display = 'none';
    trophyGallery.style.display = 'block';
    trophyGallery.classList.add('fade-in');

    // Animasi masuk staggered untuk trophy card
    const cards = trophyGallery.querySelectorAll('.trophy-card');
    cards.forEach((card, i) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      setTimeout(() => {
        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 100 + i * 120);
    });
  }, 500);
}

// ===========================
// BABAK 5: BUKA MODAL TROFI MINI
// ===========================
function openTrophyModal(trophyId) {
  const data = CONFIG.trophies[trophyId];
  if (!data) return;

  const overlay = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');

  // Buat HTML konten modal
  const photoHTML = data.photo
    ? `<img src="${data.photo}" alt="${data.title}" class="trophy-photo" />`
    : '';

  content.innerHTML = `
    <div class="mini-trophy-modal">
      ${photoHTML}
      <span class="modal-trophy-icon">${data.icon}</span>
      <h3>🏅 ${data.title}</h3>
      <p>${data.message}</p>
    </div>
  `;

  overlay.style.display = 'flex';

  // Efek pop pada card yang diklik
  const card = document.getElementById(`trophy-${trophyId}`);
  if (card) {
    card.classList.add('popped');
    setTimeout(() => card.classList.remove('popped'), 300);
  }
}

function closeTrophyModal() {
  const overlay = document.getElementById('modal-overlay');
  overlay.style.display = 'none';
}

// ===========================
// BABAK 6: BUKA MODAL TROFI UTAMA + KONFETI
// ===========================
function openMainTrophy() {
  const overlay = document.getElementById('modal-main-overlay');
  overlay.style.display = 'flex';

  // Tembakkan konfeti menggunakan canvas-confetti
  fireConfetti();
}

function closeMainModal() {
  const overlay = document.getElementById('modal-main-overlay');
  overlay.style.display = 'none';
}

function fireConfetti() {
  // Pastikan library canvas-confetti sudah dimuat via CDN
  if (typeof confetti === 'undefined') {
    console.warn('canvas-confetti belum dimuat. Pastikan CDN sudah ditambahkan di <head>.');
    return;
  }

  // Tembakkan dari kiri
  confetti({
    particleCount: 80,
    angle: 60,
    spread: 55,
    origin: { x: 0, y: 0.7 },
    colors: ['#fbbf24', '#fef08a', '#f59e0b', '#fde68a', '#ffffff']
  });

  // Tembakkan dari kanan
  confetti({
    particleCount: 80,
    angle: 120,
    spread: 55,
    origin: { x: 1, y: 0.7 },
    colors: ['#fbbf24', '#fef08a', '#f59e0b', '#fde68a', '#ffffff']
  });

  // Tembakkan dari tengah atas setelah delay kecil
  setTimeout(() => {
    confetti({
      particleCount: 60,
      spread: 100,
      origin: { x: 0.5, y: 0.4 },
      colors: ['#fbbf24', '#fef08a', '#f59e0b', '#ffffff', '#ff69b4']
    });
  }, 300);
}

// ===========================
// FITUR PENUTUP: KLAIM HADIAH
// ===========================
function claimRealGift() {
  // Tutup modal dulu
  closeMainModal();

  // Untuk sekarang tampilkan alert atau arahkan ke halaman lain
  alert('🎁 Hadiah nyatamu sudah menunggumu!\nSampai ketemu ya! 💛');

  // TODO: Arahkan ke halaman hadiah atau tampilkan info lanjutan
  // Contoh: window.location.href = 'hadiah.html';
}
```

#### 3.4 — Tambahkan Event Listeners Baru di `DOMContentLoaded`

**Cari blok `document.addEventListener('DOMContentLoaded', () => {` yang sudah ada dan tambahkan listener berikut di dalamnya (sebelum penutup `});`):**

```javascript
  // ===== BABAK 4: Tombol ke Galeri Trofi =====
  const btnToGallery = document.getElementById('btn-to-gallery');
  if (btnToGallery) {
    btnToGallery.addEventListener('click', transitionToGallery);
  }

  // ===== BABAK 5: Klik 3 Trofi Mini =====
  [1, 2, 3].forEach((id) => {
    const card = document.getElementById(`trophy-${id}`);
    if (card) {
      card.addEventListener('click', () => openTrophyModal(id));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openTrophyModal(id);
        }
      });
    }
  });

  // ===== BABAK 5: Tutup Modal Mini =====
  const modalClose = document.getElementById('modal-close');
  if (modalClose) modalClose.addEventListener('click', closeTrophyModal);
  const modalOverlay = document.getElementById('modal-overlay');
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeTrophyModal();
    });
  }

  // ===== BABAK 6: Trofi Utama =====
  const trophyMain = document.getElementById('trophy-main');
  if (trophyMain) {
    trophyMain.addEventListener('click', openMainTrophy);
    trophyMain.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openMainTrophy();
      }
    });
  }

  // ===== BABAK 6: Tutup Modal Utama =====
  const modalMainClose = document.getElementById('modal-main-close');
  if (modalMainClose) modalMainClose.addEventListener('click', closeMainModal);
  const modalMainOverlay = document.getElementById('modal-main-overlay');
  if (modalMainOverlay) {
    modalMainOverlay.addEventListener('click', (e) => {
      if (e.target === modalMainOverlay) closeMainModal();
    });
  }

  // ===== FITUR PENUTUP: Klaim Hadiah =====
  const btnClaimGift = document.getElementById('btn-claim-gift');
  if (btnClaimGift) {
    btnClaimGift.addEventListener('click', claimRealGift);
  }
```

> **PENTING:** Pastikan kamu **tidak** menghapus listener yang sudah ada dari Babak 1-3. Cukup tambahkan listener baru di dalam blok yang sama.

---

### Tahap 4: Testing & Validasi

**Checklist sebelum dianggap selesai:**

#### Fungsionalitas
- [ ] Klik "Gunakan Tiket ✨" → halaman bertransisi ke Babak 4 (tema berubah jadi gelap mewah, judul "Malam Penghargaan" muncul smooth).
- [ ] Klik "Lihat Penghargaanmu 🏆" → Babak 4 fade-out, Galeri Trofi (Babak 5) muncul dengan animasi staggered.
- [ ] Klik Trofi 1 → modal terbuka dengan pesan "Teman Ngobrol Terbaik".
- [ ] Klik Trofi 2 → modal terbuka dengan pesan "Senyum Paling Bikin Salting".
- [ ] Klik Trofi 3 → modal terbuka dengan pesan "Orang Paling Sabar".
- [ ] Modal trofi mini bisa ditutup dengan tombol ✕ atau klik area luar modal.
- [ ] Klik Trofi Utama → konfeti terbang + modal surat ulang tahun muncul (Babak 6).
- [ ] Konfeti muncul dari kiri, kanan, dan tengah atas.
- [ ] Modal utama bisa ditutup dengan tombol ✕ atau klik area luar.
- [ ] Klik "Klaim Hadiah Nyatamu 🎁" → alert/navigasi terpicu.

#### Responsif & Visual
- [ ] Semua tampilan bagus di HP (lebar 360px - 414px).
- [ ] 3 trofi card tidak overflow dan rapi berjejer di HP.
- [ ] Spotlight animasi berjalan smooth di background.
- [ ] Efek glow pada Trofi Utama berjalan smooth.
- [ ] Teks gradien emas terbaca dengan jelas.
- [ ] Modal tidak overflow layar di HP.

#### Code Quality
- [ ] Tidak ada `console.error` di browser DevTools.
- [ ] Fungsi `useTicket()` yang lama sudah **diganti** (bukan dobel).
- [ ] Listener baru sudah ditambahkan di dalam `DOMContentLoaded` yang sudah ada, bukan membuat `DOMContentLoaded` baru.
- [ ] `canvas-confetti` CDN sudah ditambahkan di `<head>`.
- [ ] Data trofi tersimpan di `CONFIG.trophies`, bukan hardcoded di dalam fungsi.

---

## 🎨 Referensi Visual

```
BABAK 4 - Karpet Merah:
┌─────────────────────────────────┐
│  💡              💡             │  ← Spotlight kiri & kanan (animasi)
│                                 │
│    ✦ MALAM PENGHARGAAN ✦        │
│                                 │
│    Malam Penghargaan Tahunan    │
│    [NAMA] ke-[UMUR]             │  ← Judul gradien emas
│                                 │
│    Satu tahun lagi penuh...     │
│                                 │
│  ┌─────────────────────────┐    │
│  │  Lihat Penghargaanmu 🏆 │    │
│  └─────────────────────────┘    │
└─────────────────────────────────┘

BABAK 5 - Galeri Trofi:
┌─────────────────────────────────┐
│    🏅 Daftar Penghargaanmu      │
│                                 │
│  ┌───────┐ ┌───────┐ ┌───────┐  │
│  │  🗣️  │ │  😊  │ │  🧘  │  │
│  │Teman  │ │Senyum │ │Sabar  │  │  ← 3 Card Trofi Mini
│  │Ngobrol│ │Bikin  │ │Paling │  │
│  │Terbaik│ │Salting│ │Gok    │  │
│  └───────┘ └───────┘ └───────┘  │
│                                 │
│       ┌───────────────────┐     │
│       │    ✨ 🏆 ✨        │     │
│       │  Best Person      │     │  ← Trofi Utama (berkilau)
│       │  of My Year       │     │
│       │ ✨ Klik untuk...  │     │
│       └───────────────────┘     │
└─────────────────────────────────┘

BABAK 6 - Modal Trofi Utama + Konfeti:
🎊🎉🎊 (konfeti dari kiri, kanan, atas)

┌─────────────────────────────────┐
│  ✕                              │
│  ✦ ✦ ✦                         │
│  Selamat Ulang Tahun! 🎂        │
│  ─────────────────────────────  │
│  Dear [Nama],                   │
│  Setahun lagi kamu sudah...     │  ← Surat ulang tahun personal
│  ...                            │
│  — Aku 💛                       │
│  ─────────────────────────────  │
│  ┌─────────────────────────┐   │
│  │ 🎁 Klaim Hadiah Nyatamu │   │
│  └─────────────────────────┘   │
└─────────────────────────────────┘
```

---

## ⚠️ Catatan Penting

1. **Ganti placeholder konten:**
   - Di `#award-title` → ganti `[Nama]` dan `[Umur]` dengan data asli.
   - Di `.letter-text` → ganti isi surat dengan pesan yang lebih personal.
   - Di `CONFIG.trophies` → sesuaikan pesan tiap trofi.

2. **Foto trofi (opsional):**
   - Jika ingin menambahkan foto di modal trofi, simpan file foto di folder `ultah/` dan tambahkan property `photo: 'nama-file.jpg'` di `CONFIG.trophies`.
   - Pastikan foto landscape atau square dengan rasio yang wajar.

3. **Tombol "Klaim Hadiah" (fitur penutup):**
   - Fungsi `claimRealGift()` saat ini hanya berisi `alert`. Nanti bisa diisi navigasi ke halaman lain atau menampilkan informasi hadiah nyata.

4. **canvas-confetti CDN:**
   - Wajib ditambahkan di `<head>` sebelum `</head>`:
   ```html
   <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js"></script>
   ```
   - Tanpa ini, Trofi Utama tetap bisa diklik dan modal tetap muncul, tapi konfeti tidak akan keluar.

5. **Jangan buat halaman baru** — semua masih di `index.html` yang sama.

---

## 📎 Hubungan dengan Issue Lain

- **Depends on:** Issue #1 (Babak 1 - 3) — wajib selesai lebih dulu karena Babak 4 dipicu oleh tombol `#btn-use-ticket`.
- **Blocks:** Tidak ada — ini adalah bagian akhir dari rangkaian pengalaman interaktif.
