const chatMessages=document.querySelector('.chat-messages');
const chatForm=document.getElementById('chat-form');

//Get username and room from URl
const {username,room}=Qs.parse(location.search,{
ignoreQueryPrefix:true
});
//console.log(username,room);

const socket=io();
//join chatroom
socket.emit('joinRoom',{username,room});
//Get room and users
socket.on('roomUsers',({room,users})=>{
outputRoomName(room);
outputUsers(users);
});

//message from server
socket.on('message',message=>{
    console.log(message);
    outputMessage(message);

    //scroll down
    chatMessages.scrollTop=chatMessages.scrollHeight;
});
//message submit
chatForm.addEventListener('submit',(e)=>{
e.preventDefault();
//get message text
const message=e.target.elements.msg.value;
//Emit message to server
socket.emit('chatMessage',message);
//clear input
e.target.elements.msg.value='';
e.target.elements.msg.focus();
});

//output message to DOM
function  outputMessage(message){
const div=document.createElement('div');
div.classList.add('message');
div.innerHTML=`<p class="meta">${message.username} <span>${message.time}</span></p>
<p class="text">
    ${message.text}
</p>`;

chatMessages.appendChild(div);
}
//output Room name in DOM
function outputRoomName(room){
const roomDom=document.getElementById('room-name');
roomDom.textContent=room;
}
//output users names in DOM
function outputUsers(users){
    console.log(users);
const usersContainer=document.getElementById('users');
/* let usersInDom=``;
users.forEach(user => {
    usersInDom+=` <li>${user.username}</li>`
});
console.log(usersInDom);
usersContainer.innerHTML=usersInDom; */
usersContainer.innerHTML=`${users.map(user=>`<li>${user.username}</li>`).join('')}`;
console.log(users.map(user=>`<li>${user.username}</li>`).join(''));
}