import React from 'react';
import { DocumentContent, ContentSection, ContentBlockItem, ImageBlock } from '../types.ts';

interface ArticleProps {
    content: DocumentContent;
    onImageClick: (image: ImageBlock) => void;
    lightboxImage: ImageBlock | null;
    onLightboxClose: () => void;
}

const ImageLightbox: React.FC<{ image: ImageBlock | null; onClose: () => void }> = ({ image, onClose }) => {
    if (!image) return null;

    return (
        <div
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-80 p-4"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-label="Image Lightbox"
        >
            <span
                className="absolute top-4 right-6 text-white text-4xl font-bold cursor-pointer"
                onClick={onClose}
            >
                &times;
            </span>
            <div className="relative max-w-4xl max-h-full" onClick={(e) => e.stopPropagation()}>
                <img src={image.path} alt={image.alt} className="max-w-full max-h-[90vh] block" />
                <div className="text-center text-gray-300 mt-2">{image.alt}</div>
            </div>
        </div>
    );
};

const BlockRenderer: React.FC<{ block: ContentBlockItem, onImageClick: (image: ImageBlock) => void }> = ({ block, onImageClick }) => {
    switch (block.type) {
        case 'p':
            return <p className="mb-4 leading-relaxed">{block.content}</p>;
        case 'image':
            return (
                <figure className="my-6 text-center">
                    <img
                        src={block.path}
                        alt={block.alt}
                        className="max-w-full h-auto rounded-md shadow-md cursor-pointer border border-slate-200 dark:border-slate-700 transition-transform duration-200 hover:scale-105"
                        loading="lazy"
                        onClick={() => onImageClick(block)}
                    />
                    <figcaption className="text-sm text-slate-500 dark:text-slate-400 mt-2 italic">{block.alt}</figcaption>
                </figure>
            );
        case 'list':
            return (
                <ul className="list-disc list-inside space-y-2 mb-4 pl-4">
                    {block.items.map((item, index) => (
                        <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
                    ))}
                </ul>
            );
        case 'ordered_list':
            return (
                <ol className="list-decimal list-inside space-y-2 mb-4 pl-4">
                    {block.items.map((item, index) => (
                        <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
                    ))}
                </ol>
            );
        case 'link_list':
            return (
                <ul className="space-y-2 mb-4">
                    {block.items.map((item, index) => (
                        <li key={index} className="flex items-center">
                            <i className="fa-solid fa-link text-sky-500 mr-3"></i>
                            <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-sky-600 dark:text-sky-400 hover:underline">{item.text}</a>
                        </li>
                    ))}
                </ul>
            );
        case 'youtube':
            const src = block.external_url ? undefined : `https://www.youtube.com/embed/${block.video_id}${block.start ? `?start=${block.start}` : ''}`;
            return (
                <div className="my-6">
                    {src ? (
                         <div className="aspect-w-16 aspect-h-9">
                            <iframe
                                src={src}
                                title={block.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full rounded-md shadow-lg"
                            ></iframe>
                         </div>
                    ) : (
                        <div className="flex items-center justify-center min-h-[120px] bg-slate-100 dark:bg-slate-800 rounded-md">
                           <a href={block.external_url} target="_blank" rel="noopener noreferrer" className="inline-block bg-amber-500 text-slate-900 px-4 py-2 rounded-md font-bold text-lg hover:bg-amber-600 transition">
                                ▶️ Ver vídeo en YouTube
                           </a>
                        </div>
                    )}
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 text-center italic">{block.title}</p>
                </div>
            );
        case 'table':
            return (
                <div className="my-6 overflow-x-auto">
                    <h4 className="font-sans font-bold text-center mb-2 text-slate-700 dark:text-slate-300">{block.title}</h4>
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr>{block.headers.map(h => <th key={h} className="border border-slate-300 dark:border-slate-600 p-2 bg-slate-100 dark:bg-slate-800 font-sans">{h}</th>)}</tr>
                        </thead>
                        <tbody>
                            {block.rows.map((row, i) => <tr key={i}>{row.map((cell, j) => <td key={j} className="border border-slate-300 dark:border-slate-600 p-2">{cell}</td>)}</tr>)}
                        </tbody>
                    </table>
                </div>
            )
        case 'h3':
            return <h3 id={block.slug} className="font-sans text-xl font-bold mt-8 mb-3 text-slate-800 dark:text-slate-200 scroll-mt-20">{block.content}</h3>;
        default:
            return null;
    }
};


const Article: React.FC<ArticleProps> = ({ content, onImageClick, lightboxImage, onLightboxClose }) => {
    return (
        <article className="prose prose-slate dark:prose-invert max-w-none">
            <div className="bg-gradient-to-r from-sky-500 to-amber-500 text-white p-8 sm:p-12 rounded-2xl mb-12 text-center shadow-xl">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-sans text-white !m-0"><i className="fa-solid fa-music mr-4"></i>EL CANON Y LA TÉCNICA IMITATIVA</h1>
                <p className="mt-4 text-lg sm:text-xl opacity-90">Guía interactiva para comprender y practicar el canon y la técnica imitativa en música.</p>
            </div>
            
            {content.map(section => {
                if (section.type === 'h1') return null; // Already in hero
                if ('blocks' in section) {
                    return (
                        <div key={section.slug} className="bg-white dark:bg-slate-800/50 border-l-4 border-sky-500 rounded-r-lg p-6 sm:p-8 mb-8 shadow-md transition-shadow hover:shadow-xl">
                            <h2 id={section.slug} className="font-sans text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-3 mb-6 scroll-mt-20">
                                {section.content}
                            </h2>
                            {section.blocks.map((block, index) => <BlockRenderer key={index} block={block} onImageClick={onImageClick} />)}
                        </div>
                    );
                }
                return null;
            })}

            <ImageLightbox image={lightboxImage} onClose={onLightboxClose} />
        </article>
    );
};

export default Article;