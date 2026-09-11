# 🎫 Issue: Implementasi Gate Teka-Teki (Babak 1 - 3)

> **Prioritas:** High  
> **Estimasi:** 4 - 6 jam kerja  
> **Teknologi:** HTML, CSS (Vanilla), JavaScript (Vanilla)  
> **Target Device:** Mobile-first, responsif di HP  

---

## 📋 Ringkasan

Buat halaman web interaktif berupa "Gate Teka-Teki" yang terdiri dari 3 babak berurutan. User harus menjawab teka-teki untuk membuka kunci dan mendapatkan Tiket VIP Emas. Halaman ini adalah bagian pertama dari pengalaman yang lebih besar (Babak 4 dst akan dibuat terpisah).

---

## 📁 Struktur File yang Harus Dibuat

```
ultah/
├── index.html      ← Struktur HTML utama
├── style.css       ← Semua styling (responsive)
└── script.js       ← Semua logika interaksi
```

> **PENTING:** Jangan gunakan framework CSS atau JS apapun. Semua ditulis vanilla. Pastikan kode bersih, modular, dan ada komentar penjelasan di setiap section.

---

## 🏗️ Tahapan Implementasi

### Tahap 1: Setup HTML Dasar (`index.html`)

**Apa yang harus dilakukan:**

1. Buat file `index.html` dengan boilerplate HTML5 standar.
2. Tambahkan `<meta name="viewport" content="width=device-width, initial-scale=1.0">` agar responsif di HP.
3. Buat struktur elemen berikut di dalam `<body>`:

```html
<!-- Container utama full-screen -->
<div id="app">

  <!-- Progress Bar (terlihat di semua babak) -->
  <div id="progress-container">
    <div id="progress-bar"></div>
    <span id="progress-text">0 / 2</span>
  </div>

  <!-- ========== BABAK 1 & 2: Card Brankas ========== -->
  <div id="vault-card">
    <h1 id="vault-title">🔒 Akses Ditolak</h1>
    <p id="vault-subtitle">Buktikan Identitasmu!</p>

    <!-- Teka-teki 1 (terlihat di awal) -->
    <div id="puzzle-1" class="puzzle-section">
      <label for="answer-1">Apa nama panggilan konyolmu dari aku?</label>
      <input type="text" id="answer-1" placeholder="Ketik jawabanmu..." autocomplete="off" />
      <button id="submit-1" class="btn-submit">Cek Jawaban</button>
      <p id="feedback-1" class="feedback"></p>
    </div>

    <!-- Teka-teki 2 (tersembunyi di awal) -->
    <div id="puzzle-2" class="puzzle-section" style="display: none;">
      <label for="answer-2">Masukkan Kode Rahasia Hari Ini!</label>
      <input type="text" id="answer-2" placeholder="Masukkan angka..." inputmode="numeric" autocomplete="off" />
      <button id="submit-2" class="btn-submit">Cek Kode</button>
      <p id="feedback-2" class="feedback"></p>
    </div>
  </div>

  <!-- ========== BABAK 3: Amplop & Tiket Emas ========== -->
  <div id="envelope-section" style="display: none;">
    <!-- Amplop (sebelum diklik) -->
    <div id="envelope" class="envelope-closed">
      <p>✉️ Klik untuk membuka!</p>
    </div>

    <!-- Tiket VIP (setelah amplop diklik, tersembunyi di awal) -->
    <div id="golden-ticket" style="display: none;">
      <h2>🎫 TIKET VIP EMAS</h2>
      <p class="ticket-message">
        "Harta karun utamanya adalah dirimu.<br/>
        Kamu diundang ke Malam Penghargaan!"
      </p>
      <button id="btn-use-ticket" class="btn-golden">Gunakan Tiket ✨</button>
    </div>
  </div>

</div>
```

4. Link file `style.css` di `<head>` dan `script.js` di akhir `<body>` (atau dengan `defer`).

> **CATATAN:** Elemen `#puzzle-2`, `#envelope-section`, dan `#golden-ticket` harus **tersembunyi** di awal (`display: none` atau class `.hidden`). Mereka akan ditampilkan oleh JavaScript sesuai alur.

---

### Tahap 2: Styling CSS (`style.css`)

**Apa yang harus dilakukan:**

#### 2.1 — Reset & Base

```css
/* Reset dasar */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', sans-serif; /* Atau import Google Font "Inter" */
  background-color: #0f172a; /* slate-900 */
  color: #f1f5f9;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

#app {
  width: 100%;
  max-width: 420px;
  padding: 20px;
  text-align: center;
}
```

#### 2.2 — Progress Bar

- Lebar penuh container, tinggi ~8px, background abu gelap.
- `#progress-bar` di dalamnya: background gradien hijau-biru, lebar berubah sesuai progress (0%, 50%, 100%).
- Tambahkan `transition: width 0.5s ease` agar smooth.
- `#progress-text` kecil di bawah bar, menunjukkan "0 / 2", "1 / 2", "2 / 2".

#### 2.3 — Card Brankas (`#vault-card`)

- Background: `rgba(30, 41, 59, 0.8)` (semi-transparan gelap).
- Border: `1px solid rgba(148, 163, 184, 0.2)`.
- Border-radius: `16px`.
- Padding: `32px 24px`.
- Box-shadow: `0 0 30px rgba(0,0,0,0.5)`.
- Tambahkan efek glassmorphism ringan: `backdrop-filter: blur(10px)`.

#### 2.4 — Input & Button

- Input: background transparan gelap, border bawah terang, font 18px, padding 12px, lebar 100%.
- Button (`.btn-submit`): background gradien biru-ungu, border-radius 12px, font bold, padding 12px 32px.
- Hover effect: sedikit scale-up (`transform: scale(1.03)`) dan shadow.
- Tambahkan `transition: all 0.2s ease`.

#### 2.5 — Feedback Text

```css
.feedback {
  margin-top: 12px;
  font-size: 14px;
  min-height: 20px;
}
.feedback.success {
  color: #4ade80; /* hijau terang */
}
.feedback.error {
  color: #f87171; /* merah terang */
}
```

#### 2.6 — Amplop (`#envelope`)

- Ukuran: ~200px x 150px, background gradien emas (`#f59e0b` ke `#d97706`).
- Border-radius: `12px`.
- Cursor: `pointer`.
- Animasi idle: `animation: float 2s ease-in-out infinite` (naik-turun pelan).
- Hover: sedikit membesar.

```css
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
```

#### 2.7 — Tiket VIP Emas (`#golden-ticket`)

- Background: gradien emas mewah (dari `#fbbf24` ke `#b45309`).
- Border: `2px solid #fde68a`.
- Border-radius: `16px`.
- Padding: `32px`.
- Color teks: warna gelap (agar kontras dengan background emas).
- Box-shadow emas: `0 0 40px rgba(251, 191, 36, 0.4)`.
- Animasi masuk: scale dari 0.8 ke 1 + fade-in.

#### 2.8 — Tombol "Gunakan Tiket" (`.btn-golden`)

- Background: warna gelap (`#1e293b`).
- Color: emas (`#fbbf24`).
- Border: `2px solid #fbbf24`.
- Border-radius: `12px`.
- Padding: `14px 36px`.
- Font bold, uppercase, letter-spacing.
- Hover: background emas, color gelap (invert).

#### 2.9 — Animasi Utilitas

```css
/* Fade out */
.fade-out {
  animation: fadeOut 0.6s ease forwards;
}
@keyframes fadeOut {
  to { opacity: 0; transform: scale(0.95); }
}

/* Fade in */
.fade-in {
  animation: fadeIn 0.6s ease forwards;
}
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

/* Shake (untuk jawaban salah) */
.shake {
  animation: shake 0.4s ease;
}
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-8px); }
  50% { transform: translateX(8px); }
  75% { transform: translateX(-4px); }
}
```

#### 2.10 — Responsive

- Pada layar kecil (`max-width: 380px`): kurangi padding dan font-size sedikit.
- Pastikan semua elemen tidak overflow secara horizontal.

> **TIP:** Gunakan `class` untuk toggle visibility (`.hidden { display: none; }`) daripada manipulasi `style.display` langsung di JS, agar lebih bersih. Tapi ini opsional, yang penting konsisten.

---

### Tahap 3: Logika JavaScript (`script.js`)

**Apa yang harus dilakukan:**

#### 3.1 — Struktur Modular

Buat kode dengan pola modular. Pisahkan logika per babak ke dalam fungsi-fungsi terpisah.

```javascript
// ===========================
// KONFIGURASI
// ===========================
const CONFIG = {
  answers: {
    puzzle1: ['beb', 'sayang'],  // lowercase, case-insensitive
    puzzle2: '1109'
  }
};

// ===========================
// STATE
// ===========================
let currentPuzzle = 1;  // Track puzzle aktif (1 atau 2)
let solvedCount = 0;    // Jumlah teka-teki terjawab (untuk progress bar)
```

#### 3.2 — Fungsi: Update Progress Bar

```javascript
function updateProgress(solved, total) {
  const percent = (solved / total) * 100;
  document.getElementById('progress-bar').style.width = percent + '%';
  document.getElementById('progress-text').textContent = `${solved} / ${total}`;
}
```

- Panggil `updateProgress(0, 2)` saat halaman pertama kali dimuat.
- Panggil `updateProgress(1, 2)` saat puzzle 1 benar.
- Panggil `updateProgress(2, 2)` saat puzzle 2 benar.

#### 3.3 — Fungsi: Cek Jawaban Puzzle 1

```javascript
function checkPuzzle1() {
  const input = document.getElementById('answer-1').value.trim().toLowerCase();
  const feedback = document.getElementById('feedback-1');

  if (CONFIG.answers.puzzle1.includes(input)) {
    // BENAR
    feedback.textContent = '✅ Benar! Kunci pertama terbuka!';
    feedback.className = 'feedback success';
    solvedCount = 1;
    updateProgress(1, 2);

    // Setelah 1.5 detik, sembunyikan puzzle 1 dan tampilkan puzzle 2
    setTimeout(() => {
      document.getElementById('puzzle-1').style.display = 'none';
      document.getElementById('puzzle-2').style.display = 'block';
      document.getElementById('puzzle-2').classList.add('fade-in');
      document.getElementById('answer-2').focus();
    }, 1500);
  } else {
    // SALAH
    feedback.textContent = '❌ Salah! Coba lagi...';
    feedback.className = 'feedback error';
    // Tambahkan efek shake pada input
    const inputEl = document.getElementById('answer-1');
    inputEl.classList.add('shake');
    setTimeout(() => inputEl.classList.remove('shake'), 400);
  }
}
```

#### 3.4 — Fungsi: Cek Jawaban Puzzle 2

```javascript
function checkPuzzle2() {
  const input = document.getElementById('answer-2').value.trim();
  const feedback = document.getElementById('feedback-2');

  if (input === CONFIG.answers.puzzle2) {
    // BENAR
    feedback.textContent = '✅ Kode diterima! Brankas terbuka!';
    feedback.className = 'feedback success';
    solvedCount = 2;
    updateProgress(2, 2);

    // Setelah 1.5 detik, transisi ke Babak 3 (amplop)
    setTimeout(() => {
      transitionToEnvelope();
    }, 1500);
  } else {
    // SALAH
    feedback.textContent = '❌ Kode salah! Coba lagi...';
    feedback.className = 'feedback error';
    const inputEl = document.getElementById('answer-2');
    inputEl.classList.add('shake');
    setTimeout(() => inputEl.classList.remove('shake'), 400);
  }
}
```

#### 3.5 — Fungsi: Transisi ke Amplop (Babak 3)

```javascript
function transitionToEnvelope() {
  const vaultCard = document.getElementById('vault-card');
  const progressContainer = document.getElementById('progress-container');
  const envelopeSection = document.getElementById('envelope-section');

  // Fade-out card brankas dan progress bar
  vaultCard.classList.add('fade-out');
  progressContainer.classList.add('fade-out');

  // Setelah animasi fade-out selesai (600ms), sembunyikan dan tampilkan amplop
  setTimeout(() => {
    vaultCard.style.display = 'none';
    progressContainer.style.display = 'none';
    envelopeSection.style.display = 'flex'; // atau 'block'
    envelopeSection.classList.add('fade-in');
  }, 600);
}
```

#### 3.6 — Fungsi: Buka Amplop → Tampilkan Tiket

```javascript
function openEnvelope() {
  const envelope = document.getElementById('envelope');
  const ticket = document.getElementById('golden-ticket');

  // Animasi amplop terbuka (fade-out amplop)
  envelope.classList.add('fade-out');

  setTimeout(() => {
    envelope.style.display = 'none';
    ticket.style.display = 'block';
    ticket.classList.add('fade-in');
  }, 600);
}
```

#### 3.7 — Fungsi: Gunakan Tiket (Transisi ke Babak 4)

```javascript
function useTicket() {
  // Untuk sekarang, tampilkan alert atau console.log
  // Nanti akan diganti dengan transisi ke Babak 4
  console.log('Transisi ke Babak 4...');
  alert('🎉 Selamat! Transisi ke Babak 4 akan segera hadir...');

  // TODO: Implementasi transisi ke Babak 4
  // Contoh: window.location.href = 'babak4.html';
  // Atau: tampilkan section babak 4 di halaman yang sama
}
```

#### 3.8 — Event Listeners

```javascript
document.addEventListener('DOMContentLoaded', () => {
  // Inisialisasi progress bar
  updateProgress(0, 2);

  // Tombol cek jawaban puzzle 1
  document.getElementById('submit-1').addEventListener('click', checkPuzzle1);

  // Tombol cek jawaban puzzle 2
  document.getElementById('submit-2').addEventListener('click', checkPuzzle2);

  // Enter key support untuk kedua input
  document.getElementById('answer-1').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') checkPuzzle1();
  });
  document.getElementById('answer-2').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') checkPuzzle2();
  });

  // Klik amplop untuk membuka
  document.getElementById('envelope').addEventListener('click', openEnvelope);

  // Tombol "Gunakan Tiket"
  document.getElementById('btn-use-ticket').addEventListener('click', useTicket);
});
```

> **PENTING:** Pastikan semua event listener dipasang di dalam `DOMContentLoaded` agar tidak error karena elemen belum ada di DOM.

---

### Tahap 4: Testing & Validasi

**Checklist yang harus dicek sebelum dianggap selesai:**

#### Fungsionalitas
- [ ] Halaman pertama kali load: hanya tampil card brankas + puzzle 1 + progress bar "0 / 2".
- [ ] Input "beb" (case-insensitive: "BEB", "Beb", "bEB") → feedback hijau → 1.5 detik → puzzle 1 hilang, puzzle 2 muncul, progress "1 / 2".
- [ ] Input "sayang" (case-insensitive) → sama seperti di atas.
- [ ] Input salah di puzzle 1 → feedback merah + efek shake.
- [ ] Input "1109" di puzzle 2 → feedback hijau → 1.5 detik → card brankas fade-out → amplop emas muncul.
- [ ] Input salah di puzzle 2 → feedback merah + efek shake.
- [ ] Klik amplop → amplop hilang → Tiket VIP Emas muncul dengan animasi.
- [ ] Klik "Gunakan Tiket" → fungsi `useTicket()` terpanggil (cek di console).
- [ ] Tekan Enter di input field → sama seperti klik tombol submit.

#### Responsif & Visual
- [ ] Tampilan bagus di HP (lebar 360px - 414px).
- [ ] Tidak ada elemen yang overflow horizontal.
- [ ] Semua animasi berjalan smooth (tidak patah-patah).
- [ ] Warna dan gradien sesuai spesifikasi.
- [ ] Progress bar beranimasi smooth saat berubah.

#### Code Quality
- [ ] Tidak ada `console.error` di browser DevTools.
- [ ] Kode JS modular (fungsi terpisah per babak).
- [ ] Ada komentar penjelasan di setiap section CSS dan JS.
- [ ] Tidak ada hardcoded value yang sulit diubah (gunakan `CONFIG`).

---

## 🎨 Referensi Visual

```
┌─────────────────────────────────┐
│  ▓▓▓▓▓░░░░░░░░░░  1 / 2        │  ← Progress Bar
│                                 │
│  ┌───────────────────────────┐  │
│  │     🔒 Akses Ditolak      │  │
│  │  Buktikan Identitasmu!    │  │
│  │                           │  │
│  │  Apa nama panggilan       │  │
│  │  konyolmu dari aku?       │  │
│  │                           │  │
│  │  ┌─────────────────────┐  │  │
│  │  │ [input jawaban]     │  │  │  ← Card Brankas
│  │  └─────────────────────┘  │  │
│  │                           │  │
│  │  ┌─────────────────────┐  │  │
│  │  │   Cek Jawaban       │  │  │
│  │  └─────────────────────┘  │  │
│  │                           │  │
│  │  ✅ Benar! / ❌ Salah!    │  │
│  └───────────────────────────┘  │
│                                 │
└─────────────────────────────────┘

        ↓ (setelah semua benar)

┌─────────────────────────────────┐
│                                 │
│         ┌───────────┐           │
│         │  ✉️       │           │
│         │  Klik     │           │  ← Amplop Emas (floating animation)
│         │  untuk    │           │
│         │  membuka! │           │
│         └───────────┘           │
│                                 │
└─────────────────────────────────┘

        ↓ (setelah amplop diklik)

┌─────────────────────────────────┐
│                                 │
│  ╔═══════════════════════════╗  │
│  ║    🎫 TIKET VIP EMAS      ║  │
│  ║                           ║  │
│  ║  "Harta karun utamanya    ║  │
│  ║   adalah dirimu.          ║  │  ← Tiket Emas (background gradien emas)
│  ║   Kamu diundang ke        ║  │
│  ║   Malam Penghargaan!"     ║  │
│  ║                           ║  │
│  ║  ┌─────────────────────┐  ║  │
│  ║  │  Gunakan Tiket ✨   │  ║  │
│  ║  └─────────────────────┘  ║  │
│  ╚═══════════════════════════╝  │
│                                 │
└─────────────────────────────────┘
```

---

## ⚠️ Catatan Penting

1. **Jangan buat Babak 4.** Issue ini hanya mencakup Babak 1 - 3. Fungsi `useTicket()` cukup berisi `console.log` atau `alert` sebagai placeholder.
2. **Mobile-first.** Desain untuk HP dulu (360px), baru tambahkan media query kalau perlu untuk layar lebih besar.
3. **Satu halaman saja.** Semua babak ada di `index.html` yang sama, ditampilkan/disembunyikan dengan JavaScript.
4. **Jangan pakai library/framework.** Pure HTML + CSS + JS saja.
5. **Test di browser HP** (atau Chrome DevTools mode responsive) sebelum dianggap selesai.

---

## 📎 Hubungan dengan Issue Lain

- **Depends on:** Tidak ada (ini adalah starting point).
- **Blocks:** Issue Babak 4 (Malam Penghargaan) — fungsi `useTicket()` akan menjadi trigger transisi ke babak berikutnya.
