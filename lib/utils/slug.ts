/**
 * Generates a URL-friendly slug from a given string.
 * Handles special characters, accents, and edge cases.
 * 
 * @param text - The string to convert to a slug
 * @returns A lowercase, hyphen-separated slug
 */
export function generateSlug(text: string): string {
  if (!text || typeof text !== 'string') {
    return '';
  }

  return text
    // Convert to lowercase
    .toLowerCase()
    // Normalize unicode characters (é → e, ñ → n, etc.)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    // Replace & with 'and'
    .replace(/&/g, 'and')
    // Remove special characters except spaces and hyphens
    .replace(/[^a-z0-9\s-]/g, '')
    // Replace multiple spaces/hyphens with single hyphen
    .replace(/[\s-]+/g, '-')
    // Remove leading/trailing hyphens
    .replace(/^-+|-+$/g, '')
    // Limit length (SEO best practice: keep slugs under 60 chars)
    .slice(0, 60)
    // Clean up any trailing hyphen after slicing
    .replace(/-+$/g, '');
}

/**
 * Generates a unique slug by appending a number suffix if needed.
 * This function checks existing slugs and finds the next available one.
 * 
 * @param baseSlug - The base slug to make unique
 * @param existingSlugs - Array of existing slugs to check against
 * @returns A unique slug (either the original or with -1, -2, etc. suffix)
 */
export function makeSlugUnique(baseSlug: string, existingSlugs: string[]): string {
  if (!existingSlugs.includes(baseSlug)) {
    return baseSlug;
  }

  let counter = 1;
  let uniqueSlug = `${baseSlug}-${counter}`;
  
  while (existingSlugs.includes(uniqueSlug)) {
    counter++;
    uniqueSlug = `${baseSlug}-${counter}`;
  }
  
  return uniqueSlug;
}

/**
 * Validates if a string is a valid MongoDB ObjectId.
 * Used to determine if a param should be treated as an ID or slug.
 * 
 * @param str - The string to validate
 * @returns True if the string is a valid ObjectId format
 */
export function isValidObjectId(str: string): boolean {
  return /^[a-fA-F0-9]{24}$/.test(str);
}
