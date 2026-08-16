/**
 * CertLab Theme — app.js
 * Vanilla JS: nav toggle, auth tabs, exam timer hook
 */

(function () {
    'use strict';

    /* ─── Mobile navigation toggle ─── */
    function initNavToggle() {
        var nav    = document.querySelector('.cl-nav');
        var toggle = document.getElementById('cl-nav-toggle');
        if (!nav || !toggle) return;

        toggle.addEventListener('click', function () {
            var open = nav.classList.toggle('cl-nav--open');
            toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        });

        // Close on outside click
        document.addEventListener('click', function (e) {
            if (nav.classList.contains('cl-nav--open') && !nav.contains(e.target)) {
                nav.classList.remove('cl-nav--open');
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    /* ─── Auth tab switcher ─── */
    function initAuthTabs() {
        var tabs = document.querySelectorAll('.cl-auth-tab');
        if (!tabs.length) return;

        tabs.forEach(function (tab) {
            tab.addEventListener('click', function () {
                var target = this.dataset.tab;

                // Deactivate all tabs & panels
                tabs.forEach(function (t) { t.classList.remove('cl-auth-tab--active'); });
                document.querySelectorAll('.cl-auth-panel').forEach(function (p) {
                    p.classList.add('cl-auth-panel--hidden');
                });

                // Activate chosen
                this.classList.add('cl-auth-tab--active');
                var panel = document.getElementById('cl-tab-' + target);
                if (panel) panel.classList.remove('cl-auth-panel--hidden');
            });
        });

        // Activate tab from URL hash (#register)
        if (window.location.hash === '#register') {
            var regTab = document.querySelector('[data-tab="register"]');
            if (regTab) regTab.click();
        }
    }

    /* ─── Exam countdown timer ─── */
    function initExamTimer() {
        var timerEl   = document.getElementById('cl-exam-timer');
        var displayEl = document.getElementById('cl-timer-display');
        if (!timerEl || !displayEl) return;

        // Look for a data attribute set by the examRunner component
        var wrapper = document.querySelector('[data-exam-duration]');
        if (!wrapper) return;

        var totalSeconds = parseInt(wrapper.dataset.examDuration, 10);
        if (!totalSeconds || totalSeconds <= 0) return;

        timerEl.style.display = 'inline-flex';
        var remaining = totalSeconds;

        function tick() {
            if (remaining <= 0) {
                displayEl.textContent = '00:00';
                timerEl.style.background = 'var(--cl-coral-l)';
                // Trigger form auto-submit if exam component has one
                var autoSubmit = document.getElementById('cl-exam-auto-submit');
                if (autoSubmit) autoSubmit.click();
                return;
            }

            var m = Math.floor(remaining / 60);
            var s = remaining % 60;
            displayEl.textContent =
                (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;

            // Warn when 5 min left
            if (remaining <= 300) {
                timerEl.style.background = 'rgba(244,108,95,.2)';
                timerEl.style.color      = '#b63029';
            }

            remaining--;
            setTimeout(tick, 1000);
        }

        tick();
    }

    /* ─── Smooth scroll for same-page anchors ─── */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
            anchor.addEventListener('click', function (e) {
                var target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    /* ─── Category updating modal ─── */
    function initUpdatingModal() {
        var modal = document.getElementById('cl-update-modal');
        if (!modal) return;

        var dialog = modal.querySelector('.cl-update-modal__dialog');
        var categoryEl = document.getElementById('cl-update-modal-category');
        var dateWrap = document.getElementById('cl-update-modal-date');
        var dateValue = document.getElementById('cl-update-modal-date-value');
        var lastTrigger = null;

        function openModal(trigger) {
            lastTrigger = trigger;
            categoryEl.textContent = trigger.dataset.categoryName || '';
            var date = trigger.dataset.updatingDate || '';
            dateValue.textContent = date;
            dateWrap.hidden = !date;
            modal.hidden = false;
            modal.setAttribute('aria-hidden', 'false');
            document.body.classList.add('cl-modal-open');
            requestAnimationFrame(function () {
                modal.classList.add('is-open');
                dialog.focus();
            });
        }

        function closeModal() {
            modal.classList.remove('is-open');
            modal.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('cl-modal-open');
            setTimeout(function () { modal.hidden = true; }, 220);
            if (lastTrigger) lastTrigger.focus();
        }

        document.querySelectorAll('.js-category-updating').forEach(function (trigger) {
            trigger.addEventListener('click', function (event) { event.preventDefault(); openModal(trigger); });
            trigger.addEventListener('keydown', function (event) {
                if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openModal(trigger); }
            });
        });
        modal.querySelectorAll('[data-update-modal-close]').forEach(function (button) { button.addEventListener('click', closeModal); });
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
        });
    }

    /* ─── Init ─── */
    document.addEventListener('DOMContentLoaded', function () {
        initNavToggle();
        initAuthTabs();
        initExamTimer();
        initSmoothScroll();
        initUpdatingModal();
    });

}());
