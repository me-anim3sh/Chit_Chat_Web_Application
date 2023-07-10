
const socket = io()
let name
let textArea = document.querySelector("#textarea")
let messageArea = document.querySelector(".message_area")

do {
    name = prompt("Please enter your name: ")
}while(!name)

//for sending message 

textArea.addEventListener("keyup", (e) => {
    if(e.key === "Enter") {
        sendMessage(e.target.value)
    }
})

//sending message logic

function sendMessage(messages) {
    let msg = {
        user: name,
        message: messages.trim()
    }

    //Append message

    appendMessage(msg, "outgoing")

    textArea.value = ""
    scrollToBottom()

    // Send to server

    socket.emit("mess", msg)



}

//appending message logic

function appendMessage(msg, type) {
    let mainDiv = document.createElement("div")
    let className = type
    mainDiv.classList.add(className, "message")

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>   
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)

}

//Recive messages (client - code)

socket.on("message1", (msg) => {
    appendMessage(msg, "incoming")
    scrollToBottom()
})

// to scroll message pannel automatically 

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}