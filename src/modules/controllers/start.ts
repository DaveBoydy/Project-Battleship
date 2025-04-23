import startPage from '../../assets/templates/start.html'
import makeScreen from '../views/screens'

const battleshipContainer = document.querySelector('#battleship-container')
const startScreen = makeScreen(startPage)

const startScreenController = {
  addTitleScreen: (): void => {
    battleshipContainer!.appendChild(startScreen)
  },
  removeTitleScreen: (): void => {
    const startScreen = document.querySelector('#start-screen')
    if (startScreen != null) {
      battleshipContainer!.removeChild(startScreen)
    }
  },
}

export default startScreenController
