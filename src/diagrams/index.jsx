import { StrategyGrid } from './StrategyGrid.jsx'
import { ZopaChart as Zopa } from '../activities/Zopa.jsx'
import { TacticDecoder, TacticFamilies, AnchorBracket } from './M7.jsx'
import { SixPrinciples, ValueCurve, LossCycle, AnchorPull, ChoiceMenus, QuestionShift, ReciprocityLoop } from './M6.jsx'
import { Criteria, TwoDimensions, BehaviourMap, Funnel, Combos, Pareto, Iceberg, EIGrid, Regulate, YesGap, NoOutcomes, PauseMap, DealZone, CircleChart, SearchTogether, ReasonLoop, PressureGate, PrepRatio, GoalRange, BatnaSteps, FallbackLadder, TheirBatna, LeverageTypes, ExecPath } from './Diagrams.jsx'

const map = { StrategyGrid, Criteria, TwoDimensions, BehaviourMap, Funnel, Combos, Pareto, Iceberg, EIGrid, Regulate, YesGap, NoOutcomes, PauseMap, DealZone, CircleChart, SearchTogether, ReasonLoop, PressureGate, PrepRatio, GoalRange, BatnaSteps, FallbackLadder, TheirBatna, LeverageTypes, ExecPath, Zopa, SixPrinciples, ValueCurve, LossCycle, AnchorPull, ChoiceMenus, QuestionShift, ReciprocityLoop, TacticDecoder, TacticFamilies, AnchorBracket }

export function Diagram({ name, ...props }) {
  const C = map[name]
  return C ? <C {...props} /> : null
}
