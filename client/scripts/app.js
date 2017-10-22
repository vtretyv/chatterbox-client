// YOUR CODE HERE:
var App = function() {
  this.server = 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages';
  this.rooms = [];
};

App.prototype.init = function() {

};

App.prototype.send = function(message) {
  $.ajax({
    url: this.server,
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function(data) {
      console.log('chatterbox: Message sent', data);
    },
    error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

App.prototype.fetch = function() {
  //debugger;
  $.ajax({
    url: this.server,
    type: 'GET',
    contentType: 'application/json',
    //data: "where=" data.results
    data: {"order": "-createdAt"}, //$order('createdAt'),
    success: function(data) {
      console.log('chatterbox: Message fetched', data);
      //console.log(data.results.length);
      for (var i = 0; i < data.results.length; i ++) {
        // console.log('i:', i);
        //debugger;
        // var message = (data.results[i]).username + '     ' + (data.results[i].text) + '     ' + (data.results[i].roomname) + '     ' + (data.results[i]).createdAt;
        //console.log(i);
        //console.log("old message",message);
        app.renderMessage(data.results[i],i);
        if (!app.rooms.includes(data.results[i].roomname)) {
          app.rooms.push(data.results[i].roomname);
          app.renderRoom(data.results[i].roomname);
        }
        // // This is where we will have to append the messages to the rendered rooms, then hide them for later button functions.
        // app.addToRoom(data.results[i].roomname, message);
      }
    },
    error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to fetched message', data);
    }
  });
};


App.prototype.addToRoom = function (roomName, message) {
  var chatDiv = $('<div>' + message + '</div>');
  var idRoomName = '#'+roomName;
  $(idRoomName).append(chatDiv);
  $(idRoomName).hide();
};

App.prototype.clearMessages = function() {
  $("div").remove("#chats");
  var chatsDiv = $('<div id="chats"></div>');
  $('body').append(chatsDiv);
};

App.prototype.renderMessage = function(message, childNumber) {
  //WHEN WE WANT TO DEAL WITH XSS "people", we will make conditionals that check the message and only post if they fit criteria
  // message = $(message).text();
  console.log("childNumber:", childNumber);
  var msg = $('<div class="child' + String(childNumber) + '">' + ' Username: ' +  _.escape(message.username) + "text: " + _.escape(message.text) + "roomname: " + _.escape(message.roomname) + '<br></div>');
  // message = data.results[i]).username + '     ' + (data.results[i]).text + '     ' + (data.results[i]).createdAt 
  //Line below is for implementing rooms later
  //var msg = $('<div class = "'+message.roomName +'">' + message + '</div>');
  $('#chats').append(msg);
  // message = message.split('&').join('');
  // message = message.split('<').join('');
  // message = message.split('>').join('');
  // message = message.split('"').join('');
  // message = message.split("'").join('');
  // message = message.split('/').join('');
  // message = message.split('#').join('');
  // message = message.split('?').join('');
  // console.log("message AFTER:", message);
  // //console.log("message after splits and joins", message);
  $('.child' + String(childNumber)).text(message.text);  
  
  //Reversion Code
  // var msg = $('<div class="child">' + message + '<br></div>');
  // // message = data.results[i]).username + '     ' + (data.results[i]).text + '     ' + (data.results[i]).createdAt 
  // //Line below is for implementing rooms later
  // //var msg = $('<div class = "'+message.roomName +'">' + message + '</div>');
  // $('#chats').append(msg);

  // var msg = $('<div class="child" id = "' + user +'">'+'<br></div>');
  
  // //Line below is for implementing rooms later
  // //var msg = $('<div class = "'+message.roomName +'">' + message + '</div>');
  
  // $('#chats').append(msg);  
  // $('#' + user).text(message);
};

App.prototype.renderRoom = function(roomName) {
  var roomsDiv = $('<div id="' + _.escape(roomName) + '"></div>');
  $('#roomSelect').append(roomsDiv);
};

$(document).ready(function() {

});

function chatFilter(showID) {
  console.log('showID:', showID);
    console.log($('#roomSelect').children().length, "children length")
      $('#chats').hide();
  for (var i = 0; i < $('#roomSelect').children().length; i ++) {
        //console.log($('#roomSelect').children()[i], "cur Child");
    if ($('#roomSelect').children()[i].id === showID){
      // console.log("in the newest for");
      //console.log("style:",$('#roomSelect').children()[i].style);
      console.log("roomselect children @ i:", i , ' ' , $('#roomSelect').children()[i]);
      $('#roomSelect').children()[i].style.display = 'block';
    }
  }
}


function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
  for (var i = 0; i < app.rooms.length; i++) {
    if ((app.rooms[i] !== undefined) && (app.rooms[i] !== null)) {
      if ($('#myDropdown').children().length < app.rooms.length) {
      //if (!($('#myDropdown').children().includes(app.rooms[i]))) {
        // console.log('dropDown length:', $('#myDropdown').children().length);
        // console.log('approoms length:', app.rooms.length);
        let x = document.createElement('Button');
        x.innerText = app.rooms[i];
        $('#myDropdown').append(x);
        console.log(x.innerText);
        let text = x.innerText;
        x.onclick = function() {
          console.log(text);
          chatFilter(text);
        };
      }
    }
  }
}

$('input:Button').click(function() {
  chatFilter($(this).attr('id'));
});

$(document).ready(function() {
  
});
var app = new App();

