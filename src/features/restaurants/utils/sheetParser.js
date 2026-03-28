/**
 * sheetParser - Converts raw CSV text from Google Sheets into restaurant objects.
 * Handles quoted fields, trims whitespace.
 * Normalizes lat/lng → latitude/longitude for map compatibility.
 *
 * @param {string} csvText - Raw CSV string from the fetch API
 * @returns {Array<Object>} Array of restaurant objects
 */
export const sheetParser = (csvText) => {
  // Split into lines, remove empty lines, handle \r\n (Windows line endings)
  const lines = csvText
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .split('\n')
    .filter(Boolean);

  if (lines.length < 2) return [];

  const headers = lines[0].split(',').map((h) => h.trim().replace(/^"|"$/g, ''));

  return lines.slice(1).map((line) => {
    // Regex handles quoted fields that may contain commas
    const values = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current.trim()); // push last field

    const obj = {};
    headers.forEach((header, i) => {
      obj[header] = (values[i] || '').replace(/^"|"$/g, '').trim();
    });

    // Normalize: support both 'lat'/'lng' and 'latitude'/'longitude' column names
    return {
      ...obj,
      latitude: Number(obj.latitude || obj.lat || 0),
      longitude: Number(obj.longitude || obj.lng || 0),
    };
  });
};