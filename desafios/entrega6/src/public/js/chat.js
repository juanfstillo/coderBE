const socket = io();
let user;
const chatbox = document.getElementById('chatbox');

Swal.fire({
    title:"Say your name",
    input: "text",
    inputValidator: ( value ) =>{
        return !value && "¡Write a user name to start!"
    },
    allowOutsideClick:false
}).then(result=>{
    user= result.value;
    socket.emit('authenticated',user)
})
chatbox.addEventListener('keyup',evt=>{
    if(evt.key==="Enter"){
        if(chatbox.value.trim().length>0){
            socket.emit('message',{user:user,message:chatbox.value});
            chatbox.value="";
        }
    }
})

socket.on('messageLogs',data=>{
    if(!user) return;
    let log=document.getElementById('messageLogs');
    let messages = "";
    data.forEach(message=>{
        messages += `${message.user} says: ${message.message}<br/>`
    })
    log.innerHTML=messages;
})
