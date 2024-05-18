import { CustomMove, isMoveItemType, isStartRule, ItemMove, MaterialMove, PlayerTurnRule, RuleMove } from '@gamepark/rules-api'
import { score } from '../logic/Score'
import { CustomMoveType } from './CustomMoveType'
import { LegendCard } from '../material/LegendCard'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class AcquireLegendRule extends PlayerTurnRule {
  onRuleStart(move: RuleMove): MaterialMove[] {
    if (isStartRule(move) && move.id === RuleId.AcquireLegend) {
      if (this.isKingdomComplete) {
        return [ this.rules().startRule(RuleId.RevealAllBoardCards) ]
      } else if (this.remind(Memory.ForcePass) || !this.getPlayerLegendMoves().length) {
        this.forget(Memory.PickedLegend)
        this.forget(Memory.ForcePass)
        return [this.rules().startPlayerTurn(RuleId.DrawOrPlaceDiscardCard, this.nextPlayer)]
      }
    }
    return []
  }

  get isKingdomComplete() {
    return this.material(MaterialType.KingdomCard).player(this.player).location(l => l.type === LocationType.PlayerBoard && !l.rotation).length === 0
  }

  get isCardDrawnFromDeck() {
    return (this.game.rule!.id !== RuleId.DrawOrPlaceDiscardCard)
  }

  get isCardMovedToKingdom() {
    return (this.game.rule!.id === RuleId.AcquireLegend)
  }

  getPlayerMoves(): MaterialMove[] {
    let moves:MaterialMove[]=[]

    // The player may pass his/her turn if he/she drew a card from the deck
    // or placed a card into his/her kingdom from the discard
    if (this.isCardDrawnFromDeck) {
      // A card was drawn from the deck
      moves.push(this.rules().customMove(CustomMoveType.Pass))
    }
    if (!this.remind(Memory.PickedLegend)){
      // TODO: do we allow the player to pass when he could take a legend card?
      moves.push(...this.getPlayerLegendMoves())
    }
    return moves
  }

  getPlayerLegendMoves() {
    const kingdomCards = this.material(MaterialType.KingdomCard)
      .player(this.getActivePlayer())
      .rotation(true)
    const grid = score.toGrid(this.getActivePlayer(), kingdomCards)
    const legendCharacteristics = score.legendAnalysisFromGrid(grid)

    const availableLegendCards =
      this.material(MaterialType.LegendCard)
        .location(LocationType.LegendLine)
        .id<LegendCard>(id => {
          return legendCharacteristics.match(id)
        })

    return availableLegendCards.moveItems({
      type: LocationType.PlayerLegendLine,
      player: this.getActivePlayer()
    })
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.LegendCard)(move) && move.location.type === LocationType.PlayerLegendLine) {
      // Note: deal(,1) rather than dealOne() to avoid errors in case of empty deck
      const consequences: MaterialMove[] = this.legendDeck().deal({ type: LocationType.LegendLine }, 1)
      if (this.game.rule!.id === RuleId.AcquireLegend) {
        consequences.push(this.rules().startPlayerTurn(RuleId.DrawOrPlaceDiscardCard, this.nextPlayer))
      } else {
        this.memorize(Memory.PickedLegend, true)
      }
      return consequences
    }
    return []
  }

  legendDeck() {
    return this.material(MaterialType.LegendCard)
      .location(LocationType.LegendDeck)
      .deck()
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    if (move.type === CustomMoveType.Pass) {
      this.memorize(Memory.ForcePass, true)
      if (this.isCardMovedToKingdom){
        // A card was moved to the kingdom => Go to next player's turn if game is not over
        // This is done through onRuleStart() replaying this rule
      } else {
        // No card was moved to the kingdom => A card from the kingdom must be revealed
        return [this.rules().startRule(RuleId.RevealBoardCard)]
      }
    }
    return []
  }
}
