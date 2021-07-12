import { TeamProps } from 'gatsby-source-protrainup/typescript/types/team'
import _ from 'lodash'

import { Document } from '../prismic/types'
import { PrismicMenuProps, PTUProps } from '../prismic/types'
import { NavMainItemProps } from '../types'

const processPrismicNav = (item: PrismicMenuProps, position: number): NavMainItemProps => ({
  position: position,
  id: item.id,
  primary: {
    id: item.primary.id,
    link_name: item.primary.link_name,
    link: {
      id: item.primary.link.id,
      link_type: item.primary.link.link_type,
      url: item.primary.link.url,
      target: item.primary.link.target,
      document: item.primary.link.document
        ? ({
            type: item.primary.link.document!.type,
            uid: item.primary.link.document!.uid
          } as Document)
        : null,
      type: _.get(item, 'primary.link.document.type', undefined),
      uid: _.get(item, 'primary.link.document.uid', undefined)
    }
  },
  items: item.items.map((item) => ({
    link_name: item.link_name,
    id: item.id,
    link: {
      id: item.link.id,
      link_type: item.link.link_type,
      target: item.link.target,
      url: item.link.url,
      document: item.link.document
        ? ({
            type: item.link.document.type,
            uid: item.link.document.uid
          } as Document)
        : null,
      type: _.get(item, 'link.document.type', undefined),
      uid: _.get(item, 'link.document.uid', undefined)
    }
  }))
})

const composeLink = (name: string, to: string, position: number): NavMainItemProps => ({
  position: position,
  id: to,
  primary: {
    id: to + 'navTop',
    link: {
      document: {
        type: 'page',
        uid: to
      } as Document,
      type: 'page',
      uid: to
    },
    link_name: {
      text: name
    }
  },
  items: []
})

const processMenu = (
  {
    navigation: navItems,
    menu_show_teams,
    menu_teams_position,
    year_as_label,
    active_season
  }: PTUProps & { navigation: Array<PrismicMenuProps> },
  teams: Array<TeamProps>
) => {
  const menu = navItems.map((item, index) => processPrismicNav(item, index))
  const linksToAttach: Array<NavMainItemProps> = []

  if (menu_show_teams) {
    const teamsLink = composeLink('Drużyny', `teams`, menu_teams_position)

    teamsLink.items = teams
      .filter((team) => team.annual_seasons?.some((season) => season.season?.name === active_season.document?.data.season_name.text))
      .map((team) => ({
        id: team.team_name,
        link_name: {
          text: year_as_label && team.age_group ? `Rocznik ${team.age_group}` : team.team_name
        },
        link: {
          id: team.team_id.toString(),
          document: {
            type: 'page',
            uid: `teams/${team.slug}`
          } as Document,
          link_type: 'Document',
          type: 'page',
          url: `/teams/${team.slug}`
        }
      }))

    linksToAttach.push(teamsLink)
  }

  linksToAttach.sort((a, b) => a.position - b.position)
  linksToAttach.forEach((linkToAttach) => {
    menu.splice(linkToAttach.position - 1, 0, linkToAttach)
  })

  return menu
}

export default processMenu
