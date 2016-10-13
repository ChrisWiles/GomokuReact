let app = require('express')()
let express = require('express')
let http = require('http').Server(app)
let io = require('socket.io')(http)
let browserify = require('browserify-middleware')
let path = require('path')
let assetFolder = path.join(__dirname, '..', 'client','public')



//---  socket.io is listening for queues triggered by ----//
//---  players, then emits information to both     ----//
io.on('connection', function(socket){
  console.log('a user connected')
  socket.on('player move', gameData => {
    io.emit('player move', gameData)
  })
  socket.on('player ready', gameData => {
    io.emit('player ready', gameData)
  })
  socket.on('player won', gameData => {
    io.emit('player won', gameData)
  })
})


// Serve Static Assets
app.use(express.static(assetFolder))

// Serve JS Assets
app.get('/app-bundle.js',
 browserify('./client/index.js', {
    transform: [ [ require('babelify'), { presets: ['es2015', 'react'] } ] ]
  })
)

// Wild card route for client side routing.
app.get('/*', function(req, res){
  res.sendFile( assetFolder + '/index.html' )
})

// Start server
let port = process.env.PORT || 4000
http.listen(port)
console.log("Listening on localhost:" + port)
