/**
 * Gate Teka-Teki (Babak 1 - 3)
 * Logika interaksi modular & clean vanilla JS
 */

// ==========================================================================
// KONFIGURASI
// ==========================================================================
const CONFIG = {
  answers: {
    // Babak 1: Jawaban case-insensitive, mendukung 'beb' atau 'sayang'
    puzzle1: ['beb', 'sayang'],
    // Babak 2: Kode angka rahasia hari ini
    puzzle2: '1109'
  },
  timing: {
    transitionDelay: 1200, // delay sebelum transisi ke babak berikutnya (ms)
    animDuration: 550      // durasi fade-out / fade-in (ms)
  },
  // Konten data 3 trofi mini Babak 5
  trophies: {
    1: {
      icon: '🗣️',
      title: 'Teman Ngobrol Terbaik',
      // photo: 'foto1.jpg', // Uncomment jika ada file foto
      message: 'Ngobrol sama kamu itu gak pernah ada habisnya. Dari hal receh sampai hal serius, kamu selalu dengerin dengan sabar. Makasih ya udah jadi tempat cerita yang paling nyaman! 💬'
    },
    2: {
      icon: '😊',
      title: 'Senyum Paling Bikin Salting',
      // photo: 'foto2.jpg', // Uncomment jika ada file foto
      message: 'Sumpah, senyummu itu harusnya masuk daftar senjata terlarang. Tiap kamu senyum, semua logikaku langsung ilang. Jangan pernah berhenti senyum ya! 😅✨'
    },
    3: {
      icon: '🧘',
      title: 'Orang Paling Sabar',
      message: 'Bisa sabar ngadepin aku yang kayak gini itu udah butuh level kesabaran setara biksu. Kamu dapet penghargaan ini karena kamu emang pantas! Makasih ya sayang 🙏😂'
    }
  }
};

// ==========================================================================
// STATE
// ==========================================================================
let solvedCount = 0;
let isProcessing = false; // Mencegah double submit saat animasi transisi

// ==========================================================================
// PROGRESS BAR
// ==========================================================================
function updateProgress(solved, total = 2) {
  const progressBar = document.getElementById('progress-bar');
  const progressText = document.getElementById('progress-text');

  if (!progressBar || !progressText) return;

  const percent = Math.min(Math.round((solved / total) * 100), 100);
  progressBar.style.width = `${percent}%`;
  progressText.textContent = `${solved} / ${total}`;
}

// ==========================================================================
// BABAK 1: CEK TEKA-TEKI 1
// ==========================================================================
function checkPuzzle1() {
  if (isProcessing) return;

  const inputEl = document.getElementById('answer-1');
  const feedbackEl = document.getElementById('feedback-1');
  const value = inputEl.value.trim().toLowerCase();

  if (!value) {
    feedbackEl.textContent = 'Ketik jawabanmu terlebih dahulu ya!';
    feedbackEl.className = 'feedback error';
    shakeElement(inputEl);
    return;
  }

  if (CONFIG.answers.puzzle1.includes(value)) {
    // BENAR
    isProcessing = true;
    feedbackEl.textContent = '✅ Benar! Kunci pertama terbuka!';
    feedbackEl.className = 'feedback success';
    solvedCount = 1;
    updateProgress(1, 2);

    // Beralih ke puzzle 2 setelah jeda transisi
    setTimeout(() => {
      const puzzle1 = document.getElementById('puzzle-1');
      const puzzle2 = document.getElementById('puzzle-2');
      const input2 = document.getElementById('answer-2');

      puzzle1.style.display = 'none';
      puzzle2.style.display = 'flex';
      puzzle2.classList.add('fade-in');

      // Update header info
      const vaultTitle = document.getElementById('vault-title');
      if (vaultTitle) {
        vaultTitle.textContent = 'Tahap Terakhir';
        vaultTitle.style.color = '#38bdf8';
      }

      if (input2) {
        input2.focus();
      }
      isProcessing = false;
    }, CONFIG.timing.transitionDelay);
  } else {
    // SALAH
    feedbackEl.textContent = '❌ Masih salah nih... Coba ingat lagi!';
    feedbackEl.className = 'feedback error';
    shakeElement(inputEl);
  }
}

// ==========================================================================
// BABAK 2: CEK TEKA-TEKI 2
// ==========================================================================
function checkPuzzle2() {
  if (isProcessing) return;

  const inputEl = document.getElementById('answer-2');
  const feedbackEl = document.getElementById('feedback-2');
  const value = inputEl.value.trim();

  if (!value) {
    feedbackEl.textContent = 'Masukkan kodenya terlebih dahulu!';
    feedbackEl.className = 'feedback error';
    shakeElement(inputEl);
    return;
  }

  if (value === CONFIG.answers.puzzle2) {
    // BENAR
    isProcessing = true;
    feedbackEl.textContent = '✅ Kode diterima! Brankas terbuka!';
    feedbackEl.className = 'feedback success';
    solvedCount = 2;
    updateProgress(2, 2);

    // Menuju ke babak 3 (amplop)
    setTimeout(() => {
      transitionToEnvelope();
      isProcessing = false;
    }, CONFIG.timing.transitionDelay);
  } else {
    // SALAH
    feedbackEl.textContent = '❌ Kode rahasia salah! Coba lagi!';
    feedbackEl.className = 'feedback error';
    shakeElement(inputEl);
  }
}

// ==========================================================================
// BABAK 3: TRANSISI KE AMPLOP
// ==========================================================================
function transitionToEnvelope() {
  const vaultCard = document.getElementById('vault-card');
  const progressContainer = document.getElementById('progress-container');
  const envelopeSection = document.getElementById('envelope-section');

  // Fade out card brankas & progress bar
  vaultCard.classList.add('fade-out');
  progressContainer.classList.add('fade-out');

  setTimeout(() => {
    vaultCard.style.display = 'none';
    progressContainer.style.display = 'none';

    envelopeSection.style.display = 'flex';
    envelopeSection.classList.add('fade-in');
  }, CONFIG.timing.animDuration);
}

// ==========================================================================
// BABAK 3: BUKA AMPLOP → TIKET EMAS
// ==========================================================================
function openEnvelope() {
  const envelope = document.getElementById('envelope');
  const ticket = document.getElementById('golden-ticket');

  if (!envelope || !ticket) return;

  // Fade out amplop
  envelope.classList.add('fade-out');

  setTimeout(() => {
    envelope.style.display = 'none';
    ticket.style.display = 'block';
    ticket.classList.add('fade-in');
  }, CONFIG.timing.animDuration);
}

// ==========================================================================
// BABAK 4: GUNAKAN TIKET → KARPET MERAH
// ==========================================================================
function useTicket() {
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

// ==========================================================================
// BABAK 5: TRANSISI KE GALERI TROFI
// ==========================================================================
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

// ==========================================================================
// BABAK 5: BUKA MODAL TROFI MINI
// ==========================================================================
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

// ==========================================================================
// BABAK 6: BUKA MODAL TROFI UTAMA + KONFETI
// ==========================================================================
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

// ==========================================================================
// FITUR PENUTUP: KLAIM HADIAH
// ==========================================================================
function claimRealGift() {
  // Tutup modal dulu
  closeMainModal();

  // Tampilkan pesan konfirmasi hadiah
  alert('🎁 Hadiah nyatamu sudah menunggumu!\nSampai ketemu ya! 💛');
}

// ==========================================================================
// HELPER: ANIMASI SHAKE ELEMEN
// ==========================================================================
function shakeElement(element) {
  element.classList.remove('shake');
  // Trigger reflow untuk me-restart animasi
  void element.offsetWidth;
  element.classList.add('shake');
}

// ==========================================================================
// INISIALISASI EVENT LISTENERS
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  // Setup awal progress bar
  updateProgress(0, 2);

  // Puzzle 1 Listener
  const submit1 = document.getElementById('submit-1');
  const input1 = document.getElementById('answer-1');
  if (submit1 && input1) {
    submit1.addEventListener('click', checkPuzzle1);
    input1.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') checkPuzzle1();
    });
  }

  // Puzzle 2 Listener
  const submit2 = document.getElementById('submit-2');
  const input2 = document.getElementById('answer-2');
  if (submit2 && input2) {
    submit2.addEventListener('click', checkPuzzle2);
    input2.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') checkPuzzle2();
    });
  }

  // Amplop Listener (Klik atau Tekan Enter/Spasi saat fokus)
  const envelope = document.getElementById('envelope');
  if (envelope) {
    envelope.addEventListener('click', openEnvelope);
    envelope.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openEnvelope();
      }
    });
  }

  // Tombol Gunakan Tiket
  const btnUseTicket = document.getElementById('btn-use-ticket');
  if (btnUseTicket) {
    btnUseTicket.addEventListener('click', useTicket);
  }

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
});
