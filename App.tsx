import React, { useState, useEffect, useCallback } from 'react';
import { documentContent } from './data/content.ts';
import { DocumentContent, Heading, ImageBlock } from './types.ts';
import HeaderAndNav from './components/HeaderAndNav.tsx';
import Sidebar from './components/Sidebar.tsx';
import Article from './components/Article.tsx';

type Theme = 'light' | 'dark';

const GoTopButton: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <button
            type="button"
            onClick={scrollToTop}
            className={`fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-amber-500 text-white shadow-lg transition-opacity duration-300 hover:from-amber-500 hover:to-sky-500 ${
                isVisible ? 'opacity-100' : 'opacity-0'
            }`}
            aria-label="Ir arriba"
        >
            <i className="fa-solid fa-arrow-up text-xl"></i>
        </button>
    );
};

const App: React.FC = () => {
    const [theme, setTheme] = useState<Theme>('light');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [lightboxImage, setLightboxImage] = useState<ImageBlock | null>(null);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as Theme | null;
        if (savedTheme) {
            setTheme(savedTheme);
        } else {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setTheme(prefersDark ? 'dark' : 'light');
        }
    }, []);
    
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = useCallback(() => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    }, []);

    const toggleMenu = useCallback(() => {
        setIsMenuOpen(prev => !prev);
    }, []);

    const closeMenu = useCallback(() => {
        setIsMenuOpen(false);
    }, []);

    const handleImageClick = useCallback((image: ImageBlock) => {
        setLightboxImage(image);
    }, []);

    const closeLightbox = useCallback(() => {
        setLightboxImage(null);
    }, []);

    const tableOfContents = documentContent.filter(
        item => item.type.startsWith('h')
    ) as Heading[];

    return (
        <div className="bg-slate-50 dark:bg-gray-900 text-slate-800 dark:text-slate-200 min-h-screen font-sans">
            <HeaderAndNav
                isMenuOpen={isMenuOpen}
                toggleMenu={toggleMenu}
                closeMenu={closeMenu}
                theme={theme}
                toggleTheme={toggleTheme}
                tableOfContents={tableOfContents}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-12 py-8">
                    <Sidebar tableOfContents={tableOfContents} />
                    <main>
                        <Article
                            content={documentContent}
                            onImageClick={handleImageClick}
                            lightboxImage={lightboxImage}
                            onLightboxClose={closeLightbox}
                        />
                    </main>
                </div>
            </div>
            
            <GoTopButton />
        </div>
    );
};

export default App;