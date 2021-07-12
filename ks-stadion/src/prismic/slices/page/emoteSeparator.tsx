import GroupIcon from '@material-ui/icons/Group'
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks'
import React from 'react'

import { PrismicEmoteSeparatorSlice } from '../../types/contentSlices'
import * as classes from './style.module.css'

const EmoteSeparator = ({
  slice: {
    primary: {
      separator_text: { text: separator_text },
      emote_name
    }
  }
}: {
  slice: PrismicEmoteSeparatorSlice
}) => {
  return (
    <div className={classes.separator}>
      <h4>
        {(emote_name === 'books' && <LibraryBooksIcon />) || (emote_name === 'users' && <GroupIcon />)}
        {separator_text}
      </h4>
    </div>
  )
}

export default React.memo(EmoteSeparator)
