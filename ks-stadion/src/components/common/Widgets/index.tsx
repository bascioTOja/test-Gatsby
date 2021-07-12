import React from 'react'

import RenderWidget from '../../../prismic/slices/widgets'
import { PrismicWidgets } from '../../../prismic/types/widgets'
import * as classes from './style.module.css'

const Widgets = ({ widgets }: { widgets: Array<PrismicWidgets> }) => {
  return (
    <div className={classes.widgets}>
      {widgets.map((widget) => (
        <RenderWidget key={widget.id} slice={widget} />
      ))}
    </div>
  )
}

export default React.memo(Widgets)
