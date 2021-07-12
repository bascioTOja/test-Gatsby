import React from 'react'

import FetchArticles from '../../../gatsby/queries/articles'
import Article from './article'

const Articles = () => {
  const { allPrismicArticle } = FetchArticles()

  return (
    <div className="articles">
      {allPrismicArticle.nodes.map((article) => (
        <Article key={article.uid} article={article} />
      ))}
    </div>
  )
}

export default React.memo(Articles)
