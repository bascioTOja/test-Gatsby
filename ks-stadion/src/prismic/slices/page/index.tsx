import { useStaticQuery, graphql } from 'gatsby'
import React from 'react'

import { PrismicPageContentSlice } from '../../types/contentSlices'
import AlbumSlice from './album'
import ContentSlice from './content'
import EmoteSeparatorSlice from './emoteSeparator'
import GridContentSlice from './gridContent'
import LocalizationSlice from './localization'
import PhotosSlice from './photos'

const RenderSlice = ({ slice }: { slice: PrismicPageContentSlice }) => {
  switch (slice.slice_type) {
    case 'content':
      return <ContentSlice slice={slice} />
    case 'emote_separator':
      return <EmoteSeparatorSlice slice={slice} />
    case 'grid_content':
      return <GridContentSlice slice={slice} />
    case 'photos':
      return <PhotosSlice slice={slice} />
    case 'album':
      return <AlbumSlice slice={slice} />
    case 'localization': {
      const {
        prismicGeneral: {
          data: {
            google_map_api_key: { text: mapApiKey }
          }
        }
      }: { prismicGeneral: { data: { google_map_api_key: { text: string } } } } = useStaticQuery(graphql`
        {
          prismicGeneral {
            data {
              google_map_api_key {
                text
              }
            }
          }
        }
      `)
      return (
        <LocalizationSlice
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${mapApiKey}&v=3.exp&libraries=geometry,drawing,places`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%`, marginTop: '2rem' }} />}
          slice={slice}
        />
      )
    }
  }
}

export default React.memo(RenderSlice)
