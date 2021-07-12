import { TransitionState } from 'gatsby-plugin-transition-link'
import React from 'react'
import posed from 'react-pose'

import MainLayout from '../../../layouts/mainLayout'
import Footer from '../../Footer'

const Box = posed.div({
  hidden: { opacity: 0, transition: { opacity: { duration: '100' } } },
  visible: { opacity: 1, transition: { opacity: { duration: '1200' } } }
})

const Transition: React.FC = ({ children }) => {
  return (
    <MainLayout>
      <TransitionState>
        {({ mount }: any) => {
          return (
            <Box
              className="box"
              pose={
                mount // this is true while the page is mounting or has mounted
                  ? 'visible'
                  : 'hidden'
              }
            >
              {children}
              <Footer />
            </Box>
          )
        }}
      </TransitionState>
    </MainLayout>
  )
}

export default Transition
