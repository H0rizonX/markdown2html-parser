export const h1Regex = /^#\s(.*)$/gm;
export const h2Regex = /^##\s(.*)$/gm;
export const h3Regex = /^###\s(.*)$/gm;
export const h4Regex = /^####\s(.*)$/gm;
export const h5Regex = /^#####\s(.*)$/gm;
export const h6Regex = /^######\s(.*)$/gm;

export const boldRegex = /\*\*(.*)\*\*/gm;
export const boldAltRegex = /__(.*)__/gm;
export const italicRegex = /\*(.*)\*/gm;
export const italicAltRegex = /_(.*)_/gm;
export const strikethroughRegex = /~~(.*)~~/gm;

export const linkRegex = /\[(.*?)\]\((.*?)\)/gm;
export const imageRegex = /!\[(.*?)\]\((.*?)\)/gm;

export const inlineCodeRegex = /`(.*?)`/gm;
export const codeBlockRegex = /```([\s\S]*?)```/gm;

export const lineBreakRegex = /\n/g;
