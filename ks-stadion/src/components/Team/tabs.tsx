import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd'
import GroupIcon from '@material-ui/icons/Group'
import ScheduleIcon from '@material-ui/icons/Schedule'
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle'
import _ from 'lodash'
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import ColorProvider from '../../components/common/Providers/color'
import * as classes from './style.module.css'

type Props = {
  teamRef: React.MutableRefObject<HTMLDivElement>
  calendarRef: React.MutableRefObject<HTMLDivElement>
  membersRef: React.MutableRefObject<HTMLDivElement> | null
  playersRef: React.MutableRefObject<HTMLDivElement> | null
}

let isClicked: boolean = false

const TabsComp = ({ teamRef, calendarRef, membersRef, playersRef }: Props) => {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState<number>(0)

  function scrollHandler() {
    const Y = window.pageYOffset + window.outerHeight / 2

    isClicked &&
      setTimeout(() => {
        isClicked = false
      }, 100)

    if (isClicked === false) {
      if (teamRef.current?.offsetTop !== undefined && Y <= teamRef.current?.offsetTop + teamRef.current?.offsetHeight) {
        setActiveTab(0)
      } else if (calendarRef.current?.offsetTop !== undefined && Y <= calendarRef.current?.offsetTop + calendarRef.current?.offsetHeight) {
        setActiveTab(1)
      } else if (membersRef !== null && Y <= membersRef.current?.offsetTop + membersRef.current?.offsetHeight) {
        setActiveTab(2)
      } else if (playersRef !== null && Y <= playersRef.current?.offsetTop + playersRef.current?.offsetHeight) {
        setActiveTab(3)
      }
    }
  }

  // Must have, because of removeEventListener bug
  const debounceScrolLListener = _.debounce(scrollHandler, 100)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', debounceScrolLListener)
      return () => {
        window.removeEventListener('scroll', debounceScrolLListener)
      }
    }
  }, [])

  const scrollToItem = (item: React.MutableRefObject<HTMLDivElement>, index: number) => {
    isClicked = true
    setActiveTab(index)
    if (item !== null) {
      // Take aware of navbar is fixed
      const navHeight = window.innerWidth < 960 ? 74 : 90
      window.scrollBy({
        top: item.current.offsetTop - window.pageYOffset - navHeight,
        left: 0,
        behavior: 'smooth'
      })
    }
  }

  return (
    <ColorProvider>
      <div className={classes.tabs__wrapper}>
        <div className={classes.tabs}>
          <Tabs value={activeTab} variant="scrollable" indicatorColor="primary" textColor="primary">
            <Tab onClick={() => scrollToItem(teamRef, 0)} className={classes.tab} icon={<AssignmentIndIcon />} label="Profil" />
            <Tab onClick={() => scrollToItem(calendarRef, 1)} className={classes.tab} icon={<ScheduleIcon />} label="Plan zajęć" />
            <Tab
              disabled={membersRef === null}
              onClick={membersRef ? () => scrollToItem(membersRef, 2) : undefined}
              className={classes.tab}
              icon={<SupervisedUserCircleIcon />}
              label={t('Crew')}
            />
            <Tab
              disabled={playersRef === null}
              onClick={playersRef ? () => scrollToItem(playersRef, 3) : undefined}
              className={classes.tab}
              icon={<GroupIcon />}
              label={t('Roster')}
            />
          </Tabs>
        </div>
      </div>
    </ColorProvider>
  )
}

export default React.memo(TabsComp)
