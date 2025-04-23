import GameBoard, { BattleBoard } from './board'
interface BattleshipPlayer {
  getHumanBoard(): BattleBoard
  getComputerBoard(): BattleBoard
}

const Player = (function (): BattleshipPlayer {
  const human = GameBoard()
  const computer = GameBoard()

  const getHumanBoard = () => human
  const getComputerBoard = () => computer

  return {
    getHumanBoard,
    getComputerBoard,
  }
})()

export default Player
