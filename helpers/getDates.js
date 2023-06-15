const getDates = (days = 5) => {
  // Importar el módulo de fecha
  const moment = require("moment")

  // Obtener la fecha actual
  const currentDate = moment().format("DD-MM-YYYY")

  // Array para almacenar las fechas
  const datesArray = []

  // Agregar la fecha actual al array

  // Obtener las últimas cinco fechas
  for (let i = 1; i <= days; i++) {
    const previousDate = moment().subtract(i, "days").format("DD-MM-YYYY")
    datesArray.push(previousDate)
  }

  return datesArray
}

module.exports = getDates
