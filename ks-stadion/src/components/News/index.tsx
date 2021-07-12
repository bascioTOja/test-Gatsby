import CircularProgress from '@material-ui/core/CircularProgress'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Pagination from '@material-ui/lab/Pagination'
import dayjs from 'dayjs'
import _ from 'lodash'
import React, { useMemo, useState, useEffect } from 'react'

import { PrismicArticleProps } from '../../prismic/types'
import ColorProvider from '../common/Providers/color'
import Article from './article'
import CategoryFilter from './categoryFilter'
import * as classes from './style.module.css'
import TagFilter from './tagFilter'

type FilteringStateProps = {
  isFiltering: boolean
  startFilterTime: dayjs.Dayjs
}

const isSSR = typeof window === 'undefined'

const NewsComponent = ({ articles, tags }: { articles: Array<PrismicArticleProps>; tags: Array<string> }) => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const itemsAtPage = 3

  const processedTags = useMemo(() => tags.map((tag) => ({ label: tag, value: tag })), [tags])

  // For animation
  const [isLoading, setLoadingState] = useState<boolean>(false)
  const [selectedTags, setSelectedTags] = useState<Array<string>>([])
  const [selectedCategories, setSelectedCategories] = useState<Array<string>>([])
  const [filteredArticles, setFilteredArticles] = useState<Array<PrismicArticleProps>>([])
  const [paginatedArticles, setPaginatedArticles] = useState<Array<PrismicArticleProps>>([])

  const [filteringState, setFilteringState] = useState<FilteringStateProps>({
    isFiltering: true,
    startFilterTime: {} as dayjs.Dayjs
  })

  const params = !isSSR ? new URLSearchParams(window.location.search.substring(1)) : null
  const tag = params ? params.get('tag') : null
  const defaultTag = tag ? [{ label: tag, value: tag }] : undefined

  useEffect(() => {
    defaultTag && setSelectedTags(defaultTag.map((tag) => tag.value))
  }, [])

  useEffect(() => {
    paginateArticles()
  }, [currentPage])

  useEffect(() => {
    let tHandler: NodeJS.Timeout | undefined = undefined
    if (filteringState.isFiltering) {
      const filterEndTime = dayjs()
      const timeDiff = filterEndTime.diff(filteringState.startFilterTime, 'ms', true)

      // Minimum half of second loading screen
      timeDiff < 250
        ? tHandler = setTimeout(() => {
            setFilteringState({ ...filteringState, isFiltering: false })
          }, 250 - timeDiff)
        : setFilteringState({ ...filteringState, isFiltering: false })
    }

    return () => {
      tHandler && clearTimeout(tHandler)
    }
  }, [filteredArticles])

  useEffect(() => {
    setFilteringState({
      isFiltering: true,
      startFilterTime: dayjs()
    })

    const tHandler = setTimeout(() => {
      let tempArticles = [...articles]
      selectedTags.length > 0 && (tempArticles = tempArticles.filter((article) => article.tags.some((tag) => selectedTags.includes(tag))))
      selectedCategories.length > 0 &&
        (tempArticles = tempArticles.filter((article) =>
          selectedCategories.some((category) => category === _.get(article, 'data.category.document.data.category_name.text', ''))
        ))
      paginateArticles(tempArticles)
    }, 500) // This delay is dependent of article transition time

    return () => clearTimeout(tHandler)
  }, [, selectedTags, selectedCategories])

  const paginateArticles = (articles?: Array<PrismicArticleProps>) => {
    const offset = (currentPage - 1) * itemsAtPage
    if (articles) {
      // To avoid recalculating without changing a tag / category
      setFilteredArticles(articles)
      setPaginatedArticles([...articles].slice(offset, offset + itemsAtPage))
      setCurrentPage(1)
    } else {
      setPaginatedArticles([...filteredArticles].slice(offset, offset + itemsAtPage))
    }
  }

  const changePageHandler = (nextPage: number) => {
    setLoadingState(true)
    setTimeout(() => {
      setCurrentPage(nextPage)
      setLoadingState(false)
    }, 350)
  }

  return (
    <div style={{ position: 'relative', paddingBottom: '3rem' }}>
      <Container className={classes.news__container}>
        <div style={{ overflow: 'hidden' }}>
          <Grid container spacing={2} className={classes.news__grid}>
            <Grid item xs={12} md={2} className={classes.filter__grid}>
              <CategoryFilter setCategories={setSelectedCategories} />
              <TagFilter defaultValue={defaultTag} setTags={setSelectedTags} tags={processedTags} />
            </Grid>
            <Grid item xs={12} md={10} className={classes.articles__grid}>
              {(isLoading || filteringState.isFiltering) && (
                <div className={classes.post__loading}>
                  <ColorProvider>
                    <CircularProgress />
                  </ColorProvider>
                </div>
              )}
              <div className={`${classes.articles} ${(isLoading || filteringState.isFiltering) && classes.loading}`}>
                {filteredArticles.length > 0 ? (
                  <>
                    {paginatedArticles.map((article) => (
                      <Article key={article.uid} article={article} />
                    ))}
                    {filteredArticles.length > itemsAtPage && (
                      <Pagination
                        className={classes.articles__pagination}
                        page={currentPage}
                        onChange={(_, newValue) => changePageHandler(newValue)}
                        color="primary"
                        size="large"
                        count={Math.round(filteredArticles.length / itemsAtPage)}
                      />
                    )}
                  </>
                ) : (
                  !filteringState.isFiltering && (
                    <div>
                      <h1>Brak postów</h1>
                    </div>
                  )
                )}
              </div>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  )
}

export default NewsComponent
