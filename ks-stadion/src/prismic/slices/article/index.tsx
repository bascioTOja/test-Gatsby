import React from 'react'

import { PrismicArticleSlice } from '../../../prismic/types/contentSlices'
import ContentSlice from '../page/content'
import LocalizationSlice from '../page/localization'
import PhotosSlice from '../page/photos'

const RenderArticleSlice = ({ slice }: { slice: PrismicArticleSlice }) => {
  switch (slice.slice_type) {
    case 'content':
      return <ContentSlice slice={slice} />
    case 'photos':
      return <PhotosSlice slice={slice} />
    case 'localization':
      return (
        <LocalizationSlice
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%`, marginTop: '2rem' }} />}
          slice={slice}
        />
      )
  }
}

export default React.memo(RenderArticleSlice)
