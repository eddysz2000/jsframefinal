$(function(){
	//cambiar color de titulo principal
	colorTituloBlanco($('.main-titulo'));

	//llenar elementos en tablero

	agregarElemento($('.col-1'));

	

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

//Funcion que agrega en forma aleatoria los elementos en el tablero
function agregarElemento(elemento){
	var i;
	var r;
	for (i=0;i<7;i++){
		r=Math.floor((Math.random() * 10) + 1);

		switch (r){
			case 1:
				$(elemento).append('<img src="image/1.png" class="elemento"/>');
			break;
			case 2:
				a$(elemento).append('<img src="image/1.png" class="elemento"/>');
			break;
			case 3:
				$(elemento).append('<img src="image/1.png" class="elemento"/>');
			break;
			case 4:
				$(elemento).append('<img src="image/1.png" class="elemento"/>');
			break;
			case 5:
				$(elemento).append('<img src="image/1.png" class="elemento"/>');
			break;
			case 6:
				$(elemento).append('<img src="image/1.png" class="elemento"/>');
			break;
			case 7:
				$(elemento).append('<img src="image/1.png" class="elemento"/>');
			break;
			case 8:
				$(elemento).append('<img src="image/1.png" class="elemento"/>');
			break;
			case 9:
				$(elemento).append('<img src="image/1.png" class="elemento"/>');
			break;
			case 10:
				$(elemento).append('<img src="image/1.png" class="elemento"/>');
			break;
		}

	}

}