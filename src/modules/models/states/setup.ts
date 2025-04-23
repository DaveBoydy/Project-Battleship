type setupScreen = {
  validMarks: number[][]
  markStart: boolean
  startCell: number[]
  playerDeployType: string
  enemyDeployType: string
}

const setupState: setupScreen = {
  validMarks: [],
  markStart: true,
  startCell: [],
  playerDeployType: 'c',
  enemyDeployType: 'c',
}

export default setupState
