import { GatsbyImage } from 'gatsby-plugin-image'
import { IGatsbyImageData } from 'gatsby-plugin-image'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { DefaultCrest } from '../CrestDefault'
import * as classes from './style.module.css'

type Props = {
  clubName: string | null
  crest?: IGatsbyImageData | null
  alt: string | null
}

const ResultTeam = ({ clubName, crest, alt }: Props) => {
  const { t } = useTranslation()
  const alternativeText = alt ? alt : t('no-data');

  return (
    <article className={classes.match__club}>
      <header>{crest ? <GatsbyImage image={crest} alt={alternativeText} /> : <DefaultCrest />}</header>
      <section className={classes.club__name}>
        <span>{clubName ? clubName : t('no-data')}</span>
      </section>
    </article>
  )
}

export default React.memo(ResultTeam)
