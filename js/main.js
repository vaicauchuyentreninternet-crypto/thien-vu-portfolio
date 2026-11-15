/*
 * Field report / main.js
 * Static, dependency-tolerant implementation. GSAP is enhanced only when
 * the three local vendor files have been installed (see README).
 * No network calls, smooth-scroll library, router, or build step.
 */
(() => {
  'use strict';

  const root = document.documentElement;
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointerQuery = window.matchMedia('(pointer: fine)');
  const reducedMotion = () => motionQuery.matches;
  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];
  const hasGSAP = Boolean(window.gsap);
  const hasScrollTrigger = hasGSAP && Boolean(window.ScrollTrigger);
  const hasSplitText = hasGSAP && Boolean(window.SplitText);

  if (hasGSAP) {
    const availablePlugins = [window.ScrollTrigger, window.SplitText].filter(Boolean);
    if (availablePlugins.length) window.gsap.registerPlugin(...availablePlugins);
  }

  const year = $('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());

  // Navigation stays usable by default, before JS runs, and with JS disabled.
  const header = $('#siteHeader');
  const navToggle = $('#navToggle');
  const nav = $('#siteNav');

  function closeNav({ returnFocus = false } = {}) {
    if (!header || !navToggle) return;
    const wasOpen = header.classList.contains('is-nav-open');
    header.classList.remove('is-nav-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open navigation');
    if (wasOpen && returnFocus) navToggle.focus();
  }

  if (header && navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const opening = !header.classList.contains('is-nav-open');
      header.classList.toggle('is-nav-open', opening);
      navToggle.setAttribute('aria-expanded', String(opening));
      navToggle.setAttribute('aria-label', opening ? 'Close navigation' : 'Open navigation');
      if (opening) $('a', nav)?.focus();
    });
    nav.addEventListener('click', event => {
      if (event.target.closest('a')) closeNav();
    });
    document.addEventListener('pointerdown', event => {
      if (!header.contains(event.target)) closeNav();
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') closeNav({ returnFocus: true });
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 680) closeNav();
    }, { passive: true });
  }

  let headerFrame = 0;
  function updateHeader() {
    if (headerFrame || !header) return;
    headerFrame = window.requestAnimationFrame(() => {
      header.classList.toggle('is-scrolled', window.scrollY > 48);
      headerFrame = 0;
    });
  }
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  // Keep normal URL/hash semantics. Native anchors are a robust fallback.
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link || link.classList.contains('skip-link')) return;
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
    const hash = link.getAttribute('href');
    if (!hash || hash.length < 2) return;
    const destination = document.getElementById(decodeURIComponent(hash.slice(1)));
    if (!destination) return;
    event.preventDefault();
    history.pushState(null, '', hash);
    if (!introFinished) finishIntro({ immediate: true });
    destination.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'start' });
    closeNav();
  });

  // Main mouse interaction: a genuinely accessible Before/After range control.
  const comparison = $('#comparison');
  const compareRange = $('#compareRange');
  if (comparison && compareRange) {
    const updateComparison = value => {
      const progress = Math.max(15, Math.min(85, Number(value) || 50));
      comparison.style.setProperty('--split', `${progress}%`);
      compareRange.setAttribute('aria-valuetext', `${progress} percent of the original path and ${100 - progress} percent of the improved path`);
    };
    compareRange.addEventListener('input', event => updateComparison(event.target.value));
    updateComparison(compareRange.value);
  }

  // A restrained contextual pointer, never replacing the native mouse cursor.
  const pointerNote = $('#pointerNote');
  if (pointerNote && finePointerQuery.matches && !reducedMotion()) {
    const label = $('span', pointerNote);
    let pointerFrame = 0;
    let pointerX = -100;
    let pointerY = -100;
    let activeSurface = null;

    const renderPointer = () => {
      pointerNote.style.transform = `translate3d(${pointerX - 37}px, ${pointerY - 37}px, 0) scale(1)`;
      pointerFrame = 0;
    };

    $$('[data-cursor-surface]').forEach(surface => {
      surface.addEventListener('pointerenter', event => {
        if (event.pointerType !== 'mouse') return;
        activeSurface = surface;
        if (label) label.textContent = surface.dataset.cursorLabel || 'INSPECT';
        pointerNote.classList.add('is-visible');
      });
      surface.addEventListener('pointermove', event => {
        if (event.pointerType !== 'mouse' || activeSurface !== surface) return;
        pointerX = event.clientX;
        pointerY = event.clientY;
        if (!pointerFrame) pointerFrame = requestAnimationFrame(renderPointer);
      }, { passive: true });
      surface.addEventListener('pointerleave', () => {
        activeSurface = null;
        pointerNote.classList.remove('is-visible');
      });
    });
    window.addEventListener('blur', () => pointerNote.classList.remove('is-visible'));
  }

  // On Works, the side illustration changes with mouse hover AND keyboard focus.
  const preview = $('#casePreview');
  if (preview) {
    const previewCategory = $('#previewCategory');
    const previewMetric = $('#previewMetric');
    const previewLabel = $('#previewLabel');
    const caseData = {
      catalog: { category: '01 — CATALOG AUTOMATION', metric: '60 → <7 min', label: 'Processing time per product' },
      genlogin: { category: '02 — GENLOGIN EXPLORER', metric: '2,489', label: 'Mapped nodes across 19 workflows' },
      sku: { category: '03 — SKU CLASSIFICATION', metric: '1,600+', label: 'Variants in the original catalog' },
      email: { category: '04 — NODE.JS WALKTHROUGH', metric: 'Live demo', label: 'A step-by-step email flow' }
    };
    const entries = $$('.case-entry[data-case]');
    const setPreview = key => {
      const info = caseData[key] || caseData.catalog;
      preview.dataset.mode = key || 'catalog';
      if (previewCategory) previewCategory.textContent = info.category;
      if (previewMetric) previewMetric.textContent = info.metric;
      if (previewLabel) previewLabel.textContent = info.label;
      entries.forEach(entry => entry.classList.toggle('is-selected', entry.dataset.case === key));
    };
    entries.forEach(entry => {
      entry.addEventListener('pointerenter', () => setPreview(entry.dataset.case));
      entry.addEventListener('focus', () => setPreview(entry.dataset.case));
    });
    $('.case-index__entries')?.addEventListener('pointerleave', () => setPreview('catalog'));
    setPreview('catalog');
  }

  // Entrance is shown only once per page within a browsing session.
  // New visitors may skip at any moment; returning via history does not replay it.
  const entryScreen = $('#entryScreen');
  const skipIntroButton = $('#skipIntro');
  const title = $('[data-animate-title]');
  // '/' and '/index.html' must count as the same Home page on GitHub Pages.
  const normalizedPath = location.pathname.replace(/\/index\.html$/i, '/');
  const storageKey = `ntv:seen-intro:v1:${normalizedPath}`;
  let seenIntro = false;
  try { seenIntro = sessionStorage.getItem(storageKey) === '1'; } catch (_) { /* Storage can be disabled. */ }
  const shouldIntroduce = Boolean(entryScreen && !seenIntro && !reducedMotion());
  let introFinished = !shouldIntroduce;
  let introExiting = false;
  let overlayTween = null;
  let titleTween = null;
  let titleSplit = null;
  const pageContent = $('main');
  const footer = $('.site-footer');

  function resetTitle() {
    if (titleTween) { titleTween.kill(); titleTween = null; }
    if (titleSplit) { titleSplit.revert(); titleSplit = null; }
    if (title) title.style.removeProperty('opacity');
  }

  if (shouldIntroduce && entryScreen) {
    try { sessionStorage.setItem(storageKey, '1'); } catch (_) { /* Still skip on this page. */ }
    // Header links are above the overlay and fully interactive on desktop and mobile.
    // The obscured main area is inert until the short intro has ended.
    header?.classList.add('is-intro');
    if (pageContent) pageContent.inert = true;
    if (footer) footer.inert = true;
    entryScreen.hidden = false;
    // Skip intro remains in normal keyboard order; no unsolicited focus ring.

    if (hasSplitText && title) {
      try {
        titleSplit = window.SplitText.create(title, { type: 'words', wordsClass: 'split-word', aria: 'auto' });
        window.gsap.set(titleSplit.words, { y: 35, opacity: 0 });
      } catch (_) {
        resetTitle();
      }
    }
  }

  function finishIntro({ immediate = false, focusTitle = false } = {}) {
    if (introFinished) return;
    if (introExiting && !immediate) return;
    if (overlayTween) overlayTween.kill();

    const afterExit = () => {
      if (introFinished) return;
      introFinished = true;
      header?.classList.remove('is-intro');
      if (pageContent) pageContent.inert = false;
      if (footer) footer.inert = false;
      if (entryScreen) {
        entryScreen.hidden = true;
        entryScreen.classList.remove('is-exiting');
        entryScreen.style.removeProperty('transform');
      }
      if (titleSplit && !immediate && !reducedMotion()) {
        titleTween = window.gsap.to(titleSplit.words, {
          y: 0, opacity: 1, duration: .82, ease: 'power3.out', stagger: .055,
          onComplete: resetTitle
        });
      } else {
        resetTitle();
      }
      // Only move focus to the heading when someone explicitly skips.
      // Auto-completion must not leave a decorative focus ring on the H1.
      if (focusTitle && title) {
        title.setAttribute('tabindex', '-1');
        title.focus({ preventScroll: true });
      } else if (document.activeElement === skipIntroButton) {
        skipIntroButton.blur();
      }
    };

    if (immediate || reducedMotion()) {
      afterExit();
    } else if (hasGSAP && entryScreen) {
      introExiting = true;
      overlayTween = window.gsap.to(entryScreen, {
        yPercent: -101, duration: .58, ease: 'power3.inOut', onComplete: afterExit
      });
    } else if (entryScreen) {
      introExiting = true;
      entryScreen.classList.add('is-exiting');
      entryScreen.addEventListener('transitionend', afterExit, { once: true });
      // Covers environments where transitionend never fires (background tab, etc.).
      window.setTimeout(() => { if (!entryScreen.hidden) afterExit(); }, 850);
    }
  }

  if (shouldIntroduce) {
    skipIntroButton?.addEventListener('click', () => finishIntro({ immediate: true, focusTitle: true }));
    // Do not wait on remote assets: short, finite brand intro, no artificial loading state.
    window.setTimeout(() => finishIntro(), 320);
    // Hard safety cap: never keep navigation or content behind the intro for >1.2s.
    window.setTimeout(() => finishIntro({ immediate: true }), 1200);
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') finishIntro({ immediate: true, focusTitle: true });
    });
    $('.skip-link')?.addEventListener('click', () => finishIntro({ immediate: true }));
  }

  window.addEventListener('pageshow', event => {
    if (event.persisted && entryScreen) {
      introFinished = true;
      header?.classList.remove('is-intro');
      if (pageContent) pageContent.inert = false;
      if (footer) footer.inert = false;
      if (overlayTween) overlayTween.kill();
      entryScreen.hidden = true;
      resetTitle();
    }
  });

  const onMotionChange = () => {
    if (reducedMotion()) {
      finishIntro({ immediate: true });
      root.classList.remove('has-gsap');
      if (hasScrollTrigger) window.ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    }
  };
  motionQuery.addEventListener?.('change', onMotionChange);

  // The route line is the ONLY scroll-driven motif on Home.
  // Without the local GSAP vendor, the line stays fully visible and readable.
  const routeProgress = $('.route-line__progress');
  if (routeProgress && hasScrollTrigger && !reducedMotion()) {
    root.classList.add('has-gsap');
    window.gsap.set(routeProgress, { scaleY: 0 });
    window.gsap.to(routeProgress, {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: '.journey__chapters',
        start: 'top 55%',
        end: 'bottom 55%',
        scrub: .45,
        invalidateOnRefresh: true
      }
    });
  }
})();