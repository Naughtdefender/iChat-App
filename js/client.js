const socket = io("http://localhost:8000");
const form = document.getElementById("send-container");
const messageInput = document.getElementById("messageInp");
const messageContainer = document.querySelector(".container");
var audio = new Audio("ding.mp3");



const append = (message, position) => {  
  const messageElement = document.createElement("div");  
  messageElement.innerText = message;  
  messageElement.classList.add("message");  
  messageElement.classList.add(position);  
  messageContainer.append(messageElement);  
  if(position == 'left'){   
    audio.play();  
  }  
};  


// If the form gets submitted, send server the message
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;  // Get the message from the input field
  append(`You: ${message}`, "right");  // Append the message to the container
  socket.emit("send", message);  // Send the message to the server
  messageInput.value = "";  // Clear the input field
});

// Ask new user for his/her name and let the server know
const name = prompt("Enter Your name to join iChat: ");
socket.emit("new-user-joined", name);

socket.on("user-joined", (name) => {
  append(`${name} joined the chat`, "left");
});


// If a new message arrives, append to the container
socket.on("receive", (data) => {
  append(`${data.name}: ${data.message}`, "left");
});

// If a user leaves the chat, append the info to the container
socket.on('left', name => {
  append(`${name} Left the chat`,'left')
})
