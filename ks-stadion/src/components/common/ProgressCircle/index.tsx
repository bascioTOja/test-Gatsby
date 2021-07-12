import CircularProgress from '@material-ui/core/CircularProgress'
import React from 'react'

const ProgressCircle = () => {
  return (
    <div className="circle__progress">
      <CircularProgress color="secondary" />
    </div>
  )
}

export default React.memo(ProgressCircle)
