/** @jsxImportSource @emotion/react */
import { AetheryaOptionsSpec } from '@gamepark/aetherya/AetheryaOptions'
import { AetheryaRules } from '@gamepark/aetherya/AetheryaRules'
import { AetheryaSetup } from '@gamepark/aetherya/AetheryaSetup'
import { GameProvider, setupTranslation } from '@gamepark/react-game'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { aetheryaAnimations } from './animation/AetheryaAnimations'
import App from './App'
import { Locators } from './locators/Locators'
import { Material } from './material/Material'
import translations from './translations.json'
import { Tutorial } from './tutorial/Tutorial'

setupTranslation(translations, { debug: false })

ReactDOM.render(
  <StrictMode>
    <GameProvider
      game="aetherya"
      Rules={AetheryaRules}
      optionsSpec={AetheryaOptionsSpec}
      GameSetup={AetheryaSetup}
      material={Material}
      locators={Locators}
      animations={aetheryaAnimations}
      tutorial={new Tutorial()}
    >
      <App/>
    </GameProvider>
  </StrictMode>,
  document.getElementById('root')
)
