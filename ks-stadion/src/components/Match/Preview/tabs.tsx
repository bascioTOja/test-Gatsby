import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import ClassIcon from '@material-ui/icons/Class'
import EventSeatIcon from '@material-ui/icons/EventSeat'
import GroupIcon from '@material-ui/icons/Group'
import TimelineIcon from '@material-ui/icons/Timeline'
import _ from 'lodash'
import React, { useState, useEffect } from 'react'

import ColorProvider from '../../common/Providers/color'
import * as classes from './style.module.css'

type Props = {
  mainSquadRef: React.MutableRefObject<HTMLDivElement> | null
  benchRef: React.MutableRefObject<HTMLDivElement> | null
  timelineRef: React.MutableRefObject<HTMLDivElement> | null
  previewRef: React.MutableRefObject<HTMLDivElement>
}

let isClicked = false

const TabsComp = ({ mainSquadRef, benchRef, timelineRef, previewRef }: Props) => {
  const [activeTab, setActiveTab] = useState<number>(0)

  const scrollHandler = () => {
    const Y = window.pageYOffset + window.outerHeight / 2

    isClicked &&
      setTimeout(() => {
        isClicked = false
      }, 100)

    if (!isClicked) {
      if (
        previewRef.current?.offsetTop !== undefined &&
        Y <= previewRef.current.offsetTop + (timelineRef ? timelineRef.current.offsetTop : previewRef.current.offsetHeight)
      ) {
        setActiveTab(0)
      } else if (timelineRef && Y <= timelineRef.current?.offsetTop + timelineRef.current?.offsetHeight) {
        setActiveTab(1)
      } else if (
        mainSquadRef &&
        mainSquadRef?.current.offsetTop !== undefined &&
        Y <= mainSquadRef?.current.offsetTop + mainSquadRef?.current.offsetHeight
      ) {
        setActiveTab(2)
      } else if (
        benchRef &&
        benchRef?.current.offsetTop !== undefined &&
        Y <= benchRef?.current.offsetTop + benchRef.current.offsetHeight
      ) {
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
            <Tab onClick={() => scrollToItem(previewRef, 0)} className={classes.tab} icon={<ClassIcon />} label="Mecz" />
            <Tab
              disabled={timelineRef === null}
              onClick={timelineRef ? () => scrollToItem(timelineRef, 1) : undefined}
              className={classes.tab}
              icon={<TimelineIcon />}
              label={'Oś'}
            />
            <Tab
              disabled={mainSquadRef === null}
              onClick={mainSquadRef ? () => scrollToItem(mainSquadRef, 2) : undefined}
              className={classes.tab}
              icon={<GroupIcon />}
              label="Drużyna"
            />
            <Tab
              disabled={benchRef === null}
              onClick={benchRef ? () => scrollToItem(benchRef, 3) : undefined}
              className={classes.tab}
              icon={<EventSeatIcon />}
              label="Rezerwowi"
            />
          </Tabs>
        </div>
      </div>
    </ColorProvider>
  )
}

export default React.memo(TabsComp)
