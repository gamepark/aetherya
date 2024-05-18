/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LocationType } from '@gamepark/aetherya/material/LocationType'
import { MaterialType } from '@gamepark/aetherya/material/MaterialType'
import { PlayerId } from '@gamepark/aetherya/PlayerId'
import { MaterialTutorial, Picture, TutorialStep } from '@gamepark/react-game'
import { isMoveItemType, isSelectItemType } from '@gamepark/rules-api'
//import dragon3Icon from '../images/icon/dragon3_3.png'
//import dragon5Icon from '../images/icon/dragon5_3.png'
//import dragon6Icon from '../images/icon/dragon6_3.png'

import dwarfIcon from '../images/icon/dwarf3.png'
//import elfIcon from '../images/icon/elf3.png'

//import forestIcon from '../images/icon/forest3.png'
import goblinIcon from '../images/icon/goblin3.png'
//import humanIcon from '../images/icon/human3.png'
//import lockIcon from '../images/icon/lock3.png'
//import mountainIcon from '../images/icon/mountain3.png'

//import noGoblinIcon from '../images/icon/noGoblin3.png'
import plainIcon from '../images/icon/plain3.png'
import swampIcon from '../images/icon/swamp3.png'
import { TutorialSetup } from './TutorialSetup'
import { Trans } from 'react-i18next'

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
          <Trans defaults="tuto.welcome"></Trans>
        ),
        size: { width: 120 }
      }
    },
    {
      popup: {
        text: () => (
          <>
          <Trans defaults="tuto.goal.1"></Trans><br/>
          &nbsp;<br/>
          <Trans defaults="tuto.goal.2"></Trans><br/>
          &nbsp;<br/>
          <Trans defaults="tuto.goal.3"></Trans>
          </>
        ),
        size: { width: 120 }
      }
    },
    {
      popup: {
        text: () => (
          <>
          <Trans defaults="tuto.board.1"></Trans><br/>
          <Trans defaults="tuto.board.2"></Trans><br/>
          &nbsp;<br/>
          <Trans defaults="tuto.board.3"></Trans>
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
          <Trans defaults="tuto.card.1"></Trans>:<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;<Trans defaults="tuto.card.2"></Trans><br/>
          &nbsp;<br/>
          <Trans defaults="tuto.card.3"></Trans>:<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;<Trans defaults="tuto.card.4"></Trans>
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
          <Trans defaults="tuto.land.1"></Trans><br/>
          &nbsp;<br/>
          <Trans defaults="tuto.land.2">
            <Picture src={plainIcon}/>
            <Picture src={swampIcon}/>
          </Trans><br/>
          &nbsp;<br/>
          <Trans defaults="tuto.land.3"></Trans><br/>
          &nbsp;<br/>
          <b><Trans defaults="tuto.land.4"></Trans></b>
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
            <Trans defaults="tuto.turn.1"></Trans>:<br/>
            &nbsp;<br/>
            <ul><li><Trans defaults="tuto.turn.2"></Trans></li></ul>
            <p style={{textAlign: "center"}}><Trans defaults="tuto.turn.or"></Trans></p>
            <ul><li><Trans defaults="tuto.turn.3"></Trans></li></ul>
            <p style={{textAlign: "center"}}><Trans defaults="tuto.turn.or"></Trans></p>
            <ul><li><Trans defaults="tuto.turn.4"></Trans></li></ul>
          </>
        ),
        size: { width: 100 }
      }
    },
    {
      popup: {
        text: () => (
          <b>
            <Trans defaults="tuto.round1.1"></Trans><br/>
            <Trans defaults="tuto.round1.2"></Trans>
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
            <Trans defaults="tuto.conflict.1"></Trans><br/>
            &nbsp;<br/>
            <Trans defaults="tuto.conflict.2">
              <Picture src={goblinIcon}/>
              <Picture src={dwarfIcon}/>
            </Trans><br/>
            &nbsp;<br/>
            <Trans defaults="tuto.conflict.3"></Trans><br/>
            &nbsp;<br/>
            <b><Trans defaults="tuto.conflict.4"></Trans></b>
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
            <Trans defaults="tuto.legend.1"></Trans><br/>
            &nbsp;<br/>
            <b><Trans defaults="tuto.legend.2"></Trans></b>
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
            <b><Trans defaults="tuto.round2.1"></Trans></b>
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
            <Trans defaults="tuto.round3.1"></Trans><br/>
            &nbsp;<br/>
            <b><Trans defaults="tuto.round3.2"></Trans></b><br/>
            &nbsp;<br/>
            <Trans defaults="tuto.round3.3"></Trans><br/>
            &nbsp;<br/>
            <Trans defaults="tuto.round3.4"></Trans>
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
            <Trans defaults="tuto.dragon.1"></Trans><br/>
            &nbsp;<br/>
            <Trans defaults="tuto.dragon.2"></Trans><br/>
            &nbsp;<br/>
            <b><Trans defaults="tuto.dragon.3"></Trans></b>
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
            <b><Trans defaults="tuto.round4.1"></Trans></b>
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
            <Trans defaults="tuto.portal.1"></Trans><br/>
            &nbsp;<br/>
            <Trans defaults="tuto.portal.2"></Trans><br/>
            &nbsp;<br/>
            <b><Trans defaults="tuto.portal.3"></Trans></b>
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
            <b><Trans defaults="tuto.round5.1"></Trans></b>
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
            <Trans defaults="tuto.round6.1"></Trans><br/>
            &nbsp;<br/>
            <b><Trans defaults="tuto.round6.2"></Trans></b>
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
        filter: (_move, _game) => true
      }
    },
    {
      popup: {
        text: () => (
          <>
            <b><Trans defaults="tuto.round7.1"></Trans></b>
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
            <Trans defaults="tuto.round8.1"></Trans><br/>
            &nbsp;<br/>
            <b><Trans defaults="tuto.round8.2"></Trans></b>
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
            <Trans defaults="tuto.game.over.1"></Trans><br/>
            &nbsp;<br/>
            <Trans defaults="tuto.game.over.2"></Trans>
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
            <Trans defaults="tuto.reminder.1"></Trans>:<br/>
            <ul>
              <li><Trans defaults="tuto.reminder.2"></Trans></li>
              <li><Trans defaults="tuto.reminder.3"></Trans></li>
              <li><Trans defaults="tuto.reminder.4"></Trans></li>
            </ul>
            &nbsp;<br/>
            <Trans defaults="tuto.reminder.5"></Trans>
          </>
        )
      }
    },
    {
      popup: {
        text: () => (
          <>
            <p style={{textAlign: "center"}}>
              <Trans defaults="tuto.closure.1"></Trans><br/>
              <Trans defaults="tuto.closure.2"></Trans><br/>
              &nbsp;<br/>
              <Trans defaults="tuto.closure.3"></Trans>
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
