import React, { useState, useEffect } from 'react';
import { Heading } from '../types.ts';

interface HeaderAndNavProps {
    isMenuOpen: boolean;
    toggleMenu: () => void;
    closeMenu: () => void;
    theme: 'light' | 'dark';
    toggleTheme: () => void;
    tableOfContents: Heading[];
}

const ReadingProgressBar: React.FC = () => {
    const [width, setWidth] = useState(0);

    const handleScroll = () => {
        const totalScroll = document.documentElement.scrollTop;
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scroll = (totalScroll / windowHeight) * 100;
        setWidth(scroll);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return <div style={{ width: `${width}%` }} className="fixed top-0 left-0 z-50 h-1 bg-gradient-to-r from-sky-500 to-amber-500" />;
};

const MobileMenu: React.FC<Omit<HeaderAndNavProps, 'toggleMenu' | 'theme' | 'toggleTheme'>> = ({ isMenuOpen, closeMenu, tableOfContents }) => {
    return (
        <>
            <div
                className={`fixed inset-0 z-40 bg-black/40 transition-opacity lg:hidden ${
                    isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                onClick={closeMenu}
                aria-hidden="true"
            ></div>
            <nav
                id="mobile-menu"
                className={`fixed top-0 left-0 z-50 h-full w-4/5 max-w-sm transform bg-white p-6 shadow-xl transition-transform duration-300 ease-in-out dark:bg-slate-900 lg:hidden ${
                    isMenuOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">Índice</h3>
                <ul className="mt-4 space-y-2">
                    {tableOfContents.map(heading => (
                        <li key={heading.slug}>
                            <a
                                href={`#${heading.slug}`}
                                onClick={closeMenu} // This is the key fix: close menu on link click
                                className={`block rounded-md py-2 px-3 font-sans text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 ${
                                    heading.type === 'h2' ? 'font-semibold' : 'pl-6'
                                }`}
                            >
                                {heading.content}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
};

const HeaderAndNav: React.FC<HeaderAndNavProps> = (props) => {
    const { theme, toggleTheme, toggleMenu } = props;
    return (
        <>
            <ReadingProgressBar />
            <div className="sticky top-0 z-30 lg:hidden">
                <div className="flex items-center justify-between p-4 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md">
                    <button
                        onClick={toggleMenu}
                        aria-label="Abrir menú"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200"
                    >
                        <i className="fas fa-bars"></i>
                    </button>
                    <button
                        onClick={toggleTheme}
                        aria-label="Cambiar tema"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200"
                    >
                        {theme === 'dark' ? '☀️' : '🌙'}
                    </button>
                </div>
            </div>
            <MobileMenu {...props} />
        </>
    );
};

export default HeaderAndNav;