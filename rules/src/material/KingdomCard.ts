import { isEnumValue } from '@gamepark/rules-api'

export enum KingdomCard {
  Plain = 1,
  Swamp = 2,
  Mountain = 3,
  Forest = 4,
  Goblin = 5,
  Human = 6,
  Elf = 7,
  Dwarf = 8,
  Portal = 9,
  Dragon = 10
}

export const kingdomCards = Object.values(KingdomCard).filter(isEnumValue)
