import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Heading } from '../types';

interface SidebarProps {
    tableOfContents: Heading[];
}

const Sidebar: React.FC<SidebarProps> = ({ tableOfContents }) => {
    const [activeId, setActiveId] = useState<string | null>(null);
    const observer = useRef<IntersectionObserver | null>(null);

    const headingElementsRef = useRef<{ [key: string]: IntersectionObserverEntry | null }>({});

    useEffect(() => {
        const callback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                headingElementsRef.current[entry.target.id] = entry;
            });

            const visibleHeadings: IntersectionObserverEntry[] = [];
            Object.keys(headingElementsRef.current).forEach((key) => {
                const entry = headingElementsRef.current[key];
                if (entry?.isIntersecting) {
                    visibleHeadings.push(entry);
                }
            });

            const getIndexFromId = (id: string) => tableOfContents.findIndex(h => h.slug === id);
            
            if (visibleHeadings.length > 0) {
                 const topHeading = visibleHeadings.reduce((prev, curr) => {
                    if (getIndexFromId(curr.target.id) < getIndexFromId(prev.target.id)) {
                        return curr;
                    }
                    return prev;
                });
                setActiveId(topHeading.target.id);
            }
        };

        if (observer.current) {
            observer.current.disconnect();
        }
        
        observer.current = new IntersectionObserver(callback, {
            rootMargin: '0px 0px -40% 0px',
            threshold: 0.1,
        });

        const elements = tableOfContents.map(h => document.getElementById(h.slug)).filter(Boolean);
        elements.forEach(el => observer.current?.observe(el!));

        return () => observer.current?.disconnect();
    }, [tableOfContents]);

    return (
        <aside className="hidden lg:block sticky top-20 self-start">
            <nav id="toc-nav" aria-label="Tabla de contenidos">
                <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
                    Índice
                </h3>
                <ul className="space-y-1">
                    {tableOfContents.map(heading => (
                        <li key={heading.slug}>
                            <a
                                href={`#${heading.slug}`}
                                className={`block rounded-md py-1.5 px-3 text-sm font-sans transition-colors border-l-2 ${
                                    activeId === heading.slug
                                        ? 'bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300 border-sky-500 font-semibold'
                                        : 'text-slate-600 dark:text-slate-400 border-transparent hover:bg-slate-100 dark:hover:bg-slate-800'
                                } ${heading.type !== 'h2' ? 'pl-6' : ''}`}
                            >
                                {heading.content}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
