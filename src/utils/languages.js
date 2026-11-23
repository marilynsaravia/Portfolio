export function pickLang(value, lang = "ES") {
  if (!value) return "";
  if (typeof value === "string") return value;
  return value[lang] || value.ES || value.EN || "";
}