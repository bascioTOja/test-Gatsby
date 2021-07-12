interface CSSModule {
  [className: string]: string
}

declare module 'gatsby-plugin-transition-link' {
  const pluginTransitionLink: AniLink
  export const { TransitionState } = pluginTransitionLink
  export default pluginTransitionLink
}

declare module '*.svg' {
  const content: any
  export default content
}

declare module '*.jpg' {
  const content: any
  export default content
}

declare module '*.png' {
  const content: any
  export default content
}

// type shims for CSS modules
declare module '*.module.scss' {
  const cssModule: CSSModule
  export = cssModule
}

declare module '*.module.css' {
  const cssModule: CSSModule
  export = cssModule
}
