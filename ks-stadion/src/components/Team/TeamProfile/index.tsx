import Paper from '@material-ui/core/Paper'
import { MatchProps } from 'gatsby-source-protrainup/typescript/types/match'
import { SystemClubProps } from 'gatsby-source-protrainup/typescript/types/systemClub'
import { TeamProps } from 'gatsby-source-protrainup/typescript/types/team'
import _ from 'lodash'
import React from 'react'
import { useTranslation } from 'react-i18next'

import HeaderCard from '../../common/Cards/headerCard'
import Header from './header'
import InfoModule from './info'
import LastMatch from './lastMatch'

type Props = {
  club: SystemClubProps
  team: TeamProps
  lastMatch: MatchProps | null
  numberOfPlayers: number
  ref: React.Ref<HTMLDivElement>
}

const TeamProfile = React.forwardRef((props: Props, ref: React.Ref<HTMLDivElement>) => {
  const { t } = useTranslation()

  return (
    <div ref={ref} id="team">
      <Paper>
        <HeaderCard text={t('team-profile')} rounded={false} />
        <Header
          crest={_.get(props.club, 'crest.childImageSharp.gatsbyImageData', undefined)}
          team_name={props.team.team_name}
          teamColor={props.team.color}
        />
        <InfoModule
          numberOfPlayers={props.numberOfPlayers}
          discipline={props.team.discipline}
          country={props.team.country ? props.team.country : '?'}
          ageGroup={props.team.age_group}
        />
        <LastMatch lastMatch={props.lastMatch} />
      </Paper>
    </div>
  )
})

export default React.memo(TeamProfile)
