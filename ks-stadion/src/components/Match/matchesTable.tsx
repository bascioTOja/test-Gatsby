import Container from '@material-ui/core/Container'
import IconButton from '@material-ui/core/IconButton'
import PageviewIcon from '@material-ui/icons/Pageview'
import dayjs from 'dayjs'
import { navigate } from 'gatsby'
import { MatchProps, MatchTypeNames } from 'gatsby-source-protrainup/typescript/types/match'
import { TeamProps } from 'gatsby-source-protrainup/typescript/types/team'
import MaterialTable, { MTableToolbar } from 'material-table'
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import TeamSelect from '../../components/common/TeamSelector'
import { getSecondaryColor } from '../../redux/selectors'
import CommonLink from '../common/Link'
import * as classes from './style.module.css'

type DataProps = {
  date: string
  type: typeof MatchTypeNames[number]
  title: string | null
  hostName: string
  host: string
  score: string
  guest: string
  matchId: number
  hostCrest?: string | null
  guestCrest?: string | null
}

const MatchesTable = ({
  matches,
  types,
  teams
}: {
  matches: Array<MatchProps>
  types: Array<{ [key: number]: string }>
  teams: Array<TeamProps>
}) => {
  const [data, setData] = useState<Array<DataProps> | null>()
  const [teamFilter, setTeamFilter] = useState<string>('')
  const { t } = useTranslation()
  const secondaryColor = useSelector(getSecondaryColor)

  // If passed team id, show records for this team
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search.substring(1))
      const teamId = params.get('team_id')
      if (teamId !== null) {
        const teamFilter = teams.find((team) => team.team_id === parseInt(teamId))
        setTeamFilter(teamFilter ? teamFilter.team_name : '')
      }
    }
  }, [])

  useEffect(() => {
    // Process matches data
    const tempData: Array<DataProps> = matches
      .map((match) => ({
        date: match.date,
        type: match.type,
        title: match.name ? match.name : '-',
        hostName: match.team ? match.team.team_name : '-',
        host: match.host_name ? match.host_name : '',
        score: `${match.result_team_1 !== null ? match.result_team_1 : '-'} : ${match.result_team_2 !== null ? match.result_team_2 : '-'}`,
        guest: match.guest_name ? match.guest_name : '',
        matchId: match.match_id,
        hostCrest: match.host_crest?.childImageSharp.fixed?.srcWebp,
        guestCrest: match.guest_crest?.childImageSharp.fixed?.srcWebp
      }))
      .filter((match) => match.hostName.includes(teamFilter))
    setData(tempData)
  }, [, teamFilter])

  return (
    <Container style={{ padding: '3rem 0' }}>
      <div style={{ width: '100%' }}>
        {data && (
          <MaterialTable
            style={{ fontSize: '1.4rem', textAlign: 'center' }}
            actions={[
              {
                icon: () => <PageviewIcon color="secondary" style={{ fontSize: '4rem' }} />,
                tooltip: t('go-to-match'),
                onClick: (_, rowData) => {
                  if (!Array.isArray(rowData)) {
                    navigate(`/matches/${rowData.matchId}`)
                  }
                }
              }
            ]}
            columns={[
              {
                title: t('Date'),
                render: (rowData) => (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: `
                          ${dayjs(rowData.date).format('HH:mm').toString()}
                          <br />
                          <b>${dayjs(rowData.date).format('DD-MM-YYYY').toString()}</b>
                      `
                    }}
                  ></span>
                ),
                field: 'date',
                align: 'center',
                filtering: false
              },
              {
                title: t('host-team'),
                render: (rowData) => (
                  <div className={classes.team__name}>
                    {rowData.hostCrest && <img style={{ width: '5rem', marginRight: '1rem' }} src={rowData.hostCrest} alt="Herb drużyny gospodarzy" />}
                    <span style={{ display: 'inline-block', width: '100%' }}>{rowData.host}</span>
                  </div>
                ),
                field: 'host',
                hideFilterIcon: true
              },
              {
                title: t('guest-team'),
                render: (rowData) => (
                  <div style={{ textAlign: 'right' }} className={classes.team__name}>
                    <span>{rowData.guest}</span>
                    {rowData.guestCrest && <img style={{ width: '5rem', marginLeft: '1rem' }} src={rowData.guestCrest} alt="Herb drużyny gości" />}
                  </div>
                ),
                field: 'guest',
                hideFilterIcon: true
              },
              { title: 'Host', field: 'hostName', align: 'center', hidden: true },
              { title: 'matchId', field: 'matchId', align: 'center', hidden: true },
              { title: t('match-type'), field: 'type', align: 'center', lookup: types },
              { title: 'Nazwa rozgrywek', field: 'title', align: 'center', hideFilterIcon: true },
              { title: t('Score'), field: 'score', align: 'center', filtering: false, sorting: false, hideFilterIcon: true }
            ]}
            options={{
              draggable: false,
              pageSize: 10,
              filtering: true,
              search: false,
              headerStyle: {
                fontSize: '1.3rem',
                lineHeight: '1.7rem',
                textAlign: 'center'
              },
              actionsCellStyle: {
                fontSize: '1.3rem',
                padding: 0,
                textAlign: 'center'
              }
            }}
            data={data}
            title={t('Matches')}
            localization={{
              pagination: {
                labelDisplayedRows: `{from}-{to} z {count}`,
                labelRowsSelect: 'kolumn',
                nextAriaLabel: 'Następna strona',
                nextTooltip: 'Następna strona',
                previousAriaLabel: 'Poprzednia strona',
                previousTooltip: 'Poprzednia strona',
                lastTooltip: 'Ostatnia strona',
                lastAriaLabel: 'Ostatnia strona',
                firstAriaLabel: 'Pierwsza strona',
                firstTooltip: 'Pierwsza strona'
              },
              toolbar: {
                searchTooltip: t('search'),
                searchPlaceholder: t('search')
              },
              header: {
                actions: ''
              }
            }}
            components={{
              Action: (props) => {
                return (
                  <CommonLink to={`/matches/${props.data.matchId}`}>
                    <IconButton>
                      <PageviewIcon style={{ fontSize: '4rem' }} htmlColor={secondaryColor ? secondaryColor : '#f50057'} />
                    </IconButton>
                  </CommonLink>
                )
              },
              // Remember, exist only one action
              Toolbar: (props) => (
                <div>
                  <MTableToolbar {...props} />
                  <TeamSelect
                    className={classes.team__selector}
                    teams={teams}
                    value={teamFilter}
                    onChange={(newValue: string) => setTeamFilter(newValue)}
                  />
                </div>
              )
            }}
          />
        )}
      </div>
    </Container>
  )
}

export default React.memo(MatchesTable)
