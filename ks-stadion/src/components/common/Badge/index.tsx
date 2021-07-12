import React from 'react'

import * as classes from './style.module.css'

const Badge = ({ text }: { text: string }) => {
  return <span className={classes.badge__blue}>{text}</span>
}

export default React.memo(Badge)
