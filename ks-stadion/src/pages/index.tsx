import { PageProps, graphql } from 'gatsby'
import { withPreview } from 'gatsby-source-prismic'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Main from '../components/Landing'
import Header from '../components/Landing/Header'
import LayoutTransition from '../components/common/LayoutTransition'
import Seo from '../components/common/Seo'
import processWidgets from '../prismic/processWidgets'
import { PrismicLandingpageProps } from '../prismic/types'
import { getPreviewData } from '../redux/selectors'
import { setPreview } from '../redux/slices/preview'
import { MainPageProps, TransitionStatutes } from '../types'
import { LoadGeneralData } from '../utils'

const IndexPage = (
  props: { transitionStatus: typeof TransitionStatutes[number] } & PageProps<
    MainPageProps & { prismicLandingpage: PrismicLandingpageProps }
  >
) => {
  const { data } = props
  const dispatch = useDispatch()
  const previewInfo = useSelector(getPreviewData)
  const pageTitle = data.prismicGeneral.data.title.text

  previewInfo.isPreview &&
    !previewInfo.isInitialized &&
    (data.prismicGeneral.data.widgets = processWidgets(data.prismicGeneral.data.widgets))

  LoadGeneralData(data)

  useEffect(() => {
    previewInfo.isPreview && !previewInfo.isInitialized && dispatch(setPreview('common'))
  }, [])

  const { sponsors } = data.prismicGeneral.data

  let seoImg: string | undefined = undefined
  if (data.prismicLandingpage.data.slider.length > 0) {
    const slide = data.prismicLandingpage.data.slider[0]
    if (slide.slice_type === 'slide') {
      seoImg = slide.primary.photo.fluid?.srcWebp
    } else {
      seoImg =
        slide.primary.link.type === 'article'
          ? slide.primary.link.document?.data.photo.fluid?.srcWebp
          : slide.primary.link.document?.data.baner.fluid?.srcWebp
    }
  } else if (data.prismicGeneral.data.logo) {
    seoImg = data.prismicGeneral.data.logo.fixed?.srcWebp
  }

  return (
    <LayoutTransition>
      <Seo title={`Strona główna - ${pageTitle}`} imgSrc={seoImg} />
      <Header landingPageProps={data.prismicLandingpage} />
      <Main sponsors={sponsors} />
    </LayoutTransition>
  )
}

export const query = graphql`
  query {
    prismicGeneral {
      ...PrismicGeneralFragment

      data {
        sponsors {
          link {
            target
            url
          }
          photo {
            alt
            fixed(width: 70) {
              ...GatsbyPrismicImageFixed_withWebp
            }
          }
        }
      }
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

    prismicLandingpage {
      ...PrismicLandingpageFragment
    }
  }
`

export default withPreview(React.memo(IndexPage))
