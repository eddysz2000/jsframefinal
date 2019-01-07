$(function(){

	var clicks=0;

	//cambiar color de titulo principal
	colorTituloBlanco($('.main-titulo'));

	//llenar elementos en tablero al presionar iniciar
	$('.btn-reinicio').click(function(){
		
  		clicks++;
  		if(clicks==1){
    		var tiempo = 120;
    		$('.btn-reinicio').text('Reiniciar');
    		cargaInicial();
    		startTimer(tiempo, $("#timer"));
    		postJugada();
  		}else{
    		location.reload();
  		}

	});
	
	



	

})


//Animación que cambia el color del título a blanco
function colorTituloBlanco(elemento){
	$(elemento).delay(1000).animate({
		color: '#fff'
	}, 10, function(){
		colorTituloAmarillo(elemento);
	})
}

//Animación que cambia el color del título a amarillo
function colorTituloAmarillo(elemento){
	$(elemento).delay(1000).animate({
		color: '#DCFF0E'
	}, 10, function(){
		colorTituloBlanco(elemento);
	})
}

//funcion para cargar en forma incial la grilla del tablero
function cargaInicial(){
  var columna;
  var i;
  for (i=1; i <= 7; i++) {
    columna = ".col-"+i;
    agregarElemento($(columna), 7);
  }
}

//Funcion que agrega en forma aleatoria los elementos en el tablero con las propiedades drag and drop y sus callbacks
function agregarElemento(columna, espacios){
	var elemento;
	var i;
  for (i = 0; i < espacios; i++) {
    elemento = document.createElement("img");
    $(elemento)
      .attr("src", imagenAletoria())
      .addClass("elemento")
      .draggable({
        grid: [120,90],
        revert: "valid"
      })
      .droppable({
        accept: ".elemento",
        drop: function(event, ui){
          var srcFrom = $(this).attr("src");
          var srcTo = $(ui.draggable).attr("src");
          $(this).attr("src", srcTo);
          $(ui.draggable).attr("src", srcFrom);
          window.setTimeout(postJugada, 500);
          sumarMovimiento();
        }

      })
    $(columna).prepend(elemento);

  }
}

//Función para obtener un número aleatorio en un intervalo
function numeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//Función que indica una ruta de imágen en forma aleatoria
function imagenAletoria(){
  var sources = ['image/1.png', 'image/2.png', 'image/3.png', 'image/4.png'];
  return sources[numeroAleatorio(0,3)]
}