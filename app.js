const http = require("http")
const port = 2000
const fs = require("fs")

const server = http.createServer(function(req, res) {
    var data = fs.readFileSync("Package.txt", "utf-8")
    res.write(data)

    res.end()
})

server.listen(port, function(error) {
    if (error) {
        console.log("Something went wrong...")
    } else {
        console.log("Server is running on port " + port)
    }
})