
document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------
   * 1. Preloader Fadeout
   * -------------------------------------------------- */
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      if (preloader) {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
      }
    }, 1200);
  });

  /* --------------------------------------------------
   * 2. Custom Dual Glow Cursor
   * -------------------------------------------------- */
  const cursorDot = document.getElementById('cursor-dot');
  const cursorOutline = document.getElementById('cursor-outline');

  if (window.innerWidth > 768) {
    window.addEventListener('mousemove', (e) => {
      const posX = e.clientX;
      const posY = e.clientY;

      cursorDot.style.left = `${posX}px`;
      cursorDot.style.top = `${posY}px`;

      cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
      }, { duration: 500, fill: "forwards" });
    });

    // Enlarge cursor on clickable items
    const clickables = document.querySelectorAll('a, button, input, textarea, .glass-card');
    clickables.forEach(item => {
      item.addEventListener('mouseenter', () => {
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorOutline.style.borderColor = 'var(--primary-blue)';
      });
      item.addEventListener('mouseleave', () => {
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorOutline.style.borderColor = 'rgba(139, 92, 246, 0.5)';
      });
    });
  }

  /* --------------------------------------------------
   * 3. Typing Animation (Hero Subtitle)
   * -------------------------------------------------- */
  const typingText = document.getElementById('typingText');
  const phrases = [
    "Frontend Developer",
    "UI/UX Designer",
    "CSE Student",
    "Problem Solver",
    "AI Enthusiast"
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
      typingText.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingText.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentPhrase.length) {
      typeSpeed = 2000; // Pause at full word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 500;
    }

    setTimeout(typeEffect, typeSpeed);
  }

  if (typingText) typeEffect();

  /* --------------------------------------------------
   * 4. Navbar Blur & Scroll Progress Bar
   * -------------------------------------------------- */
  const navbar = document.getElementById('navbar');
  const progressBar = document.getElementById('progressBar');
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    // Navbar glass toggle
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll Progress Calculation
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    if (progressBar) progressBar.style.width = scrolled + '%';

    // Back to top toggle
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* --------------------------------------------------
   * 5. Mobile Navigation Toggle
   * -------------------------------------------------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-item').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }

  /* --------------------------------------------------
   * 6. Scroll Reveal Observer (IntersectionObserver)
   * -------------------------------------------------- */
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => revealObserver.observe(el));

  /* --------------------------------------------------
   * 7. Stats Counter Animation
   * -------------------------------------------------- */
  const statNumbers = document.querySelectorAll('.stat-number');
  
  const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = +entry.target.getAttribute('data-target');
        let count = 0;
        const speed = target / 50;

        const updateCount = () => {
          count += speed;
          if (count < target) {
            entry.target.textContent = Math.ceil(count) + '+';
            setTimeout(updateCount, 30);
          } else {
            entry.target.textContent = target + '+';
          }
        };

        updateCount();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(num => statsObserver.observe(num));

  /* --------------------------------------------------
   * 8. Ripple Click Effect for Buttons
   * -------------------------------------------------- */
  const rippleButtons = document.querySelectorAll('.ripple');

  rippleButtons.forEach(button => {
    button.addEventListener('click', function (e) {
      const circle = document.createElement('span');
      const diameter = Math.max(this.clientWidth, this.clientHeight);
      const radius = diameter / 2;

      const rect = this.getBoundingClientRect();
      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - rect.left - radius}px`;
      circle.style.top = `${e.clientY - rect.top - radius}px`;
      circle.classList.add('ripple-effect');

      const existingRipple = this.querySelector('.ripple-effect');
      if (existingRipple) existingRipple.remove();

      this.appendChild(circle);
    });
  });

 /* --------------------------------------------------
 * 9. Contact Form Interactive Handler (Web3Forms API)
 * -------------------------------------------------- */
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (formStatus) {
      formStatus.textContent = "Sending message...";
      formStatus.className = "form-status";
    }

    const formData = new FormData(contactForm);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        if (formStatus) {
          formStatus.textContent = "Thank you! Your message has been sent successfully!";
          formStatus.className = "form-status success";
        }
        contactForm.reset();
      } else {
        if (formStatus) {
          formStatus.textContent = data.message || "Something went wrong!";
          formStatus.className = "form-status error";
        }
      }
    } catch (error) {
      if (formStatus) {
        formStatus.textContent = "Network error. Please check your connection.";
        formStatus.className = "form-status error";
      }
    }
  });
}
});
/* ==========================================
   MAGNETIC BUTTON EFFECT (Button moves with cursor)
   ========================================== */
const magneticBtns = document.querySelectorAll('.btn');
const cursorOutlineEl = document.getElementById('cursor-outline');

magneticBtns.forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;


    btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;

   
    if (cursorOutlineEl) {
      cursorOutlineEl.classList.add('hover-button');
    }
  });

  btn.addEventListener('mouseleave', () => {
   
    btn.style.transform = 'translate(0px, 0px)';

    
    if (cursorOutlineEl) {
      cursorOutlineEl.classList.remove('hover-button');
    }
  });
});

