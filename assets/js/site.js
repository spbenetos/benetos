/* benetos.com — the only script on the site (~2 KB). Bloom hover, the Menu sheet, the product tabs and the
   venture carousel. Everything works without it except opening the Menu and switching tabs and ventures. */
(function () {
  'use strict';
  /* Bloom: centre the hover fill where the pointer crosses into a button, or in the middle for keyboard focus. */
  var BLOOM = '.bn-btn, .bn-ibtn, .bn-nav__menu';
  function origin(el, x, y) { el.style.setProperty('--bloom-x', x); el.style.setProperty('--bloom-y', y); }
  function cross(e) {
    var el = e.target && e.target.closest ? e.target.closest(BLOOM) : null;
    if (!el || (e.relatedTarget && el.contains(e.relatedTarget))) return;
    var r = el.getBoundingClientRect();
    origin(el, (e.clientX - r.left) + 'px', (e.clientY - r.top) + 'px');
  }
  document.addEventListener('pointerover', cross, { passive: true });
  document.addEventListener('pointerout', cross, { passive: true });
  document.addEventListener('focusin', function (e) {
    var el = e.target && e.target.closest ? e.target.closest(BLOOM) : null, kb = false;
    try { kb = !!el && el.matches(':focus-visible'); } catch (err) { kb = false; }
    if (kb) origin(el, '50%', '50%');
  });

  /* Menu: the pill toggles its sheet; Escape, a click outside or choosing a link closes it. */
  var btn = document.querySelector('.bn-nav__menu[aria-controls]');
  var sheet = btn && document.getElementById(btn.getAttribute('aria-controls'));
  if (btn && sheet) {
    var setOpen = function (open, refocus) {
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      sheet.hidden = !open;
      if (open) { var first = sheet.querySelector('a'); if (first) first.focus(); }
      else if (refocus) btn.focus();
    };
    btn.addEventListener('click', function () { setOpen(btn.getAttribute('aria-expanded') !== 'true'); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !sheet.hidden) setOpen(false, true); });
    document.addEventListener('click', function (e) {
      if (!sheet.hidden && !sheet.contains(e.target) && !btn.contains(e.target)) setOpen(false);
    });
    sheet.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
  }

  /* Tabs: click or arrow keys (Home and End too); only the selected tab is in the Tab order. */
  var lists = document.querySelectorAll('[role="tablist"]');
  Array.prototype.forEach.call(lists, function (list) {
    var tabs = Array.prototype.slice.call(list.querySelectorAll('[role="tab"]'));
    var section = list.closest('section') || document;
    var dots = section.querySelectorAll('.tab-dot');
    function select(i, focus) {
      tabs.forEach(function (t, k) {
        var on = k === i, panel = document.getElementById(t.getAttribute('aria-controls'));
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.tabIndex = on ? 0 : -1;
        if (panel) panel.hidden = !on;
      });
      Array.prototype.forEach.call(dots, function (d, k) { d.classList.toggle('is-on', k === i); });
      if (focus) tabs[i].focus();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(i); });
      t.addEventListener('keydown', function (e) {
        var n = null;
        if (e.key === 'ArrowRight') n = (i + 1) % tabs.length;
        else if (e.key === 'ArrowLeft') n = (i - 1 + tabs.length) % tabs.length;
        else if (e.key === 'Home') n = 0;
        else if (e.key === 'End') n = tabs.length - 1;
        if (n !== null) { e.preventDefault(); select(n, true); }
      });
    });
  });

  /* Venture carousel: previous and next swap the featured card and announce it. */
  var feats = Array.prototype.slice.call(document.querySelectorAll('[data-feat]'));
  if (feats.length > 1) {
    var cur = 0, live = document.getElementById('feat-live');
    var show = function (i) {
      cur = (i + feats.length) % feats.length;
      feats.forEach(function (f, k) { f.hidden = k !== cur; });
      if (live) live.textContent = 'Showing ' + feats[cur].getAttribute('data-feat-name');
    };
    var prev = document.querySelector('[data-feat-prev]'), next = document.querySelector('[data-feat-next]');
    if (prev) prev.addEventListener('click', function () { show(cur - 1); });
    if (next) next.addEventListener('click', function () { show(cur + 1); });
  }
})();
