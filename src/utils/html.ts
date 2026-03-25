import DOMPurify from "dompurify";

const SANITIZE_CONFIG = {
  ALLOWED_TAGS: ["p", "b", "i", "em", "strong", "ul", "ol", "li", "br", "a"],
  ALLOWED_ATTR: ["href", "title", "target"],
};

const TEXT_ONLY_CONFIG = {
  ALLOWED_TAGS: [],
  ALLOWED_ATTR: [],
};

export const stripHtmlToText = (html: string): string => {
  if (!html) {
    return "";
  }

  const sanitizedText = DOMPurify.sanitize(html, TEXT_ONLY_CONFIG);
  return sanitizedText.replace(/\s+/g, " ").trim();
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength).trimEnd()}...`;
};

export const sanitizeHtml = (html: string): string => {
  if (!html) {
    return "";
  }

  return DOMPurify.sanitize(html, SANITIZE_CONFIG);
};
