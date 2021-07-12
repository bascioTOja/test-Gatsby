// That is a component for a link to the album, client can created nested link to his album. By this slice, it will by added with the thumbails
import React from 'react'

import CommonImage from '../../../components/common/Image'
import CommonLink from '../../../components/common/Link'
import { Document } from '../../../prismic/types'
import { linkResolver } from '../../../utils/linkResolver'
import { PrismicAlbumSlice } from '../../types/contentSlices'
import * as classes from './style.module.css'

const AlbumSlice = ({ slice }: { slice: PrismicAlbumSlice }) => {
  return (
    <div className={classes.album__wrapper}>
      {slice.items.map((album, index) => {
        const alt = album.album_link.document?.data.thumb?.alt

        return (
          <CommonLink
            className={classes.album__link}
            key={`${album.album_link.id} ${index}`}
            to={linkResolver(album.album_link.document || ({} as Document))}
          >
            <div className={classes.album}>
              <span className={classes.album__caption}>{album.album_link.document?.data.title.text}</span>
              <CommonImage
                imgStyle={{ width: 'auto' }}
                className={classes.album__thumb}
                alt={alt ? alt : `Zdjęcie nagłówkowe albumu`}
                fixed={album.album_link.document!.data.thumb.fixed}
              />
            </div>
          </CommonLink>
        )
      })}
    </div>
  )
}

export default React.memo(AlbumSlice)
