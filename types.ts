export type Slug = string;

export interface Heading {
    type: 'h1' | 'h2' | 'h3';
    content: string;
    slug: Slug;
}

export interface ParagraphBlock {
    type: 'p';
    content: string;
}

export interface ImageBlock {
    type: 'image';
    path: string;
    alt: string;
}

export interface ListBlock {
    type: 'list';
    items: string[];
}

export interface OrderedListBlock {
    type: 'ordered_list';
    items: string[];
}

export interface LinkItem {
    text: string;
    url: string;
}

export interface LinkListBlock {
    type: 'link_list';
    items: LinkItem[];
}

export interface YoutubeBlock {
    type: 'youtube';
    video_id: string;
    title: string;
    start?: number;
    external_url?: string;
}

export interface TableBlock {
    type: 'table';
    title: string;
    headers: string[];
    rows: string[][];
}

export type ContentBlockItem =
    | Heading
    | ParagraphBlock
    | ImageBlock
    | ListBlock
    | OrderedListBlock
    | LinkListBlock
    | YoutubeBlock
    | TableBlock;

export interface ContentSection {
    type: 'h1' | 'h2';
    content: string;
    slug: Slug;
    blocks: ContentBlockItem[];
}

export type DocumentContent = (ContentSection | Heading)[];
