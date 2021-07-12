import { ThemeProvider } from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import React from 'react'
import { useSelector } from 'react-redux'

import { getMainColor, getSecondaryColor } from '../../../redux/selectors'

const ColorProvider = ({ children }: { children: React.ReactChild }) => {
  const primaryColor = useSelector(getMainColor)
  const secondaryColor = useSelector(getSecondaryColor)

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: primaryColor ? primaryColor : '#2196f3'
      },
      secondary: {
        main: secondaryColor ? secondaryColor : '#f50057'
      }
    }
  })

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default React.memo(ColorProvider)
