import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { IGatsbyImageData } from 'gatsby-plugin-image'
import React from 'react'

import * as classes from './style.module.css'

const Footer = () => {
  const {
    file: {
      childImageSharp: { gatsbyImageData: ptuLogo }
    }
  }: { file: { childImageSharp: { gatsbyImageData: IGatsbyImageData } } } = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "ptu-logo.png" }) {
        childImageSharp {
          gatsbyImageData(layout: FIXED, width: 20, placeholder: BLURRED)
        }
      }
    }
  `)
  return (
    <footer className={classes.footer}>
        <span>
          &copy;2021 Strona stworzona w oparciu o stronę <a href="http://ksstadion.com/">ksstadion</a>, w celach rozwojowych i edukacyjnych. Ze strony nie są korzystane żadne korzyści majątkowe
        </span>
    </footer>
  )
}

export default React.memo(Footer)
