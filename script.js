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
// BABAK 3: GUNAKAN TIKET (TRANSISI BABAK 4)
// ==========================================================================
function useTicket() {
  console.log('Tiket digunakan! Memicu transisi ke Babak 4...');
  alert('🎉 Tiket VIP Terverifikasi!\nSelamat! Kamu akan diarahkan ke Malam Penghargaan...');

  // Hook untuk Babak 4 kelak
  // e.g., window.dispatchEvent(new CustomEvent('gatePassed'));
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
});
