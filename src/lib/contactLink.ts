/**
 * Single source of truth for "send the user to the Write-to-us form".
 *
 * Build a canonical contact URL like:
 *   /contact?type=press#write-to-us
 *
 * The ContactPage reads `?type=` and pre-selects the matching Inquiry
 * Type. The `#write-to-us` hash triggers Layout's smooth-scroll to the
 * form column. TYPE_ALIASES inside ContactPage normalises legacy values
 * (`partnership`, `partner`, `investor`, `appointment`, `general`) so
 * call sites can keep the most editorially natural value.
 */
export type ContactType =
  | "business"
  | "press"
  | "careers"
  | "brand"
  | "partnership"
  | "partner"
  | "investor"
  | "appointment"
  | "general";

export function contactLink(type?: ContactType): string {
  const base = "/contact";
  const hash = "#write-to-us";
  if (!type) return `${base}${hash}`;
  return `${base}?type=${encodeURIComponent(type)}${hash}`;
}
