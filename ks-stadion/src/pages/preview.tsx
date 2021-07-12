import CircularProgress from '@material-ui/core/CircularProgress'
import { PageProps, navigate } from 'gatsby'
import { withPreviewResolver } from 'gatsby-source-prismic'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import ColorProvider from '../components/common/Providers/color'
import { Document } from '../prismic/types'
import { startPreview } from '../redux/slices/preview'
import { linkResolver } from '../utils/linkResolver'
import * as classes from './style.module.css'

const PreviewPage = ({ isPreview, isLoaded }: { isPreview: boolean; isLoaded: boolean } & PageProps) => {
  const dispatch = useDispatch()

  useEffect(() => {
    !isPreview && isLoaded && navigate('/404')
  }, [])

  useEffect(() => {
    isPreview && dispatch(startPreview())
  }, [isPreview])

  return (
    <div className={classes.preview}>
      {isPreview ? (
        <ColorProvider>
          <CircularProgress />
        </ColorProvider>
      ) : (
        <h1>Na tej stronie nic nie ma</h1>
      )}
    </div>
  )
}

export default withPreviewResolver(React.memo(PreviewPage), {
  repositoryName: 'stadion',
  linkResolver: () => (doc) => linkResolver(doc as Document)
})
