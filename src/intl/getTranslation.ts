export const getTranslation = (key: string, translations: Record<string, string>) => {
  if (translations[key]) {
    return translations[key];
  }
  return key;
}
