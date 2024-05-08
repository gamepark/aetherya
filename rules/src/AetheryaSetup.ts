import { MaterialGameSetup } from '@gamepark/rules-api'
import { AetheryaOptions } from './AetheryaOptions'
import { AetheryaRules } from './AetheryaRules'
import { KingdomCard } from './material/KingdomCard'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { RuleId } from './rules/RuleId'
import { kingdomCards } from './material/KingdomCard'
import { legendCards } from './material/LegendCard'

/**
 * This class creates a new Game based on the game options
 */
export class AetheryaSetup extends MaterialGameSetup<number, MaterialType, LocationType, AetheryaOptions> {
  Rules = AetheryaRules

  setupMaterial(options: AetheryaOptions) {
    this.setupKingdomCards(options)
    this.setupLegendCards()
    this.setupLegendLine()
    this.setupPlayers(options)
  }

  setupKingdomCards(options: AetheryaOptions) {
    const cards = []
    for (let i=0; i<2*options.players; i++){
      cards.push(...kingdomCards.map((kingdomCard) => ({
        id: kingdomCard,
        location: {
          type: LocationType.KingdomDeck
        }
      })))
    }

    this.material(MaterialType.KingdomCard).createItems(cards)
    this.material(MaterialType.KingdomCard).shuffle()
  }

  setupLegendCards() {
    const cards=legendCards.map((legendCard) => ({
      id: legendCard,
      location: {
        type: LocationType.LegendDeck
      }
    }))

    this.material(MaterialType.LegendCard).createItems(cards)
    this.material(MaterialType.LegendCard).shuffle()
  }

  setupLegendLine() {
    const deck = this.material(MaterialType.LegendCard).deck()
    for (let i=1; i<=8; i++){
      deck.deal({ type: LocationType.LegendLine, x:i }, 1)
    }
  }

  setupPlayers(options: AetheryaOptions) {
    let indexes:number[]=[]
    this.material(MaterialType.KingdomCard).getIndexes().forEach(
      i => indexes.push(i)
    )

    // Player's hands
    // Ensure that each player starts with 4 different cards
    // No player's hand with 2 plains, 2 humans or 2 dragons for instance
    let pos=0
    let usedPos=[]
    for (let player=1; player<=options.players; player++) {
      let cardTypes:KingdomCard[]=[]
      while (cardTypes.length<4){
        let itemIndex=indexes[pos]
        let item=this.material(MaterialType.KingdomCard).index(itemIndex).getItem()!
        let itemType=item.id
        if (!cardTypes.includes(itemType)){
          cardTypes.push(itemType)
          usedPos.push(pos)
          this.material(MaterialType.KingdomCard).index(indexes[pos])
            .moveItems({ type:LocationType.PlayerHand, player:player, x:cardTypes.length, rotation:true })
        }

        // Next available card
        do {
          pos++
          if (pos>=indexes.length)
            pos=0
        } while (usedPos.includes(pos))
      }
    }

    // Deal the other cards
    let totalIterations=0
    for (let player=1; player<=options.players; player++) {
      for (let i=1; i<=4; i++){
        for (let j=1; j<=4; j++){
          // Skip central cards
          if ((i==2 || i==3) && (j==2 || j==3))
            continue

          do {
            pos++
            totalIterations++
            if (pos>=indexes.length)
              pos=0
            if (totalIterations>1000)
              break
          } while (usedPos.includes(pos))

          if (totalIterations>1000)
            break

          usedPos.push(pos)
          this.material(MaterialType.KingdomCard).index(indexes[pos])
            .moveItems({ type:LocationType.PlayerBoard, player:player, x:i, y:j, rotation:false })
        }
      }
    }
  }

  start() {
    this.startSimultaneousRule(RuleId.PrepareGame)
  }
}
