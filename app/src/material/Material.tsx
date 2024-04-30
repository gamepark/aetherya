import { MaterialType } from '@gamepark/aetherya/material/MaterialType'
import { MaterialDescription } from '@gamepark/react-game'
import { kingdomCardDescription } from './KingdomCardDescription'
import { legendaryCardDescription } from './LegendaryCardDescription'

export const Material: Partial<Record<MaterialType, MaterialDescription>> = {
  [MaterialType.KingdomCard]: kingdomCardDescription,
  [MaterialType.LegendaryCard]: legendaryCardDescription
}
