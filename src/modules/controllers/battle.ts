import battlePage from '../../assets/templates/battle.html'
import makeScreen from '../views/screens'
import makeGrid from '../views/components/grid'
import battleClickHandler from '../views/events/battle'

const battleshipContainer = document.querySelector('#battleship-container')
const battleScreen = makeScreen(battlePage)
const grid = makeGrid('computer')

const battleScreenController = {
  addBattleScreen: (playerMap: Element) => {
    battleshipContainer!.appendChild(battleScreen)
    const battleGrid = document.querySelector('#battle-grid')
    const battleView = document.querySelector('#battle-screen')
    battleGrid!.appendChild(grid)
    battleView!.appendChild(playerMap)
    battleClickHandler.init()
  },
}

export default battleScreenController
