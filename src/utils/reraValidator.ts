/**
 * Validates a given RERA registration ID against standard formats.
 * Example Valid Formats: 
 * - PR/DD/MM/YYYY/123456
 * - RERA123456789
 * 
 * @param reraId - The RERA ID string to validate
 * @returns boolean - True if valid, false otherwise
 */
export function validateRERA(reraId: string): boolean {
  if (!reraId || reraId.trim() === "") return false;

  // Example pattern 1: PR/DD/MM/YYYY/123456
  const pattern1 = /^PR\/\d{2}\/\d{2}\/\d{4}\/\d{6}$/i;
  
  // Example pattern 2: Alphanumeric format commonly used in India (e.g. P12345678901)
  const pattern2 = /^[A-Z0-9]{10,15}$/i;

  return pattern1.test(reraId) || pattern2.test(reraId);
}

/**
 * Filter listings to ensure only those with valid RERA IDs are returned.
 */
export function filterValidListings<T extends { reraId?: string }>(listings: T[]): T[] {
  return listings.filter((listing) => listing.reraId && validateRERA(listing.reraId));
}
