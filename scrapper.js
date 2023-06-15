const puppeteer = require("puppeteer")
const fs = require("fs")
const getDates = require("./helpers/getDates")
const countRepeatedNumbers = require("./helpers/countRepetedNumbers")

let url = "https://loteriasdominicanas.com/?date="

;(async () => {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  await page.setDefaultNavigationTimeout(120000)

  const dates = getDates()
  const totalNumbers = []

  for (const date of dates) {
    console.log(date)
    await page.goto(url + date)

    const numbers = await page.$$eval(".game-info .game-title", (elements) => {
      const superKinoTVElement = elements.find((element) =>
        element.textContent.includes("Super Kino TV")
      )

      superKinoTVElement && console.log("HOLAA")

      const gameScoresElement =
        superKinoTVElement.parentNode.parentNode.parentNode.parentNode
          .nextSibling.nextSibling

      console.log(gameScoresElement)

      if (!gameScoresElement) {
        return [] // Retorna un array vacío si el elemento no existe
      }
      return Array.from(gameScoresElement.querySelectorAll(".score")).map(
        (scoreElement) => scoreElement.textContent.trim()
      )
    })
    console.log("NUMEROS")
    console.log(numbers)
    totalNumbers.push(numbers)
  }
  console.log("FINISH")
  console.log(totalNumbers)
  console.log(countRepeatedNumbers(totalNumbers))
})()
