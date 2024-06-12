/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LocationType } from '@gamepark/aetherya/material/LocationType'
import { MaterialType } from '@gamepark/aetherya/material/MaterialType'
import { PlayerId } from '@gamepark/aetherya/PlayerId'
import { MaterialTutorial, Picture, TutorialStep } from '@gamepark/react-game'
import { isMoveItemType, isSelectItemType } from '@gamepark/rules-api'
import dwarfIcon from '../images/icon/dwarf3.png'
import goblinIcon from '../images/icon/goblin3.png'
import plainIcon from '../images/icon/plain3.png'
import swampIcon from '../images/icon/swamp3.png'
import { TutorialSetup } from './TutorialSetup'
import { GPTrans } from '../Translator'

const me = 1
const opponent = 2

export class Tutorial extends MaterialTutorial<PlayerId, MaterialType, LocationType> {
  version = 1
  options = { players: 2 }
  setup = new TutorialSetup()

  players = [{ id: me }, { id: opponent }]

/*
  A mettre sur le site, pas dans le tuto

  Dans Aetherya, chaque joueur va explorer des terres sauvages et bâtir un Royaume constitué de Terrains variés, peuplé de créatures et de Tribus diverses.<br/>
  &nbsp;<br/>
  Votre objectif sera d'agencer au-mieux les cartes de votre Royaume afin de gagner des points d'Harmonie.

  Tous feront en sorte de totaliser un maximum de points d'Harmonie en agençant au mieux leurs cartes Royaume tout en faisant l'acquisition de cartes
  Légendes également génératrices de points d'Harmonie.<br/>
  &nbsp;<br/>
  Le joueur qui, à la fin de la partie, totalisera le plus de points sera déclaré héros légendaire d'Aetherya.
*/

  steps: TutorialStep[] = [
    {
      popup: {
        text: () => (
          <GPTrans defaults="tuto.welcome"></GPTrans>
        ),
        size: { width: 120 }
      }
    },
    {
      popup: {
        text: () => (
          <>
          <GPTrans defaults="tuto.goal.1"></GPTrans><br/>
          &nbsp;<br/>
          <GPTrans defaults="tuto.goal.2"></GPTrans><br/>
          &nbsp;<br/>
          <GPTrans defaults="tuto.goal.3"></GPTrans>
          </>
        ),
        size: { width: 120 }
      }
    },
    {
      popup: {
        text: () => (
          <>
          <GPTrans defaults="tuto.board.1"></GPTrans><br/>
          <GPTrans defaults="tuto.board.2"></GPTrans><br/>
          &nbsp;<br/>
          <GPTrans defaults="tuto.board.3"></GPTrans>
          </>
        ),
        position: { x: 40, y: 0 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.KingdomCard).location(LocationType.PlayerBoard).player(me)
        ],
        margin: {
          top: 2,
          bottom: 2,
          right: 35
        }
      })
    },
    {
      popup: {
        text: () => (
          <>
          <GPTrans defaults="tuto.card.1" suffix=":"></GPTrans><br/>
          &nbsp;&nbsp;&nbsp;&nbsp;<GPTrans defaults="tuto.card.2"></GPTrans><br/>
          &nbsp;<br/>
          <GPTrans defaults="tuto.card.3" suffix=":"></GPTrans><br/>
          &nbsp;&nbsp;&nbsp;&nbsp;<GPTrans defaults="tuto.card.4"></GPTrans>
          </>
        ),
        position: { x: 40, y: 0 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.KingdomCard).location(LocationType.PlayerBoard).player(me)
        ],
        margin: {
          top: 2,
          bottom: 2,
          right: 35
        }
      })
    },
    {
      popup: {
        text: () => (
          <>
          <GPTrans defaults="tuto.land.1"></GPTrans><br/>
          &nbsp;<br/>
          <GPTrans defaults="tuto.land.2">
            <Picture src={plainIcon}/>
            <Picture src={swampIcon}/>
          </GPTrans><br/>
          &nbsp;<br/>
          <GPTrans defaults="tuto.land.3"></GPTrans><br/>
          &nbsp;<br/>
          <b><GPTrans defaults="tuto.land.4"></GPTrans></b>
          </>
        ),
        size: { width: 95 },
        position: { x: 35, y: 0 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.KingdomCard).location(LocationType.PlayerBoard).player(me).filter(item => item.location.x === 3 && item.location.y === 3)
        ],
        margin: {
          right: 15,
          top: 10,
          bottom: 2
        }
      })
    },
    {
      popup: {
        text: () => (
          <>
            <GPTrans defaults="tuto.turn.1" suffix=":"></GPTrans><br/>
            &nbsp;<br/>
            <ul><li><GPTrans defaults="tuto.turn.2"></GPTrans></li></ul>
            <p style={{textAlign: "center"}}><GPTrans defaults="tuto.turn.or"></GPTrans></p>
            <ul><li><GPTrans defaults="tuto.turn.3"></GPTrans></li></ul>
            <p style={{textAlign: "center"}}><GPTrans defaults="tuto.turn.or"></GPTrans></p>
            <ul><li><GPTrans defaults="tuto.turn.4"></GPTrans></li></ul>
          </>
        ),
        size: { width: 100 }
      }
    },
    {
      popup: {
        text: () => (
          <b>
            <GPTrans defaults="tuto.round1.1"></GPTrans><br/>
            <GPTrans defaults="tuto.round1.2"></GPTrans>
          </b>
        ),
        position: { x: 35, y: -20 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.KingdomCard).location(LocationType.KingdomDeck),
          this.material(game, MaterialType.KingdomCard).location(LocationType.KingdomDiscard),
          this.material(game, MaterialType.KingdomCard).location(LocationType.PlayerBoard).player(me)
        ],
        margin: {
          top: 2,
          bottom: 10,
          left: 2,
          right: 25
        }
      }),
      move: {
        player: me,
        filter: (move, _game) => {
          // Put card to board location (2,1)
          return isMoveItemType(MaterialType.KingdomCard)(move)
            && move.location.x === 2
            && move.location.y === 1
        }
      }
    },
    {
      move: {
        player: opponent,
        filter: (move, game) => {
          // Get card from deck
          return isMoveItemType(MaterialType.KingdomCard)(move)
            && this.material(game, MaterialType.KingdomCard).getItem(move.itemIndex)!.location.type === LocationType.KingdomDeck
        }
      }
    },
    {
      popup: {
        text: () => (
          <>
            <GPTrans defaults="tuto.round1.3"></GPTrans>
          </>
        ),
        position: { x: 35, y: -20 }
      }
    },
    {
      move: {
        player: opponent,
        filter: (move, _game) => {
          // Put card to board location (3,2)
          return isMoveItemType(MaterialType.KingdomCard)(move)
            && move.location.x === 3
            && move.location.y === 2
        }
      }
    },
    {
      popup: {
        text: () => (
          <>
            <GPTrans defaults="tuto.round1.4"></GPTrans><br/>
            &nbsp;<br/>
            <GPTrans defaults="tuto.round1.5"></GPTrans>
          </>
        ),
        position: { x: 35, y: -20 }
      }
    },
    {
      popup: {
        text: () => (
          <>
            <GPTrans defaults="tuto.conflict.1"></GPTrans><br/>
            &nbsp;<br/>
            <GPTrans defaults="tuto.conflict.2">
              <Picture src={goblinIcon}/>
              <Picture src={dwarfIcon}/>
            </GPTrans><br/>
            &nbsp;<br/>
            <GPTrans defaults="tuto.conflict.3"></GPTrans><br/>
            &nbsp;<br/>
            <b><GPTrans defaults="tuto.conflict.4"></GPTrans></b>
          </>
        ),
        position: { x: 30, y: 0 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.KingdomCard).location(LocationType.KingdomDiscard)
        ],
        margin: {
          top: 2,
          bottom: 2,
          right: 20
        }
      })
    },
    {
      popup: {
        text: () => (
          <>
            <GPTrans defaults="tuto.legend.1"></GPTrans><br/>
            &nbsp;<br/>
            <b><GPTrans defaults="tuto.legend.2"></GPTrans></b>
          </>
        ),
        position: { x: 0, y: 20 },
        size: { width: 130 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.LegendCard).location(LocationType.LegendLine)
        ],
        margin: {
          top: 5,
          bottom: 30
        }
      })
    },
    {
      popup: {
        text: () => (
          <>
            <b><GPTrans defaults="tuto.round2.1"></GPTrans></b>
          </>
        ),
        position: { x: 35, y: -20 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.KingdomCard).location(LocationType.KingdomDeck),
          this.material(game, MaterialType.KingdomCard).location(LocationType.KingdomDiscard),
          this.material(game, MaterialType.KingdomCard).location(LocationType.PlayerBoard).player(me)
        ],
        margin: {
          top: 2,
          bottom: 10,
          left: 2,
          right: 25
        }
      }),
      move: {
        player: me,
        filter: (move, _game) => {
          // Put card to board location (4,3)
          return isMoveItemType(MaterialType.KingdomCard)(move)
            && move.location.x === 4
            && move.location.y === 3
        }
      }
    },
    {
      popup: {
        text: () => (
          <>
            <GPTrans defaults="tuto.round3.1"></GPTrans><br/>
            &nbsp;<br/>
            <b><GPTrans defaults="tuto.round3.2"></GPTrans></b><br/>
            &nbsp;<br/>
            <GPTrans defaults="tuto.round3.3"></GPTrans><br/>
            &nbsp;<br/>
            <GPTrans defaults="tuto.round3.4"></GPTrans>
          </>
        ),
        position: { x: 30, y: 10 }
      },
      focus: (game) =>
        ({
          materials: [
            this.material(game, MaterialType.KingdomCard).location(LocationType.PlayerBoard).player(me),
            this.material(game, MaterialType.LegendCard).location(LocationType.LegendLine).location((l) => l.x === 1)
          ],
          locations: [
            this.location(LocationType.PlayerLegendLine).player(me).x(1).location
          ],
          margin: {
            top: 5,
            bottom: 5
          }
        }),
      move: {
        player: me,
        filter: (move, _game) => {
          // Get 1st legend card
          return isMoveItemType(MaterialType.LegendCard)(move)
        }
      }
    },
    {
      move: {
        player: opponent,
        filter: (move, game) => {
          // Get card from deck
          return isMoveItemType(MaterialType.KingdomCard)(move)
            && this.material(game, MaterialType.KingdomCard).getItem(move.itemIndex)!.location.type === LocationType.KingdomDeck
        }
      }
    },
    {
      move: {
        player: opponent,
        filter: (move, _game) => {
          // Put card to board location (3,1)
          return isMoveItemType(MaterialType.KingdomCard)(move)
            && move.location.x === 3
            && move.location.y === 1
        }
      }
    },
    {
      popup: {
        text: () => (
          <>
            <GPTrans defaults="tuto.dragon.1"></GPTrans><br/>
            &nbsp;<br/>
            <GPTrans defaults="tuto.dragon.2"></GPTrans><br/>
            &nbsp;<br/>
            <b><GPTrans defaults="tuto.dragon.3"></GPTrans></b>
          </>
        ),
        position: { x: 25, y: 0 },
        size: { width: 110 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.KingdomCard).location(LocationType.KingdomDiscard)
        ],
        margin: {
          right: 26
        }
      })
    },
    {
      popup: {
        text: () => (
          <>
            <b><GPTrans defaults="tuto.round4.1"></GPTrans></b>
          </>
        ),
        position: { x: 0, y: -30 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.KingdomCard).location(LocationType.KingdomDeck),
          this.material(game, MaterialType.KingdomCard).location(LocationType.KingdomDiscard)
        ],
        margin: {
          top: 0,
          bottom: 0
        }
      }),
      move: {
        player: me,
        filter: (move, game) => {
          // Get card from deck
          return isMoveItemType(MaterialType.KingdomCard)(move)
            && this.material(game, MaterialType.KingdomCard).getItem(move.itemIndex)!.location.type === LocationType.KingdomDeck
        }
      }
    },
    {
      popup: {
        text: () => (
          <>
            <GPTrans defaults="tuto.portal.1"></GPTrans><br/>
            &nbsp;<br/>
            <GPTrans defaults="tuto.portal.2"></GPTrans><br/>
            &nbsp;<br/>
            <b><GPTrans defaults="tuto.portal.3"></GPTrans></b>
          </>
        ),
        position: { x: 25, y: 0 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.KingdomCard).location(LocationType.KingdomDiscard)
        ],
        margin: {
          right: 20
        }
      })
    },
    {
      popup: {
        text: () => (
          <>
            <b><GPTrans defaults="tuto.round5.1"></GPTrans></b>
          </>
        ),
        position: { x: 40, y: -10 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.KingdomCard).location(LocationType.KingdomDiscard),
          this.material(game, MaterialType.KingdomCard).location(LocationType.PlayerBoard).player(me).location((l) => l.x === 3 && l.y === 2)
        ],
        margin: {
          top: 10,
          bottom: 5,
          left: 2
        }
      }),
      move: {
        player: me,
        filter: (move, _game) => {
          // Put card to board location (3,2)
          return isMoveItemType(MaterialType.KingdomCard)(move)
            && move.location.x === 3
            && move.location.y === 2
        }
      }
    },
    {
      popup: {
        text: () => (
          <>
            <GPTrans defaults="tuto.round6.1"></GPTrans><br/>
            &nbsp;<br/>
            <b><GPTrans defaults="tuto.round6.2"></GPTrans></b>
          </>
        ),
        position: { x: 35, y: 5 }
      },
      focus: (game) =>
        ({
          materials: [
            this.material(game, MaterialType.LegendCard).location(LocationType.LegendLine).location((l) => l.x === 7),
            this.material(game, MaterialType.KingdomCard).location(LocationType.PlayerBoard).player(me)
          ],
          locations: [
            this.location(LocationType.PlayerLegendLine).player(me).x(2).location
          ],
          margin: {
            left: 10,
            right: 10
          }
        }),
      move: {
        player: me,
        filter: (move, _game) => {
          // Get 1st legend card
          return isMoveItemType(MaterialType.LegendCard)(move)
        }
      }
    },
    {
      move: {
        player: opponent,
        filter: (move, _game) => {
          // Put card to board location (3,2)
          return isMoveItemType(MaterialType.KingdomCard)(move)
            && move.location.x === 4
            && move.location.y === 2
        }
      }
    },
    {
      popup: {
        text: () => (
          <>
            <b><GPTrans defaults="tuto.round7.1"></GPTrans></b>
          </>
        ),
        position: { y: -20 }
      },
      move: {
        player: me,
        filter: (move, game) => {
          // Get card from deck
          return isMoveItemType(MaterialType.KingdomCard)(move)
            && this.material(game, MaterialType.KingdomCard).getItem(move.itemIndex)!.location.type === LocationType.KingdomDeck
        }
      }
    },
    {
      popup: {
        text: () => (
          <>
            <GPTrans defaults="tuto.round8.1"></GPTrans><br/>
            &nbsp;<br/>
            <b><GPTrans defaults="tuto.round8.2"></GPTrans></b>
          </>
        ),
        position: { y: -20 }
      },
      move: {
        player: me,
        filter: (move, _game) => {
          // Get card from deck
          return isSelectItemType(MaterialType.KingdomCard)(move)
        }
      }
    },
    {
      popup: {
        text: () => (
          <>
            <GPTrans defaults="tuto.game.over.1"></GPTrans><br/>
            &nbsp;<br/>
            <GPTrans defaults="tuto.game.over.2"></GPTrans>
          </>
        ),
        position: { x: 35 }
      },
      focus: (game) =>
        ({
          materials: [
            this.material(game, MaterialType.KingdomCard).location(LocationType.PlayerBoard).player(me)
          ],
          margin: {
            right: 30,
            top: 2,
            bottom: 5,
          }
        })
    },
    {
      popup: {
        text: () => (
          <>
            <GPTrans defaults="tuto.reminder.1" suffix=":"></GPTrans><br/>
            <ul>
              <li><GPTrans defaults="tuto.reminder.2"></GPTrans></li>
              <li><GPTrans defaults="tuto.reminder.3"></GPTrans></li>
              <li><GPTrans defaults="tuto.reminder.4"></GPTrans></li>
            </ul>
            &nbsp;<br/>
            <GPTrans defaults="tuto.reminder.5"></GPTrans>
          </>
        )
      }
    },
    {
      popup: {
        text: () => (
          <>
            <p style={{textAlign: "center"}}>
              <GPTrans defaults="tuto.closure.1"></GPTrans><br/>
              <GPTrans defaults="tuto.closure.2"></GPTrans><br/>
              &nbsp;<br/>
              <GPTrans defaults="tuto.closure.3"></GPTrans>
            </p>
          </>
        )
      }
    }
  ]
}

export const alignIcon = css`
  > * {
    vertical-align: middle;
  }

  picture, img {
    vertical-align: middle;
    height: 1.5em;
    margin-right: 0.1em;
  }
`
