// TODO ADD SEASONS TO THE TYPE PLUGIN
const path = require('path')

exports.onCreateWebpackConfig = ({ stage, actions, getConfig }) => {
  if (stage === 'build-javascript' || stage === 'develop') {
    const config = getConfig()
    const miniCssExtractPlugin = config.plugins.find((plugin) => plugin.constructor.name === 'MiniCssExtractPlugin')
    if (miniCssExtractPlugin) {
      miniCssExtractPlugin.options.ignoreOrder = true
    }
    actions.replaceWebpackConfig(config)
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const { data } = await graphql(`
    query {
      allProtrainupGame {
        nodes {
          name
          game_id
        }
      }

      allProtrainupMatch(filter: { own_team: { gt: 0 } }) {
        edges {
          node {
            match_id

            season {
              name
            }
          }
        }
      }

      allProtrainupTeam(filter: { hidden_at: { eq: null } }) {
        edges {
          node {
            slug
            team_id
            team_name
            system_club_id
          }
        }
      }

      articles: allPrismicArticle(filter: { data: { title: { text: { ne: "" } } } }) {
        nodes {
          uid
        }
      }

      pages: allPrismicPage {
        nodes {
          uid
        }
      }

      albums: allPrismicAlbum {
        nodes {
          uid
        }
      }
    }
  `)

  const allTeams = data.allProtrainupTeam.edges.map((node) => node.node)

  const allMatches = data.allProtrainupMatch.edges.map((node) => node.node)

  const forbiddenPageNames = ['news', 'cadre', 'matches', 'teams', '404', '330-2', 'preview']

  allTeams.forEach((team) => {
    createPage({
      path: '/teams/' + team.slug,
      component: path.resolve('./src/templates/Team/index.tsx'),
      context: {
        teamId: team.team_id,
        clubId: team.system_club_id
      }
    })
  })

  allMatches.forEach((match) => {
    createPage({
      path: `/matches/${match.match_id}`,
      component: path.resolve('./src/templates/Match/match.tsx'),
      context: {
        matchId: match.match_id
      }
    })
  })

  data.articles.nodes.forEach((article) => {
    createPage({
      path: `/articles/${article.uid}`,
      component: path.resolve('./src/templates/Article/index.tsx'),
      context: {
        uid: article.uid
      }
    })
  })

  data.pages.nodes.forEach((page) => {
    !forbiddenPageNames.includes(page.uid) &&
      createPage({
        path: `/${page.uid}`,
        component: path.resolve('./src/templates/Page/index.tsx'),
        context: {
          uid: page.uid
        }
      })
  })

  data.albums.nodes.forEach((album) => {
    createPage({
      path: `/album/${album.uid}`,
      component: path.resolve('./src/templates/Album/index.tsx'),
      context: {
        uid: album.uid
      }
    })
  })
}
