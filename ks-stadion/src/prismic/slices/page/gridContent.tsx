import Grid from '@material-ui/core/Grid'
import { RichText } from 'prismic-reactjs'
import React from 'react'

import { linkResolver } from '../../../utils/linkResolver'
import { PrismicGridContentSlice } from '../../types/contentSlices'

const GridContentSlice = ({ slice }: { slice: PrismicGridContentSlice }) => {
  return (
    <div>
      {slice.items.length > 0 &&
        slice.items.map((row, index) => (
          <Grid container key={index}>
            <Grid xs={12} sm={6} item>
              <RichText render={row.left_column.raw} linkResolver={linkResolver} />
            </Grid>
            <Grid xs={12} sm={6} item>
              <RichText render={row.right_column.raw} linkResolver={linkResolver} />
            </Grid>
          </Grid>
        ))}
    </div>
  )
}

export default React.memo(GridContentSlice)
