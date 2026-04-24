// ===== КОНФЕТТИ =====
function createConfetti() {
  const container = document.getElementById('confetti-container');
  const colors = ['#ff1a6b','#ff69b4','#ffd700','#00f0ff','#9b00ff','#ff8c00','#fff','#ff4d8d'];

  for (let i = 0; i < 80; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + 'vw';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDuration = (Math.random() * 4 + 3) + 's';
    piece.style.animationDelay = (Math.random() * 5) + 's';
    piece.style.width = (Math.random() * 10 + 6) + 'px';
    piece.style.height = (Math.random() * 14 + 8) + 'px';
    piece.style.opacity = Math.random();
    piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    container.appendChild(piece);
  }
}

// ===== МУЗЫКА =====
function createAudio() {
  // Генерация простой веселой мелодии через Web Audio API
  const ctx = new (window.AudioContext || window.webkitAudioContext)();

  const notes = [
    // Happy Birthday мотив
    { freq: 261.6, dur: 0.3 }, // C
    { freq: 261.6, dur: 0.15 },
    { freq: 293.7, dur: 0.45 }, // D
    { freq: 261.6, dur: 0.45 }, // C
    { freq: 349.2, dur: 0.45 }, // F
    { freq: 329.6, dur: 0.9 }, // E

    { freq: 261.6, dur: 0.3 },
    { freq: 261.6, dur: 0.15 },
    { freq: 293.7, dur: 0.45 },
    { freq: 261.6, dur: 0.45 },
    { freq: 392.0, dur: 0.45 }, // G
    { freq: 349.2, dur: 0.9 },

    { freq: 261.6, dur: 0.3 },
    { freq: 261.6, dur: 0.15 },
    { freq: 523.3, dur: 0.45 }, // C5
    { freq: 440.0, dur: 0.45 }, // A
    { freq: 349.2, dur: 0.45 },
    { freq: 329.6, dur: 0.45 },
    { freq: 293.7, dur: 0.9 },

    { freq: 466.2, dur: 0.3 },
    { freq: 466.2, dur: 0.15 },
    { freq: 440.0, dur: 0.45 },
    { freq: 349.2, dur: 0.45 },
    { freq: 392.0, dur: 0.45 },
    { freq: 349.2, dur: 0.9 },
  ];

  let time = ctx.currentTime + 0.1;

  function playMelody() {
    notes.forEach(note => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(note.freq, time);

      gain.gain.setValueAtTime(0, time);
      gain.gain.linearRampToValueAtTime(0.15, time + 0.05);
      gain.gain.linearRampToValueAtTime(0, time + note.dur - 0.05);

      osc.start(time);
      osc.stop(time + note.dur);

      time += note.dur;
    });

    // Повтор мелодии
    const totalDur = notes.reduce((s, n) => s + n.dur, 0);
    setTimeout(playMelody, totalDur * 1000 + 100);
  }

  playMelody();
}

// Запуск музыки при первом клике (политика браузеров)
let musicStarted = false;
document.addEventListener('click', () => {
  if (!musicStarted) {
    musicStarted = true;
    try { createAudio(); } catch(e) { console.log('Audio not supported'); }
  }
}, { once: false });

// ===== УПРАВЛЕНИЕ МОДАЛКАМИ =====
function openModal(name) {
  const modal = document.getElementById('modal-' + name);
  if (!modal) return;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';

  // Спецэффект: мини-взрыв конфетти при открытии
  burstConfetti();
}

function closeModal(name) {
  const modal = document.getElementById('modal-' + name);
  if (!modal) return;

  modal.classList.remove('open');
  document.body.style.overflow = '';
}

function closeModalOnBg(event, name) {
  if (event.target === event.currentTarget) {
    closeModal(name);
  }
}

// Закрытие по Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal.open').forEach(m => {
      m.classList.remove('open');
    });
    document.body.style.overflow = '';
  }
});

// ===== СЮРПРИЗ: ПЕРЕХОД НА ФАЗУ 2 =====
function goPhase2() {
  const phase1 = document.getElementById('surprise-phase-1');
  const phase2 = document.getElementById('surprise-phase-2');

  // Анимация перехода
  phase1.style.transition = 'opacity 0.5s, transform 0.5s';
  phase1.style.opacity = '0';
  phase1.style.transform = 'scale(0.8)';

  setTimeout(() => {
    phase1.style.display = 'none';
    phase2.style.display = 'block';
    phase2.style.opacity = '0';
    phase2.style.transform = 'translateY(30px)';

    requestAnimationFrame(() => {
      phase2.style.transition = 'opacity 0.5s, transform 0.5s';
      phase2.style.opacity = '1';
      phase2.style.transform = 'translateY(0)';
    });

    burstConfetti(30);
  }, 500);
}

// ===== ПРАНК КНОПКА =====
function prankClick() {
  const msg = document.getElementById('prank-msg');
  const btn = document.querySelector('.btn-prank');

  msg.style.display = 'block';
  btn.textContent = '🎉 ГОТ\'ЯА!';
  btn.style.background = 'linear-gradient(135deg, #00cc00, #008800)';

  // Мини-взрыв эмодзи
  burstEmoji();
}

// ===== МИНИ-ВЗРЫВ КОНФЕТТИ =====
function burstConfetti(count = 20) {
  const container = document.getElementById('confetti-container');
  const colors = ['#ff1a6b','#ffd700','#00f0ff','#9b00ff','#fff','#ff8c00'];

  for (let i = 0; i < count; i++) {
    const piece = document.createElement('div');
    piece.style.cssText = `
      position: fixed;
      left: ${30 + Math.random() * 40}vw;
      top: ${20 + Math.random() * 30}vh;
      width: ${Math.random() * 12 + 6}px;
      height: ${Math.random() * 12 + 6}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
      pointer-events: none;
      z-index: 10000;
      animation: confettiBurst 1.5s ease-out forwards;
      --dx: ${(Math.random() - 0.5) * 300}px;
      --dy: ${(Math.random() - 0.5) * 300}px;
    `;

    const style = document.createElement('style');
    style.textContent = `
      @keyframes confettiBurst {
        0% { transform: translate(0,0) rotate(0deg); opacity: 1; }
        100% { transform: translate(var(--dx), var(--dy)) rotate(720deg); opacity: 0; }
      }
    `;
    if (!document.querySelector('style[data-burst]')) {
      style.setAttribute('data-burst', '1');
      document.head.appendChild(style);
    }

    container.appendChild(piece);
    setTimeout(() => piece.remove(), 1500);
  }
}

// ===== ВЗРЫВ ЭМОДЗИ =====
function burstEmoji() {
  const emojis = ['💎','🎉','✨','🎊','💫','⭐','🌟','🎮'];
  const container = document.getElementById('confetti-container');

  for (let i = 0; i < 12; i++) {
    const el = document.createElement('div');
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.cssText = `
      position: fixed;
      left: ${20 + Math.random() * 60}vw;
      top: ${20 + Math.random() * 40}vh;
      font-size: ${Math.random() * 20 + 20}px;
      pointer-events: none;
      z-index: 10001;
      animation: emojiBurst 2s ease-out forwards;
    `;

    const style = document.createElement('style');
    style.textContent = `
      @keyframes emojiBurst {
        0% { transform: scale(0) rotate(0deg); opacity: 1; }
        50% { transform: scale(1.5) rotate(360deg); opacity: 1; }
        100% { transform: scale(0.5) translateY(-100px) rotate(720deg); opacity: 0; }
      }
    `;
    if (!document.querySelector('style[data-emoji-burst]')) {
      style.setAttribute('data-emoji-burst', '1');
      document.head.appendChild(style);
    }

    container.appendChild(el);
    setTimeout(() => el.remove(), 2000);
  }
}

// ===== КУРСОР (МИНИ СЕРДЕЧКИ) =====
document.addEventListener('mousemove', (e) => {
  if (Math.random() > 0.9) {
    const heart = document.createElement('div');
    heart.textContent = ['💖','✨','⭐','💫'][Math.floor(Math.random() * 4)];
    heart.style.cssText = `
      position: fixed;
      left: ${e.clientX - 10}px;
      top: ${e.clientY - 10}px;
      font-size: 16px;
      pointer-events: none;
      z-index: 9998;
      animation: heartFloat 1s ease-out forwards;
    `;

    const style = document.createElement('style');
    style.textContent = `
      @keyframes heartFloat {
        0% { transform: translateY(0) scale(1); opacity: 1; }
        100% { transform: translateY(-60px) scale(0.5); opacity: 0; }
      }
    `;
    if (!document.querySelector('style[data-heart]')) {
      style.setAttribute('data-heart', '1');
      document.head.appendChild(style);
    }

    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1000);
  }
});

// ===== ИНИЦИАЛИЗАЦИЯ =====
window.addEventListener('load', () => {
  createConfetti();
});
