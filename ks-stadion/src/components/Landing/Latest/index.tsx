import Grid from '@material-ui/core/Grid'
import React from 'react'

import FetchLatestArticles from '../../../gatsby/queries/latestArticles'
import CommonImage from '../../common/Image'
import CommonLink from '../../common/Link'
import * as classes from './style.module.css'

const Latest = () => {
  const { allPrismicArticle: latestArticles } = FetchLatestArticles()

  if (latestArticles.nodes.length === 0) {
    return <div className={classes.empty}>Brak artykułów</div>
  }

  return (
    <Grid spacing={1} className={classes.grid} container>
      {latestArticles.nodes.map((article) => {
        const alt = article.data.photo.thumbnails.thumb.alt

        return (
          <Grid key={article.uid} className={classes.item} item xs={12} sm={6} md={4}>
            <CommonLink to={`/articles/${article.uid}`}>
              <CommonImage
                className={classes.img}
                fixed={article.data.photo.thumbnails.thumb.fixed}
                alt={alt ? alt : `Miniaturka artykułu ${article.data.title.text}`}
              />
              <div className={classes.caption}>
                <h3>{article.data.title.text}</h3>
              </div>
            </CommonLink>
          </Grid>
        )
      })}
    </Grid>
  )
}

export default React.memo(Latest)
