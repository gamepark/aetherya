import { AetheryaRules } from '@gamepark/aetherya/AetheryaRules'
import { LocationType } from '@gamepark/aetherya/material/LocationType'
import { MaterialType } from '@gamepark/aetherya/material/MaterialType'
import { score } from '@gamepark/aetherya/logic/Score'
import { FlatMaterialDescription, ItemContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import ScoreSheet from '../images/scoresheet.jpg'
import { ScoreSheetHelp } from './help/ScoreSheetHelp'

export class ScoreSheetDescription extends FlatMaterialDescription {
  width = 9
  height = 11

  image = ScoreSheet
  help = ScoreSheetHelp

  staticItem = {
    location: {
      type: LocationType.ScoreSheet
    }
  }

  getLocations(_item: MaterialItem, context: ItemContext) {
    const rules = context.rules as AetheryaRules
    if (!rules.isOver()) return []
    const locations: Location[] = []

    for (const player of rules.players) {
      let detailedScore=score.detailedPlayerScore(
        player,
        rules.material(MaterialType.KingdomCard),
        rules.material(MaterialType.LegendCard)
      )

      locations.push({
        type: LocationType.ScoreSheetBox,
        id: player,
        parent: 0,
        x: player,
        y: 0
      })
      locations.push({
        type: LocationType.ScoreSheetBox,
        id: detailedScore.elfPoints,
        parent: 0,
        x: player,
        y: 1
      })
      locations.push({
        type: LocationType.ScoreSheetBox,
        id: detailedScore.dwarfPoints,
        parent: 0,
        x: player,
        y: 2
      })
      locations.push({
        type: LocationType.ScoreSheetBox,
        id: detailedScore.humanPoints,
        parent: 0,
        x: player,
        y: 3
      })
      locations.push({
        type: LocationType.ScoreSheetBox,
        id: detailedScore.goblinPoints,
        parent: 0,
        x: player,
        y: 4
      })
      locations.push({
        type: LocationType.ScoreSheetBox,
        id: detailedScore.dragonPoints,
        parent: 0,
        x: player,
        y: 5
      })
      locations.push({
        type: LocationType.ScoreSheetBox,
        id: detailedScore.legendPoints,
        parent: 0,
        x: player,
        y: 6
      })
      locations.push({
        type: LocationType.ScoreSheetBox,
        id: detailedScore.conflictPoints,
        parent: 0,
        x: player,
        y: 7
      })
      locations.push({
        type: LocationType.ScoreSheetBox,
        id: detailedScore.total,
        parent: 0,
        x: player,
        y: 8
      })
    }
    return locations
  }

//  help = ScoreSheetHelp
}

export const scoreSheetDescription = new ScoreSheetDescription()
