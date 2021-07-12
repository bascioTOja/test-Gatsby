import { graphql, PageProps } from 'gatsby'
import { withPreview } from 'gatsby-source-prismic'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import PageComponent from '../../components/Page'
import Baner from '../../components/common/Baner'
import LayoutTransition from '../../components/common/LayoutTransition'
import Seo from '../../components/common/Seo'
import { PrismicPageProps } from '../../prismic/types'
import { getPageTitle, getPreviewData } from '../../redux/selectors'
import { setPreview } from '../../redux/slices/preview'
import { MainPageProps } from '../../types'
import { LoadGeneralData } from '../../utils'

interface QueryProps {
  prismicPage: PrismicPageProps
}

const Page = ({ data }: PageProps<QueryProps & MainPageProps>) => {
  const dispatch = useDispatch()
  const previewData = useSelector(getPreviewData)

  useEffect(() => {
    previewData.isPreview && previewData.type === null && dispatch(setPreview('page'))
  }, [])

  const {
    prismicPage: {
      data: {
        baner: { alt, fluid: baner },
        title: { text: title }
      }
    }
  } = data

  LoadGeneralData(data)
  const pageTitle = useSelector(getPageTitle)

  return (
    <LayoutTransition>
      <Seo
        description={data.prismicPage.data.description?.text}
        keywords={data.prismicPage.data.keywords?.text}
        imgSrc={baner?.srcWebp}
        title={`${data.prismicPage.data.title.text} - ${pageTitle}`}
      />
      <Baner text={title} alt={alt ? alt : `Zdjęcie nagłówkowe strony - ${pageTitle}`} fluid={baner} />
      <PageComponent page={data.prismicPage} />
    </LayoutTransition>
  )
}

export const query = graphql`
  query Page($uid: String!) {
    prismicPage(uid: { eq: $uid }) {
      ...PrismicPageFragment
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

export default withPreview(React.memo(Page))
