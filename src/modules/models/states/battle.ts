type warState = {
  enemyAttacks: Set<string>
  lastSuccessfulHit: number[][]
  successiveHit: boolean
}

const battleState: warState = {
  enemyAttacks: new Set(),
  lastSuccessfulHit: [],
  successiveHit: false,
}

export default battleState
