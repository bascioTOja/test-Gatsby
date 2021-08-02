const linkResolver = require('./linkResolver')
const path = require('path')

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

module.exports = {
  siteMetadata: {
    title: 'Ks Stadion',
    description: 'Strona dla klubu piłkarskiego',
    keywords: ['piłka', 'nożna'],
    author: {
      name: 'Adrian Bielec',
      email: 'zilibdev@gmail.com'
    }
  },
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Juventus app`,
        short_name: `Juventus App`,
        start_url: `/`,
        background_color: `#edeff4`,
        theme_color: `#edeff4`,
        display: `standalone`,
        icon: 'icon.png',
        theme_color_in_head: false,
        crossOrigin: `use-credentials`,
        icon_options: {
          purpose: `any maskable`
        }
      }
    },
    {
      resolve: `gatsby-source-protrainup`,
      configDir: 'gatsby',
      projectRoot: __dirname,
      options: {
        login: process.env.PROTRAINUP_LOGIN,
        password: process.env.PROTRAINUP_PASSWORD,
        apiURL: process.env.PROTRAINUP_API_URL
      }
    },
    {
      resolve: 'gatsby-source-prismic',
      options: {
        repositoryName: 'stadion',
        accessToken: process.env.PRISMIC_TOKEN,
        schemas: {
          general: require('./custom_types/general.json'),
          landingpage: require('./custom_types/landingpage.json'),
          category: require('./custom_types/category.json'),
          navigation: require('./custom_types/navigation.json'),
          article: require('./custom_types/article.json'),
          page: require('./custom_types/page.json'),
          album: require('./custom_types/album.json'),
          season_year: require('./custom_types/season_year.json')
        },
        shouldDownloadImage: ({ node, key, value }) => true,
        linkResolver: () => (doc) => linkResolver(doc)
      }
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /assets/ // See below to configure properly
        }
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.join(__dirname, 'src', 'images')
      }
    },
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        disableAutoprefixing: false,
        disableMinification: false
      }
    },
    {
      resolve: 'gatsby-plugin-offline',
      options: {
        precachePages: [`/`, `/matches`, '/teams', '330-2', '/news']
      }
    },
    'gatsby-plugin-postcss',
    `gatsby-plugin-image`,
    'gatsby-plugin-typescript',
    'gatsby-plugin-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-sharp',
    'gatsby-plugin-transition-link',
    'gatsby-plugin-netlify',
  ]
}
