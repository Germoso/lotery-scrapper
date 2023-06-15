function countRepeatedNumbers(arrays) {
  // Unir todos los arreglos en uno solo
  const mergedArray = arrays.flat()

  // Crear un objeto para realizar el conteo de cada número
  const countMap = {}
  for (const number of mergedArray) {
    countMap[number] = (countMap[number] || 0) + 1
  }

  // Ordenar los números por su cantidad de repeticiones de forma descendente
  const sortedNumbers = Object.keys(countMap).sort(
    (a, b) => countMap[b] - countMap[a]
  )

  // Obtener los 10 números más repetidos y la cantidad de repeticiones
  const topNumbers = sortedNumbers.slice(0, 10).map((number) => ({
    number,
    count: countMap[number],
  }))

  return topNumbers
}

module.exports = countRepeatedNumbers
