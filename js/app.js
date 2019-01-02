$(function(){
	//cambiar color de titulo principal
	colorTituloBlanco($('.main-titulo'));

	//llenar elementos en tablero
	$('.btn-reinicio').click(function(){
		
		//primero borramos el contenido de las columnas
		$('.col-1').empty();
		$('.col-2').empty();
		$('.col-3').empty();
		$('.col-4').empty();
		$('.col-5').empty();
		$('.col-6').empty();
		$('.col-7').empty();

		//luego agregamos los elementos
		agregarElemento($('.col-1'));
		agregarElemento($('.col-2'));
		agregarElemento($('.col-3'));
		agregarElemento($('.col-4'));
		agregarElemento($('.col-5'));
		agregarElemento($('.col-6'));
		agregarElemento($('.col-7'));
	});
	
	//deteccion de elementos iguales
	
	

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
				$(elemento).append('<img src="image/1.png" class="elemento uno"/>');
			break;
			case 2:
				$(elemento).append('<img src="image/2.png" class="elemento dos"/>');
			break;
			case 3:
				$(elemento).append('<img src="image/3.png" class="elemento tres"/>');
			break;
			case 4:
				$(elemento).append('<img src="image/4.png" class="elemento cuatro"/>');
			break;
			case 5:
				$(elemento).append('<img src="image/1.png" class="elemento uno"/>');
			break;
			case 6:
				$(elemento).append('<img src="image/2.png" class="elemento dos"/>');
			break;
			case 7:
				$(elemento).append('<img src="image/3.png" class="elemento tres"/>');
			break;
			case 8:
				$(elemento).append('<img src="image/4.png" class="elemento cuatro"/>');
			break;
			case 9:
				$(elemento).append('<img src="image/1.png" class="elemento uno"/>');
			break;
			case 10:
				$(elemento).append('<img src="image/2.png" class="elemento dos"/>');
			break;
		}

	}

}