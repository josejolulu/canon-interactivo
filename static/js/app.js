// static/js/app.js mejorado
document.addEventListener('DOMContentLoaded', () => {

    class InteractiveDocument {
        constructor() {
            this.images = [];
            this.currentImageIndex = 0;
            this.initializeTheme();
            this.setupEventListeners();
            this.setupScrollSpy();
            this.setupReadingProgress();
            this.setupImageLightbox();
            this.setupGoTopButton();
        }

        initializeTheme() {
            this.themeToggleBtn = document.getElementById('theme-toggle');
            const storedTheme = localStorage.getItem('theme') || 'light';
            document.body.setAttribute('data-theme', storedTheme);
            this.themeToggleBtn.textContent = storedTheme === 'dark' ? '☀️' : '🌙';
            this.themeToggleBtn.setAttribute('aria-label', storedTheme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
        }

        setupEventListeners() {
            // Theme Toggler
            this.themeToggleBtn.addEventListener('click', () => {
                const currentTheme = document.body.getAttribute('data-theme');
                const newTheme = currentTheme === 'light' ? 'dark' : 'light';
                document.body.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
                this.themeToggleBtn.textContent = newTheme === 'dark' ? '☀️' : '🌙';
                this.themeToggleBtn.setAttribute('aria-label', newTheme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
            });
        }

        setupScrollSpy() {
            const sections = document.querySelectorAll('.content h1, .content h2, .content h3');
            const tocLinks = document.querySelectorAll('#toc-list a');
            let lastActive = null;

            const activateLink = (id) => {
                tocLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${id}`) {
                        link.parentElement.classList.add('active');
                        lastActive = link;
                    } else {
                        link.parentElement.classList.remove('active');
                    }
                });
            };

            // Fallback for browsers without IntersectionObserver
            if (!('IntersectionObserver' in window)) {
                window.addEventListener('scroll', () => {
                    let currentId = '';
                    sections.forEach(section => {
                        const rect = section.getBoundingClientRect();
                        if (rect.top <= 120) currentId = section.id;
                    });
                    if (currentId) activateLink(currentId);
                });
                return;
            }

            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        activateLink(entry.target.id);
                    }
                });
            }, { rootMargin: '-50% 0px -50% 0px', threshold: 0.1 });

            sections.forEach(section => observer.observe(section));
        }

        setupReadingProgress() {
            const progressBar = document.getElementById('reading-progress-bar');
            window.addEventListener('scroll', () => {
                const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrollPercentage = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
                progressBar.style.width = `${scrollPercentage}%`;
            });
        }

        setupImageLightbox() {
            const lightbox = document.getElementById('image-lightbox');
            const lightboxImg = document.getElementById('lightbox-img');
            const lightboxCaption = document.getElementById('lightbox-caption');
            const closeBtn = document.querySelector('.lightbox-close');
            this.images = Array.from(document.querySelectorAll('.content-image'));

            const openLightbox = (index) => {
                this.currentImageIndex = index;
                const img = this.images[index];
                lightbox.style.display = 'block';
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                lightboxCaption.textContent = img.alt;
                lightboxImg.focus();
            };

            this.images.forEach((img, idx) => {
                img.setAttribute('tabindex', '0');
                img.addEventListener('click', () => openLightbox(idx));
                img.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        openLightbox(idx);
                    }
                });
            });

            closeBtn.addEventListener('click', () => lightbox.style.display = 'none');
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) lightbox.style.display = 'none';
            });

            document.addEventListener('keydown', (e) => {
                if (lightbox.style.display !== 'block') return;
                if (e.key === 'Escape') {
                    lightbox.style.display = 'none';
                } else if (e.key === 'ArrowRight') {
                    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
                    openLightbox(this.currentImageIndex);
                } else if (e.key === 'ArrowLeft') {
                    this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
                    openLightbox(this.currentImageIndex);
                }
            });
        }

        setupGoTopButton() {
            const btn = document.getElementById('go-top-btn');
            window.addEventListener('scroll', () => {
                btn.style.display = window.scrollY > 300 ? 'block' : 'none';
            });
            btn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }

    new InteractiveDocument();

    // Menú móvil
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileMenu.classList.toggle('open');
            menuToggle.classList.toggle('active');
        });

        // Cerrar menú al hacer clic en un enlace
        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
                menuToggle.classList.remove('active');
            });
        });

        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (mobileMenu.classList.contains('open') && 
                !mobileMenu.contains(e.target) && 
                !menuToggle.contains(e.target)) {
                mobileMenu.classList.remove('open');
                menuToggle.classList.remove('active');
            }
        });

        // Prevenir cierre al hacer clic dentro del menú
        mobileMenu.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
});