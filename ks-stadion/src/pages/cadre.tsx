import { graphql, PageProps } from 'gatsby'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import CadreComp from '../components/Cadre'
import Baner from '../components/common/Baner'
import LayoutTransition from '../components/common/LayoutTransition'
import Seo from '../components/common/Seo'
import { PrismicPageProps } from '../prismic/types'
import { getPageTitle } from '../redux/selectors'
import { CadreListQueryProps, MainPageProps } from '../types'
import { LoadGeneralData } from '../utils'

const Cadre = ({ data }: PageProps<CadreListQueryProps & MainPageProps & { page: PrismicPageProps | null }>) => {
  const baner = data.page?.data.baner.fluid
  const { t } = useTranslation()

  // extract members
  const members = data.members.group.map((group) => group.nodes[0])
  LoadGeneralData(data)
  const pageTitle = useSelector(getPageTitle)

  return (
    <LayoutTransition>
      <Seo
        title={`${data.page ? data.page.data.title.text : t('Crew')} - ${pageTitle}}`}
        description={data.page && data.page.data.description ? data.page.data.description.text : 'Kadra klubu strony - ' + pageTitle}
        imgSrc={baner && !!baner.srcWebp ? baner.srcWebp : undefined}
        keywords={data.page && data.page.data.keywords ? data.page.data.keywords.text : undefined}
      />
      <Baner alt={'Baner kadry'} text={t('Crew')} fluid={baner} />
      <CadreComp members={members} />
    </LayoutTransition>
  )
}

export default React.memo(Cadre)

export const query = graphql`
  {
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

    page: prismicPage(uid: { eq: "cadre" }) {
      data {
        description {
          text
        }

        keywords {
          text
        }

        title {
          text
        }
        baner {
          fluid {
            ...GatsbyPrismicImageFluid_withWebp
          }
        }
      }
    }

    members: allProtrainupMember {
      group(field: user___id, limit: 1) {
        nodes {
          id
          user {
            full_name
            name
            surname
            profile {
              country
              telephone
            }
            avatar {
              childImageSharp {
                gatsbyImageData(layout: FIXED, width: 140, height: 140, placeholder: BLURRED)
              }
            }
          }
        }
      }
    }
  }
`
