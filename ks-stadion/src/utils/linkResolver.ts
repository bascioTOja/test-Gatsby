import { Document } from '../prismic/types'

export const linkResolver = (doc: Document): string => {
  if (doc.type === 'article') {
    return `/articles/${doc.uid}`
  } else if (doc.type === 'page') {
    return `/${doc.uid}`
  } else if (doc.type === 'album') {
    return `/album/${doc.uid}`
  }
  return '/'
}
