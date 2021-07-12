import Container from '@material-ui/core/Container'
import React from 'react'
import FacebookIcon from 'react-share/lib/FacebookIcon'
import FacebookShareButton from 'react-share/lib/FacebookShareButton'
import TwitterIcon from 'react-share/lib/TwitterIcon'
import TwitterShareButton from 'react-share/lib/TwitterShareButton'

import RenderSlice from '../../prismic/slices/page'
import { PrismicAlbumProps } from '../../prismic/types'
import * as classes from './style.module.css'

const AlbumComponent = ({
  data: {
    title: { text: title },
    body: photosSlice
  }
}: PrismicAlbumProps) => {
  const url = typeof window === 'undefined' ? '' : window.location.href

  return (
    <div className={classes.container}>
      {photosSlice.map((photo) => (
        <RenderSlice key={photo.id} slice={photo} />
      ))}

      <Container>
        <div className={classes.share}>
          <FacebookShareButton url={url}>
            <FacebookIcon size={32} round={true} />
          </FacebookShareButton>
          <TwitterShareButton title={title} via="https://protrainup.com/pl" url={url}>
            <TwitterIcon size={31} round={true} />
          </TwitterShareButton>
        </div>
      </Container>
    </div>
  )
}

export default React.memo(AlbumComponent)
