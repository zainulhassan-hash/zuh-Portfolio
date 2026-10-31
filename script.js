/**
 * Zain ul Hassan — Portfolio & AURAMAX Showcase
 * Interactive Script: micro-interactions, terminal simulator, custom video controls, and animations.
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. CURRENT YEAR IN FOOTER
     ========================================================================== */
  const yearElem = document.getElementById('currentYear');
  if (yearElem) {
    yearElem.textContent = new Date().getFullYear();
  }

  /* ==========================================================================
     2. CUSTOM CURSOR FOLLOWER
     ========================================================================== */
  const cursorGlow = document.getElementById('cursorGlow');
  if (cursorGlow && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const renderCursor = () => {
      currentX += (mouseX - currentX) * 0.15;
      currentY += (mouseY - currentY) * 0.15;
      cursorGlow.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      requestAnimationFrame(renderCursor);
    };
    renderCursor();
  }

  /* ==========================================================================
     3. STICKY NAVBAR & ACTIVE SCROLL SPY
     ========================================================================== */
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link:not(.nav-cta-pill)');

  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll spy
    let currentSection = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSection = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });

    // Back to top visibility
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (backToTopBtn) {
      if (window.scrollY > 500) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Back to top action
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ==========================================================================
     4. MOBILE MENU DRAWER
     ========================================================================== */
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileDrawer) {
    const toggleMenu = () => {
      const isOpen = mobileDrawer.classList.contains('open');
      if (isOpen) {
        mobileDrawer.classList.remove('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      } else {
        mobileDrawer.classList.add('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
      }
    };

    mobileMenuBtn.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ==========================================================================
     5. INTERACTIVE TERMINAL SIMULATOR
     ========================================================================== */
  const typewriterElem = document.getElementById('terminalTypewriter');
  const terminalBody = document.getElementById('terminalBody');
  const terminalButtons = document.querySelectorAll('.t-btn');

  const typewriterPhrases = [
    'shipping prototype in 4 hours with AI agents...',
    'generating bespoke matte audio cased models for AURAMAX...',
    'synthesizing HeyGen viral video script for TikTok...',
    'scaling Shopify conversion funnel with algorithmic hooks...',
    'turning raw intuition into production software...'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 50;

  const typeCycle = () => {
    if (!typewriterElem) return;
    const currentPhrase = typewriterPhrases[phraseIndex];

    if (!isDeleting) {
      typewriterElem.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(typeCycle, 2200);
        return;
      }
    } else {
      typewriterElem.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % typewriterPhrases.length;
        setTimeout(typeCycle, 500);
        return;
      }
    }

    setTimeout(typeCycle, isDeleting ? 30 : typingSpeed);
  };

  typeCycle();

  // Terminal Script Buttons
  if (terminalButtons && terminalBody) {
    terminalButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const scriptType = btn.getAttribute('data-script');
        let output = '';

        if (scriptType === 'run-benchmarks') {
          output = `
            <div class="terminal-line t-info"><span class="t-arrow">&gt;</span> [BENCHMARK] Dev Velocity Comparison:</div>
            <div class="terminal-line"><span class="t-prompt">&bull;</span> Traditional Bureaucracy: 3-6 weeks per MVP</div>
            <div class="terminal-line t-success"><span class="t-check">&check;</span> Vibe Coding Workflow: 4-8 hours (Idea &rarr; Deployed)</div>
          `;
        } else if (scriptType === 'run-philosophy') {
          output = `
            <div class="terminal-line t-info"><span class="t-arrow">&gt;</span> [CORE RULES] Vibe Coding Manifesto:</div>
            <div class="terminal-line"><span class="t-prompt">1.</span> Intuition + Logic &gt; Endless Planning</div>
            <div class="terminal-line"><span class="t-prompt">2.</span> AI is an exoskeleton, not a replacement</div>
            <div class="terminal-line"><span class="t-prompt">3.</span> If you don't distribute, your code doesn't exist</div>
          `;
        } else if (scriptType === 'run-stack') {
          output = `
            <div class="terminal-line t-info"><span class="t-arrow">&gt;</span> [STACK] Production Ecosystem:</div>
            <div class="terminal-line"><span class="t-prompt">&bull;</span> Dev: Cursor, Antigravity, Next.js, TypeScript, Tailwind, Python</div>
            <div class="terminal-line"><span class="t-prompt">&bull;</span> Media &amp; Growth: HeyGen, CapCut Pro, TikTok Spark Ads, Shopify API</div>
          `;
        }

        // Insert output before interactive zone
        const interactiveZone = terminalBody.querySelector('.terminal-interactive-zone');
        if (interactiveZone) {
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = output;
          terminalBody.insertBefore(tempDiv, interactiveZone);
          terminalBody.scrollTop = terminalBody.scrollHeight;
        }
      });
    });
  }

  /* ==========================================================================
     6. VIDEO PLAYER CONTROLS (socialmedia.mp4)
     ========================================================================== */
  const showcaseVideo = document.getElementById('showcaseVideo');
  const videoOverlay = document.getElementById('videoOverlay');
  const playBtn = document.getElementById('playBtn');
  const playIcon = playBtn ? playBtn.querySelector('.play-icon') : null;
  const pauseIcon = playBtn ? playBtn.querySelector('.pause-icon') : null;
  const videoProgressBar = document.getElementById('videoProgressBar');
  const videoProgressContainer = document.getElementById('videoProgressContainer');
  const videoCurrentTime = document.getElementById('videoCurrentTime');
  const videoDuration = document.getElementById('videoDuration');
  const muteToggle = document.getElementById('muteToggle');
  const fullscreenToggle = document.getElementById('fullscreenToggle');

  if (showcaseVideo && videoOverlay) {
    const togglePlay = () => {
      if (showcaseVideo.paused || showcaseVideo.ended) {
        showcaseVideo.play().then(() => {
          videoOverlay.classList.add('playing');
          if (playIcon) playIcon.style.display = 'none';
          if (pauseIcon) pauseIcon.style.display = 'block';
        }).catch(err => {
          console.warn('Playback error:', err);
        });
      } else {
        showcaseVideo.pause();
        videoOverlay.classList.remove('playing');
        if (playIcon) playIcon.style.display = 'block';
        if (pauseIcon) pauseIcon.style.display = 'none';
      }
    };

    videoOverlay.addEventListener('click', togglePlay);

    // Format time (mm:ss)
    const formatTime = (seconds) => {
      const mins = Math.floor(seconds / 60) || 0;
      const secs = Math.floor(seconds % 60) || 0;
      return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    showcaseVideo.addEventListener('loadedmetadata', () => {
      if (videoDuration) {
        videoDuration.textContent = formatTime(showcaseVideo.duration);
      }
    });

    showcaseVideo.addEventListener('timeupdate', () => {
      if (showcaseVideo.duration) {
        const percent = (showcaseVideo.currentTime / showcaseVideo.duration) * 100;
        if (videoProgressBar) {
          videoProgressBar.style.width = `${percent}%`;
        }
        if (videoCurrentTime) {
          videoCurrentTime.textContent = formatTime(showcaseVideo.currentTime);
        }
      }
    });

    // Progress bar seeking
    if (videoProgressContainer) {
      videoProgressContainer.addEventListener('click', (e) => {
        const rect = videoProgressContainer.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        if (showcaseVideo.duration) {
          showcaseVideo.currentTime = pos * showcaseVideo.duration;
        }
      });
    }

    // Mute toggle
    if (muteToggle) {
      muteToggle.addEventListener('click', () => {
        showcaseVideo.muted = !showcaseVideo.muted;
        muteToggle.style.color = showcaseVideo.muted ? '#f43f5e' : '';
      });
    }

    // Fullscreen toggle
    if (fullscreenToggle) {
      fullscreenToggle.addEventListener('click', () => {
        if (!document.fullscreenElement) {
          if (showcaseVideo.requestFullscreen) {
            showcaseVideo.requestFullscreen();
          } else if (showcaseVideo.webkitRequestFullscreen) {
            showcaseVideo.webkitRequestFullscreen();
          }
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          }
        }
      });
    }

    // When video ends
    showcaseVideo.addEventListener('ended', () => {
      videoOverlay.classList.remove('playing');
      if (playIcon) playIcon.style.display = 'block';
      if (pauseIcon) pauseIcon.style.display = 'none';
    });
  }

  /* ==========================================================================
     7. CONTACT FORM TRANSMISSION & FEEDBACK
     ========================================================================== */
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const formToast = document.getElementById('formToast');

  if (contactForm && submitBtn) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('userName');
      const emailInput = document.getElementById('userEmail');
      const inquiryInput = document.getElementById('inquiryType');
      const messageInput = document.getElementById('userMessage');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const inquiry = inquiryInput ? inquiryInput.value : 'General Inquiry';
      const message = messageInput ? messageInput.value.trim() : '';

      if (!name || !email || !message) {
        alert('Please fill out all required fields (*).');
        return;
      }

      // Button loading state
      const btnText = submitBtn.querySelector('.btn-text');
      const sendIcon = submitBtn.querySelector('.send-icon');
      const originalText = btnText ? btnText.textContent : 'Transmit Message';

      if (btnText) btnText.textContent = 'Transmitting...';
      submitBtn.disabled = true;

      // Netlify Forms AJAX background submission
      const formData = new FormData(contactForm);
      if (!formData.get('form-name')) {
        formData.append('form-name', 'contact');
      }

      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
      })
      .then(() => {
        if (formToast) formToast.style.display = 'flex';
        if (btnText) btnText.textContent = 'Transmitted ✓';
        contactForm.reset();
        setTimeout(() => {
          submitBtn.disabled = false;
          if (btnText) btnText.textContent = originalText;
        }, 3500);
      })
      .catch(() => {
        // Fallback for offline / local testing
        const emailRecipient = 'ulhassanzain125@gmail.com';
        const emailSubject = encodeURIComponent(`[Portfolio Contact - ${inquiry}] from ${name}`);
        const emailBody = encodeURIComponent(
          `Hi,\n\nName: ${name}\nEmail: ${email}\nTopic: ${inquiry}\n\nMessage:\n${message}\n\nSent from Portfolio Website.`
        );
        window.location.href = `mailto:${emailRecipient}?subject=${emailSubject}&body=${emailBody}`;
        if (formToast) formToast.style.display = 'flex';
        if (btnText) btnText.textContent = 'Transmitted ✓';
        contactForm.reset();
        setTimeout(() => {
          submitBtn.disabled = false;
          if (btnText) btnText.textContent = originalText;
        }, 3500);
      });
    });
  }

  /* ==========================================================================
     8. SUBTLE 3D TILT ON HOVER (Cards with [data-tilt])
     ========================================================================== */
  const tiltElements = document.querySelectorAll('[data-tilt]');
  if (window.matchMedia('(pointer: fine)').matches) {
    tiltElements.forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -7;
        const rotateY = ((x - centerX) / centerX) * 7;

        el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });

      el.addEventListener('mouseleave', () => {
        el.style.transform = '';
      });
    });
  }

  /* ==========================================================================
     9. SMOOTH FADE-IN ON SCROLL (IntersectionObserver)
     ========================================================================== */
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.glass-card, .section-header, .product-card').forEach(elem => {
    elem.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    elem.style.opacity = '0.9';
  });

});
