/** @jsxImportSource @emotion/react */
import { getRelativePlayerIndex, LocationContext } from '@gamepark/react-game'
import { Location, MaterialRules } from '@gamepark/rules-api'

export enum Corner {
  TopLeft        = 1,
  TopRight       = 2,
  MiddleTopLeft  = 3,
  MiddleTopRight = 4,
  BottomLeft     = 5,
  BottomRight    = 6
}

export class TableDesign {
  nbPlayers(rules: MaterialRules) {
    return rules.players.length
  }

  playerPosition(location: Location, context: LocationContext){
    const player = location.player
    return getRelativePlayerIndex(context, player)
  }

  playerCorner(position:number, players:number) : Corner {
    if (players===1)
      return Corner.TopRight
    if (players===2){
      if (position===0)
        return Corner.TopLeft
      return Corner.TopRight
    }
    if (players===3){
      if (position===2)
        return Corner.BottomLeft
      if (position===0)
        return Corner.TopLeft
      return Corner.TopRight
    }
    if (players===4){
      if (position===3)
        return Corner.BottomLeft
      if (position===0)
        return Corner.TopLeft
      if (position===1)
        return Corner.TopRight
      return Corner.BottomRight
    }
    console.log("*** Unsupported nb players")
    return Corner.TopLeft
  }

  isBoardRotated(_location: Location, _context: LocationContext){
    return false
/*
    const position=this.playerPosition(location, context)
    const nbPlayers=context.rules.game.players.length
    const corner=this.playerCorner(position, nbPlayers)
    if (nbPlayers<3)
      return false
    if ((corner==Corner.BottomLeft) || (corner==Corner.BottomRight))
      return false
    return true
*/
  }

  getTableSize(players: number) {
    switch (players) {
      case 1:
        return { xMin: -56, xMax: 12, yMin: -34, yMax: 17 }
      case 2:
        return { xMin: -55, xMax: 57, yMin: -35, yMax: 18 }
      case 3:
        return { xMin: -77, xMax: 79, yMin: -37, yMax: 37 }
      case 4:
        return { xMin: -66, xMax: 68, yMin: -42, yMax: 42 }
      case 5:
        return { xMin: -55, xMax: 57, yMin: -37, yMax: 37 }
      case 6:
        return { xMin: -55, xMax: 57, yMin: -37, yMax: 37 }
    }

    // Error
    console.log('*** Unsupported table configuration')
    return { xMin: -55, xMax: 57, yMin: -35, yMax: 17 }
  }

  playerBoardCoordinates(location: Location, context: LocationContext) {
    const { rules } = context
    const nbPlayers = this.nbPlayers(rules)
    const position=this.playerPosition(location, context)

    // Default value - If unsupported player number
    let x = 0
    let y = 0
    let z = 0

    if (nbPlayers === 1) {
      x = -25
      y = 0
    } else if (nbPlayers === 2) {
      if (position === 0) {
        x = -25
        y = 0
      } else if (position === 1) {
        x = 25
        y = 0
      }
    } else if (nbPlayers === 3) {
      if (position === 2) {
        x = -25
        y = 20
      } else if (position === 0) {
        x = -25
        y = -20
      } else if (position === 1) {
        x = 25
        y = -20
      }
    } else if (nbPlayers === 4) {
      if (position === 3) {
        x = -15
        y = 25
      } else if (position === 0) {
        x = -15
        y = -25
      } else if (position === 1) {
        x = 20
        y = -25
      } else if (position === 2) {
        x = 20
        y = 25
      }
    } else {
      // Error
      console.log('*** Unsupported table configuration')
    }
    return { x: x, y: y, z: z }
  }

  playerHandCoordinates(location: Location, context: LocationContext) {
    const boardCoords = this.playerBoardCoordinates(location, context)
    const { rules } = context
    const nbPlayers = this.nbPlayers(rules)
    const rotatedBoard=this.isBoardRotated(location, context)

    let deltaX = 0
    let deltaY = 0

    if (nbPlayers === 1) {
      deltaX = 2
      deltaY = 13
    } else if (nbPlayers === 2) {
      deltaX = 2
      deltaY = 13
    } else if (nbPlayers === 3) {
      deltaX = 2
      deltaY = 13
    } else if (nbPlayers === 4) {
      deltaX = 2
      deltaY = 13
    } else {
      // Error
      console.log('*** Unsupported table configuration')
    }

    if (rotatedBoard){
      deltaY=deltaY-26
    }

    return { x: boardCoords.x + deltaX, y: boardCoords.y + deltaY, z: boardCoords.z + 1 }
  }

  isPlayerLegendLineHorizontal(context: LocationContext) : boolean {
    const { rules } = context
    const nbPlayers = this.nbPlayers(rules)
    return (nbPlayers===3 || nbPlayers===4)
  }

  playerLegendLineCoordinates(location: Location, context: LocationContext) {
    const boardCoord = this.playerBoardCoordinates(location, context)
    const { rules } = context
    const nbPlayers = this.nbPlayers(rules)
    const position=this.playerPosition(location, context)

    let deltaX = 0
    let deltaY = 0
    if (nbPlayers === 1) {
      deltaX = -25
    } else if (nbPlayers === 2) {
      if (position === 0) {
        deltaX = -25
      } else if (position === 1) {
        deltaX = 20
      }
    } else if (nbPlayers === 3) {
      if (position === 2) {
        deltaX = -35
      } else if (position === 0) {
        deltaX = -35
        deltaY = 5
      } else if (position === 1) {
        deltaX = 30
        deltaY = 5
      }
    } else if (nbPlayers === 4) {
      if (position === 3) {
        deltaX = -35
        deltaY = -5
      } else if (position === 0) {
        deltaX = -35
        deltaY = 7
      } else if (position === 1) {
        deltaX = 30
        deltaY = 7
      } else if (position === 2) {
        deltaX = 30
        deltaY = -5
      }
    } else {
      // Error
      console.log('*** Unsupported table configuration')
    }
    return { x: boardCoord.x + deltaX, y: boardCoord.y + deltaY, z: boardCoord.z }
  }

  commonLegendLineCoordinates(context: LocationContext) {
    const { rules } = context
    const nbPlayers = this.nbPlayers(rules)

    let x = 0
    let y = 0
    let z = 0
    if (nbPlayers === 1) {
      x = -25
      y = -25
    } else if (nbPlayers === 2) {
      x = 0
      y = -25
    } else if (nbPlayers === 3) {
      x = 25
      y = 13
    } else if (nbPlayers === 4) {
      x = 25
      y = 0
    } else {
      // Error
      console.log('*** Unsupported table configuration')
    }
    return { x: x, y: y, z: z }
  }

  commonLegendDeckCoordinates(context: LocationContext) {
    const { rules } = context
    const nbPlayers = this.nbPlayers(rules)
    const lineCoord = this.commonLegendLineCoordinates(context)

    let deltaX = 0
    let deltaY = 0
    if (nbPlayers === 1) {
      deltaX = 20
      deltaY = 0
    } else if (nbPlayers === 2) {
      deltaX = -20
      deltaY = 0
    } else if (nbPlayers === 3) {
      deltaX = -20
      deltaY = 0
    } else if (nbPlayers === 4) {
      deltaX = -20
      deltaY = 0
    } else {
      // Error
      console.log('*** Unsupported table configuration')
    }
    return { x: lineCoord.x + deltaX, y: lineCoord.y + deltaY, z: 0.05 }
  }

  kingdomDeckCoordinates(context: LocationContext) {
    const { rules } = context
    const nbPlayers = this.nbPlayers(rules)

    let x = 0
    let y = 0

    if (nbPlayers === 1) {
      x = -5
      y = 0
    } else if (nbPlayers === 2) {
      x = -5
      y = 0
    } else if (nbPlayers === 3) {
      x = -5
      y = 0
    } else if (nbPlayers === 4) {
      x = -20
      y = 0
    } else {
      // Error
      console.log('*** Unsupported table configuration')
    }
    return { x: x, y: y, z: 0 }
  }

  kingdomDiscardCoordinates(context: LocationContext) {
    const deckCoord = this.kingdomDeckCoordinates(context)
    const { rules } = context
    const nbPlayers = this.nbPlayers(rules)

    let deltaX = 0
    let deltaY = 0
    if (nbPlayers === 1) {
      deltaX = 10
      deltaY = 0
    } else if (nbPlayers === 2) {
      deltaX = 10
      deltaY = 0
    } else if (nbPlayers === 3) {
      deltaX = 10
      deltaY = 0
    } else if (nbPlayers === 4) {
      deltaX = 10
      deltaY = 0
    } else {
      // Error
      console.log('*** Unsupported table configuration')
    }

    return { x: deckCoord.x + deltaX, y: deckCoord.y + deltaY, z: 0.1 }
  }

  scoreSheetCoordinates(context: LocationContext) {
    const { rules } = context
    const nbPlayers = this.nbPlayers(rules)

    let x = 0
    let y = 0
    if (nbPlayers === 1) {
      x = 5
      y = -25
    } else if (nbPlayers === 2) {
      x = 25
      y = -25
    } else if (nbPlayers === 3) {
      x = 0
      y = -27
    } else if (nbPlayers === 4) {
      x = -42
      y = 0
    } else {
      // Error
      console.log('*** Unsupported table configuration')
    }
    return { x: x, y: y, z: 10 }
  }
}

export const tableDesign = new TableDesign()
