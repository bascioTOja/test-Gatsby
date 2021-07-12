import React from 'react'
import { Helmet } from 'react-helmet'

type Props = {
  title?: string
  description?: string
  keywords?: string
  imgSrc?: string
}

const SEO = ({ title, description, keywords, imgSrc }: Props) => {
  return (
    <Helmet>
      {title && <title>{title.slice(0, 155)}</title>}
      {title && <meta property="og:title" content={title} />}

      {description && <meta name="description" content={description.slice(0, 155)} />}
      {keywords && <meta name="keywords" content={keywords} />}
      {imgSrc && <meta property="og:image" content={imgSrc} />}
      {imgSrc && <meta name="twitter:image" content={imgSrc} />}
      {imgSrc && <meta name="twitter:image:src" content={imgSrc} />}
      {imgSrc && <meta property="og:image:secure_url" content={imgSrc} />}
    </Helmet>
  )
}

export default React.memo(SEO)

