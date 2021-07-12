import Paper from '@material-ui/core/Paper'
import _ from 'lodash'
import React from 'react'

import HeaderCard from '../../../components/common/Cards/headerCard'
import CommonImage from '../../../components/common/Image'
import { PrismicPartnerSlice } from '../../types/widgets'
import * as classes from './style.module.css'

const Partner = ({ slice }: { slice: PrismicPartnerSlice }) => {

  return (
    <div>
      <HeaderCard text="Partner" rounded={false} />
      <Paper square={true} className={classes.partner}>
        <a rel="noopener" target={slice.primary.link.target} href={_.get(slice, 'primary.link.url', '#')}>
          <CommonImage
            style={{ width: '20rem' }}
            className={classes.partner__img}
            fixed={_.get(slice, 'primary.photo.fixed', null)}
            alt={_.get(slice, 'primary.photo.alt', 'Zdjęcie partnera drużyny') || 'Zdjęcie partnera drużyny'}
          />
        </a>
      </Paper>
    </div>
  )
}

export default React.memo(Partner)
