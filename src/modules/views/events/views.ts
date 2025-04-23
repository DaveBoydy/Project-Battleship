import globalState from '../../models/states/global'
import start from '../../controllers/start'
import setup from '../../controllers/setup'
import battle from '../../controllers/battle'

addEventListener('DOMContentLoaded', () => {
  start.addTitleScreen()
  document.body.addEventListener('click', event => {
    const target = event.target as HTMLElement

    // switch to setup screen
    if (target.id === 'battleship-start') {
      start.removeTitleScreen()
      setup.addSetupScreen()
    }

    // switch to battle screen
    if (target.id === 'launch-fleet' && globalState.deployComplete === true) {
      setup.removeSetupScreen()
      battle.addBattleScreen(globalState.playerMap)
    }

    if (target.id === 'battleship-restart') {
      location.reload()
    }
  })
})
