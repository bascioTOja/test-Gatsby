import { Paper } from '@material-ui/core'
import PriorityHighIcon from '@material-ui/icons/PriorityHigh'
import { FixedObject } from 'gatsby-image'
import _ from 'lodash'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import HeaderCard from '../../../components/common/Cards/headerCard'
import CommonImage from '../../../components/common/Image'
import CommonLink from '../../../components/common/Link'
import { getMainColor } from '../../../redux/selectors'
import { linkResolver } from '../../../utils/linkResolver'
import { PrismicHiglightSlice } from '../../types/widgets'
import More from './more'
import * as classes from './style.module.css'

const Highlight = ({ slice }: { slice: PrismicHiglightSlice }) => {
  if (!slice.primary.link.document) return null

  const { t } = useTranslation()
  const mainColor = useSelector(getMainColor)

  const title = _.get(slice, 'primary.link.document.data.title.text', t('no-data'))

  const thumb: FixedObject | null =
    slice.primary.link.type === 'article'
      ? _.get(slice, 'primary.link.document.data.photo.thumbnails.thumb.fixed', null)
      : _.get(slice, 'primary.link.document.data.baner.thumbnails.thumb.fixed', null)

  const altText: string | null =
    slice.primary.link.type === 'article'
      ? _.get(slice, 'primary.link.document.data.photo.alt', t('no-data'))
      : _.get(slice, 'primary.link.document.data.baner.alt', t('no-data'))

  return (
    <div className={classes.highlight}>
      <PriorityHighIcon className={classes.highlight__icon} style={{ color: mainColor ? mainColor : '#FFCF40' }} />
      <HeaderCard rounded={false} text={title ? title : t('no-data')} />
      <div className={classes.highlight__thumb__wrapper}>
        <CommonLink to={linkResolver(slice.primary.link.document)}>
          <CommonImage className={classes.highlight__thumb} fixed={thumb} alt={altText || 'Zdjęcie wyróżnionego artykułu'} />
        </CommonLink>
      </div>
      <Paper className={classes.highlight__content} square={false}>
        <p>
          {slice.primary.encourage_text.text.slice(0, 155)}
          {slice.primary.encourage_text.text.length > 155 ? '...' : ''}
        </p>
      </Paper>
      <CommonLink to={linkResolver(slice.primary.link.document)}>
        <More />
      </CommonLink>
    </div>
  )
}

export default React.memo(Highlight)
