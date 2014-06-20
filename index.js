var rask = require('rask');
rask
  .server({
    enableWebSocket: true,
    enableSession: false,
    serveStatic: true
  })
  .route(function(server) {
    server.get('/hello', function(req, res, next) {
      res.send(200, 'world');
    });
  })
  .wsRoute(function(wsServer) {
    var all = [];
    wsServer.on('connection', function(ws) {
      all.forEach(function(w) { w.send('someone popin.'); });
      all.push(ws);
      ws.on('message', function(message) {
        all.forEach(function(w) { w.send(message); });
      });
      ws.on('close', function() {
        all.splice(all.indexOf(ws), 1);
        all.forEach(function(w) { w.send('someone left.'); });
      });
    });
  })
  .start();

