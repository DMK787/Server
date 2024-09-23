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
            fs.writeFileSync('Package.txt', "")
            let split = data.split("☠")
            var writestream = fs.WriteStream("Package.txt", {
                flags: "a"
            })
            for (i in split) {
                writestream.write(split[i] + "\n")
            }
            res.end("recieved data.")
        }
        else {
            console.log("No recieved data")
        }
    })
    res.write(fs.readFileSync("Package.txt"))
    res.end()
})

server.listen(port, function(error) {
    if (error) {
        console.log("Something went wrong...")
    } else {
        console.log("Server is running on port " + port)
    }

})
