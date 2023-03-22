const express = require('express');
const morgan = require('morgan');
const SocketIo = require('socket.io');
const cors = require('cors');
const path = require('path');

const dotenv = require('dotenv');
dotenv.config();

const app = express();
//Midldlewares && Config
app.set('port',process.env.PORT || 8005);
/* app.use(cors()); */
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname,'..','client','build')))

//Rutas
/* app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "../client/build/index.html"));
  }); */


//Iniciamos el servidor

const server = app.listen(app.get('port'),()=>{
    console.log("Corriendo en el puerto: ", app.get('port'));
})

//Iniciamos SocketIo

const io = SocketIo(server,{
    cors:{
        /* origin:'*' */
    }
});

io.on('connection',(socket)=>{
    console.log("Se conectó: "+socket.id);
    socket.on('message',(data)=>{
        socket.broadcast.emit('message',{
            body:data.body,
            from:data.from
        });
    })
})