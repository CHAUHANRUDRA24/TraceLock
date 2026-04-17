/**
 * TraceLock – Shared Navigation & Transition Engine
 * v5 – Unified Tab & Page Management
 */
(function () {
    'use strict';

    // Global Overlay
    let overlay = document.getElementById('tl-transition-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'tl-transition-overlay';
        document.body.appendChild(overlay);
    }

    document.addEventListener('DOMContentLoaded', () => {
        // Initial reveal
        setTimeout(() => {
            overlay.classList.add('loaded');
            revealContent();
        }, 100);

        initializeNavigation();
        wireRipples();
        wireToggles();
    });

    /**
     * Reveal page content with a stagger effect
     */
    function revealContent() {
        const main = document.querySelector('main');
        if (main) {
            main.classList.add('tl-page-enter');
        }

        // Handle generic reveal items
        document.querySelectorAll('.reveal-item').forEach((item, i) => {
            item.style.animationDelay = `${i * 0.1}s`;
            item.classList.add('reveal-visible');
        });
    }

    /**
     * Logic for highlighting active links and intercepting clicks
     */
    function initializeNavigation() {
        const currentPath = window.location.pathname;
        const currentPage = currentPath.split('/').pop() || 'index.html';

        // 1. Highlight Sidebar Links
        document.querySelectorAll('aside nav a, .sidebar nav a').forEach(link => {
            link.classList.add('tl-nav-link');
            const href = link.getAttribute('href');
            if (href && (href === currentPage || (currentPage === 'index.html' && href === '/'))) {
                link.classList.add('tl-nav-active-sidebar');
            }
            
            link.addEventListener('click', handleNavClick);
        });

        // 2. Highlight Header Tabs (Top Nav)
        document.querySelectorAll('header nav a, nav.fixed a').forEach(link => {
            link.classList.add('tl-nav-link');
            
            // For now, these use '#' so we check text content or dummy state
            // If it's a real page link, it will be handled by the logic above
            const href = link.getAttribute('href');
            if (href && href !== '#' && href === currentPage) {
                link.classList.add('tl-nav-active-header');
            }

            link.addEventListener('click', (e) => {
                if (link.getAttribute('href') === '#') {
                    e.preventDefault();
                    // Smooth switch for header "tabs"
                    const parent = link.parentElement;
                    parent.querySelectorAll('a').forEach(a => a.classList.remove('tl-nav-active-header', 'text-cyan-400', 'border-b-2', 'border-cyan-400'));
                    
                    link.classList.add('tl-nav-active-header');
                    
                    // Simulate content refresh
                    const main = document.querySelector('main');
                    if (main) {
                        main.classList.remove('tl-refresh-pulse');
                        void main.offsetWidth; // Trigger reflow
                        main.classList.add('tl-refresh-pulse');
                    }
                } else {
                    handleNavClick(e);
                }
            });
        });

        // 3. Catch-all for other internal links
        document.querySelectorAll('a[href]').forEach(link => {
            const href = link.getAttribute('href');
            if (href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('mailto') && !link.classList.contains('tl-nav-link')) {
                link.addEventListener('click', handleNavClick);
            }
        });
    }

    /**
     * Shared click handler for smooth page transitions
     */
    function handleNavClick(e) {
        const href = e.currentTarget.getAttribute('href');
        if (!href || href === '#' || href.startsWith('http')) return;

        const targetPage = href.split('/').pop();
        const currentPath = window.location.pathname;
        const currentPage = currentPath.split('/').pop() || 'index.html';

        if (targetPage === currentPage) {
            e.preventDefault();
            return;
        }

        e.preventDefault();
        overlay.classList.remove('loaded');
        overlay.classList.add('fade-out');

        setTimeout(() => {
            window.location.href = href;
        }, 400);
    }

    /**
     * Ripple on buttons and interactive elements
     */
    function wireRipples() {
        const elements = document.querySelectorAll('button, .glass-card, .activity-item, a.rounded-xl');
        elements.forEach(el => {
            if (getComputedStyle(el).position === 'static') {
                el.style.position = 'relative';
            }
            el.style.overflow = 'hidden';

            el.addEventListener('mousedown', function (e) {
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height) * 1.5;
                const ripple = document.createElement('span');
                
                ripple.className = 'tl-ripple';
                ripple.style.width = ripple.style.height = `${size}px`;
                ripple.style.left = `${e.clientX - rect.left - size/2}px`;
                ripple.style.top = `${e.clientY - rect.top - size/2}px`;

                this.appendChild(ripple);
                ripple.addEventListener('animationend', () => ripple.remove());
            });
        });
    }

    /**
     * Unified logic for toggle UI components
     */
    function wireToggles() {
        document.querySelectorAll('button').forEach(btn => {
            const track = btn.querySelector('div.rounded-full');
            const thumb = btn.querySelector('div.absolute');
            if (!track || !thumb) return;

            let isOn = track.classList.contains('bg-secondary-container') || 
                       track.classList.contains('bg-cyan-500/40') ||
                       track.style.background === 'rgb(0, 209, 255)';

            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                isOn = !isOn;
                
                track.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                thumb.style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
                
                if (isOn) {
                    track.style.background = '#00d1ff';
                    track.style.opacity = '1';
                    thumb.style.transform = 'translateX(20px)';
                    thumb.style.background = '#fff';
                } else {
                    track.style.background = 'rgba(255, 255, 255, 0.08)';
                    thumb.style.transform = 'translateX(0)';
                    thumb.style.background = '#999';
                }
            });
        });
    }

})();

