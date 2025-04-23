import analyzeArray from '../utils/analyze'

test('[1, 8, 3, 4, 2, 6] has a length of 6', () => {
  expect(analyzeArray([1, 8, 3, 4, 2, 6]).length).toEqual(6)
})

test('[1, 8, 3, 4, 2, 6] maximum value is 8', () => {
  expect(analyzeArray([1, 8, 3, 4, 2, 6]).max).toEqual(8)
})

test('[1, 8, 3, 4, 2, 6] minimum value is 1', () => {
  expect(analyzeArray([1, 8, 3, 4, 2, 6]).min).toEqual(1)
})

test('[1, 8, 3, 4, 2, 6] average value is 4', () => {
  expect(analyzeArray([1, 8, 3, 4, 2, 6]).average).toEqual(4)
})
