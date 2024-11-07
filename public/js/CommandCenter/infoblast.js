var dataSet = [];
var active_button = 'inbox';

socket.on('connect', function () {
    console.log("connected to socket-infoblast: ", window.location.origin);
    socket.emit('get_pending_request');
    socket.emit('get_notif', "inbox");
});
socket.on('reg_nottif_admin', function(){
    socket.emit('get_pending_request');
});

socket.on('result_pending_request', function(data){
  console.log(data.length);
  // notif
  if (data.length > 10) {
    document.getElementById('pending_request').innerHTML = "New 10+";
  }else if(data.length === 0) {
    document.getElementById('pending_request').innerHTML = "";
  }else {
    document.getElementById('pending_request').innerHTML = "New " + data.length;
  }
});

// display notifications in table
socket.on('notif_result', function(data_inbox, data_att, data_trash, button_active){
    var dataSet = [];
    console.log(button_active);
    $('#example').DataTable().destroy();

    $('#inbox').html('<i class="fa fa-inbox mr-2"></i> Inbox (0)');
    $('#attachments').html('<i class="fa fa-paperclip mr-2"></i> Attachments (0)');
    $('#delete').html('<i class="fa fa-trash-o mr-2"></i> Trash (0)');

    switch (button_active) {
      case 'inbox':
        $('#inbox').html('<i class="fa fa-inbox mr-2"></i> Inbox ('+data_inbox.length+')');
        $('#attachments').html('<i class="fa fa-paperclip mr-2"></i> Attachments ('+data_att.length+')');
        $('#delete').html('<i class="fa fa-trash-o mr-2"></i> Trash ('+data_trash.length+')');

        for (var i = 0; i < data_inbox.length; i++) {
        var message;
        if (data_inbox[i].content.length > 40) {
          message = data_inbox[i].content.substring(0,40) + "...";
        }
        else {
           message = data_inbox[i].content;
        }

          if(data_inbox[i].image === null || data_inbox[i].image.replace(/\s/g, "") === ""){
            dataSet[i] = ['<div class="icheck-material-primary my-0"><input id="'+data_inbox[i].id+'" value="'+data_inbox[i].id+'" type="checkbox" class="checkbox" ><label for="'+data_inbox[i].id+'"></label></div>',''+data_inbox[i].title+'','<i class="fa fa-circle text-info mr-2"></i>'+''+message+'','(no attachment)',''+data_inbox[i].date+'','<center><button name="'+data_inbox[i].id+'" class="btn btn-info" value="'+data_inbox[i].id+'" type="submit" id="moredetails" onClick="moreDetails(this.name)">More Details</button></center>'];
          }else {
            dataSet[i] = ['<div class="icheck-material-primary my-0"><input id="'+data_inbox[i].id+'" value="'+data_inbox[i].id+'" type="checkbox" class="checkbox" ><label for="'+data_inbox[i].id+'"></label></div>',''+data_inbox[i].title+'','<i class="fa fa-circle text-info mr-2"></i>'+''+message+'','<i class="fa fa-paperclip"></i>',''+data_inbox[i].date+'','<center><button name="'+data_inbox[i].id+'" class="btn btn-info" value="'+data_inbox[i].id+'" type="submit" id="moredetails" onClick="moreDetails(this.name)">More Details</button></center>'];
          }

        }
        break;
      case 'attachment':
        $('#inbox').html('<i class="fa fa-inbox mr-2"></i> Inbox ('+data_inbox.length+')');
        $('#attachments').html('<i class="fa fa-paperclip mr-2"></i> Attachments ('+data_att.length+')');
        $('#delete').html('<i class="fa fa-trash-o mr-2"></i> Trash ('+data_trash.length+')');
        for (var i = 0; i < data_att.length; i++) {
          var message;
          if (data_att[i].content.length > 40) {
            message = data_att[i].content.substring(0,40) + "...";
          }
          else {
             message = data_att[i].content;
          }

          dataSet[i] = ['<div class="icheck-material-primary my-0"><input id="'+data_att[i].id+'" value="'+data_att[i].id+'" type="checkbox" class="checkbox" ><label for="'+data_att[i].id+'"></label></div>',''+data_att[i].title+'','<i class="fa fa-circle text-info mr-2"></i>'+''+message+'','<i class="fa fa-paperclip"></i>',''+data_att[i].date+'','<center><button name="'+data_att[i].id+'" class="btn btn-info" value="'+data_att[i].id+'" type="submit" id="moredetails" onClick="moreDetails(this.name)">More Details</button></center>'];

        }
        break;
      case 'delete':
        $('#inbox').html('<i class="fa fa-inbox mr-2"></i> Inbox ('+data_inbox.length+')');
        $('#attachments').html('<i class="fa fa-paperclip mr-2"></i> Attachments ('+data_att.length+')');
        $('#delete').html('<i class="fa fa-trash-o mr-2"></i> Trash ('+data_trash.length+')');
        for (var i = 0; i < data_trash.length; i++) {
          var message;
          if (data_trash[i].content.length > 40) {
            message = data_trash[i].content.substring(0,40) + "...";
          }
          else {
             message = data_trash[i].content;
          }

          if(data_trash[i].image === null || data_trash[i].image.replace(/\s/g, "") === ""){
            dataSet[i] = ['<div class="icheck-material-primary my-0"><input id="'+data_trash[i].id+'" value="'+data_trash[i].id+'" type="checkbox" class="checkbox" ><label for="'+data_trash[i].id+'"></label></div>',''+data_trash[i].title+'','<i class="fa fa-circle text-info mr-2"></i>'+''+message+'','(no attachment)',''+data_trash[i].date+'','<center><button name="'+data_trash[i].id+'" class="btn btn-info" value="'+data_trash[i].id+'" type="submit" id="moredetails" onClick="moreDetails(this.name)">More Details</button></center>'];
          }else {
            dataSet[i] = ['<div class="icheck-material-primary my-0"><input id="'+data_trash[i].id+'" value="'+data_trash[i].id+'" type="checkbox" class="checkbox" ><label for="'+data_trash[i].id+'"></label></div>',''+data_trash[i].title+'','<i class="fa fa-circle text-info mr-2"></i>'+''+message+'','<i class="fa fa-paperclip"></i>',''+data_trash[i].date+'','<center><button name="'+data_trash[i].id+'" class="btn btn-info" value="'+data_trash[i].id+'" type="submit" id="moredetails" onClick="moreDetails(this.name)">More Details</button></center>'];
          }

        }
        break;
      default:

    }

    $('#example').DataTable({
      data: dataSet,
      responsive: true,
      lengthChange: false,
      "ordering": false,
    });

    // check checkbox state
    $('.checkall').on('change', function() {
       $('.checkbox').prop('checked', $(this).prop("checked"));
    });

    $('.checkbox').change(function(){
        if($('.checkbox:checked').length == $('.checkbox').length){
        $('.checkall').prop('checked',true);
        }else{
        $('.checkall').prop('checked',false);
        }
    });


});

socket.on('notif_result_attachment', function(data, button_active){
  switch (button_active) {
    case 'attachment':

      break;
    default:

  }
});

socket.on('notif_result_trash', function(data, button_active){

});


socket.on('get_notif_details', function(data){
    console.log(data[0].image);
    var imgp;
    imgp = data[0].image;
    var modalImg = document.getElementById("imgpath");
    if(imgp !== null){
    imgp = data[0].image.slice(17);
    console.log(imgp);
    modalImg.src =imgp;
    modalImg.style.display='block';
    $('#imgpath').attr('style', 'border: none; width: 300px; height: 300px;');
    }
    else{
    console.log("nuuuull");
    modalImg.src ='/img/image_not_available.png';
    modalImg.style.display='block';
    $('#imgpath').attr('style', 'width: 300px; height: 300px; border: 1px solid');
    }

    document.getElementById('infotitle').textContent ="Title : "+data[0].title;
    document.getElementById('infodate').textContent = "Date :   "+data[0].date;
    document.getElementById('infocontent').textContent = data[0].content;

    $('#infomodal').modal('show');
});



$('#trash').on('click', function(){
  console.log(active_button);
  if (active_button === "inbox") {
    var checkedBoxes = $('.checkbox:checked').map((i, el) => el.value).get();
    console.log(checkedBoxes);
    socket.emit('notif_trash', checkedBoxes);
    socket.emit('get_notif', active_button);
    $('.checkall').prop('checked',false);
  }else if (active_button === "attachment") {
    var checkedBoxes = $('.checkbox:checked').map((i, el) => el.value).get();
    console.log(checkedBoxes);
    socket.emit('notif_trash', checkedBoxes);
    socket.emit('get_notif', active_button);
    $('.checkall').prop('checked',false);
  }else if (active_button === "delete") {
    var checkedBoxes = $('.checkbox:checked').map((i, el) => el.value).get();
    console.log(checkedBoxes);
    socket.emit('notif_delete', checkedBoxes);
    socket.emit('get_notif', active_button);
    $('.checkall').prop('checked',false);
  }
});

$('#restore').on('click', function(){
  if (active_button === 'delete') {
    var checkedBoxes = $('.checkbox:checked').map((i, el) => el.value).get();
    socket.emit('restore_trash_notif', checkedBoxes);
    socket.emit('get_notif', active_button);
    $('.checkall').prop('checked',false);
  }else {
    console.log(active_button);
  }
});

$('#compose').on('click', function(){
  $('.checkall').prop('checked',false);
  $('#announcements-div').attr('class', 'no-display');
  $('#compose-message-div').attr('class', 'add-display');
  $('#inbox').attr('class', 'list-group-item');
  $('#attachments').attr('class', 'list-group-item');
  $('#delete').attr('class', 'list-group-item');
  $('#breadcrumb').html("Compose Message");
  $('input[type="file"]').ezdz();
});

$('#inbox').on('click', function(){
  $('.checkall').prop('checked',false);
  active_button = "inbox";
  $('#announcements-div').attr('class', 'add-display');
  $('#compose-message-div').attr('class', 'no-display');
  $('#inbox').attr('class', 'active list-group-item');
  $('#attachments').attr('class', 'list-group-item');
  $('#delete').attr('class', 'list-group-item');
  $('#breadcrumb').html("Inbox");
  socket.emit('get_notif', active_button);
});

$('#attachments').on('click', function(){
  $('.checkall').prop('checked',false);
  active_button = "attachment";
  $('#announcements-div').attr('class', 'add-display');
  $('#compose-message-div').attr('class', 'no-display');
  $('#inbox').attr('class', 'list-group-item');
  $('#attachments').attr('class', 'active list-group-item');
  $('#delete').attr('class', 'list-group-item');
  $('#breadcrumb').html("Attachments");
  socket.emit('get_notif', active_button);
});

$('#delete').on('click', function(){
  $('.checkall').prop('checked',false);
  active_button = "delete";
  $('#announcements-div').attr('class', 'add-display');
  $('#compose-message-div').attr('class', 'no-display');
  $('#inbox').attr('class', 'list-group-item');
  $('#attachments').attr('class', 'list-group-item');
  $('#delete').attr('class', 'active list-group-item');
  $('#breadcrumb').html("Trash");
  socket.emit('get_notif', active_button);
});

function clearInfo(){
  document.getElementById("infoTitle").value = "";
  document.getElementById("infoContent").value = "";

  $('#ezdz-div').html("");
  var htmls = '<div class="col-lg-4"></div>' +
              '<div class="col-lg-4">'+
                '<input type="file" id = "file"  name = "file">'+
                '<iframe style="display: none;" name = "iframe"></iframe>'+
              '</div>';
  $('#ezdz-div').append(htmls);
  $('input[type="file"]').ezdz();

}

function sendInfo(){
  var info;
  var x = document.getElementById("file").value;
  var filename = x.split(/(\\|\/)/g).pop();

  var imgUrl = window.location.origin + "/img/" + filename;
  var title = document.getElementById("infoTitle").value;
  var content = document.getElementById("infoContent").value;

    console.log("imgUrl: ",imgUrl);
    if (imgUrl === window.location.origin + "/img/") {

     info = {
          image : null,
          title : title,
          content : content,
          filter: ""
      };
    }
    else {
     info = {
          image : imgUrl,
          title : title,
          content : content,
          filter: ""
      };
    }

    console.log(info);
    socket.emit("send_notification", info);

    if (imgUrl === window.location.origin + "/img/") {
      swal({
      title: "Announcement Sent!",
      icon: "success",
      button: "Ok",
      timer: 2000,
      });

      document.getElementById("infoTitle").value = "";
      document.getElementById("infoContent").value = "";
      socket.emit('get_notif', "inbox");
    }

}
function uploadedfile(data){
  if (data != "") {
    swal({
    title: data,
    icon: "success",
    button: "Ok",
    timer: 2000,
    });

    document.getElementById("infoTitle").value = "";
    document.getElementById("infoContent").value = "";

    console.log(data);
    $('#ezdz-div').html("");
    var htmls = '<div class="col-lg-4"></div>' +
                '<div class="col-lg-4">'+
                  '<input type="file" id = "file"  name = "file">'+
                  '<iframe style="display: none;" name = "iframe"></iframe>'+
                '</div>';
    $('#ezdz-div').append(htmls);
    $('input[type="file"]').ezdz();

    socket.emit('get_notif', "inbox");
  }

}

function moreDetails(data){
  console.log(data);
  socket.emit('notif_details', data);
}


$('#confirm').keyup(function(){
        var pass1 = document.forms["cp"]["New_Password"].value;
        var pass2 = document.forms["cp"]["Confirm_Pass"].value;
        console.log(pass1);
        console.log(pass2);
        if(pass2 != ""){
          if(pass2 != pass1){
            $('#error_pass').html("<p style='color:red'><i class='fa fa-times-circle fa-fw'></i> Password not match</p>");
            $("#savebtn").removeAttr('disabled');
            $("#savebtn").attr('disabled', true);
        }
        else{
            $('#error_pass').html("<p style='color:green'><i class='fa fa-check-circle fa-fw'></i> Password match</p>");
            $("#savebtn").removeAttr('disabled');
        }
      }
      else {
        $('#error_pass').html("");
      }
});
$('#newpass').keyup(function(){
        var pass1 = document.forms["cp"]["New_Password"].value;
        var pass2 = document.forms["cp"]["Confirm_Pass"].value;
        console.log(pass1);
        console.log(pass2);
        if(pass1 != "" && pass2 != ""){
          if(pass1 != pass2){
            $('#error_pass').html("<p style='color:red'><i class='fa fa-times-circle fa-fw'></i> Password not match</p>");
            $("#savebtn").removeAttr('disabled');
            $("#savebtn").attr('disabled', true);
        }
        else{
            $('#error_pass').html("<p style='color:green'><i class='fa fa-check-circle fa-fw'></i> Password match</p>");
            $("#savebtn").removeAttr('disabled');
          }
        }
        else {
            $('#error_pass').html("");
              document.forms["cp"]["Confirm_Pass"].value = "";
       }
});
