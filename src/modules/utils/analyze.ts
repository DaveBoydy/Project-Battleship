interface ArrayAnalyzer {
  average: number
  min: number
  max: number
  length: number
}

const analyzeArray = (arr: number[]): ArrayAnalyzer => {
  const average =
    arr.reduce((sum, currentValue) => sum + currentValue) / arr.length

  return {
    average,
    min: Math.min(...arr),
    max: Math.max(...arr),
    length: arr.length,
  }
}

export default analyzeArray
