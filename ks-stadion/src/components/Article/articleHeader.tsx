import { Container } from '@material-ui/core'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { PrismicArticleProps } from '../../prismic/types'
import CommonImage from '../common/Image'
import * as classes from './style.module.css'

const ArticleHeader = ({ article }: { article: PrismicArticleProps }) => {
  const { t } = useTranslation()
  const {
    category: categoryData,
    photo: { alt, fixed }
  } = article.data

  return (
    <header className={classes.article__header}>
      <Container className={classes.article__meta}>
        <div className={classes.article__category}>
          <div
            className={classes.category__color}
            style={{ backgroundColor: categoryData && categoryData.document ? categoryData.document.data.color : '#FFF' }}
          ></div>
          <span className={classes.category__name}>
            {categoryData && categoryData.document ? categoryData.document.data.category_name.text : t('no-data')}
          </span>
        </div>
        <div className={classes.article__title}>
          <h1>{article.data.title.text}</h1>
        </div>
      </Container>
      <div className={classes.article__picture}>
        <CommonImage className={classes.article__img} fixed={fixed} alt={alt ? alt : "Artykuł nie posiada tytułu"} />
      </div>
    </header>
  )
}

export default React.memo(ArticleHeader)
