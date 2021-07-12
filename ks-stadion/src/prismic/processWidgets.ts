import { PrismicArticleProps, PrismicPageProps } from './types'
import { PrismicWidgets } from './types/widgets'

const processWidgets = (widgets: Array<PrismicWidgets>): Array<PrismicWidgets> => {
  const processedWidgets: Array<PrismicWidgets> = []
  widgets.forEach((widget) => {
    switch (widget.slice_type) {
      case 'custom_button':
        processedWidgets.push({
          ...widget,
          primary: {
            caption: {
              text: widget.primary.caption.text
            },
            color: widget.primary.color,
            link: {
              link_type: 'Web',
              target: widget.primary.link.target,
              url: widget.primary.link.url
            },
            photo: {
              ...widget.primary.photo
            }
          }
        })
        break
      case 'protrainup':
      case 'youtube':
      case 'twitter':
      case 'instagram':
      case 'facebook':
        processedWidgets.push({
          ...widget,
          primary: {
            link: {
              link_type: 'Web',
              target: widget.primary.link.target,
              url: widget.primary.link.url
            }
          }
        })
        break
      case 'partner':
        processedWidgets.push({
          ...widget,
          primary: {
            photo: widget.primary.photo,
            link: {
              link_type: 'Web',
              target: widget.primary.link.target,
              url: widget.primary.link.url
            }
          }
        })
        break
      case 'highlight':
        {
          if (widget.primary.link.type === 'article') {
            const {
              primary: {
                link: { document }
              }
            } = widget
            if (!document) return
            const article: PrismicArticleProps = {
              ...widget.primary.link.document,
              id: widget.primary.link.document!.id,
              type: widget.primary.link.document!.type,
              href: widget.primary.link.document!.href,
              first_publication_date: widget.primary.link.document!.first_publication_date,
              last_publication_date: widget.primary.link.document!.last_publication_date,
              tags: widget.primary.link.document!.tags,
              slugs: widget.primary.link.document!.slugs,
              alternate_languages: widget.primary.link.document!.alternate_languages,
              data: {
                description: null,
                keywords: null,
                caption: document.data.caption,
                body: [],
                category: undefined,
                content: document.data.content,
                photo: {
                  url: document.data.photo.url,
                  alt: document.data.photo.alt,
                  fixed: document.data.photo.fixed,
                  fluid: document.data.photo.fluid,
                  thumbnails: {
                    thumb: {
                      alt: document.data.photo.thumbnails.thumb.alt,
                      url: document.data.photo.thumbnails.thumb.url,
                      fixed: document.data.photo.thumbnails.thumb.fixed
                    }
                  }
                },
                title: {
                  text: document.data.title.text
                }
              },
              dataRaw: document.dataRaw
            }

            processedWidgets.push({
              ...widget,
              primary: {
                encourage_text: widget.primary.encourage_text,
                link: {
                  type: 'article',
                  document: article
                }
              }
            })
          } else if (widget.primary.link.type === 'page') {
            const {
              primary: {
                link: { document }
              }
            } = widget
            if (!document) return

            const page: PrismicPageProps = {
              ...widget.primary.link.document,
              id: widget.primary.link.document!.id,
              type: widget.primary.link.document!.type,
              href: widget.primary.link.document!.href,
              first_publication_date: widget.primary.link.document!.first_publication_date,
              last_publication_date: widget.primary.link.document!.last_publication_date,
              tags: widget.primary.link.document!.tags,
              slugs: widget.primary.link.document!.slugs,
              alternate_languages: widget.primary.link.document!.alternate_languages,
              data: {
                description: null,
                keywords: null,
                caption: document.data.caption,
                baner: {
                  url: document.data.baner.url,
                  alt: document.data.baner.alt,
                  fluid: document.data.baner.fluid,
                  fixed: document.data.baner.fixed,
                  thumbnails: {
                    thumb: {
                      fixed: document.data.baner.thumbnails.thumb.fixed
                    }
                  }
                },
                body: [],
                title: {
                  text: document.data.title.text
                }
              },
              dataRaw: document.dataRaw
            }

            processedWidgets.push({
              ...widget,
              primary: {
                encourage_text: widget.primary.encourage_text,
                link: {
                  type: 'page',
                  document: page
                }
              }
            })
          }
        }
        break
      default: {
        processedWidgets.push(widget)
      }
    }
  })

  return processedWidgets
}

export default processWidgets
