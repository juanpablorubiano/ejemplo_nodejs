var app = require('express')(),
	express = require('express'),
	http = require('http').Server(app),
	io = require('socket.io')(http),
	rutas = require('./modulos/routes'),
	MongoClient = require('mongodb').MongoClient, 
 	format = require('util').format,
 	fs = require('fs');

var data, proyecto, pass, path, llave, puntero1, puntero2, nombre, proytxt, archivotexto;

function nuevoproyecto(datos, res) {
	puntero1 = datos.indexOf('&');
	proyecto = datos.substring(15, puntero1)
	var resto = datos.substring(puntero1 + 1);
	if (proyecto) {
		puntero1 = 5;
		pass = resto.substring(puntero1);
		resto = datos.substring(puntero1 + 1);
	};
	llave = {proyecto:proyecto}
	data = 
	{
		proyecto: proyecto,
		pass: pass,
        path:  proyecto + ".txt"
	}

	 MongoClient.connect('mongodb://127.0.0.1:27017/usuarios', function(err, db) {
    if(err) throw err;
    var collection = db.collection('info');
    	collection.find().toArray(function (err, results) {
        collection.count(llave, function (err, count) {
        	if (!count) {
        		collection.insert(data, function (err, docs) {
        			if(err) throw err;
    				fs.writeFile("./archivos/" + data.path, "inicio", function(err) {if( err ){console.log(err)}else{console.log("archivo guardado")}});
    				inises(datos, res)
        			db.close();
        		})
        	} else {
        			res.redirect("/no");
        			db.close();
        		}
 			});

        });
    });
}



function inises(datos, res) {
	console.log(datos.toString())
	puntero1 = datos.toString().indexOf('&');
	proyecto = datos.toString().substring(15, puntero1)
	console.log(proyecto + " -- " + pass)
	var resto = datos.toString().substring(puntero1 + 1);
	if (proyecto) {
		puntero1 = 5;
		puntero2 = resto.indexOf('&');
		pass = resto.substring(puntero1, puntero2);
		resto = resto.substring(puntero1 + 1);
	};
	if (pass && resto) {
		nombre = resto.substring(10);
	};
	data = {proyecto: proyecto,pass: pass}
	 MongoClient.connect('mongodb://127.0.0.1:27017/usuarios', function(err, db) {
    if(err) throw err;
    var collection = db.collection('info');
    	collection.find(data).nextObject(function(err, results) {
    		collection.count(function(err, cuenta) {
    			console.log(cuenta)
    			if(cuenta > 0)
    			{
    				path = proyecto + ".txt";
        			res.redirect("/editor")
    				fs.readFile ("./archivos/" + path,  function(err, datos)  { 
  						if  (err)  throw err ; 
  						archivotexto = datos.toString();
  						console.log(archivotexto); 
					});
    			}
    		})
        });
    });
}
	var ruta,info;
function guardararchivo (data) {
	var datos = data.toString();
	console.log(datos)
	puntero1 = 5;
	puntero2 = datos.indexOf("&")
	ruta = datos.substring(puntero1, puntero2)
	if(ruta)
	{
		info = datos.substring(puntero2 + 9)
	}
	fs.writeFile("./archivos/" + ruta, info, function(err) {
    if( err ){
        console.log(err);
    }
    });
}
io.on('connection', function(socket){
	console.log("conectado")
		io.emit	("nombre", nombre)
		io.emit("archivotexto", archivotexto)
		io.emit ("proyecto", proyecto)
		io.emit ("path", path)
		console.log(path)
		socket.on("textoproyecto", function(textoproyecto) {
			io.emit("textoall", textoproyecto)
		})
		
	});


http.listen(8000, function() {
	console.log("listo en puerto 8000")
});


app.use('/', rutas.router);
exports.nuevoproyecto = nuevoproyecto;
exports.inises = inises;
exports.guardararchivo = guardararchivo;







