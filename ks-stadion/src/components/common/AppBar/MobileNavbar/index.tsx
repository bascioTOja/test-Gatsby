import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import MenuIcon from '@material-ui/icons/Menu'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { getMainColor } from '../../../../redux/selectors'
import { NavMainItemProps } from '../../../../types'
import Item from './item'
import * as classes from './style.module.css'

const getWindowWidth = (): number => {
  const [screenWidth, setScreenWidth] = useState<number>(0)

  const setScreenWidthHandler = () => {
    setScreenWidth(window.innerWidth)
  }

  useEffect(() => {
    typeof window !== undefined && window.addEventListener('resize', setScreenWidthHandler)
    return () => {
      window.removeEventListener('resize', setScreenWidthHandler)
    }
  }, [])

  return screenWidth
}

const Navbar = ({ navItems }: { navItems: Array<NavMainItemProps> }) => {
  const [open, setOpenState] = useState<boolean>(false)
  const screenWidth = getWindowWidth()

  useEffect(() => {
    open && screenWidth > 960 && setOpenState(false)
  }, [screenWidth])

  const mainColor = useSelector(getMainColor)

  return (
    <nav className={classes.navbar}>
      <IconButton color="inherit" onClick={() => setOpenState(true)} aria-label="open drawer" edge="start">
        <MenuIcon style={{ color: mainColor ? mainColor : '#FFCF40' }} className={classes.menu__icon} />
      </IconButton>
      <Drawer variant="temporary" anchor="top" onClose={() => setOpenState(false)} open={open}>
        <List>
          {navItems.map((item) => (
            <Item key={'m' + item.id} item={item} closeDrawer={() => setOpenState(false)} />
          ))}
        </List>
      </Drawer>
    </nav>
  )
}

export default React.memo(Navbar)
