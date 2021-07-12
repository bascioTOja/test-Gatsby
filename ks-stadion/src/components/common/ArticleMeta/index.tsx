import chroma from 'chroma-js'
import React from 'react'

import * as classes from './style.module.css'
import Tag from './tag'

const ArticleMeta = ({ categoryName, categoryColor, tags }: { categoryColor: string; categoryName?: string; tags: Array<string> }) => {
  return (
    <div className={classes.article__meta}>
      {categoryName && (
        <div>
          <span className={classes.article__category} style={{ backgroundColor: chroma(categoryColor).alpha(0.1).css() }}>
            {categoryName}
          </span>
        </div>
      )}
      <div className={classes.article__tags}>
        {tags.map((tag) => (
          <Tag key={tag} tag={tag} />
        ))}
      </div>
    </div>
  )
}

export default React.memo(ArticleMeta)
