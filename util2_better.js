function refreshAmount(element){  
	if(testExp(element.value)){
		var val = parseToFloat(element.value);
		if(!isNaN(val)){
			element.value = formatFloat(val);
		}else{
	  		element.value = "";
	   	}
	}
}

function parseToFloat(amount){
	if(amount != undefined){
   		var val = amount.replace(/\./g,''); 	
   		var price1 = parseFloat(val.replace(",", "."));
   		return price1;
	}
}

function formatFloat(val){
	var price1 = val.toFixed(2).toString().replace(".", ",");
	return numberFormat(price1);
}

function clearPoint(amount){
	if(testExp(amount.value)){
		amount.value = amount.value.replace(/\./g,''); 	   		
	}
}

function numberFormat(numero){
	var resultado = "";
	var nuevoNumero = numero.replace(/\./g,'');
	if(numero.indexOf("-")>=0){
		nuevoNumero = nuevoNumero.substring(1);
	}
	
	if(numero.indexOf(",")>=0)
		nuevoNumero = nuevoNumero.substring(0,nuevoNumero.indexOf(","));

	for (var j, i = nuevoNumero.length - 1, j = 0; i >= 0; i--, j++) 
		resultado = nuevoNumero.charAt(i) + ((j > 0) && (j % 3 == 0)? ".": "") + resultado; 
       
	if(numero.indexOf(",")>=0)
		resultado += numero.substring(numero.indexOf(","));

	if(numero.indexOf("-")>=0){
		resultado = "-" + resultado;
	}
	
	return resultado;
}
 
function validAlfaNumeric(e){
	var key = (window.Event) ? e.which : e.keyCode;
	if (key != 32 && key != 8 && key != 0 && key != 45 && (key < 48 || key > 57) && (key < 65 || key > 90) && (key < 97 || key > 122)) {
		e.preventDefault();
		return false;
	}
	return true;
 }		 

function formatFloat(val){
	var price1 = val.toFixed(2).toString().replace(".", ",");
	return numberFormat(price1);
}

function numberFormat(numero){
	var resultado = "";
	var nuevoNumero=numero.replace(/\./g,'');
	if(numero.indexOf(",")>=0)
		nuevoNumero=nuevoNumero.substring(0,nuevoNumero.indexOf(","));

	for (var j, i = nuevoNumero.length - 1, j = 0; i >= 0; i--, j++) 
		resultado = nuevoNumero.charAt(i) + ((j > 0) && (j % 3 == 0)? ".": "") + resultado; 
		           
	if(numero.indexOf(",")>=0)
		resultado+=numero.substring(numero.indexOf(","));
		           
	return resultado;
}

function formatAmount(value){
	var ret = value.replace(/\./g,"");
	var valorFinal = ret.replace(",", ".");
	return valorFinal;
}


function replaceNumber(val){
	var price1 = val.replace(".", ",");
	return numberFormat(price1);
}

function testExp(value){
	if (value == ""){ return false;}
	if(value.indexOf('.') == -1 && value.indexOf(',') == -1){return true;}
	var patt =  /^(\d{1,3})(((\.\d{3})?)*|((\d)?)*)(\,\d{2})?$/;
	if (patt.test(value)){
			return true;
	}
	return false;
}

function onlyNumbers(e) {
	var key = (window.Event) ? e.which : e.keyCode;						
	if (key != 8 && key != 0 && (key < 48 || key > 57)) {
		e.preventDefault();
		return false;
	}
}

function onlyNumbersPuntoComa(e) {
	// Allow: numeros punto y coma
	var key = (window.Event) ? e.which : e.keyCode;
	if ( $.inArray(key,[46,44]) !== -1 ) {
		return true;
	}
	if (key != 8 && key != 0 && (key < 48 || key > 57)) {
		e.preventDefault();
		return false;
	}
}

function onlyNumbersComa(e) {
	// Allow: numeros punto y coma
	var key = (window.Event) ? e.which : e.keyCode;
	if ( $.inArray(key,[44]) !== -1 ) {
		return true;
	}
	if (key != 8 && key != 0 && (key < 48 || key > 57)) {
		e.preventDefault();
		return false;
	}
}