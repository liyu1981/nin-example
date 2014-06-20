$(function () {
  var t = $('#time');
  setInterval(function() { t.html((new Date()).toString()); });

  var wsscreen = $('#wsscreen');
  var socket = window.socket = new WebSocket('ws://' + location.host);
  socket.onopen = function() {
    wsscreen.prepend('websocket connected.<br>');
  };
  socket.onmessage = function(evt) {
    wsscreen.prepend('' + evt.data + '<br>');
  };
  socket.onclose = function() {
    wsscreen.prepend('websocket disconnected.<br>');
  };

  var idbar = $('#idbar').val('user' + Math.floor((Math.random() * 100) + 1));

  var inputbar = $('#inputbar');
  $('#sendbtn').click(function() {
    var t = inputbar.val().trim();
    var n = idbar.val().trim();
    if (t.length > 0) {
      if (t === "stop") {
        window.socket.close();
      } else {
        window.socket.send(n + ' said: ' + t);
      }
    }
  });
});

