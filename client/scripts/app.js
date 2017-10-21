// YOUR CODE HERE:
var App = function() {
  this.server = 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages';
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
    success: function(data) {
      console.log('chatterbox: Message fetched', data);
      for (var i = 0; i < data.results.length; i ++) {
        app.renderMessage((data.results[i]).username + '     ' + (data.results[i]).text + '     ' + (data.results[i]).createdAt + '<br>');
      }
    },
    error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to fetched message', data);
    }
  });
};

App.prototype.clearMessages = function() {
  $("div").remove("#chats");
  var chatsDiv = $('<div id="chats"></div>');
  $('body').append(chatsDiv);
};

App.prototype.renderMessage = function(message) {
  //WHEN WE WANT TO DEAL WITH XSS "people", we will make conditionals that check the message and only post if they fit criteria
  var msg = $('<div class="child">' + message + '<br></div>');
  //Line below is for implementing rooms later
  //var msg = $('<div class = "'+message.roomName +'">' + message + '</div>');
  
  $('#chats').append(msg);  
};

App.prototype.renderRoom = function() {

};

var app = new App();

