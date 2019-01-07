//variables para uso en funciones
var clicks=0;
var movimientos=0;
var puntuacion=0;

//Funcion de carga inicial de la pagina
$(function(){
  //cambiar color de titulo principal
  colorTituloBlanco($('.main-titulo'))

  //carga de linstener para tiempo de juego
  $("body").on('finTiempo', resumenFinal)

  //boton de inicio de juevo
  $('.btn-reinicio').on('click', iniciarJuego)


})

//Evento al presionar el botón iniciar para empezar un juego, o hacer un reload de la página para reiniciarlo
function iniciarJuego(){
  clicks++;
  if(clicks==1){
    var tiempo = 120; //Minutos para el juego
    $('.btn-reinicio').text('Reiniciar');

    //carga de elementos en pantalla
    cargaInicial();

    //inicio del timer
    startTimer(tiempo, $("#timer"));

    //actualizacion de elementos en pantalla
    postJugada();
  }else{
    location.reload();
  }
}

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
      .attr("src", imagenAleatoria())
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
function imagenAleatoria(){
  var sources = ['image/1.png', 'image/2.png', 'image/3.png', 'image/4.png'];
  return sources[numeroAleatorio(0,3)]
}

//Función auxiliar que suma los movimientos del jugador
function sumarMovimiento(){
  movimientos++;
  $('#movimientos-text').text(movimientos);
}

//Función auxiliar que compara si dos elementos Dulce son iguales (checkSrc)
function validaImagen(elemento1, elemento2){
  if ($(elemento1).attr("src")==$(elemento2).attr("src")) {
    return true;
  }else return false;
}

//Función que adiciona los puntos y esconde los elementos en línea (punto)
function puntos(elemento1, elemento2, elemento3){
  puntuacion = puntuacion + 10;
  $("#score-text").text(puntuacion);
  $(elemento1).hide('pulsate', 2000)
  $(elemento2).hide('pulsate', 2000)
  $(elemento3).hide('pulsate', 2000)
}

//Función auxiliar que elimina los elementos escondidos de la estructura del DOM
function eliminarElementos(){
  $("img:hidden").each(function(index){
      $(this).remove()
  })
}

//Función que llena cada columna con los elementos faltantes
function llenarDespuesTurno(){
  var numeroElementos = numeroFalta = 0;
  for (var i = 1; i <= 7; i++) {
    numeroElementos=$(".col-"+i).find("img").length;
    numeroFalta = 7 - numeroElementos;
    agregarElemento($(".col-"+i), numeroFalta);
  }
  window.setTimeout(postJugada, 500)
}

//Función que recorre todo el tablero verificando si hay match de 3 dulces o mas, horizontal y verticalmente
function checkMatch(){
  var elementoCompara;
  var actual;
  var matchIzquierda = false;
  var matchDerecha = false;
  var matchAbajo = false;
  var matchArriba = false;
  for (var col = 1; col <= 7; col++) {
    for (var row = 0; row < 7; row++) {
      matchArriba=matchAbajo=matchDerecha=matchIzquierda=false;
      actual = $(".col-"+col).find("img")[row]

      //Verficacion a la Izquierda
      if($(".col-"+(col-1)).length > 0){ //Verifica si existe elemento a la izquierda
        elementoCompara = $(".col-"+(col-1)).find("img")[row]
        if (validaImagen(actual, elementoCompara)) {
          matchIzquierda = true;
          if($(".col-"+(col-2)).length > 0){ //Verifica si existen dos columnas a la izquierda
            elementoCompara = $(".col-"+(col-2)).find("img")[row]
            if(validaImagen(actual, elementoCompara)){
              puntos(actual, $(".col-"+(col-1)).find("img")[row], elementoCompara )

            }
          }
        }
      }

      //Verificacion a la Derecha
      if($(".col-"+(col+1)).length > 0){ //Verifica si existe elemento a la izquierda
        elementoCompara = $(".col-"+(col+1)).find("img")[row]
        if (validaImagen(actual, elementoCompara)) {
          matchDerecha = true;
          if($(".col-"+(col+2)).length > 0){ //Verifica si existen dos columnas a la izquierda
            elementoCompara = $(".col-"+(col+2)).find("img")[row]
            if(validaImagen(actual, elementoCompara)){
              puntos(actual, $(".col-"+(col+1)).find("img")[row], elementoCompara )

            }
          }
        }
      }

      //Verificacion ambos izquierda y Derecha
      if (matchIzquierda == true && matchDerecha == true) {
        puntos(actual, $(".col-"+(col-1)).find("img")[row], $(".col-"+(col+1)).find("img")[row])

      }
      //Verificación hacia arriba
      if($(".col-"+col).find("img")[row-1]){ //Verifica si existe elemento arriba
        elementoCompara = $(".col-"+col).find("img")[row-1]
        if (validaImagen(actual, elementoCompara)) {
          matchArriba = true;
          if($(".col-"+col).find("img")[row-2]){ //Verifica si existen dos filas hacia arriba
            elementoCompara = $(".col-"+col).find("img")[row-2]
            if(validaImagen(actual, elementoCompara)){
              puntos(actual, $(".col-"+col).find("img")[row-1], elementoCompara)

            }
          }
        }
      }

      //Verificacion hacia abajo
      if($(".col-"+col).find("img")[row+1]){ //Verifica si existe elemento abajo
        elementoCompara = $(".col-"+col).find("img")[row+1]
        if (validaImagen(actual, elementoCompara)) {
          matchAbajo = true;
          if($(".col-"+col).find("img")[row+2]){ //Verifica si existen dos filas hacia abajo
            elementoCompara = $(".col-"+col).find("img")[row+2]
            if(validaImagen(actual, elementoCompara)){
              puntos(actual, $(".col-"+col).find("img")[row+1], elementoCompara)

            }
          }
        }
      }
      //Verificacion ambos Arriba y Abajo
      if (matchArriba == true && matchAbajo == true) {
        puntos(actual, $(".col-"+col).find("img")[row+1], $(".col-"+col).find("img")[row-1])

      }
    }


  }
}

//Función que se ejecuta una vez se termina una jugada verificando match, eliminando elementos escondidos y llenando faltantes
function postJugada(){
  checkMatch();
  window.setTimeout(eliminarElementos,2100);
  window.setTimeout(llenarDespuesTurno, 2200);

}

//Evento que reorganiza la página al acabarse el tiempo.
function resumenFinal(){
  $('.panel-tablero').hide(900);
  $('.panel-score')
    .animate({
      width: '100%'
    }, 1000, function(){
      $(this).prepend("<h2 class='titulo-over'>Fin de Juego</h2>")
    })
  $('.time').hide(500)
  $('#score-text').hide()
  $('.score').append("<span class='data-info' id='score-final'>"+puntuacion+"</span>")
}