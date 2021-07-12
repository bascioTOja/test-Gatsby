import { graphql, useStaticQuery } from 'gatsby'
import { IGatsbyImageData } from 'gatsby-plugin-image'

type noAvailablePNGProps = {
  noImage: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData
    }
  }
}

const GetNotImageAvailablePNG = (): IGatsbyImageData => {
  const query = graphql`
    query {
      noImage: file(relativePath: { eq: "no-image-available.png" }) {
        childImageSharp {
          gatsbyImageData(layout: FIXED, width: 170, height: 170, placeholder: BLURRED)
        }
      }
    }
  `
  const {
    noImage: {
      childImageSharp: { gatsbyImageData }
    }
  }: noAvailablePNGProps = useStaticQuery(query)

  return gatsbyImageData
}

export default GetNotImageAvailablePNG
