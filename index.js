const http = require("http")
const port = 8080
const fs = require("fs")

const server = http.createServer(function(req, res) {
    let data = ""
    req.on("data", chunk => {
        data +=chunk.toString()
    })
    req.on('end', () => {
        if (data.length>0) {
            console.log(data)
            res.end("recieved data.")
        }
        else {
            console.log("No recieved data")
        }
    })
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.write(fs.readFileSync("login.html"))
    res.end()
})

server.listen(port, function(error) {
    if (error) {
        console.log("Something went wrong...")
    } else {
        console.log("Server is running on port " + port)
    }

})
