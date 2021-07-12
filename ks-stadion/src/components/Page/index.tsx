import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import { RichText } from 'prismic-reactjs'
import React from 'react'
import FacebookIcon from 'react-share/lib/FacebookIcon'
import FacebookShareButton from 'react-share/lib/FacebookShareButton'
import TwitterIcon from 'react-share/lib/TwitterIcon'
import TwitterShareButton from 'react-share/lib/TwitterShareButton'

import RenderSlice from '../../prismic/slices/page'
import { PrismicPageProps } from '../../prismic/types'
import { linkResolver } from '../../utils/linkResolver'
import HeaderCard from '../common/Cards/headerCard'
import * as classes from './style.module.css'

const PageComponent = ({ page }: { page: PrismicPageProps }) => {
  const url = typeof window === 'undefined' ? '' : window.location.href

  const {
    data: {
      caption: { text: caption, raw: captionRaw },
      title: { text: pageTitle },
      body: slices
    }
  } = page

  return (
    <Container className={classes.page}>
      <HeaderCard text={pageTitle} />
      <Paper className={classes.paper}>
        {slices.length === 0 && captionRaw.length === 0 ? (
          <p>Autor nie zamieścił żadnych dodatkowych informacji o stronie</p>
        ) : (
          <>
            {captionRaw.length > 0 && <RichText render={captionRaw} linkResolver={linkResolver} />}
            {slices.length > 0 && slices.map((slice) => (
              <RenderSlice key={slice.id} slice={slice} />
            ))}
          </>
        )}
      </Paper>
      <div className={classes.share}>
        <FacebookShareButton quote={caption} url={url}>
          <FacebookIcon size={32} round={true} />
        </FacebookShareButton>
        <TwitterShareButton title={pageTitle} via="https://protrainup.com/pl" url={url}>
          <TwitterIcon size={31} round={true} />
        </TwitterShareButton>
      </div>
    </Container>
  )
}

export default React.memo(PageComponent)
