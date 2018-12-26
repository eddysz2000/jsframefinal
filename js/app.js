$(function(){
colorTituloBlanco($('.main-titulo'))
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