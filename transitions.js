/**
 * TraceLock – Shared Navigation & Transition Engine
 * v4 – No opacity hacks. Clean transitions only.
 */
(function () {
    'use strict';

    /* Fade-overlay for page-exit transition */
    const overlay = document.createElement('div');
    overlay.id = 'tl-transition-overlay';
    document.body.appendChild(overlay);

    document.addEventListener('DOMContentLoaded', () => {
        highlightActiveLink();
        wireNavLinks();
        wireRipples();
        wireToggles();
        // NOTE: NO content reveal / opacity manipulation here.
        // Content is always visible. Only the overlay handles transitions.
    });

    /* ── Active sidebar link ── */
    function highlightActiveLink() {
        const currentPage = location.pathname.split('/').pop()
            || location.href.split('/').pop().split('?')[0]
            || 'index.html';

        document.querySelectorAll('aside nav a').forEach(link => {
            const linkPage = (link.getAttribute('href') || '').split('/').pop();
            const isActive = linkPage === currentPage;

            if (isActive) {
                link.className = link.className
                    .split(' ')
                    .filter(c => !c.startsWith('text-zinc') &&
                                 !c.startsWith('hover:text') &&
                                 !c.startsWith('hover:bg') &&
                                 c !== 'group')
                    .join(' ');
                link.classList.add(
                    'tl-nav-active', 'text-cyan-400',
                    'bg-cyan-400/10', 'font-bold',
                    'border', 'border-cyan-400/10'
                );
            } else {
                link.classList.remove(
                    'tl-nav-active', 'text-cyan-400',
                    'bg-cyan-400/10', 'border', 'border-cyan-400/10'
                );
            }
        });
    }

    /* ── Intercept nav clicks → fade overlay → navigate ── */
    function wireNavLinks() {
        document.querySelectorAll('aside nav a[href]').forEach(link => {
            link.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (!href || href === '#' || href.startsWith('http') || href.startsWith('mailto')) return;

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

    /* ── Ripple on buttons ── */
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
                    pointer-events:none;z-index:10;
                `;
                this.appendChild(wave);
                wave.addEventListener('animationend', () => wave.remove());
            });
        });
    }

    /* ── Toggle switches ── */
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
