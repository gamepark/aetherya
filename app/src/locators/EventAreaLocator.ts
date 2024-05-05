/** @jsxImportSource @emotion/react */
import { ItemLocator, ItemContext } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { EventAreaDescription } from './description/EventAreaDescription'
import { tableDesign } from './position/TableDesign'

export class EventAreaLocator extends ItemLocator {
  locationDescription = new EventAreaDescription()

  getPosition(_item: MaterialItem, context: ItemContext) {
    return tableDesign.eventAreaCoordinates(context)
  }
}

export const eventAreaLocator = new EventAreaLocator()
