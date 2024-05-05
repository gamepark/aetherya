import { isEnumValue } from '@gamepark/rules-api'

export enum LegendCard {
  LinkedHumanElf = 1,
  LinkedHumanDwarf = 2,
  TwoLinkedGoblins = 3,
  TwoLinkedHumans = 4,
  TwoLinkedElves = 5,
  TwoLinkedDwarfs = 6,
  FourTribes = 7,
  TwoVsOne_GoblinHuman = 8,
  TwoVsOne_GoblinElf = 9,
  TwoVsOne_GoblinDwarf = 10,
  TwoVsOne_ElfDwarf = 11,
  ThreeLinkedPlains = 12,
  ThreeLinkedSwamps = 13,
  ThreeLinkedMountains = 14,
  ThreeLinkedForests = 15
}

export const legendCards = Object.values(LegendCard).filter(isEnumValue)
