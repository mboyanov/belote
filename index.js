var express=require('express');
var app = express();
app.use(express.static(__dirname));
var http = require('http').Server(app);
var io = require('socket.io')(http);
var game = require('./game.js');

var firstgame=new game.Game('yo');





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
  io.emit('games updated', games);
  
  socket.on('disconnect', function(){
  delete players[socket.id];
  console.log('user disconnected');
  });
  
  socket.on('chat message', function(msg){
    
    io.emit('chat message', msg);
    
  });
  
  socket.on('create game', function(name){
    console.log("Creating game " + name);
    if (name in games) {
      console.log("game exists");
      io.to(socket.id).emit('game exists');
    }
    else {
      games[name]=new game.Game(name);
      io.emit('games updated', games);
      socket.join(name);
      io.to(name).emit("chat message",'you have joined '+name);
    }
   
    
  });
  
  
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});