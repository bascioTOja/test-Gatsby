import React from 'react'

import CommonLink from '../Link'
import * as classes from './style.module.css'

const TagBadge = ({ tag, isLink }: { tag: string; isLink?: boolean }) => {
  return isLink ? (
    <CommonLink to={`/news?tag=${tag}`}>
      <span className={classes.tag}>{tag}</span>
    </CommonLink>
  ) : (
    <span className={classes.tag}>{tag}</span>
  )
}

export default React.memo(TagBadge)
