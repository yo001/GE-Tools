/**
 * Returns an array of random non-repeating numbers between the given maximum and minimum (inclusive).
 *
 * @param {number} max - The maximum value of the random numbers.
 * @param {number} [min] - The minimum value of the random numbers.
 * @return {number[]} An array of random non-repeating numbers.
 */
function getRandomNonRepeatingNumbers(max, min = 0) {
  const numbers = []
  for (let i = min; i <= max; i++)
    numbers.push(i)

  const result = []
  for (let i = 0; i < max - min + 1; i++) {
    const randomIndex = Math.floor(Math.random() * numbers.length)
    const randomNumber = numbers.splice(randomIndex, 1)[0]
    result.push(randomNumber)
  }

  return result
}

export default { getRandomNonRepeatingNumbers }
