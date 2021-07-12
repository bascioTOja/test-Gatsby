import { makeStyles } from '@material-ui/core'
import _ from 'lodash'
import React from 'react'
import { useSelector } from 'react-redux'

import { PrismicMenuLinkProps } from '../../../../prismic/types'
import { getMainColor } from '../../../../redux/selectors'
import { linkResolver } from '../../../../utils/linkResolver'
import CommonLink from '../../Link'
import * as classes from './style.module.css'

const useStyles = makeStyles({
  main__color: (props: React.CSSProperties) => ({
    '&::before': {
      backgroundColor: props.backgroundColor
    }
  })
})

const Dropdown = ({ items }: { items: Array<PrismicMenuLinkProps> }) => {
  const mainColor = useSelector(getMainColor)
  const dynamicStyles = useStyles({ backgroundColor: mainColor ? mainColor : '#FFCF40' })

  return (
    <ul className={classes.dropdown}>
      {items.map((item, index) => (
        // Web has not id, so set URL as key, to be sure that is unique add index
        <li className={classes.dropdown__item} key={'DD' + (item.link.id ? item.link.id : item.link.url + index.toString())}>
          {item.link.link_type === 'Web' ? (
            <a
              href={_.get(item, 'link.url', '#')}
              rel="noopener"
              target={_.get(item, 'link.target', undefined)}
              className={`${classes.dropdown__link} ${dynamicStyles.main__color}`}
            >
              {item.link_name.text}
            </a>
          ) : (
            <CommonLink
              to={item.link.document ? linkResolver(item.link.document) : '#'}
              className={`${classes.dropdown__link} ${dynamicStyles.main__color}`}
            >
              {item.link_name.text}
            </CommonLink>
          )}
        </li>
      ))}
    </ul>
  )
}

export default React.memo(Dropdown)
