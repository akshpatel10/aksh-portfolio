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
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

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
      threshold: 0.1,
      rootMargin: '0px 0px -60px 0px'
    });

    revealEls.forEach(el => observer.observe(el));
  }

  // ─── SMOOTH SCROLL (fallback for older browsers) ───────────
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 64;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top, behavior: 'smooth' });
      });
    });
  }

})();
