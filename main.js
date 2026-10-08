// Danh sách từ vựng luyện tập mỗi ngày
const vocabList = [
  {
    word: "Eloquence",
    phonetic: "/ˈel.ə.kwəns/",
    type: "Danh từ (n)",
    meaning: "Khả năng nói lưu loát, diễn đạt hùng hồn và truyền cảm hứng.",
    example: "His eloquence left a lasting impression on the listeners."
  },
  {
    word: "Perseverance",
    phonetic: "/ˌpɜː.sɪˈvɪə.rəns/",
    type: "Danh từ (n)",
    meaning: "Sự kiên trì, bền bỉ vượt qua khó khăn để đạt mục tiêu.",
    example: "Learning English requires continuous perseverance."
  },
  {
    word: "Comprehension",
    phonetic: "/ˌkɒm.prɪˈhen.ʃən/",
    type: "Danh từ (n)",
    meaning: "Khả năng thấu hiểu toàn diện một ngôn ngữ hoặc ý niệm.",
    example: "Reading newspapers improves your reading comprehension."
  },
  {
    word: "Versatile",
    phonetic: "/ˈvɜː.sə.taɪl/",
    type: "Tính từ (adj)",
    meaning: "Linh hoạt, đa năng, thích ứng nhanh với nhiều hoàn cảnh.",
    example: "English is a versatile language used globally."
  }
];

let currentVocabIdx = 0;

function updateVocabDisplay(idx) {
  const item = vocabList[idx];
  document.getElementById('vocabWord').innerText = item.word;
  document.getElementById('vocabPhonetic').innerText = `${item.phonetic} • ${item.type}`;
  document.getElementById('vocabMeaningText').innerText = item.meaning;
  document.getElementById('vocabExampleText').innerText = `Ví dụ: "${item.example}"`;
}

// Chuyển từ vựng tiếp theo
const nextVocabBtn = document.getElementById('nextVocabBtn');
if (nextVocabBtn) {
  nextVocabBtn.addEventListener('click', () => {
    currentVocabIdx = (currentVocabIdx + 1) % vocabList.length;
    updateVocabDisplay(currentVocabIdx);
  });
}

// Phát âm mẫu từ vựng (Text to Speech chuẩn giọng Anh - Mỹ)
const playAudioBtn = document.getElementById('playAudioBtn');
if (playAudioBtn) {
  playAudioBtn.addEventListener('click', () => {
    const currentWord = vocabList[currentVocabIdx].word;
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(currentWord);
      utterance.lang = 'en-US';
      utterance.rate = 0.85; // Tốc độ chuẩn cho học viên
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Trình duyệt của bạn chưa hỗ trợ phát âm tự động!");
    }
  });
}

// Quiz Mini Test tương tác
const quizOptions = document.querySelectorAll('.quiz-btn');
const quizFeedback = document.getElementById('quizFeedback');

quizOptions.forEach((btn) => {
  btn.addEventListener('click', () => {
    // Reset status
    quizOptions.forEach((b) => {
      b.classList.remove('correct', 'wrong');
      b.disabled = true;
    });

    const isCorrect = btn.getAttribute('data-correct') === 'true';
    if (isCorrect) {
      btn.classList.add('correct');
      quizFeedback.innerHTML = '🎉 <strong>Chính xác!</strong> "Fluently" là trạng từ bổ nghĩa cho động từ "speaks".';
      quizFeedback.style.background = 'rgba(16, 185, 129, 0.15)';
      quizFeedback.style.color = '#34d399';
      quizFeedback.style.border = '1px solid #10b981';
    } else {
      btn.classList.add('wrong');
      quizFeedback.innerHTML = '❌ <strong>Chưa đúng!</strong> Cần trạng từ (Adv) để bổ nghĩa cho động từ "speaks" -> Đáp án đúng là <strong>Fluently</strong>.';
      quizFeedback.style.background = 'rgba(239, 68, 68, 0.15)';
      quizFeedback.style.color = '#f87171';
      quizFeedback.style.border = '1px solid #ef4444';
    }
    quizFeedback.classList.add('show');
  });
});

// Thống kê tiến độ học (Intersection Observer)
const progressBars = document.querySelectorAll('.progress-fill');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const percent = entry.target.getAttribute('data-percent');
        entry.target.style.width = `${percent}%`;
      }
    });
  },
  { threshold: 0.3 }
);
progressBars.forEach((bar) => observer.observe(bar));

// Mobile Navigation Toggle
const mobileToggle = document.getElementById('mobileToggle');
const header = document.querySelector('header');

if (mobileToggle) {
  mobileToggle.addEventListener('click', () => {
    header.classList.toggle('mobile-nav-open');
  });
}

// Form đăng ký học thử miễn phí
const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = registerForm.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;

    btn.innerHTML = '<span>Đang ghi danh... ⏳</span>';
    btn.style.opacity = '0.7';

    setTimeout(() => {
      btn.innerHTML = '<span>Đăng ký thành công! 🎓</span>';
      btn.style.background = '#10b981';
      registerForm.reset();

      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        btn.style.opacity = '1';
      }, 4000);
    }, 1200);
  });
}
