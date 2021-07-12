import { graphql, useStaticQuery } from 'gatsby'
import { IGatsbyImageData } from 'gatsby-plugin-image'

type CommonBannerProps = {
  baner: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData
    }
  }
}

const GetCommonBaner = (): IGatsbyImageData => {
  const query = graphql`
    query {
      baner: file(relativePath: { eq: "commonBaner.jpg" }) {
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
        }
      }
    }
  `
  const {
    baner: {
      childImageSharp: { gatsbyImageData }
    }
  }: CommonBannerProps = useStaticQuery(query)

  return gatsbyImageData
}

export default GetCommonBaner
