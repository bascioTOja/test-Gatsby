// This file is only required for gatsby config js

const linkResolver = (doc) => {
  if (doc.type === 'article') {
    return `/articles/${doc.uid}`
  } else if (doc.type === 'page') {
    return `/${doc.uid}`
  } else if (doc.type === 'album') {
    return `/album/${doc.uid}`
  }

  return '/'
}

module.exports = linkResolver
