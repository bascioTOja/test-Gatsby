import Container from '@material-ui/core/Container'
import React from 'react'

const ContentEmpty = () => {
  return (
    <Container>
      <h1>Wystąpił błąd podczas generowania strony. Nie znaleziono aktualnego sezonu dla tej drużyny.</h1>
    </Container>
  )
}

export default React.memo(ContentEmpty)
