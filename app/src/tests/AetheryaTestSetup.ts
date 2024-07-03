import { AetheryaOptions } from '@gamepark/aetherya/AetheryaOptions'
import { AetheryaSetup } from '@gamepark/aetherya/AetheryaSetup'
import { tests } from './AetheryaTests'
import { Memory } from '@gamepark/aetherya/rules/Memory'

export class AetheryaTestSetup extends AetheryaSetup {
  setupMaterial(options: AetheryaOptions & { test?: number }) {
    // Global parameters
    this.memorize(Memory.RealTimeScore, options.realTimeScore ?? false)

    // Build material
    this.setupKingdomCards()
    this.setupLegendCards()

    // Tests
    if (options.test !== undefined) {
      console.log('Test mode')
      tests.setupMaterial(this, options.test, options.players)
      return
    }

    // Regular game
    this.setupLegendLine()
    this.setupPlayers()
  }

  start(options: AetheryaOptions & { test?: number }) {
    if (options.test !== undefined) {
      tests.start(this, options.test)
    } else {
      super.start(options)
    }
  }
}