// Smooth scroll active link highlight
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 120) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Animate skill bars on scroll into view
const skillBars = document.querySelectorAll('.skill-progress');
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

skillBars.forEach((bar) => observer.observe(bar));

// Mobile Nav Toggle
const mobileToggle = document.getElementById('mobileToggle');
const header = document.querySelector('header');

if (mobileToggle) {
  mobileToggle.addEventListener('click', () => {
    header.classList.toggle('mobile-nav-open');
  });
}

// Contact Form Handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    
    btn.innerHTML = '<span>Đang gửi...</span>';
    btn.style.opacity = '0.7';
    
    setTimeout(() => {
      btn.innerHTML = '<span>Gửi thành công! ✨</span>';
      btn.style.background = '#10b981';
      contactForm.reset();
      
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        btn.style.opacity = '1';
      }, 3000);
    }, 1000);
  });
}
