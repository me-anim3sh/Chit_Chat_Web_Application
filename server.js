const express = require("express") // for server

const app = express()
const http = require("http").createServer(app)

const PORT = process.env.PORT || 3000

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})


//for route

app.use(express.static(__dirname + "/public")) // for accessing static files.

app.get('/', (request, response) => {
    response.sendFile(__dirname + "/index.html")
})

//Socket

const io = require("socket.io")(http)

io.on("connection", (socket) => {
    console.log("connected.....!")
    socket.on("mess", (msg) => {   //listen event on server
        socket.broadcast.emit("message1", msg)  //send message to all client except sender
    })
})