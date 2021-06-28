//=======[ Settings, Imports & Data ]==========================================
var PORT    = 3000;

var express = require('express');
var app     = express();
var mysql   = require('./mysql-connector');

// to parse application/json
app.use(express.json()); 
// to serve static files
app.use(express.static('/home/node/app/static/'));

//var datos=require('./datos.json');
var conexionMysql=require('./mysql-connector');



//=======[ Main module code ]==================================================

app.get('/devices/', function(req, res, next) {

    let SQL='select *from Devices';
    conexionMysql.query(SQL,function(err,respuesta){

        if(err)
        {
            res.send(err).status(400);
            return;
        }   
        res.send(respuesta); 
    });
  
});


app.post('/devices_status/', function(req, res, next) {
 
    let SQL='Update Devices set state=? where id=?';
    conexionMysql.query(SQL,[req.body.state,req.body.id],function(err,respuesta){

        if(err)
        {
            res.send(err).status(400);
            return;
        }
        res.send("Se actualizo correctaente: "+JSON.stringify(respuesta)).status(200);
    });

});

app.post('/new_device/', function(req, res, next) {
 
    let SQL='INSERT INTO Devices(name,description,state,type) VALUES(?,?,?,?)';
    conexionMysql.query(SQL,[req.body.name,req.body.description,req.body.state,req.body.type],function(err,respuesta){

        if(err)
        {
            res.send(err).status(400);
            return;
        }
        res.send("Se registro correctamente: "+JSON.stringify(respuesta)).status(200);
    });

    
});

app.post('/delete_device/', function(req, res, next) {
 
    let SQL='DELETE FROM Devices WHERE id=?';
    conexionMysql.query(SQL,[req.body.id],function(err,respuesta){

        if(err)
        {
            res.send(err).status(400);
            return;
        }
        res.send("Se elimino el device correctamente: "+JSON.stringify(respuesta)).status(200);
    });

    
});



app.listen(PORT, function(req, res) {
    console.log("NodeJS API running correctly ");
});

