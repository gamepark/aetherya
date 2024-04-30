/** @jsxImportSource @emotion/react */
import { AetheryaOptionsSpec } from '@gamepark/aetherya/AetheryaOptions'
import { AetheryaRules } from '@gamepark/aetherya/AetheryaRules'
import { AetheryaSetup } from '@gamepark/aetherya/AetheryaSetup'
import { GameProvider, MaterialGameAnimations, setupTranslation } from '@gamepark/react-game'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Locators } from './locators/Locators'
import { Material } from './material/Material'
import translations from './translations.json'

setupTranslation(translations, { debug: false })

ReactDOM.render(
  <StrictMode>
    <GameProvider game="aetherya" Rules={AetheryaRules} optionsSpec={AetheryaOptionsSpec} GameSetup={AetheryaSetup}
                  material={Material} locators={Locators} animations={new MaterialGameAnimations()}>
      <App/>
    </GameProvider>
  </StrictMode>,
  document.getElementById('root')
)
