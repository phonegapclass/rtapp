//ringtoneapp
$(function(){
	document.addEventListener("deviceready",function(){
		
		getAudios();//Cargar Audios al iniciar
		
		var audio = document.getElementById('Reproductor');
		$('#prueba div[data-role=header]').tap(function(){//detectar Cerrado de Ventana de pruebas
			audio.pause();
		});
		
		$('#page li').tap(function(){//detectar Apertura de Ventana de Pruebas
			src = $(this).attr('rel');
			$('#prueba').attr('audio',src);
			audio.src = src;
			audio.play();
		});
		
		$('#down').tap(function(){//detectar tap en descargar
			downloadFile($('#prueba').attr('audio'));
		});
		
	},false);
});
//Obtener Audios en Ajax
function getAudios(){
	$.ajax({
		type: "POST",
		url: "http://igitsoft.com/carlos/apps/ringtonesPlatform/servApp.php",
		data: "pet=1"
	}).done(function(data) {
		rings = JSON.parse(data);
		for(var i in rings){
			var li = '<li rel="'+rings[i].ruta+'><a href="#prueba" data-rel="dialog" data-transition="slidedown">'+rings[i].nombre+'</a></li>';
			$('#page ul').append(li);
		}
	});
}

//Descargar Archivos
function downloadFile(audio){
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
		var fileTransfer = new FileTransfer();
		fileTransfer.download(audio,fileSystem.root.fullPath+'/ringtoneApp/'+nom+'.mp3',function(entry){//Verificar que no exista el nombre de la carpeta
			navigator.notification.alert("Archivo Descargado", null, "Completado", "OK");
		},function(error) {
			navigator.notification.alert("Código de error " + error.code, null, "Error", "Aceptar");
		});
	}, null);
}