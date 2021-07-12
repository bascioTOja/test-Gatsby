import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import { TeamProps } from 'gatsby-source-protrainup/typescript/types/team'
import React from 'react'
import { useTranslation } from 'react-i18next'
import ColorProvider from '../../common/Providers/color'

const TeamSelector = ({
  teams,
  onChange,
  value,
  className
}: {
  className?: string
  value: string
  teams: Array<TeamProps>
  onChange: (newValue: string) => void
}) => {
  const { t } = useTranslation()

  return (
    <div className={className}>
      <ColorProvider>
      <FormControl style={{ width: '30rem' }}>
        <InputLabel style={{ fontSize: '1.4rem' }} id="select-team-label">
          {t('Team')}
        </InputLabel>
        <Select
          style={{ fontSize: '1.4rem' }}
          labelId="select-team-label"
          id="select-team"
          value={value}
          onChange={(e) => onChange(e.target.value as string)}
        >
          <MenuItem style={{ fontSize: '1.4rem' }} value="" selected>
            {t('all-teams')}
          </MenuItem>
          {teams.map((team) => (
            <MenuItem style={{ fontSize: '1.4rem' }} key={team.team_name} value={team.team_name}>
              {team.team_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </ColorProvider>
    </div>
  )
}

export default React.memo(TeamSelector)
