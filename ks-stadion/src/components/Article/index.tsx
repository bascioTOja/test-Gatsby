import { Container } from '@material-ui/core'
import dayjs from 'dayjs'
import { RichText } from 'prismic-reactjs'
import React from 'react'
import FacebookIcon from 'react-share/lib/FacebookIcon'
import FacebookShareButton from 'react-share/lib/FacebookShareButton'
import TwitterIcon from 'react-share/lib/TwitterIcon'
import TwitterShareButton from 'react-share/lib/TwitterShareButton'

import RenderArticleSlice from '../../prismic/slices/article'
import { PrismicArticleProps } from '../../prismic/types'
import { linkResolver } from '../../utils/linkResolver'
import Tag from '../common/ArticleMeta/tag'
import ArticleHeader from './articleHeader'
import * as classes from './style.module.css'

const ArticleComponent = ({ article }: { article: PrismicArticleProps }) => {
  const url = typeof window === 'undefined' ? '' : window.location.href

  return (
    <>
      <article style={{ zIndex: 1, paddingBottom: '3rem' }}>
        <ArticleHeader article={article} />
        <Container>
          {article.first_publication_date && (
            <span className={classes.publish__date}>{dayjs(article.first_publication_date).format('DD MMMM YYYY')}</span>
          )}
          <main className={classes.article__content}>
            {article.data.body.length === 0 && article.data.caption.raw.length === 0 ? (
              <p>Autor nie zamieścił żadnych dodatkowych informacji o artykule</p>
            ) : (
              <>
                {article.data.caption.raw.length > 0 && <RichText render={article.data.caption.raw} linkResolver={linkResolver} />}
                {article.data.body.length > 0 && article.data.body.map((slice) => <RenderArticleSlice key={slice.id} slice={slice} />)}
              </>
            )}
          </main>
          <div>
            <div className={classes.share}>
              <FacebookShareButton quote={article.data.caption.text} url={url}>
                <FacebookIcon size={32} round={true} />
              </FacebookShareButton>
              <TwitterShareButton title={article.data.title.text} via="https://protrainup.com/pl" url={url}>
                <TwitterIcon size={31} round={true} />
              </TwitterShareButton>
            </div>
            <div className={classes.article__tags}>
              {article.tags.map((tag) => (
                <Tag key={tag} tag={tag} isLink={true} />
              ))}
            </div>
          </div>
        </Container>
      </article>
    </>
  )
}

export default React.memo(ArticleComponent)
