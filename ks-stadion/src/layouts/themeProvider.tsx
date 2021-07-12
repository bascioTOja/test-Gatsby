import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import React, { FC } from 'react'

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Montserrat',
  }
})

const ThemeProviderComponent: FC = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default ThemeProviderComponent
