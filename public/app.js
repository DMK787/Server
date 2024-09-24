const socket = io('ws//server-production-6104.up.railway.app')

socket.on("message", text => {
    const element = document.createElement('li');
    element.innerHTML = text;
    document.getElementById('chatlist').appendChild(element)
});

document.getElementById("send").addEventListener("click", function () {
    const text = document.getElementById("input").value
    socket.emit("message", text)
})