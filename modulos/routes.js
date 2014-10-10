var express = require('express'),
	 router = express.Router(),
	index = require("../index");
var key;
//---------------HTML---------------------------------
router.get ('/', function (req, res) {
  	res.sendfile ('./recursos/pages/index.html');
});
router.get ('/nombre', function (req, res) {
  	res.sendfile ('./recursos/pages/nombre.html');
});
router.get ('/editor', function (req, res) {
  	res.sendfile ('./recursos/pages/editor.html');
});
//-------------SCRIPTS--------------------------------

router.get ('/jquery.js', function (req, res) {
  	res.sendfile ('./recursos/javascript/jquery.js');
});
router.get ('/controlusuario.js', function (req, res) {
  	res.sendfile ('./recursos/javascript/controlusuario.js');
});
router.get ('/mandardatatexto.js', function (req, res) {
  	res.sendfile ('./recursos/javascript/mandardatatexto.js');
});
//-----------------------CSS--------------------------
router.get('/css.css', function (req, res) {
	res.sendfile ('./recursos/stylesheet/css.css');
});


//--------------------POST-*-----------------------
router.post('/nuevoproyecto', function (req, res) {	
	req.setEncoding("utf8");
	req.addListener("data", function (datos) {
		index.nuevoproyecto(datos, res)
	})
	req.addListener('end', function () {
	})
})
router.post('/inises',function (req, res) {
	req.addListener("data", function (datos) {
		index.inises(datos, res);
	})
	req.addListener('end', function () {
	})	
})
router.post('/guardararchivo',function (req, res) {
	req.addListener("data", function (datos) {
		index.guardararchivo(datos, res);
	})
	req.addListener('end', function () {
	})	
})
exports.router = router;

