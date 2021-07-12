import { FluidObject } from 'gatsby-image'
import { LeagueGameProps } from 'gatsby-source-protrainup/typescript/types/game'
import { MatchEventProps, MatchPlayerProps, MatchProps } from 'gatsby-source-protrainup/typescript/types/match'
import { MemberProps } from 'gatsby-source-protrainup/typescript/types/member'
import { PlayerProps } from 'gatsby-source-protrainup/typescript/types/player'
import { SystemClubProps } from 'gatsby-source-protrainup/typescript/types/systemClub'
import { TeamProps } from 'gatsby-source-protrainup/typescript/types/team'
import { TrainingProps } from 'gatsby-source-protrainup/typescript/types/training'
import React from 'react'

import { PrismicGeneralProps, PrismicMenuProps } from '../prismic/types'

/////////////////////////////////////////////////////////////////////////////////
////////// Every type will be sorted by his main component name /////////////////
/////////////////////////////////////////////////////////////////////////////////

export const TransitionStatutes = ['exited', 'entering', 'entered', 'exiting'] as const

export type MainPageProps = {
  teams: { nodes: Array<TeamProps> }
} & PrismicGeneralProps

export type NavMainItemProps = {
  position: number
} & PrismicMenuProps

// Cards
export type HeaderCardProps = {
  text: string
  rounded?: boolean
  subText?: string
  styles?: React.CSSProperties
}

// Landing page
export type SlideProps = {
  id: string
  isDocument?: boolean
  url?: string
  caption: {
    text: string
  }
  title: {
    text: string
  }
  picture: {
    alt: string | null
    fluid: FluidObject | null
  }
}

/////////////////////////////////////////////////////////
///////////////////// Templates /////////////////////////
/////////////////////////////////////////////////////////

// Cadre members list
export type CadreListQueryProps = {
  members: {
    group: Array<{
      nodes: Array<MemberProps>
    }>
  }
}

// Matches list
export type MatchesListQueryProps = {
  matches: {
    distinct: Array<string>
    nodes: Array<MatchProps>
  }
}

// Match
export type MatchTemplateQueryProps = {
  match: MatchProps
  events: { nodes: Array<MatchEventProps> }
  players: { edges: Array<{ node: PlayerProps }> }
  matchPlayers: { edges: Array<{ node: MatchPlayerProps }> }
}

// Team
export type TeamTemplateQueryProps = {
  team: TeamProps
  club: SystemClubProps
  lastMatch: { nodes: Array<MatchProps> }
  players: {
    totalCount: number
    nodes: Array<PlayerProps>
  }
  trainings: { nodes: Array<TrainingProps> }
  members: { nodes: Array<MemberProps> }
}

// 330-2
export type LeaguePageProps = {
  leaguesData: { nodes: Array<LeagueGameProps> }
}
