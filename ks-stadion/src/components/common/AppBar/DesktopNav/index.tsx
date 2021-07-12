import React from 'react'

import { PrismicMenuProps } from '../../../../prismic/types'
import NavItem from './item'
import * as classes from './style.module.css'

const Navbar = ({ navItems }: { navItems: Array<PrismicMenuProps> }) => {
  return (
    <nav className={classes.navbar}>
      <ul className={classes.navbar__list}>
        {navItems.map((item) => (
          <NavItem key={'d' + item.id} item={item} />
        ))}
      </ul>
    </nav>
  )
}

export default React.memo(Navbar)
