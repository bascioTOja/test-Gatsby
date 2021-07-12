import { makeStyles } from '@material-ui/core'
import chroma from 'chroma-js'
import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { PrismicMenuProps } from '../../../../prismic/types'
import { getMainColor, getSecondaryColor } from '../../../../redux/selectors'
import { linkResolver } from '../../../../utils/linkResolver'
import CommonLink from '../../Link'
import Dropdown from './dropdown'
import * as classes from './style.module.css'

const NavItem = ({ item }: { item: PrismicMenuProps }) => {
  const mainColor = useSelector(getMainColor)
  const secondaryColor = useSelector(getSecondaryColor)
  const [isActive, setActiveState] = useState<boolean>(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    if (item.primary.link.url === window.location.pathname) {
      setActiveState(true)
      return
    }

    item.items.some((item) => {
      return item.link.document && linkResolver(item.link.document) === window.location.pathname
    }) && setActiveState(true)

  }, [])

  const useStyles = makeStyles({
    main__color: {
      '&::before': {
        backgroundColor: mainColor ? mainColor : 'transparent'
      }
    },
    active: {
      fontWeight: 600,
      color: 'rgba(34, 34, 34, 0.9)',
      backgroundColor: secondaryColor ? chroma(secondaryColor).alpha(0.6).css() : 'transparent'
    },
    navbar__link: {
      padding: '0.7rem 2rem',
      transition: '250ms',
      height: '100%',
      borderRadius: '0.5rem',
      margin: '0 0.5rem',
      ['@media (max-width: 1230px)']: {
        padding: '0.7rem 0.5rem'
      },
      '&:hover': {
        color: 'rgba(34, 34, 34, 0.9)',
        backgroundColor: secondaryColor ? secondaryColor : 'transparent'
      }
    }
  })

  const dynamicStyles = useStyles()

  return (
    <li className={classes.navbar__item}>
      {item.primary.link.link_type === 'Web' ? (
        <a
          rel="noopener"
          className={`${dynamicStyles.navbar__link} ${isActive ? dynamicStyles.active : ''}`}
          href={_.get(item, 'primary.link.url', '#')}
          target={_.get(item, 'primary.link.target', undefined)}
        >
          {item.primary.link_name.text}
        </a>
      ) : (
        <CommonLink
          className={`${dynamicStyles.navbar__link} ${isActive ? dynamicStyles.active : ''}`}
          activeClassName={dynamicStyles.active}
          partiallyActive
          to={item.primary.link.document ? linkResolver(item.primary.link.document) : '#'}
        >
          {item.primary.link_name.text}
        </CommonLink>
      )}
      {item.items.length > 0 && <Dropdown items={item.items} />}
    </li>
  )
}

export default React.memo(NavItem)
