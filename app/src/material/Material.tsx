import { MaterialType } from '@gamepark/aetherya/material/MaterialType'
import { MaterialDescription } from '@gamepark/react-game'
import { kingdomCardDescription } from './KingdomCardDescription'
import { legendCardDescription } from './LegendCardDescription'
import { scoreSheetDescription } from './ScoreSheetDescription'

export const Material: Partial<Record<MaterialType, MaterialDescription>> = {
  [MaterialType.KingdomCard]: kingdomCardDescription,
  [MaterialType.LegendCard]: legendCardDescription,
  [MaterialType.ScoreSheet]: scoreSheetDescription
}
