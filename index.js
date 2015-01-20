var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var game = require('./game.js');
var firstgame=new game.Game('yo');
app.get('/', function(req, res){
  res.sendfile('index.html');
});

var cards=['7','8','9','10','J','Q','K','A'];
var suits=['C','D','H','S'];
var deck=[];
var games={};

for (var i=0;i<cards.length;i++)
   for (var j=0;j<suits.length;j++)
     deck.push(cards[i]+suits[j]);
var players={};
io.on('connection', function(socket){
  players[socket.id]=true;
  console.log(socket.id+ ' user connected');
  
  
  socket.on('disconnect', function(){
  delete players[socket.id];
  console.log('user disconnected');
  });
  
  socket.on('chat message', function(msg){
    console.log(players);
    io.emit('chat message', msg);
    
  });
  
  socket.on('create game', function(name){
    if (name in games) socket.broadcast.to(socket.id).emit('game exists');
    io.emit('game created', name);
    
  });
  
  
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});