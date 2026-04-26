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

    
// --- GLOBAL AUTH & LOGOUT ---
    document.addEventListener('click', (e) => {
        if (e.target.closest('a[href="#logout"]')) {
            e.preventDefault();
            localStorage.clear();
            window.location.href = 'login.html';
        }
    });

    /**
     * Sync user profile data from localStorage
     */
    function syncUserProfile() {
        const photoUrl = localStorage.getItem('tracelock_user_photo');
        if (photoUrl) {
            // Update existing images
            document.querySelectorAll('.user-profile-img').forEach(img => {
                img.src = photoUrl;
                img.classList.remove('hidden');
                // Hide sibling icon if present
                const icon = img.parentElement.querySelector('.user-profile-icon');
                if (icon) icon.classList.add('hidden');
            });

            // Swap icons for images if only icon exists
            document.querySelectorAll('.user-profile-icon').forEach(icon => {
                if (!icon.parentElement.querySelector('.user-profile-img')) {
                    const img = document.createElement('img');
                    img.src = photoUrl;
                    img.className = 'w-8 h-8 rounded-full object-cover border border-cyan-500/30 user-profile-img';
                    icon.parentElement.appendChild(img);
                    icon.classList.add('hidden');
                }
            });
        }
    }

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
                const href = link.getAttribute('href');
                if (href === '#') {
                    e.preventDefault();
                    // 1. Visual state update
                    const parent = link.parentElement;
                    parent.querySelectorAll('a').forEach(a => {
                        a.classList.remove('tl-nav-active-header', 'text-cyan-400', 'opacity-100');
                        // Handle potential border-b indicators
                        a.classList.remove('border-b-2', 'border-cyan-400');
                    });
                    
                    link.classList.add('tl-nav-active-header', 'text-cyan-400', 'opacity-100');
                    
                    // 2. Universal "Refresh" Pulse
                    const main = document.querySelector('main');
                    if (main) {
                        main.style.transition = 'opacity 0.3s ease, filter 0.3s ease';
                        main.style.opacity = '0.6';
                        main.style.filter = 'blur(4px)';
                        
                        setTimeout(() => {
                            main.style.opacity = '1';
                            main.style.filter = 'none';
                            
                            // 3. Dispatch event for page-specific logic (e.g. updating charts)
                            document.dispatchEvent(new CustomEvent('tl-tab-switched', { 
                                detail: { tab: link.textContent.trim().toLowerCase() } 
                            }));
                        }, 400);
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
     * Universal Search Simulation
     */
    function wireSearch() {
        const searchInputs = document.querySelectorAll('input[placeholder*="Search"], input[placeholder*="Scan"]');
        searchInputs.forEach(input => {
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    const val = input.value.trim();
                    if (!val) return;

                    input.value = 'Scanning encrypted nodes...';
                    input.disabled = true;
                    input.classList.add('opacity-50');

                    setTimeout(() => {
                        input.value = `No unauthorized leaks found for "${val}"`;
                        input.classList.remove('opacity-50');
                        setTimeout(() => {
                            input.value = '';
                            input.disabled = false;
                        }, 2000);
                    }, 1500);
                }
            });
        });
    }

    /**
     * Unified logic for toggle UI components
     */
    function wireToggles() {
        // Support both custom structures and standard ones
        document.querySelectorAll('button').forEach(btn => {
            const track = btn.querySelector('div.rounded-full') || btn;
            const thumb = btn.querySelector('span.rounded-full') || btn.querySelector('div.absolute');
            
            if (!thumb || !btn.classList.contains('rounded-full')) return;

            let isOn = btn.classList.contains('bg-secondary-container') || 
                       btn.classList.contains('bg-cyan-500/40') ||
                       thumb.classList.contains('ml-auto');

            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                isOn = !isOn;
                
                btn.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                thumb.style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
                
                if (isOn) {
                    btn.style.background = '#00d1ff';
                    btn.classList.remove('bg-surface-container-highest/50', 'bg-zinc-800');
                    thumb.style.transform = 'translateX(20px)';
                    if (thumb.classList.contains('ml-auto')) {
                        thumb.classList.remove('ml-auto');
                        thumb.style.transform = 'translateX(24px)';
                    }
                } else {
                    btn.style.background = 'rgba(255, 255, 255, 0.08)';
                    thumb.style.transform = 'translateX(0)';
                }
            });
        });
    }

    // Initialize all components and reveal page
    document.addEventListener('DOMContentLoaded', () => {
        initializeNavigation();
        wireRipples();
        wireToggles();
        wireSearch();
        syncUserProfile();

        setTimeout(() => {
            if (overlay) overlay.classList.add('loaded');
            revealContent();
        }, 100);
    });

})();

