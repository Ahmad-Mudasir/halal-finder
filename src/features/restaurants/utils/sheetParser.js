/**
 * Turn the CSV text from Google Sheets into an array of plain JavaScript objects.
 *
 * Why it looks a bit long: CSV rows can contain commas inside quotes (e.g. "Helsinki, center").
 * We walk the line character by character so those commas do not break the columns.
 *
 * The first line of the CSV is the column names (name, city, latitude, …). Each following line
 * is one restaurant. We also copy lat/lng into latitude/longitude numbers for the map.
 */

/** Split one CSV line into cell strings, respecting "quoted" fields. */
function splitLineIntoCells(line) {
  const cells = [];
  let current = "";
  let insideQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      insideQuotes = !insideQuotes;
    } else if (char === "," && !insideQuotes) {
      cells.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  cells.push(current.trim());
  return cells;
}

export function sheetParser(csvText) {
  const lines = csvText
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .split("\n")
    .filter(Boolean);

  if (lines.length < 2) return [];

  const headerRow = lines[0].split(",").map((h) => h.trim().replace(/^"|"$/g, ""));

  return lines.slice(1).map((line) => {
    const cells = splitLineIntoCells(line);
    const row = {};
    headerRow.forEach((columnName, i) => {
      row[columnName] = (cells[i] || "").replace(/^"|"$/g, "").trim();
    });

    return {
      ...row,
      latitude: Number(row.latitude || row.lat || 0),
      longitude: Number(row.longitude || row.lng || 0),
    };
  });
}
