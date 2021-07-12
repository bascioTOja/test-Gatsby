import Paper from '@material-ui/core/Paper'
import Img from 'gatsby-image'
import _ from 'lodash'
import React from 'react'

import { PrismicArticleProps } from '../../../prismic/types'
import ArticleMeta from '../../common/ArticleMeta'
import CommonLink from '../../common/Link'
import * as classes from './style.module.css'

const Article = ({ article }: { article: PrismicArticleProps }) => {
  const {
    tags,
    data: {
      category: categoryDocument,
      photo: {
        thumbnails: {
          thumb: { alt, fixed }
        }
      },
      title: { text: title },
      caption
    },
    uid
  } = article

  caption.text = caption.text.length > 0 ? caption.text : 'Autor nie zamieścił żadnych dodatkowych informacji o artykule'
  const categoryName = _.get(categoryDocument, 'document.data.category_name.text', 'Brak kategorii') || 'Brak kategorii'
  const categoryColor = _.get(categoryDocument, 'document.data.color', 'red') || 'red'

  return (
    <CommonLink to={`/articles/${uid}`}>
      <Paper className={classes.article}>
        <header>{fixed && <Img alt={alt ? alt : 'Zdjęcie nagłówkowe artykułu'} fixed={fixed} className={classes.thumb} />}</header>
        <section className={classes.section}>
          <header className={classes.title}>
            <h2>{title}</h2>
          </header>
          <main className={classes.content}>
            <article>
              <p>
                {caption.text.slice(0, 245)}
                {caption.text.length > 245 && '...'}
              </p>
            </article>
          </main>
        </section>
        {categoryDocument && <ArticleMeta tags={tags} categoryColor={categoryColor} categoryName={categoryName} />}
      </Paper>
    </CommonLink>
  )
}

export default React.memo(Article)
