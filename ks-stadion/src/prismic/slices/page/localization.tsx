import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

import { PrismicLocalizationSlice } from '../../types/contentSlices'

const LocalizationSlice = ({
  slice: {
    primary: {
      localization: { latitude, longitude }
    }
  }
}: {
  slice: PrismicLocalizationSlice
}) => {
  return (
    <GoogleMap defaultZoom={13} defaultCenter={{ lat: latitude, lng: longitude }}>
      <Marker position={{ lat: latitude, lng: longitude }} />
    </GoogleMap>
  )
}

export default React.memo(withScriptjs(withGoogleMap(LocalizationSlice)))
