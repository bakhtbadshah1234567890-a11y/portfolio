/* =============================================
   MUHAMMAD BAKHT BAIDAR – Portfolio JavaScript
============================================= */

/* ---- NAVBAR: scroll effect + hamburger ---- */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNav();
});

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('open');
});

// Close mobile nav on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

/* ---- ACTIVE NAV LINK on scroll ---- */
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 100;

  sections.forEach(section => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) {
      if (scrollPos >= top && scrollPos < bottom) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}

/* ---- HERO TYPING EFFECT ---- */
const roles = [
  'MERN Stack Developer',
  'Full-Stack Web Developer',
  'React.js Developer',
  'Node.js & Express Developer',
  'Problem Solver & Builder',
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const roleEl = document.getElementById('roleText');

function typeRole() {
  const currentRole = roles[roleIndex];
  if (isDeleting) {
    roleEl.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    roleEl.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 60 : 100;

  if (!isDeleting && charIndex === currentRole.length) {
    speed = 2000; // pause at end
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    speed = 400;
  }

  setTimeout(typeRole, speed);
}
setTimeout(typeRole, 800);

/* ---- PARTICLES ---- */
function createParticles() {
  const container = document.getElementById('particles');
  const count = 40;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    p.style.left = `${Math.random() * 100}%`;
    p.style.animationDuration = `${8 + Math.random() * 12}s`;
    p.style.animationDelay = `${Math.random() * 10}s`;
    p.style.width = p.style.height = `${1 + Math.random() * 3}px`;
    p.style.opacity = `${0.3 + Math.random() * 0.5}`;
    container.appendChild(p);
  }
}
createParticles();

/* ---- COUNTER ANIMATION ---- */
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number[data-target]');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        counter.textContent = target;
        clearInterval(timer);
      } else {
        counter.textContent = Math.floor(current);
      }
    }, 16);
  });
}

/* ---- SKILL BAR ANIMATION ---- */
function animateSkillBars() {
  const bars = document.querySelectorAll('.skill-fill');
  bars.forEach(bar => {
    const width = bar.getAttribute('data-width');
    setTimeout(() => {
      bar.style.width = width;
    }, 100);
  });
}

/* ---- INTERSECTION OBSERVER ---- */
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = entry.target;

      // Hero stats
      if (target.classList.contains('hero-stats')) {
        animateCounters();
      }

      // Skills section
      if (target.classList.contains('skills')) {
        animateSkillBars();
      }

      // Generic fade-in
      target.classList.add('visible');
      observer.unobserve(target);
    }
  });
}, observerOptions);

// Observe sections
document.querySelectorAll('.section, .hero-stats, .skills').forEach(el => {
  observer.observe(el);
});

// Observe cards with delay
document.querySelectorAll('.project-card, .skill-card, .timeline-content, .info-card').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = `opacity 0.5s ${i * 0.08}s ease, transform 0.5s ${i * 0.08}s ease`;

  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  cardObserver.observe(el);
});

/* ---- SKILLS TABS ---- */
const tabBtns = document.querySelectorAll('.tab-btn');
const panels = document.querySelectorAll('.skills-panel');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.getAttribute('data-tab');

    tabBtns.forEach(b => b.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));

    btn.classList.add('active');
    const targetPanel = document.getElementById(`tab-${tab}`);
    if (targetPanel) {
      targetPanel.classList.add('active');
      // Re-animate bars in new tab
      targetPanel.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = '0%';
        setTimeout(() => {
          bar.style.width = bar.getAttribute('data-width');
        }, 50);
      });
    }
  });
});

// Animate bars on page load for active panel
setTimeout(animateSkillBars, 500);

/* ---- CONTACT FORM ---- */
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const btn = contactForm.querySelector('button[type="submit"]');
  const originalText = btn.innerHTML;

  btn.innerHTML = '<span>Sending...</span>';
  btn.disabled = true;

  // Simulate send (replace with real email service like EmailJS or Formspree)
  setTimeout(() => {
    formStatus.textContent = '✅ Message sent! I will get back to you soon.';
    formStatus.className = 'form-status success';
    contactForm.reset();
    btn.innerHTML = originalText;
    btn.disabled = false;

    setTimeout(() => {
      formStatus.className = 'form-status';
    }, 5000);
  }, 1500);
});

/* ---- SMOOTH SCROLL FOR ANCHOR LINKS ---- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ---- CURSOR GLOW EFFECT ---- */
let cursorGlow = document.createElement('div');
cursorGlow.style.cssText = `
  position: fixed;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(0, 245, 255, 0.06) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
  z-index: 0;
  transition: left 0.1s ease, top 0.1s ease;
`;
document.body.appendChild(cursorGlow);

document.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = `${e.clientX}px`;
  cursorGlow.style.top = `${e.clientY}px`;
});

/* ---- CONSOLE EASTER EGG ---- */
console.log(`
%c
 __  __ ____  ____  
|  \\/  | __ )| __ ) 
| |\\/| |  _ \\|  _ \\ 
| |  | | |_) | |_) |
|_|  |_|____/|____/ 

%cHey there, fellow developer! 👋
I see you're checking the source code — nice move!
I'm Muhammad Bakht Baidar.
MERN Stack & Full-Stack Web Developer.
Let's connect! 🚀
`, 
'color: #00f5ff; font-family: monospace; font-size: 14px;',
'color: #8099b4; font-family: monospace; font-size: 13px;'
);