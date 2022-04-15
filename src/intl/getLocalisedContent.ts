export type LocalisedContentNode = {
  en: Record<string, string>;
  de: Record<string, string>;
}

export const getLocalisedContent = (node: LocalisedContentNode, locale: keyof LocalisedContentNode) => {
  return node[locale]
 }
