// Importar las dependencias necesarias
const { spawn } = require("child_process")
const cors = require("cors")
const fs = require("fs")
const bodyParser = require("body-parser")
const { io, app, server } = require("./io")

// Crear la aplicación express
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Configurar la ruta de la carpeta página web

// Crear el servidor HTTP con la aplicación express

io.on("connection", (socket) => {
  io.emit("message", "Conected...")
  console.log("Un cliente se ha conectado")
})

// Ruta para iniciar la ejecución del script
app.post("/scrapper", (req, res) => {
  console.log("EXECUTING SCRApper")
  const { url } = req.query
  // Crear un nuevo proceso para ejecutar el script
  const scriptProcess = spawn("node", ["scrapper.js", url])
  // Escuchar el evento de salida estándar del proceso
  scriptProcess.stdout.on("data", (data) => {
    console.log(data.toString())
    // Enviar los datos al cliente mediante el WebSocket
    io.emit("message", data.toString())
  })
  // Escuchar el evento de salida de error del proceso
  scriptProcess.stderr.on("data", (data) => {
    // Enviar los datos al cliente mediante el WebSocket
    io.emit("message", data.toString())
  })
  // Escuchar el evento de finalización del proceso
  scriptProcess.on("exit", (code) => {
    // Enviar un mensaje de finalización al cliente mediante el WebSocket
    io.emit("message", `El script ha finalizado con código ${code}`)
  })
  // Responder al cliente indicando que el proceso se ha iniciado correctamente
  res.send("El script se está ejecutando...")
})

// Iniciar el servidor HTTP
server.listen(4000, (e) => {
  console.log("Servidor iniciado en el puerto 4000")
})

module.exports = { io }
