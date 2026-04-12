/**
 * TraceLock – Shared Navigation & Transition Engine
 * v3 – Clean: no opacity hacks, reliable content reveal
 */
(function () {
    'use strict';

    /* ─────────────────────────────────────────
       1. Fade-overlay (page-exit transition)
    ───────────────────────────────────────── */
    const overlay = document.createElement('div');
    overlay.id = 'tl-transition-overlay';
    document.body.appendChild(overlay);

    /* ─────────────────────────────────────────
       2. On DOM ready
    ───────────────────────────────────────── */
    document.addEventListener('DOMContentLoaded', () => {
        // Animate <main> in via CSS class (no opacity:0 on children)
        const main = document.querySelector('main');
        if (main) main.classList.add('tl-page-enter');

        highlightActiveLink();
        wireNavLinks();
        wireRipples();
        wireToggles();
    });

    /* ─────────────────────────────────────────
       3. Mark the correct active sidebar link
    ───────────────────────────────────────── */
    function highlightActiveLink() {
        const raw = location.pathname.split('/').pop()
            || location.href.split('/').pop().split('?')[0]
            || '';
        const currentPage = raw || 'index.html';

        document.querySelectorAll('aside nav a').forEach(link => {
            const linkPage = (link.getAttribute('href') || '').split('/').pop();
            const isActive = linkPage === currentPage;

            if (isActive) {
                // Remove all zinc / hover colour classes
                link.className = link.className
                    .split(' ')
                    .filter(c => !c.startsWith('text-zinc') &&
                                 !c.startsWith('hover:text') &&
                                 !c.startsWith('hover:bg'))
                    .join(' ');

                link.classList.add(
                    'tl-nav-active',
                    'text-cyan-400',
                    'bg-cyan-400/10',
                    'font-bold',
                    'border',
                    'border-cyan-400/10'
                );
            } else {
                // Remove active classes so only one link is active
                link.classList.remove(
                    'tl-nav-active', 'text-cyan-400',
                    'bg-cyan-400/10', 'border', 'border-cyan-400/10'
                );
            }
        });
    }

    /* ─────────────────────────────────────────
       4. Intercept sidebar clicks → fade → navigate
    ───────────────────────────────────────── */
    function wireNavLinks() {
        document.querySelectorAll('aside nav a[href]').forEach(link => {
            link.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (!href || href === '#' || href.startsWith('http') || href.startsWith('mailto')) return;

                // Skip if already on this page
                const targetPage  = href.split('/').pop();
                const currentPage = location.pathname.split('/').pop()
                    || location.href.split('/').pop().split('?')[0];
                if (targetPage === currentPage) return;

                e.preventDefault();
                overlay.classList.add('fade-out');
                setTimeout(() => { window.location.href = href; }, 320);
            });
        });
    }

    /* ─────────────────────────────────────────
       5. Ripple effect on buttons
    ───────────────────────────────────────── */
    function wireRipples() {
        document.querySelectorAll('button').forEach(btn => {
            btn.style.position = 'relative';
            btn.style.overflow = 'hidden';

            btn.addEventListener('click', function (e) {
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height) * 2.5;
                const wave = document.createElement('span');
                wave.style.cssText = `
                    position:absolute;border-radius:50%;
                    width:${size}px;height:${size}px;
                    left:${e.clientX - rect.left - size / 2}px;
                    top:${e.clientY - rect.top  - size / 2}px;
                    background:rgba(255,255,255,0.1);
                    transform:scale(0);
                    animation:tlRipple 0.6s linear forwards;
                    pointer-events:none;z-index:999;
                `;
                this.appendChild(wave);
                wave.addEventListener('animationend', () => wave.remove());
            });
        });
    }

    /* ─────────────────────────────────────────
       6. Animated toggle switches
    ───────────────────────────────────────── */
    function wireToggles() {
        document.querySelectorAll('button').forEach(btn => {
            const track = btn.querySelector('div.rounded-full');
            const thumb = btn.querySelector('div.absolute');
            if (!track || !thumb) return;

            let isOn = [...track.classList].some(c =>
                c.includes('primary-container') || c.includes('cyan')
            );

            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                isOn = !isOn;
                track.style.transition = 'background 0.3s ease';
                track.style.background = isOn ? '#00d1ff' : 'rgba(255,255,255,0.08)';
                thumb.style.transition = 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1)';
                thumb.style.transform  = isOn ? 'translateX(20px)' : 'translateX(0)';
            });
        });
    }

})();
