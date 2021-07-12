import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'

import icon from '../../../images/icon.png'
import * as classes from './style.module.css'

const LazyLoad = () => {
  const [isLoaded, setLoadedState] = useState<boolean>(false)
  const [toRender, setRenderState] = useState<boolean>(true) // Remove, and make user able to move at the page
  const animationTime = 1500

  useEffect(() => {
    let nestedHandler: NodeJS.Timeout | undefined = undefined
    
    const tHandler = setTimeout(() => {
      setLoadedState(true)
      nestedHandler = setTimeout(() => {
        setRenderState(false)
      }, 500)
    }, animationTime)

    return () => {
      clearTimeout(tHandler)
      nestedHandler && clearTimeout(nestedHandler)
    }
  }, [])

  if (!toRender) {
    return null
  }

  return (
    <>
      <Helmet>
        <title>Ładowanie</title>
      </Helmet>
      <div className={`${classes.loading__container} ${isLoaded && classes.loading__loaded}`}>
        <img loading="lazy" src={icon} className={classes.loading__crest} alt="Ładowanie strony" />
      </div>
    </>
  )
}

export default React.memo(LazyLoad)
