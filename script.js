/**
 * MHI Portfolio — script.js
 * Vanilla JS: Theme, Nav, Typewriter, Terminal, Scroll Reveal,
 *             Counter Animation, Language Bars, Contact Form
 */

'use strict';

/* ════════════════════════════════════════════
   1. THEME TOGGLE  (persisted in localStorage)
   ════════════════════════════════════════════ */
(function initTheme() {
  const saved = localStorage.getItem('mhi-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  document.body.setAttribute('data-theme', saved);
})();

document.addEventListener('DOMContentLoaded', function () {

  /* ── Theme Toggle ── */
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      const current = document.body.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.body.setAttribute('data-theme', next);
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('mhi-theme', next);
    });
  }

  /* ════════════════════════════════════════════
     2. STICKY NAVBAR – add .scrolled class
     ════════════════════════════════════════════ */
  const navbar = document.getElementById('navbar');
  function onScroll() {
    if (!navbar) return;
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load

  /* ════════════════════════════════════════════
     3. ACTIVE NAV LINK (on scroll)
     ════════════════════════════════════════════ */
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNavLink() {
    let current = '';
    const scrollY = window.scrollY;
    sections.forEach(function (section) {
      const top = section.offsetTop - 100;
      if (scrollY >= top) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(function (link) {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });

  /* ════════════════════════════════════════════
     4. SMOOTH SCROLL for anchor links
     ════════════════════════════════════════════ */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href.length <= 1) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* ════════════════════════════════════════════
     5. HAMBURGER MENU (mobile)
     ════════════════════════════════════════════ */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNavOverlay');
  const mobileNavClose = document.getElementById('mobileNavClose');

  function openMobileNav() {
    if (!mobileNav || !hamburger) return;
    mobileNav.classList.add('open');
    mobileNav.setAttribute('aria-hidden', 'false');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    if (!mobileNav || !hamburger) return;
    mobileNav.classList.remove('open');
    mobileNav.setAttribute('aria-hidden', 'true');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (hamburger) hamburger.addEventListener('click', openMobileNav);
  if (mobileNavClose) mobileNavClose.addEventListener('click', closeMobileNav);

  // Close on overlay link click
  document.querySelectorAll('.mobile-nav-link').forEach(function (link) {
    link.addEventListener('click', closeMobileNav);
  });

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMobileNav();
  });

  /* ════════════════════════════════════════════
     6. TYPEWRITER EFFECT (Hero Role)
     ════════════════════════════════════════════ */
  const typewriterEl = document.getElementById('typewriter');
  const roles = [
    'Cybersecurity Analyst (Student)',
    'Frontend Developer',
    'UI/UX Designer',
    'Penetration Testing Enthusiast'
  ];
  let roleIdx = 0;
  let charIdx = 0;
  let deleting = false;
  let typeDelay = 100;

  function typeLoop() {
    if (!typewriterEl) return;
    const current = roles[roleIdx];

    if (!deleting) {
      typewriterEl.textContent = current.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        deleting = true;
        typeDelay = 2000; // pause before deleting
      } else {
        typeDelay = 60 + Math.random() * 60;
      }
    } else {
      typewriterEl.textContent = current.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        typeDelay = 300;
      } else {
        typeDelay = 35;
      }
    }
    setTimeout(typeLoop, typeDelay);
  }

  // Start after a short delay
  setTimeout(typeLoop, 1000);

  /* ════════════════════════════════════════════
     7. TERMINAL ANIMATION (Hero Card)
     ════════════════════════════════════════════ */
  const terminalBody = document.getElementById('terminalBody');
  const terminalLines = [
    { type: 'prompt', text: '$ nmap -sV --script=vuln target.lab' },
    { type: 'output', text: 'Starting Nmap 7.94 scan...' },
    { type: 'output', text: 'PORT     STATE  SERVICE   VERSION' },
    { type: 'output', text: '22/tcp   open   ssh       OpenSSH 8.9' },
    { type: 'output', text: '80/tcp   open   http      nginx 1.24.0' },
    { type: 'output', text: '443/tcp  open   https     nginx 1.24.0' },
    { type: 'warn',   text: '[!] CVE-2023-44487 detected on port 80' },
    { type: 'prompt', text: '$ burpsuite --scan-url http://target.lab' },
    { type: 'output', text: '[*] Active scan initialized...' },
    { type: 'warn',   text: '[!] XSS vector found at /search?q=' },
    { type: 'warn',   text: '[!] SQL Injection: /api/user?id=' },
    { type: 'prompt', text: '$ python exploit.py --loot' },
    { type: 'output', text: '[+] Exploit complete. Report generated.' },
    { type: 'info',   text: '[i] Security posture: Critical -> Patched' },
  ];

  let lineIdx = 0;

  function addTerminalLine() {
    if (!terminalBody) return;
    if (lineIdx >= terminalLines.length) {
      // Restart after a pause
      setTimeout(function () {
        terminalBody.innerHTML = '';
        lineIdx = 0;
        setTimeout(addTerminalLine, 600);
      }, 3500);
      return;
    }

    const item = terminalLines[lineIdx];
    const span = document.createElement('span');
    span.className = 'terminal-line terminal-' + item.type;

    // Typewriter for prompt lines, instant for output
    if (item.type === 'prompt') {
      span.textContent = '';
      terminalBody.appendChild(span);
      let ci = 0;
      const typeChar = function () {
        if (ci < item.text.length) {
          span.textContent += item.text[ci];
          ci++;
          setTimeout(typeChar, 35 + Math.random() * 30);
        } else {
          lineIdx++;
          setTimeout(addTerminalLine, 400);
        }
      };
      setTimeout(typeChar, 300);
    } else {
      span.textContent = item.text;
      terminalBody.appendChild(span);
      // Auto-scroll
      terminalBody.scrollTop = terminalBody.scrollHeight;
      lineIdx++;
      setTimeout(addTerminalLine, 350);
    }
  }

  setTimeout(addTerminalLine, 1500);

  /* ════════════════════════════════════════════
     8. INTERSECTION OBSERVER – Scroll Reveal
     ════════════════════════════════════════════ */
  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target); // only trigger once
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  document.querySelectorAll('.reveal').forEach(function (el, i) {
    // Stagger based on sibling index within parent
    const siblings = Array.from(el.parentNode.children).filter(c => c.classList.contains('reveal'));
    const sibIdx = siblings.indexOf(el);
    if (sibIdx > 0) {
      el.style.transitionDelay = (sibIdx * 0.1) + 's';
    }
    revealObserver.observe(el);
  });

  /* ════════════════════════════════════════════
     9. COUNTER ANIMATION (About Stats)
     ════════════════════════════════════════════ */
  const counters = document.querySelectorAll('.stat-number');

  const counterObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-target'));
        const suffix = el.getAttribute('data-suffix') || '';
        const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
        const duration = 1600;
        const start = performance.now();

        function tick(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          // Ease-out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          const value = eased * target;
          el.textContent = value.toFixed(decimals) + suffix;
          if (progress < 1) {
            requestAnimationFrame(tick);
          } else {
            el.textContent = target.toFixed(decimals) + suffix;
          }
        }

        requestAnimationFrame(tick);
        counterObserver.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(function (counter) {
    counterObserver.observe(counter);
  });

  /* ════════════════════════════════════════════
     10. LANGUAGE BAR ANIMATION
     ════════════════════════════════════════════ */
  const langBars = document.querySelectorAll('.language-bar-fill');

  const langObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        // The --w variable drives the width; start from 0 then set to value
        el.style.width = '0%';
        requestAnimationFrame(function () {
          el.style.width = el.style.getPropertyValue('--w') ||
            getComputedStyle(el).getPropertyValue('--w') || '0%';
        });
        langObserver.unobserve(el);
      });
    },
    { threshold: 0.4 }
  );

  langBars.forEach(function (bar) {
    // Store target width as data
    const w = bar.style.getPropertyValue('--w') || '0%';
    bar.style.width = '0%';
    langObserver.observe(bar);
  });

  /* ════════════════════════════════════════════
     11. CONTACT FORM (with client-side validation)
         Stub: ready for EmailJS / backend integration
     ════════════════════════════════════════════ */
  const contactForm = document.getElementById('contactForm');
  const formStatus  = document.getElementById('formStatus');
  const submitBtn   = document.getElementById('submitBtn');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const nameField    = document.getElementById('contactName');
      const emailField   = document.getElementById('contactEmail');
      const msgField     = document.getElementById('contactMessage');
      const nameError    = document.getElementById('nameError');
      const emailError   = document.getElementById('emailError');
      const messageError = document.getElementById('messageError');

      // Clear previous errors
      [nameField, emailField, msgField].forEach(function (f) {
        f.classList.remove('error');
      });
      nameError.textContent    = '';
      emailError.textContent   = '';
      messageError.textContent = '';
      formStatus.className     = 'form-status';
      formStatus.textContent   = '';

      // Validate
      let valid = true;

      if (!nameField.value.trim()) {
        nameError.textContent = 'Please enter your full name.';
        nameField.classList.add('error');
        valid = false;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailField.value.trim() || !emailRegex.test(emailField.value.trim())) {
        emailError.textContent = 'Please enter a valid email address.';
        emailField.classList.add('error');
        valid = false;
      }

      if (!msgField.value.trim() || msgField.value.trim().length < 10) {
        messageError.textContent = 'Message must be at least 10 characters.';
        msgField.classList.add('error');
        valid = false;
      }

      if (!valid) return;

      // Loading state
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';

      // ──────────────────────────────────────────
      // TODO: Replace this stub with your chosen
      // email service (EmailJS, Formspree, etc.)
      // Example with EmailJS:
      //
      // emailjs.send('SERVICE_ID', 'TEMPLATE_ID', {
      //   from_name: nameField.value.trim(),
      //   reply_to:  emailField.value.trim(),
      //   message:   msgField.value.trim()
      // }).then(onSuccess, onError);
      //
      // For now, we simulate a network call:
      // ──────────────────────────────────────────
      sendFormData(
        {
          name:    nameField.value.trim(),
          email:   emailField.value.trim(),
          message: msgField.value.trim()
        },
        function onSuccess() {
          formStatus.className = 'form-status success';
          formStatus.textContent = 'Thank you! Your message has been sent successfully.';
          contactForm.reset();
          submitBtn.disabled = false;
          submitBtn.innerHTML =
            '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Send Message';
        },
        function onError() {
          formStatus.className = 'form-status error';
          formStatus.textContent = 'Sorry, there was an error sending your message. Please try again.';
          submitBtn.disabled = false;
          submitBtn.innerHTML =
            '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Send Message';
        }
      );
    });
  }

  /**
   * sendFormData – Stub function ready for backend/EmailJS integration.
   * Replace the setTimeout simulation with your actual HTTP request or EmailJS call.
   *
   * @param {object}   data      - { name, email, message }
   * @param {function} onSuccess - Callback on success
   * @param {function} onError   - Callback on error
   */
  function sendFormData(data, onSuccess, onError) {
    // ── STUB: Simulates async send (replace with real integration) ──
    console.log('[Contact Form] Data to send:', data);

    // Example: Using fetch to a backend endpoint
    // fetch('/api/contact', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data)
    // })
    // .then(function (res) { if (res.ok) onSuccess(); else onError(); })
    // .catch(onError);

    // Simulate 1.5s network delay (remove when using real integration)
    setTimeout(function () {
      // Simulate success (change to onError() to test error state)
      onSuccess();
    }, 1500);
  }

  /* ════════════════════════════════════════════
     12. CARD HOVER GLOW — dynamic border glow on hover
     ════════════════════════════════════════════ */
  document.querySelectorAll('.glass-panel').forEach(function (card) {
    card.addEventListener('mouseenter', function () {
      this.style.boxShadow = 'var(--glass-shadow), 0 0 20px var(--cyan-glow-sm)';
    });
    card.addEventListener('mouseleave', function () {
      this.style.boxShadow = '';
    });
  });

  /* ════════════════════════════════════════════
     13. LANGUAGE BAR – trigger on section enter
     ════════════════════════════════════════════ */
  // Animate language bars when languages section is visible
  const langsSection = document.getElementById('languages');
  if (langsSection) {
    const sectionObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          document.querySelectorAll('.language-bar-fill').forEach(function (bar) {
            const targetW = bar.style.getPropertyValue('--w');
            // We stored --w via inline style; animate from 0
            bar.style.transition = 'width 1.4s cubic-bezier(0.4, 0, 0.2, 1)';
            bar.style.width = targetW;
          });
          sectionObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    sectionObs.observe(langsSection);
  }

  /* ════════════════════════════════════════════
     14. INIT: Hero section immediately visible
     ════════════════════════════════════════════ */
  // The hero section reveal fires on DOMContentLoaded
  setTimeout(function () {
    document.querySelectorAll('#hero .reveal').forEach(function (el, i) {
      setTimeout(function () {
        el.classList.add('visible');
      }, i * 150);
    });
  }, 100);

}); // end DOMContentLoaded