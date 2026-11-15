/* =========================================================
   ionique Topolino – model page interactions
   Plain JavaScript, no libraries. Safe to load with jQuery/Bootstrap.
   1. Standard / Customized toggle (hero)
   2. Two-tone colour picker (Customized Exterior)
   3. Interior carousel (A tailored cabin)
   ========================================================= */
(function () {
  'use strict';

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    var root = document.querySelector('[data-topolino]');
    if (!root) return;

    /* ---------- 1. Standard / Customized toggle ---------- */
    var toggleButtons = root.querySelectorAll('[data-topolino-version-btn]');
    var versions = root.querySelectorAll('[data-topolino-version]');
    toggleButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var target = btn.getAttribute('data-topolino-version-btn');
        toggleButtons.forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); b.classList.toggle('btn-primary', b === btn); b.classList.toggle('btn-outline-primary', b !== btn); });
        versions.forEach(function (v) {
          var active = v.getAttribute('data-topolino-version') === target;
          v.classList.toggle('d-none', !active);
          v.setAttribute('aria-hidden', String(!active));
        });
      });
    });

    /* ---------- 2. Colour picker ---------- */
    var configImg = root.querySelector('[data-topolino-config-img]');
    var configTop = root.querySelector('[data-topolino-config-top]');
    var configBody = root.querySelector('[data-topolino-config-body]');
    var swatches = root.querySelectorAll('[data-topolino-swatch]');

    // Preload the colour renders so switching is instant.
    swatches.forEach(function (s) { var i = new Image(); i.src = s.getAttribute('data-img'); });

    swatches.forEach(function (swatch) {
      swatch.addEventListener('click', function () {
        swatches.forEach(function (s) { s.setAttribute('aria-pressed', String(s === swatch)); s.classList.toggle('border-dark', s === swatch); });
        var top = swatch.getAttribute('data-top');
        var body = swatch.getAttribute('data-body');
        configImg.src = swatch.getAttribute('data-img');
        configImg.alt = 'ionique Topolino in ' + body + ' with ' + top + ' roof';
        configTop.textContent = top;
        configBody.textContent = body;
      });
    });

    // Reveal each colour gently as it enters the viewport, independent of scroll speed.
    var palette = root.querySelector('[data-topolino-palette]');
    if (palette && 'IntersectionObserver' in window && 'animate' in Element.prototype &&
        !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      var revealedColours = new WeakSet();
      var colourAnimations = new WeakMap();
      var colourObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          // Reset after scrolling back above a colour, ready for the next downward pass.
          if (!entry.isIntersecting && entry.rootBounds &&
              entry.boundingClientRect.top >= entry.rootBounds.bottom) {
            var running = colourAnimations.get(entry.target);
            if (running) running.cancel();
            colourAnimations.delete(entry.target);
            revealedColours.delete(entry.target);
            entry.target.style.opacity = '0';
          }
        });
        var visible = entries.filter(function (entry) {
          return entry.isIntersecting && !revealedColours.has(entry.target);
        });
        visible.forEach(function (entry, index) {
          revealedColours.add(entry.target);
          var animation = entry.target.animate([
            { opacity: 0, transform: 'translateY(24px)' },
            { opacity: 1, transform: 'translateY(0)' }
          ], {
            duration: 900,
            delay: Math.min(index, 5) * 70,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
            fill: 'both'
          });
          colourAnimations.set(entry.target, animation);
          animation.onfinish = function () {
            if (colourAnimations.get(entry.target) !== animation) return;
            entry.target.style.removeProperty('opacity');
            colourAnimations.delete(entry.target);
            animation.cancel();
          };
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -24px 0px' });
      Array.from(palette.children).forEach(function (colour) {
        colour.style.opacity = '0';
        colourObserver.observe(colour);
      });
    }

    /* ---------- 3. Interior carousel ---------- */
    var carousel = root.querySelector('[data-topolino-carousel]');
    if (carousel) {
      var media = carousel.querySelectorAll('[data-topolino-media]');
      var panels = carousel.querySelectorAll('[data-topolino-panel]');
      var dots = carousel.querySelectorAll('[data-topolino-dots] button');
      var count = carousel.querySelector('[data-topolino-count]');
      var total = panels.length;
      if (!total || media.length !== total || dots.length !== total) return;
      var current = 0;

      function pad(n) { return n < 10 ? '0' + n : String(n); }

      function show(index) {
        current = (index + total) % total;
        media.forEach(function (m, i) { m.classList.toggle('d-none', i !== current); m.setAttribute('aria-hidden', String(i !== current)); });
        panels.forEach(function (p, i) { p.classList.toggle('invisible', i !== current); p.setAttribute('aria-hidden', String(i !== current)); });
        dots.forEach(function (d, i) { d.setAttribute('aria-pressed', String(i === current)); d.classList.toggle('opacity-100', i === current); d.classList.toggle('opacity-25', i !== current); });
        if (count) count.textContent = pad(current + 1) + ' / ' + pad(total);
      }

      carousel.querySelector('[data-topolino-prev]').addEventListener('click', function () { show(current - 1); });
      carousel.querySelector('[data-topolino-next]').addEventListener('click', function () { show(current + 1); });
      dots.forEach(function (d, i) { d.addEventListener('click', function () { show(i); }); });

      // Keyboard: left / right arrows while focus is inside the carousel.
      carousel.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
          e.preventDefault();
          show(current + (e.key === 'ArrowRight' ? 1 : -1));
        }
      });

      // Touch swipe on the image.
      var stage = carousel.querySelector('[data-topolino-stage]');
      var startX = null;
      var startY = null;
      stage.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; startY = e.touches[0].clientY; }, { passive: true });
      stage.addEventListener('touchend', function (e) {
        if (startX === null) return;
        var dx = e.changedTouches[0].clientX - startX;
        var dy = e.changedTouches[0].clientY - startY;
        if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) show(dx < 0 ? current + 1 : current - 1);
        startX = null;
      });

      stage.addEventListener('touchcancel', function () { startX = null; startY = null; });

      show(0);
    }
  });
})();
