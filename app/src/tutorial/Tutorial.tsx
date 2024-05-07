/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/aetherya/material/LocationType'
import { MaterialType } from '@gamepark/aetherya/material/MaterialType'
import { PlayerId } from '@gamepark/aetherya/PlayerId'
import { isMoveItemType } from '@gamepark/rules-api'
import { MaterialTutorial, TutorialStep } from '@gamepark/react-game'
import { TutorialSetup } from './TutorialSetup'

const me = 1
const opponent = 2

export class Tutorial extends MaterialTutorial<PlayerId, MaterialType, LocationType> {
  version = 1
  options = { players: 2 }
  setup = new TutorialSetup()

  players = [{ id: me }, { id: opponent }]

  steps: TutorialStep[] = [
    {
      popup: {
        text: () =>
          <>
          Dans Aetherya, chaque joueur va explorer des terres sauvages et bâtir un Royaume constitué de Terrains variés, peuplé de créatures et de Tribus diverses.
          Tous feront en sorte de totaliser un maximum de points d'Harmonie en agençant au mieux leurs cartes Royaume tout en faisant l'acquisition de cartes Légendes également génératrices de points d'Harmonie.
          Le joueur qui, à la fin de la partie, totalisera le plus de points sera déclaré héros légendaire d'Aetherya.
          </>
      }
    },
    {
      popup: {
        text: () => (
          <>
          Votre Royaume est composé de 16 cartes.<br/>
          Certaines sont, pour le moment, face cachée.<br/>
          &nbsp;<br/>
          Lors d'une vraie partie, vous pouvez agencer vos 4 cartes centrales comme bon vous semble.<br/>
          </>
        ),
        position: { x:40, y:0 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.KingdomCard).location(LocationType.PlayerBoard).player(me)
        ],
        margin: {
          top: 20,
          bottom: 20
        }
      })
    },
    {
      popup: {
        text: () => (
          <>
          Le jeu comporte des cartes Tribus:<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;Nain, Humain, Elfe et Gobelin<br/>
          &nbsp;<br/>
          et des cartes Terrain:<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;Plaine, Marais, Forêt et Montagne
          </>
        ),
        position: { x:40, y:0 }
      }
    },
    {
      popup: {
        text: () => (
          <>
          Les Humains apprécient les Plaines, les Montagnes et les Forêts.<br/>
          S'ils sont placés à côté de ces terrains, ils rapporteront des points.<br/>
          &nbsp;<br/>
          Les Humains détestent les Marais.<br/>
          S'ils sont placés à côté des Marais, ils feront perdre des points.<br/>
          &nbsp;<br/>
          Dans Aetherya, les cartes placées en diagonale les unes par rapport aux autres ne sont pas considérées comme étant limitrophes.
          </>
        ),
        position: { x:40, y:0 }
      }
    },
    {
      popup: {
        text: () => (
          <>
          Chaque joueur joue à tour de rôle.<br/>
          &nbsp;<br/>
          On prend la carte face visible au milieu de la table et on la place dans son Royaume<br/>
          - ou -<br/>
          On retourne une nouvelle carte depuis la pioche et on la place dans son Royaume<br/>
          &nbsp;<br/>
          La carte remplacée est défaussée<br/>
          &nbsp;<br/>
          -&gt; Placez la carte face visible en haut de la carte Nain dans votre Royaume
          </>
        ),
        position: { x:45, y:0 }
      },

/*
      move: {
        player: me,
        filter: (move, game) => {
          // Get card from discard
          return isMoveItemType(MaterialType.KingdomCard)(move)
            && this.material(game, MaterialType.KingdomCard).getItem(move.itemIndex)!.location.type == LocationType.KingdomDiscard
        }
      }
    },
    {
      popup: {
        text: () => (
          <>
          Puis on place la carte dans son Royaume<br/>
          On peut ainsi remplacer une carte de son Royaume qu'elle soit visible ou non.<br/>
          &nbsp;<br/>
          La carte remplacée est défaussée<br/>
          &nbsp;<br/>
          -&gt; Placez la carte en haut de la carte Nain
          </>
        ),
        position: { x:14, y:0 }
      },
*/
      move: {
        player: me,
        filter: (move, _game) => {
          // Put card to board location (2,1)
          return isMoveItemType(MaterialType.KingdomCard)(move)
            && move.location.x == 2
            && move.location.y == 1
        }
      }
    },
    {
      move: {
        player: opponent,
        filter: (move, game) => {
          // Get card from deck
          return isMoveItemType(MaterialType.KingdomCard)(move)
            && this.material(game, MaterialType.KingdomCard).getItem(move.itemIndex)!.location.type == LocationType.KingdomDeck
        }
      }
    },
    {
      move: {
        player: opponent,
        filter: (move, _game) => {
          // Put card to board location (3,2)
          return isMoveItemType(MaterialType.KingdomCard)(move)
            && move.location.x == 3
            && move.location.y == 2
        }
      }
    },
    {
      popup: {
        text: () => (
          <>
          Certaines tribus se détestent: c'est le cas des elfes et des nains.<br/>
          Les gobelins, eux, détestent tout le monde et tout le monde les déteste.<br/>
          &nbsp;<br/>
          Si des tribus se haïssant sont adjacentes, elles vous feront perdre des points.
          </>
        ),
        position: { x:45, y:0 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.KingdomCard).location(LocationType.KingdomDiscard)
        ],
        margin: {
          top: 2,
          bottom: 2
        }
      })
    },
    {
      popup: {
        text: () => (
          <>
          Les cartes Légendes permettent de gagner des points si vous arrivez à remplir certaines conditions en cours de partie comme:<br/>
          <ul>
            <li>connecter une tribu Humaine à une tribu Naine</li>
          	<li>connecter 3 forêts</li>
            <li>connecter 2 tribus humaines</li>
            <li>avoir les 4 tribus dans son Royaume</li>
            <li>avoir 2 tribus gobelines connectées à une tribu naine OU 2 tribus naines connectées à une tribu gobeline</li>
          </ul>
          </>
        ),
        position: { x:0, y:20 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.LegendCard).location(LocationType.LegendLine)
        ],
        margin: {
          top: 20,
          bottom: 20
        }
      })
    },
    {
      popup: {
        text: () => (
          <>
          -&gt; Prenez la carte elfe de la défausse et Placez la à la droite de la carte Humain
          </>
        ),
        position: { x:45, y:0 }
      },
/*
      move: {
        player: me,
        filter: (move, game) => {
          // Get card from discard
          return isMoveItemType(MaterialType.KingdomCard)(move)
            && this.material(game, MaterialType.KingdomCard).getItem(move.itemIndex)!.location.type == LocationType.KingdomDiscard
        }
      }
    },
    {
      popup: {
        text: () => (
          <>
          -&gt; Placez la à la droite de la carte Humain
          </>
        )
      },
*/
      move: {
        player: me,
        filter: (move, _game) => {
          // Put card to board location (4,3)
          return isMoveItemType(MaterialType.KingdomCard)(move)
            && move.location.x == 4
            && move.location.y == 3
        }
      }
    },
    {
      popup: {
        text: () => (
          <>
          La Légende Humain-Elfe est réalisée.<br/>
          Une fois récupérée, aucun autre joueur ne pourra réaliser cet objectif.<br/>
          &nbsp;<br/>
          Important: il n'est possible de prendre qu'une seule carte Légende par tour<br/>
          &nbsp;<br/>
          -&gt; Réclamez la carte Légende Humain-Elfe
          </>
        ),
        position: { x:0, y:20 }
      },
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
            && this.material(game, MaterialType.KingdomCard).getItem(move.itemIndex)!.location.type == LocationType.KingdomDeck
        }
      }
    },
    {
      move: {
        player: opponent,
        filter: (move, _game) => {
          // Put card to board location (3,1)
          return isMoveItemType(MaterialType.KingdomCard)(move)
            && move.location.x == 3
            && move.location.y == 1
        }
      }
    },
    {
      popup: {
        text: () => (
          <>
          Les cartes Dragon offrent des points en fin de partie s'ils ont été domestiqués.<br/>
          &nbsp;<br/>
          Pour cela, ils doivent être connectés à au-moins deux Tribus de même nature.
          Si ce n'est pas le cas, ils restent à l'état sauvage et leur valeur est alors soustraite au score du joueur.<br />
          &nbsp;<br/>
          La valeur de chaque Dragon augmente (de 3 à 6) en fonction de leur nombre dans votre Royaume (de 1 à 3 Dragons).
          Au-delà de 3 Dragons dans votre Royaume, il est impossible de les domestiquer.
          A partir du 4e Dragon, leur valeur (6) est déduite de votre score de Dragons.<br/>
          &nbsp;<br/>
          Attention:
          <ul>
            <li>Les gobelins ne peuvent pas domestiquer les Dragons</li>
            <li>Une fois placés, les Dragons sont inamovibles</li>
          </ul>
          </>
        ),
        position: { x:40, y:0 }
      }
    },
    {
      popup: {
        text: () => (
          <>
          -&gt; Piochez une carte
          </>
        ),
        position: { x:45, y:0 }
      }
    },
    {
      move: {
        player: me,
        filter: (move, game) => {
          // Get card from deck
          return isMoveItemType(MaterialType.KingdomCard)(move)
            && this.material(game, MaterialType.KingdomCard).getItem(move.itemIndex)!.location.type == LocationType.KingdomDeck
        }
      }
    },
    {
      popup: {
        text: () => (
          <>
          Les Portails magiques mettent en contact les 4 cartes qui leurs sont adjacentes
          orthogonalement et peuvent offrir de belles opportunités en rapprochant
          des Tribus de leur Terrain de prédilection.<br/>
          &nbsp;<br/>
          A l'inverse, mal utilisés, ils peuvent générer des conflits.<br/>
          &nbsp;<br/>
          Attention:
          <ul>
            <li>Les gobelins ne peuvent pas utiliser les Portails</li>
            <li>Une fois placés, les Portails sont inamovibles</li>
          </ul>
          </>
        ),
        position: { x:45, y:0 }
      }
    },
    {
      popup: {
        text: () => (
          <>
          -&gt; Placez le portail à la place du Marais
          </>
        ),
        position: { x:45, y:0 }
      },
      move: {
        player: me,
        filter: (move, _game) => {
          // Put card to board location (3,2)
          return isMoveItemType(MaterialType.KingdomCard)(move)
            && move.location.x == 3
            && move.location.y == 2
        }
      }
    },
    {
      popup: {
        text: () => (
          <>
          La tribu Humaine et la tribu Naine sont désormais adjacentes via le Portail.<br/>
          &nbsp;<br/>
          -&gt; Réclamez la Légende correspondante
          </>
        ),
        position: { x:45, y:0 }
      },
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
        )
      }
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
