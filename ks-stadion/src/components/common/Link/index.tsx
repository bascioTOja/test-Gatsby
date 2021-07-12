import Link from 'gatsby-plugin-transition-link'
import React, { useCallback, useEffect, useState } from 'react'

interface Props {
  to: string
  activeClassName?: string
  className?: string
  partiallyActive?: boolean
  onClick?: () => void
  style?: React.CSSProperties
}

interface IProps {
  children: React.ReactNode
  node?: React.ReactNode
  url: string
}

const CommonLink: React.FC<Props> = ({ style, to, children, className, activeClassName, partiallyActive, onClick }) => {
  // Avoid memory leak!
  const [isEnabled, setEnabledState] = useState<boolean>(false)
  useEffect(() => {
    const tHandler = setTimeout(() => setEnabledState(true), 1000)
    return () => clearTimeout(tHandler)
  }, [])

  const exitTransition = {
    length: 0.2,
    zIndex: 2,
    trigger: ({ node }: IProps) => {
      exitTransition.exitTrigger(node)
      if (node) (node as HTMLElement).style.top = -window.pageYOffset + 'px'
      window.scrollTo({ top: -window.pageYOffset })
    },
    exitTrigger: useCallback((container) => {
      container.setAttribute('style', 'animation: fadeOut 1.8s ease forwards;')
    }, [])
  }

  const entryTransition = {
    zIndex: 3,
    length: 0.8,
    trigger: ({ node }: IProps) => {
      entryTransition.entryTrigger(node)
    },
    entryTrigger: useCallback((container) => {
      container.setAttribute('style', 'animation: fadeIn 2s ease forwards;')
    }, [])
  }

  return (
    <Link
      onClick={
        onClick &&
        isEnabled &&
        (() => {
          onClick()
        })
      }
      disabled={true}
      partiallyActive={partiallyActive}
      activeClassName={activeClassName}
      to={isEnabled ? to : '#'}
      exit={exitTransition}
      entry={entryTransition}
      className={className}
      style={style}
    >
      {children}
    </Link>
  )
}

export default CommonLink
