/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LocationType } from '@gamepark/aetherya/material/LocationType'
import { MaterialType } from '@gamepark/aetherya/material/MaterialType'
import { PlayerId } from '@gamepark/aetherya/PlayerId'
import { MaterialTutorial, Picture, TutorialStep } from '@gamepark/react-game'
import { isMoveItemType } from '@gamepark/rules-api'
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

const me = 1
const opponent = 2

export class Tutorial extends MaterialTutorial<PlayerId, MaterialType, LocationType> {
  version = 1
  options = { players: 2 }
  setup = new TutorialSetup()

  players = [{ id: me }, { id: opponent }]

/*
  A mettre sur le site, pas dans le tuto

  Dans Aetherya, chaque joueur va explorer des terres sauvages et bâtir un Royaume constitué de Terrains variés, peuplé de créatures et de Tribus
  diverses.<br/>
  &nbsp;<br/>
  Tous feront en sorte de totaliser un maximum de points d'Harmonie en agençant au mieux leurs cartes Royaume tout en faisant l'acquisition de cartes
  Légendes également génératrices de points d'Harmonie.<br/>
  &nbsp;<br/>
  Le joueur qui, à la fin de la partie, totalisera le plus de points sera déclaré héros légendaire d'Aetherya.
*/

  steps: TutorialStep[] = [
    {
      popup: {
        text: () =>
          <>
          Dans Aetherya, vous allez agencer des cartes dans votre Royaume afin de gagner des points d'Harmonie.
          </>,
        size: { width: 120 }
      }
    },
    {
      popup: {
        text: () => (
          <>
            Votre Royaume est composé de 16 cartes.<br/>
            Certaines sont, pour le moment, face cachée.<br/>
            &nbsp;<br/>
            Lors d'une vraie partie, vous pouvez agencer vos 4 premières cartes centrales comme bon vous semble.<br/>
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
            Le jeu comporte des cartes Tribu:<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;Nain, Humain, Elfe et Gobelin<br/>
            &nbsp;<br/>
            et des cartes Terrain:<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;Plaine, Marais, Forêt et Montagne
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
            En plaçant des tribus à côté de vos terrains, vous pouvez gagner ou perdre des points.<br/>
            &nbsp;<br/>
            Par exemple, les humains apprécient les plaines <Picture src={plainIcon}/> mais détestent les marais <Picture src={swampIcon}/>.<br/>
            &nbsp;<br/>
            Les cartes placées en diagonale ne sont pas considérées adjacentes.<br/>
            &nbsp;<br/>
            <b>Cliquez sur la carte Humain pour en savoir plus</b>
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
            A tour de rôle, chaque joueur:<br/>
            &nbsp;<br/>
            <ul><li>prend la carte de la défausse et la place dans son Royaume</li></ul>
            <p style={{textAlign: "center"}}>ou</p>
            <ul><li>retourne une nouvelle carte depuis la pioche
            et la place dans son Royaume</li></ul>
          </>
        ),
        size: { width: 100 }
      }
    },
    {
      popup: {
        text: () => (
          <><b>Placez la carte de la défausse<br/>dans votre Royaume à l'endroit indiqué</b></>
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
            Certaines tribus se détestent.<br/>
            &nbsp;<br/>
            Par exemple, les elfes détestent les <Picture src={goblinIcon}/> gobelins et les <Picture src={dwarfIcon}/> nains.<br/>
            &nbsp;<br/>
            Si elles sont placées de manière adjacente, elles vous feront perdre des points.<br/>
            &nbsp;<br/>
            <b>Cliquez sur la carte Elfe pour en savoir plus</b>
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
            Les cartes Légendes permettent de gagner des points si vous arrivez à remplir certaines conditions en cours de partie.<br/>
            &nbsp;<br/>
            <b>Cliquez sur une carte Légende pour en savoir plus</b>
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
            Prenez la carte Elfe de la défausse et placez la à la droite de la carte Humain
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
            La Légende Humain-Elfe est réalisée.<br/>
            &nbsp;<br/>
            <b>Réclamez-la !</b><br/>
            &nbsp;<br/>
            Une fois récupérée, aucun autre joueur ne pourra réaliser cet objectif.<br/>
            &nbsp;<br/>
            Important: il n'est possible de prendre qu'une seule carte Légende par tour
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
            Les cartes Dragon offrent des points en fin de partie s'ils ont été domestiqués.<br/>
            &nbsp;<br/>
            Pour cela, ils doivent être connectés à au-moins deux Tribus de même nature.<br/>
            &nbsp;<br/>
            <b>Cliquez sur la carte Dragon pour en savoir plus</b>
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
            Piochez une carte, en faisant glisser la carte de la pioche sur la défausse
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
            Les Portails magiques mettent en contact les 4 cartes qui leurs sont adjacentes
            et peuvent offrir de belles opportunités en rapprochant
            des Tribus de leur Terrain de prédilection.<br/>
            &nbsp;<br/>
            A l'inverse, mal utilisés, ils peuvent générer des conflits.<br/>
            &nbsp;<br/>
            <b>Cliquez sur la carte Portail pour en savoir plus</b>
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
            <b>Placez le portail à la place du Marais</b>
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
            La tribu Humaine et la tribu Naine sont désormais adjacentes via le Portail.<br/>
            &nbsp;<br/>
            <b>Réclamez la Légende correspondante</b>
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
      popup: {
        text: () => (
          <>
            La partie s'arrête dès qu'un joueur a 16 cartes face visible dans son Royaume.<br/>
            &nbsp;<br/>
            Les cartes cachées sont alors retournées, et on procède au décompte des points.
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
            Pour rappel, il est possible de gagner des points:<br/>
            <ul>
              <li>en plaçant des Tribus à côté des Terrains qu'elles apprécient</li>
              <li>en domestiquant des dragons</li>
              <li>en réalisant des Légendes</li>
            </ul>
            &nbsp;<br/>
            Faites attention à ne pas perdre trop de points à cause de conflits entre tribus.
          </>
        )
      }
    },
    {
      popup: {
        text: () => (
          <>
            C'est désormais à vous de bâtir ce Royaume et d'écrire ses Légendes.<br/>
            &nbsp;<br/>
            Bonne chance !
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
