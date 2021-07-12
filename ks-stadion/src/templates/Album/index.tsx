import { graphql, PageProps } from 'gatsby'
import { withPreview } from 'gatsby-source-prismic'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import AlbumComponent from '../../components/Album'
import Baner from '../../components/common/Baner'
import LayoutTransition from '../../components/common/LayoutTransition'
import Seo from '../../components/common/Seo'
import { PrismicAlbumProps } from '../../prismic/types'
import { getPageTitle, isPreview } from '../../redux/selectors'
import { setPreview } from '../../redux/slices/preview'
import { MainPageProps } from '../../types'
import { LoadGeneralData } from '../../utils'

interface QueryProps {
  prismicAlbum: PrismicAlbumProps
}

const Album = ({ data }: PageProps<QueryProps & MainPageProps>) => {
  const { prismicAlbum } = data
  const isPreviewMode = useSelector(isPreview)
  const dispatch = useDispatch()

  useEffect(() => {
    isPreviewMode && dispatch(setPreview('album'))
  }, [])
  LoadGeneralData(data)
  const pageTitle = useSelector(getPageTitle)

  return (
    <LayoutTransition>
      <Seo
        description={prismicAlbum.data.description?.text}
        keywords={prismicAlbum.data.keywords?.text}
        title={`${prismicAlbum.data.title.text} - ${pageTitle}`}
        imgSrc={prismicAlbum.data.picture?.fluid?.srcWebp}
      />
      <Baner text={prismicAlbum.data.title.text} fluid={prismicAlbum.data.picture?.fluid} />
      <AlbumComponent {...prismicAlbum} />
    </LayoutTransition>
  )
}

export const query = graphql`
  query Album($uid: String!) {
    prismicAlbum(uid: { eq: $uid }) {
      ...PrismicAlbumFragment
    }

    prismicGeneral {
      ...PrismicGeneralFragment
    }

    teams: allProtrainupTeam(filter: { hidden_at: { eq: null } }) {
      nodes {
        slug
        team_id
        team_name
        age_group

        annual_seasons {
          season {
            name
          }
        }
      }
    }
  }
`

export default withPreview(React.memo(Album))
