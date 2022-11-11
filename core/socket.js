const server = require('./server');
const { Server } = require("socket.io");
const io = new Server(server);

const { parseCookie } = require('../helpers/utils');

let Socket = null;
// Socket events
io.on('connection', (_socket) => {
  Socket = _socket;
    console.log('-------------------------------------------------------------------------------------------------------------');
    console.log('a user connected socket ', _socket.id );
    console.log('a user connected socket client.request.headers ', _socket.client.request.headers );
    console.log('a user connected socket client.request.headers cookie ', parseCookie(_socket.client.request.headers.cookie) );
  
    _socket.on('disconnect', () => {
      console.log('******************************* a user disconnected socket ' );
      console.log(' socket id ', _socket.id );
    });
  
})

function on( pEvent, pFun )
{
  Socket.on( pEvent, pFun );
}

function emit( pEvent, ...pArgs )
{
  Socket.emit( pEvent, ...pArgs );
}

module.exports = {
  on, emit
};
  