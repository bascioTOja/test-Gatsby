import React from 'react'

import { PrismicWidgets } from '../../types/widgets'
import CustomButton from './customButton'
import Facebook from './facebook'
import Highlight from './higlight'
import Instagram from './instagram'
import NextMatch from './nextMatch'
import Partner from './partner'
import PreviousMatch from './previousMatch'
import ProtrainUp from './protrainup'
import Twitter from './twitter'
import Youtube from './youtube'

const RenderWidgets = ({ slice }: { slice: PrismicWidgets }) => {
  switch (slice.slice_type) {
    case 'next_match':
      return <NextMatch />
    case 'previous_match':
      return <PreviousMatch />
    case 'facebook':
      return <Facebook slice={slice} />
    case 'instagram':
      return <Instagram slice={slice} />
    case 'twitter':
      return <Twitter slice={slice} />
    case 'youtube':
      return <Youtube slice={slice} />
    case 'custom_button':
      return <CustomButton slice={slice} />
    case 'highlight':
      return <Highlight slice={slice} />
    case 'partner':
      return <Partner slice={slice} />
      case 'protrainup': 
      return <ProtrainUp slice={slice} />
    default:
      return null
  }
}

export default React.memo(RenderWidgets)
