import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import chroma from 'chroma-js'
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import GetNotImageAvailablePNG from '../../../gatsby/queries/getNotImageAvailablePNG'
import { getSecondaryColor } from '../../../redux/selectors'
import CommonLink from '../../common/Link'
import * as classes from './style.module.css'

const Header = ({ crest, team_name, teamColor }: { crest?: IGatsbyImageData | null; team_name: string; teamColor: string }) => {
  const { t } = useTranslation()
  const secondaryColor = useSelector(getSecondaryColor)
  const buttonTextColor = secondaryColor ? (chroma.contrast(chroma(secondaryColor), 'white') > 2 ? 'white' : 'black') : 'black'

  return (
    <div
      className={classes.card__header}
      style={{
        backgroundSize: '50% 30em, 100%',
        backgroundPosition: '-0.2rem',
        background: `linear-gradient(
        45deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 95%, ${teamColor} 95%, ${teamColor} 97%, rgb(255, 255, 255) 97%, rgb(255, 255, 255) 100%)no-repeat bottom`
      }}
    >
      <Grid container>
        <Grid item xs={12} sm={3}>
          <GatsbyImage image={crest ? crest : GetNotImageAvailablePNG()} alt={`Herb drużyny - ${team_name}`} />
        </Grid>
        <Grid item xs={12} sm={9}>
          <div className={classes.header__title}>
            <h4>{team_name}</h4>
          </div>
          <div className={classes.league__button__wrapper}>
            <CommonLink to={`/330-2?team_name=${team_name}`}>
              <Button
                variant="contained"
                style={{ backgroundColor: secondaryColor ? secondaryColor : 'transparent', color: buttonTextColor }}
                className={classes.league__button}
              >
                {t('league-table')}
              </Button>
            </CommonLink>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default React.memo(Header)
