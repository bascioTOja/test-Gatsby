import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import dayjs from 'dayjs'
import _ from 'lodash'
import React from 'react'

import { PrismicArticleProps } from '../../prismic/types'
import ArticleMeta from '../common/ArticleMeta'
import CommonImage from '../common/Image'
import CommonLink from '../common/Link'
import * as classes from './style.module.css'

const Article = ({ article }: { article: PrismicArticleProps }) => {
  const {
    last_publication_date,
    uid,
    tags,
    data: {
      category,
      title: { text: title },
      caption,
      photo: {
        thumbnails: { thumb: thumbnail }
      }
    }
  } = article

  const categoryName = _.get(category, 'document.data.category_name.text', 'Brak kategorii') || 'Brak kategorii'
  const categoryColor = _.get(category, 'document.data.color', 'red') || 'red'
  caption.text = caption.text.length > 0 ? caption.text : 'Autor nie zamieścił żadnych dodatkowych informacji o artykule'

  return (
    <Paper className={classes.article}>
      <CommonLink to={`/articles/${uid}`}>
        <Grid container className={classes.article__grid}>
          <Grid item xs={12} md={7} className={classes.grid__item}>
            <div className={classes.article__content}>
              <h4 className={classes.article__title}>
                {title.slice(0, 33)}
                {title.length > 33 && '...'}
              </h4>
              {last_publication_date && (
                <span className={classes.article__date}>{dayjs(last_publication_date).format('DD MMMM YYYY')}</span>
              )}
              <main className={classes.article__text}>
                {caption.text.slice(0, 245)}
                {caption.text.length > 245 && '...'}
              </main>
            </div>
            <ArticleMeta tags={tags} categoryColor={categoryColor} categoryName={categoryName} />
          </Grid>
          <Grid item xs={12} md={5} className={classes.grid__item}>
            <CommonImage
              className={classes.article__image}
              fixed={thumbnail.fixed}
              alt={thumbnail.alt ? thumbnail.alt : `Zdjęcie nagłówkowę artykułu - ${title}`}
            />
          </Grid>
        </Grid>
      </CommonLink>
    </Paper>
  )
}

export default React.memo(Article)
