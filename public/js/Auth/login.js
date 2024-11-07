socket.on('connect', function(){
  console.log("connected to socket-login");
  socket.emit('check_accounts');
});
username.onblur = function () {
  if (username.value != "") {
    console.log(username.value);
    label_username.classList.add('filled');
    username.classList.add('filledinput');
  }
  else {
    console.log(username.value);
    label_username.classList.remove('filled');
    username.classList.remove('filledinput');
  }
}

password.onblur = function () {
  if (password.value != "") {
    console.log(password.value);
    label_password.classList.add('filled');
    password.classList.add('filledinput');
  }
  else {
    console.log(password.value);
    label_password.classList.remove('filled');
    password.classList.remove('filledinput');
  }
}