import React, { useState } from 'react'

import * as classes from './style.module.css'

const Card = ({ frontCard, backCard, flip = true }: { frontCard: React.ReactNode; backCard: React.ReactNode; flip?: boolean }) => {
  const [isFlipped, setFlippedState] = useState<boolean>(false)

  return (
    <div
      className={`${classes.card} ${flip ? classes.flip__enabled : ''} ${isFlipped ? classes.flipped : ''}`}
      onClick={flip ? () => setFlippedState(!isFlipped) : undefined}
    >
      <div className={classes.card__inner}>
        <div className={classes.card__front}>{frontCard}</div>
        <div className={classes.card__back}>{backCard}</div>
      </div>
    </div>
  )
}

export default React.memo(Card)
