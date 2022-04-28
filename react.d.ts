import 'react'

declare module 'react' {
  declare namespace React {
    type FC<P = {}> = FunctionComponent<PropsWithChildren<P>>
  }

  export = React
  export as namespace React
}
