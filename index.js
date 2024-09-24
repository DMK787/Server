const http = require("http")
const port = 8080
const fs = require("fs")
const express = require('express')
const app = express()
const path = require("path")
const bodyParser = require('body-parser')
const users = require("./public/users.js")
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const expressServer = app.get("/app.html")

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})

const io = require("socket.io")(expressServer, {
    cors: {
        origin: "*"
    }
})

io.on("connection", (socket) => {
    console.log('a user connected')

    socket.on('message', (message) => {
        console.log(message)
        io.emit('message', "someone said ${message}")
    })
})



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
})

app.post("/", (req, res) => {
    console.log(req.body)
    users.append(req.body)
    console.log(users.data)
    fs.writeFileSync("./public/users.js", "let data = " + JSON.stringify(users.data) + " \n function append(user) {data.users.push(user)}; module.exports = {append, data}")
})

