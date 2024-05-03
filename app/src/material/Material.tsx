import { MaterialType } from '@gamepark/aetherya/material/MaterialType'
import { MaterialDescription } from '@gamepark/react-game'
import { kingdomCardDescription } from './KingdomCardDescription'
import { legendaryCardDescription } from './LegendaryCardDescription'
import { scoreSheetDescription } from './ScoreSheetDescription'

export const Material: Partial<Record<MaterialType, MaterialDescription>> = {
  [MaterialType.KingdomCard]: kingdomCardDescription,
  [MaterialType.LegendaryCard]: legendaryCardDescription,
  [MaterialType.ScoreSheet]: scoreSheetDescription
}
