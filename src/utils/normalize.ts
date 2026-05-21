export const normalizeRussian = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "") // Remove punctuation
    .replace(/\s+/g, "") // Remove all whitespace
    .replace(/ё/g, "е"); // Treat ё as е for simpler matching
};
