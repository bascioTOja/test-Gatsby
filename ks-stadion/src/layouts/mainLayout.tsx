import React from 'react'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'

import Footer from '../components/Footer'
import AppBar from '../components/common/AppBar'
import { getSEOData } from '../redux/selectors'

const MainLayout: React.FC<{ isLoaded?: boolean }> = ({ children }) => {
  const SeoData = useSelector(getSEOData)

  return (
    <>
      <Helmet>
        <meta name="author" content="Adrian Bielec, bielecadriandeveloper@gmail.com" />
        <title>{SeoData.title}</title>
        <meta property="og:site_name" content={SeoData.title.slice(0, 70)} />
        <meta name="description" content={SeoData.description.slice(0, 155)} />
        <meta name="keywords" content={SeoData.keywords.join(',')} />
        <meta name="theme-color" content="#edeff4" />
        <meta name="twitter:card" content="summary" />
        <meta property="og:url" content={typeof window === 'undefined' ? '' : window.location.href} />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <AppBar />
      <div className="page__wrapper">{children}</div>
      <Footer />
    </>
  )
}

export default MainLayout

