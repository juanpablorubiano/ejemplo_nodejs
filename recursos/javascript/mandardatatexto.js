var socket = io();
var proyectoNAME, usuario;
socket.on("archivotexto", function (archivotexto) {
	$("#archivo").val(archivotexto)
})
socket.on("nombre", function (nombre) {
	if (!usuario) 
		{
			usuario = nombre.substring(6)
			console.log(usuario)
		}
})
socket.on("proyecto", function(proyecto) {
	if(!proyectoNAME)
	{
		proyectoNAME = proyecto;
	}
})
socket.on("path", function (ruta) {
		$("#path").val(ruta)
})
socket.on("textoall", function (textopry) {
	if(textopry.proyecto == proyectoNAME)
	{
		nombre(textopry.nombre)
		$("#archivo").val(textopry.texto)
	};
})
$("document").ready(function()  {
	$("#archivo").keyup(function () {
		var data = 
	{
		texto: $("#archivo").val(),
		proyecto: proyectoNAME,
		nombre: usuario
	}	
	socket.emit("textoproyecto", data)
});
})
function nombre(nombre) {
	$("#editadopor").css("display", "block")
	$("#editadopor").html("Editado por:<br>"+ nombre)
}