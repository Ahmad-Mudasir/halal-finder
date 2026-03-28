/**
 * Ensures a website string is safe to use as an href (adds https if missing).
 */
export function toWebsiteHref(raw) {
  if (!raw || typeof raw !== "string") return "";
  const t = raw.trim();
  if (!t) return "";
  if (/^https?:\/\//i.test(t)) return t;
  return `https://${t}`;
}
