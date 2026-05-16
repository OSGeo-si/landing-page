/**
 * Slovenian pluralization based on a count.
 *
 *   1, 21, 31, … → forms[0] (singular)        e.g. "dogodek"
 *   2, 22, 32, … → forms[1] (dual)            e.g. "dogodka"
 *   3, 4, 23, 24 → forms[2] (paucal / pl-nom) e.g. "dogodki"
 *   5–20, 25+    → forms[3] (genitive plural) e.g. "dogodkov"
 *
 * Teens (11–14) always use the genitive plural — that's the Slovenian quirk.
 */
export function slPlural(n, forms) {
  const mod100 = n % 100
  if (mod100 >= 11 && mod100 <= 14) return forms[3]
  const mod10 = n % 10
  if (mod10 === 1) return forms[0]
  if (mod10 === 2) return forms[1]
  if (mod10 === 3 || mod10 === 4) return forms[2]
  return forms[3]
}
