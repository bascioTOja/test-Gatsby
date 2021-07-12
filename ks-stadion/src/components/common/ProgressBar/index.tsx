import React from 'react'

import * as classes from './style.module.css'

const ProgressBar = ({ text, progressValue }: { text: string; progressValue: number }) => {
  const width = progressValue / 10 > 100 ? 100 : progressValue / 10

  return (
    <div className={classes.progress}>
      <div className={classes.progress__bar} style={{ width: `${width}%` }}>
        <span className={classes.progress__value}>
          <b>{text}</b>
        </span>
      </div>
    </div>
  )
}

export default React.memo(ProgressBar)
