/* =============================================================
   AKSH PATEL — PORTFOLIO  |  script.js
   Vanilla JavaScript — no frameworks, no libraries
============================================================= */

(function () {
  'use strict';

  // ─── DOM READY ─────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    setCurrentYear();
    initMobileNav();
    initActiveNavHighlight();
    initScrollReveal();
    initSmoothScroll();
    initProjectHover();
    initNavScrollBehavior();
    initStackItemHover();
  }

  // ─── CURRENT YEAR ──────────────────────────────────────────
  function setCurrentYear() {
    const el = document.getElementById('current-year');
    if (el) el.textContent = new Date().getFullYear();
  }

  // ─── MOBILE NAV ────────────────────────────────────────────
  function initMobileNav() {
    const btn = document.getElementById('mobile-menu-btn');
    const nav = document.getElementById('mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-ext-link');

    if (!btn || !nav) return;

    function openMenu() {
      btn.setAttribute('aria-expanded', 'true');
      nav.removeAttribute('hidden');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      btn.setAttribute('aria-expanded', 'false');
      nav.setAttribute('hidden', '');
      document.body.style.overflow = '';
    }

    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      isOpen ? closeMenu() : openMenu();
    });

    // Close on link click
    mobileLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close on Escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
        closeMenu();
        btn.focus();
      }
    });
  }

  // ─── ACTIVE NAV HIGHLIGHT ──────────────────────────────────
  function initActiveNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[data-section]');

    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.section === id);
          });
        }
      });
    }, {
      rootMargin: '-40% 0px -55% 0px',
      threshold: 0
    });

    sections.forEach(s => observer.observe(s));
  }

  // ─── SCROLL REVEAL ─────────────────────────────────────────
  function initScrollReveal() {
    const revealEls = document.querySelectorAll('.reveal');
    if (!revealEls.length) return;

    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      revealEls.forEach(el => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    });

    revealEls.forEach(el => observer.observe(el));
  }

  // ─── SMOOTH SCROLL ─────────────────────────────────────────
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        const navHeight = 64;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top, behavior: 'smooth' });
      });
    });
  }

  // ─── NAV SCROLL BEHAVIOR ───────────────────────────────────
  function initNavScrollBehavior() {
    const header = document.getElementById('site-header');
    if (!header) return;

    let lastScroll = 0;
    const THRESHOLD = 80;

    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;

      // Add scrolled class for solid bg
      header.classList.toggle('scrolled', currentScroll > 20);

      // Hide/show on scroll direction
      if (currentScroll > THRESHOLD) {
        if (currentScroll > lastScroll) {
          header.classList.add('nav-hidden');
        } else {
          header.classList.remove('nav-hidden');
        }
      } else {
        header.classList.remove('nav-hidden');
      }

      lastScroll = currentScroll;
    }, { passive: true });
  }

  // ─── PROJECT HOVER INTERACTION ─────────────────────────────
  function initProjectHover() {
    const featuredVisual = document.querySelector('.project-featured-visual');
    const bars = document.querySelectorAll('.pv-bar');
    if (!featuredVisual || !bars.length) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Animate bars subtly on hover with slight stagger
    featuredVisual.addEventListener('mouseenter', () => {
      bars.forEach((bar, i) => {
        setTimeout(() => {
          bar.style.transform = 'scaleY(1.05)';
          bar.style.transformOrigin = 'bottom';
        }, i * 40);
      });
    });

    featuredVisual.addEventListener('mouseleave', () => {
      bars.forEach(bar => {
        bar.style.transform = 'scaleY(1)';
      });
    });
  }

  // ─── STACK ITEM STAGGER ────────────────────────────────────
  function initStackItemHover() {
    const stackCols = document.querySelectorAll('.stack-col');
    stackCols.forEach(col => {
      const items = col.querySelectorAll('.stack-item');
      col.addEventListener('mouseenter', () => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        items.forEach((item, i) => {
          item.style.transitionDelay = `${i * 20}ms`;
        });
      });
      col.addEventListener('mouseleave', () => {
        items.forEach(item => {
          item.style.transitionDelay = '0ms';
        });
      });
    });
  }

})();
