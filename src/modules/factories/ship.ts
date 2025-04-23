export interface WarShip {
  getType(): string
  getLength(): number
  getDamage(): number
  getMiddleMarks: () => number[][]
  setMiddleMarks(core: number[]): void
  hit(): void
  isSunk(): boolean
}

const Ship = (make: string): WarShip => {
  const type = make
  const length = setLength(type)
  const middleMarks: number[][] = []
  let damage = 0

  const getType = () => type
  const getLength = () => length
  const getDamage = () => damage
  const getMiddleMarks = () => middleMarks
  const setMiddleMarks = (core: number[]) => {
    middleMarks.push(core)
  }

  const hit = () => {
    damage += 1
  }

  const isSunk = () => {
    if (damage >= length) return true
    return false
  }

  function setLength(model: string) {
    switch (model) {
      case 'c':
        return 5
      case 'b':
        return 4
      case 'd':
        return 3
      case 's':
        return 3
      case 'p':
        return 2
      default:
        return 0
    }
  }

  return {
    getType,
    getLength,
    getDamage,
    getMiddleMarks,
    setMiddleMarks,
    hit,
    isSunk,
  }
}

export default Ship
