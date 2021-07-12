import Container from '@material-ui/core/Container'
import Slide from '@material-ui/core/Slide'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import React from 'react'
import { useSelector } from 'react-redux'

import { getNavigation } from '../../../redux/selectors'
import DesktopNavbar from './DesktopNav'
import MobileNavbar from './MobileNavbar'
import Logo from './logo'
import * as classes from './style.module.css'

interface Props {
  window?: () => Window
  children: React.ReactElement
}

const HideOnScroll = (props: Props) => {
  const { children } = props
  const trigger = useScrollTrigger()

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}

const AppBar = () => {
  const navItems = useSelector(getNavigation)
  return (
    <>
      <HideOnScroll>
        <header className={classes.header}>
          <Container className={classes.navbar__container}>
            <div className={classes.navbar__wrapper} id="navbar">
              <Logo />
              <MobileNavbar navItems={navItems} />
            </div>
          </Container>
        </header>
      </HideOnScroll>
      <header className={`${classes.header} ${classes.desktop}`}>
        <Container className={classes.navbar__container}>
          <div className={classes.navbar__wrapper} id="navbar">
            <Logo />
            <DesktopNavbar navItems={navItems} />
          </div>
        </Container>
      </header>
    </>
  )
}

export default React.memo(AppBar)
