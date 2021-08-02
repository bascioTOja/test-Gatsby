import { TeamProps } from 'gatsby-source-protrainup/typescript/types/team'
import { useDispatch, useSelector } from 'react-redux'

import { PrismicGeneralProps } from '../prismic/types'
import { isLoaded } from '../redux/selectors'
import { setGeneralState } from '../redux/slices/general'

export const groupBy = <T>(xs: Array<T>, key: keyof T): { [key: string]: Array<T> } =>
  xs.reduce((rv: any, x: any) => {
    ;(rv[x[key]] = rv[x[key]] || []).push(x)
    return rv
  }, {})

export const LoadGeneralData = (general: PrismicGeneralProps & { teams: { nodes: Array<TeamProps> } }) => {
  const dispatch = useDispatch()
  const isGeneralLoaded = useSelector(isLoaded)
  if (!isGeneralLoaded) {
    const payload = {
      prismicGeneral: general.prismicGeneral,
      teams: general.teams.nodes
    }
    dispatch(setGeneralState(payload))
  }
}
