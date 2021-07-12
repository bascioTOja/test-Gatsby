import { graphql } from 'gatsby'

export const statsFragment = graphql`
  fragment AllStats on ProtrainupMatch {
    guest_stats {
      active_game
      ball_losses
      corners
      field_possession_attack
      defenses
      field_possession_center
      field_possession_defense
      formation
      fouls
      free_kicks
      minute_penalties
      inaccurate_passes
      offsides
      outs
      passes
      possession
      penalties
      red_cards
      scores
      shoots
      shoots_ongoal
      successful_pressings
      substitutions
      tagging
      tackles
      technical_fouls
      throws
      unsuccessful_pressings
      yellow_cards
    }

    host_stats {
      active_game
      ball_losses
      corners
      field_possession_attack
      defenses
      field_possession_center
      field_possession_defense
      formation
      fouls
      free_kicks
      minute_penalties
      inaccurate_passes
      offsides
      outs
      passes
      possession
      penalties
      red_cards
      scores
      shoots
      shoots_ongoal
      successful_pressings
      substitutions
      tagging
      tackles
      technical_fouls
      throws
      unsuccessful_pressings
      yellow_cards
    }
  }
`

export const fetchTeams = graphql`
  fragment TeamInfo on ProtrainupTeam {
    id
    team_id
    club_id
    system_club_id
    type
    discipline
    club_name
    team_name
    age_group
    code
    color
    country
    hidden_at
    created_by
    created_at
    updated_at
    name
  }
`

export const PrismicGeneralDataTypeFragment = graphql`
  fragment PrismicGeneralFragment on PrismicGeneral {
    _previewable

    data {
      main_color
      secondary_color
      menu_show_teams
      menu_teams_position
      year_as_label
      active_season {
        document {
          ... on PrismicSeasonYear {
            _previewable
            data {
              season_name {
                text
              }
            }
          }
        }
      }
      flip_card

      title {
        text
      }
      description {
        text
      }
      keywords {
        keyword
      }

      logo {
        alt

        fixed(width: 80, height: 80) {
          ...GatsbyPrismicImageFixed_withWebp
        }
      }

      default_crest {
        alt

        fixed(width: 80, height: 80) {
          ...GatsbyPrismicImageFixed_withWebp
        }
      }

      widgets {
        ... on PrismicGeneralWidgetsNextMatch {
          id
          slice_type
        }

        ... on PrismicGeneralWidgetsPreviousMatch {
          id
          slice_type
        }

        ... on PrismicGeneralWidgetsPartner {
          id
          slice_type
          primary {
            photo {
              alt
              fixed(width: 200) {
                ...GatsbyPrismicImageFixed_withWebp
              }
            }
            link {
              url
              target
            }
          }
        }

        ... on PrismicGeneralWidgetsHighlight {
          id
          slice_type
          primary {
            encourage_text {
              raw
              text
            }
            link {
              type

              document {
                ... on PrismicArticle {
                  type
                  uid
                  data {
                    photo {
                      thumbnails {
                        thumb {
                          fixed(width: 500, height: 200) {
                            ...GatsbyPrismicImageFixed_withWebp
                          }
                        }
                      }
                    }

                    title {
                      text
                    }
                  }
                }

                ... on PrismicPage {
                  type
                  uid
                  data {
                    baner {
                      thumbnails {
                        thumb {
                          fixed(width: 500, height: 200) {
                            ...GatsbyPrismicImageFixed_withWebp
                          }
                        }
                      }
                    }
                    title {
                      text
                    }
                  }
                }
              }
            }
          }
        }

        ... on PrismicGeneralWidgetsFacebook {
          id
          slice_type
          primary {
            link {
              url
              target
            }
          }
        }

        ... on PrismicGeneralWidgetsProtrainup {
          id
          slice_type
          primary {
            link {
              url
              target
            }
          }
        }
        ... on PrismicGeneralWidgetsTwitter {
          id
          slice_type
          primary {
            link {
              url
              target
            }
          }
        }

        ... on PrismicGeneralWidgetsYoutube {
          id
          slice_type
          primary {
            link {
              url
              target
            }
          }
        }

        ... on PrismicGeneralWidgetsInstagram {
          id
          slice_type
          primary {
            link {
              url
              target
            }
          }
        }

        ... on PrismicGeneralWidgetsCustomButton {
          id
          slice_type
          primary {
            color
            caption {
              text
            }
            link {
              url
              target
            }
            photo {
              alt
              fixed(width: 20, height: 20) {
                ...GatsbyPrismicImageFixed_withWebp
              }
            }
          }
        }
      }

      #Navigation
      navigation {
        ... on PrismicGeneralNavigationNavigation {
          id
          items {
            link {
              id
              uid
              type
              link_type
              target
              url
              document {
                ... on PrismicArticle {
                  type
                  uid
                }
                ... on PrismicPage {
                  type
                  uid
                }
                ... on PrismicAlbum {
                  type
                  uid
                }
              }
            }
            link_name {
              text
            }
          }
          primary {
            link {
              id
              link_type
              type
              url
              target
              document {
                ... on PrismicPage {
                  uid
                  type
                }
                ... on PrismicArticle {
                  uid
                }
              }
            }
            link_name {
              text
            }
          }
        }
      }
    }
  }
`

export const ProtrainupMatchEventConnectionFragment = graphql`
  fragment ProtrainupMatchEventConnectionFragment on ProtrainupMatchEventConnection {
    nodes {
      id
      type
      minute
      second_player_id
      player_id
      part
      player {
        player_id
        player {
          number
          user {
            avatar {
              childImageSharp {
                gatsbyImageData(layout: FIXED, width: 80, height: 80, placeholder: BLURRED)
              }
            }
            full_name
          }
        }
      }
      second_player {
        player {
          number
          user {
            full_name
          }
        }
      }
      participant_match {
        host
      }
    }
  }
`

export const ProtrainupPlayerMatchConnectionFragment = graphql`
  fragment ProtrainupPlayerMatchConnectionFragment on ProtrainupPlayerMatchConnection {
    edges {
      node {
        stats {
          scores
          assists
          contusion
          defenses
          field_position
          field_position_arrow
          first_squad
          minuses
          minutes
          on_field
          pluses
          position
          rate
          red_cards
          substitute
          substitutions
          throws
          yellow_cards
        }
        player {
          id
          number
          player_id
          user {
            avatar {
              childImageSharp {
                gatsbyImageData(layout: FIXED, width: 80, height: 80, placeholder: BLURRED)
              }
            }
            full_name
          }
        }
      }
    }
  }
`

export const ProtrainupMatchFragment = graphql`
  fragment ProtrainupMatchFragment on ProtrainupMatch {
    match_id
    team_id
    type
    host_name
    guest_name
    date
    result_team_1
    result_team_2
    ...AllStats

    team {
      team_name
    }

    host_crest {
      childImageSharp {
        gatsbyImageData(layout: FIXED, width: 100, height: 100, placeholder: BLURRED)
      }
    }
    guest_crest {
      childImageSharp {
        gatsbyImageData(layout: FIXED, width: 100, height: 100, placeholder: BLURRED)
      }
    }
  }
`

export const PrismicArticleFragment = graphql`
  fragment PrismicArticleFragment on PrismicArticle {
    _previewable
    tags
    first_publication_date
    data {
      description {
        text
      }

      keywords {
        text
      }

      body {
        ... on PrismicArticleBodyContent {
          id
          slice_type
          primary {
            content {
              raw
            }
            separator_text {
              text
            }
            show_separator
          }
        }

        ... on PrismicArticleBodyLocalization {
          id
          slice_type
          primary {
            localization {
              latitude
              longitude
            }
          }
        }

        ... on PrismicArticleBodyPhotos {
          id
          slice_type
          items {
            photo {
              alt
              fixed(width: 300) {
                ...GatsbyPrismicImageFixed_withWebp
              }
              fluid(maxWidth: 1600) {
                ...GatsbyPrismicImageFluid_withWebp
              }
            }
          }
        }
      }

      category {
        document {
          ... on PrismicCategory {
            data {
              color
              category_name {
                text
              }
            }
          }
        }
      }
      title {
        text
      }
      caption {
        raw
        text
      }
      photo {
        alt
        url
        fixed(width: 1200, height: 600) {
          ...GatsbyPrismicImageFixed_withWebp
        }
      }
    }
  }
`

export const PrismicAlbumFragment = graphql`
  fragment PrismicAlbumFragment on PrismicAlbum {
    data {
      title {
        text
      }

      keywords {
        text
      }

      description {
        text
      }

      picture {
        alt
        url
        fluid(maxWidth: 1600) {
          ...GatsbyPrismicImageFluid_withWebp
        }
      }

      body {
        ... on PrismicAlbumBodyPhotos {
          id
          slice_type
          items {
            photo {
              alt
              url

              fixed(height: 300) {
                ...GatsbyPrismicImageFixed_withWebp
              }

              fluid(maxWidth: 1400) {
                ...GatsbyPrismicImageFluid_withWebp
              }
            }
          }
        }
      }
    }
  }
`

export const PrismicPageFragment = graphql`
  fragment PrismicPageFragment on PrismicPage {
    _previewable
    data {
      description {
        text
      }

      keywords {
        text
      }

      baner {
        alt
        fluid(maxWidth: 1600) {
          ...GatsbyPrismicImageFluid_withWebp
        }
      }
      title {
        text
      }

      caption {
        raw
        text
      }

      body {
        ... on PrismicPageBodyPhotos {
          id
          slice_type
          items {
            photo {
              alt

              fixed(width: 300) {
                ...GatsbyPrismicImageFixed_withWebp
              }

              fluid(maxWidth: 1600) {
                ...GatsbyPrismicImageFluid_withWebp
              }
            }
          }
        }
        ... on PrismicPageBodyContent {
          id
          primary {
            separator_text {
              text
            }
            content {
              raw
            }
            show_separator
          }
          slice_type
        }
        ... on PrismicPageBodyLocalization {
          id
          slice_type
          primary {
            localization {
              longitude
              latitude
            }
          }
        }
        ... on PrismicPageBodyGridContent {
          id
          slice_type
          items {
            left_column {
              raw
            }
            right_column {
              raw
            }
          }
        }
        ... on PrismicPageBodyEmoteSeparator {
          id
          slice_type
          primary {
            separator_text {
              text
            }
            emote_name
          }
        }
        ... on PrismicPageBodyAlbum {
          id
          slice_type
          items {
            album_link {
              id
              document {
                ... on PrismicAlbum {
                  uid
                  type
                  data {
                    thumb {
                      fixed(height: 340) {
                        ...GatsbyPrismicImageFixed_withWebp
                      }
                      alt
                    }
                    title {
                      text
                    }
                  }
                  uid
                }
              }
            }
          }
        }
      }
    }
  }
`

export const PrismicAllCategories = graphql`
  fragment PrismicCategoryConnectionFragment on PrismicCategoryConnection {
    nodes {
      id
      data {
        category_name {
          text
        }
        color
      }
    }
  }
`

export const PrismicLandingpageFragment = graphql`
  fragment PrismicLandingpageFragment on PrismicLandingpage {
    data {
      slider {
        ... on PrismicLandingpageSliderSlide {
          id
          slice_type
          primary {
            photo {
              alt
              fluid(maxWidth: 1600) {
                ...GatsbyPrismicImageFluid_withWebp
              }
            }
            caption {
              text
            }
            title {
              text
            }
          }
        }

        ... on PrismicLandingpageSliderDocumentLink {
          id
          slice_type
          primary {
            link {
              type
              document {
                ... on PrismicArticle {
                  uid
                  type
                  data {
                    caption {
                      text
                    }
                    photo {
                      alt
                      fluid(maxWidth: 1600) {
                        ...GatsbyPrismicImageFluid_withWebp
                      }
                    }
                    title {
                      text
                    }
                  }
                }
                ... on PrismicPage {
                  uid
                  data {
                    caption {
                      text
                    }
                    title {
                      text
                    }
                    baner {
                      alt
                      fluid(maxWidth: 1600) {
                        ...GatsbyPrismicImageFluid_withWebp
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
