import Ship from '../factories/ship'
import Player from '../factories/player'
import { WarShip } from '../factories/ship'
import { BattleBoard } from '../factories/board'

export interface BattleFacade {
  getPlayerCarrier: () => WarShip
  getPlayerBattleShip: () => WarShip
  getPlayerDestroyer: () => WarShip
  getPlayerSubmarine: () => WarShip
  getPlayerPatrol: () => WarShip

  getEnemyCarrier: () => WarShip
  getEnemyBattleShip: () => WarShip
  getEnemyDestroyer: () => WarShip
  getEnemySubmarine: () => WarShip
  getEnemyPatrol: () => WarShip

  getPlayerBoard: () => BattleBoard
  getComputerBoard: () => BattleBoard
}

// Facade
const Battleship = (function (): BattleFacade {
  const playerCarrier = Ship('c')
  const playerBattleShip = Ship('b')
  const playerDestroyer = Ship('d')
  const playerSubmarine = Ship('s')
  const playerPatrol = Ship('p')

  const getPlayerCarrier = () => playerCarrier
  const getPlayerBattleShip = () => playerBattleShip
  const getPlayerDestroyer = () => playerDestroyer
  const getPlayerSubmarine = () => playerSubmarine
  const getPlayerPatrol = () => playerPatrol

  const enemyCarrier = Ship('c')
  const enemyBattleShip = Ship('b')
  const enemyDestroyer = Ship('d')
  const enemySubmarine = Ship('s')
  const enemyPatrol = Ship('p')

  const getEnemyCarrier = () => enemyCarrier
  const getEnemyBattleShip = () => enemyBattleShip
  const getEnemyDestroyer = () => enemyDestroyer
  const getEnemySubmarine = () => enemySubmarine
  const getEnemyPatrol = () => enemyPatrol

  const getPlayerBoard = () => Player.getHumanBoard()
  const getComputerBoard = () => Player.getComputerBoard()

  return {
    getPlayerCarrier,
    getPlayerBattleShip,
    getPlayerDestroyer,
    getPlayerSubmarine,
    getPlayerPatrol,
    getEnemyCarrier,
    getEnemyBattleShip,
    getEnemyDestroyer,
    getEnemySubmarine,
    getEnemyPatrol,
    getPlayerBoard,
    getComputerBoard,
  }
})()

export default Battleship
