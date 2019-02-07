function na_alert() {
	alert("Opción no disponible");
}

//*************
//Convierte un campo input tipo 'text' a tipo 'password' (creado para el Keyboard).
//Parametros:
//input: campo input
//*************
function toTypePasswordVK(input){
	var IE = navigator.appName=="Microsoft Internet Explorer";
	if(input.getAttribute('type') == "text"){
		var posicion = navigator.appVersion.toLowerCase().lastIndexOf("msie");
		var version = parseInt(navigator.appVersion.toLowerCase().substring(posicion+5, posicion+7));
		if(IE && version < 10) {
			var clone = input.cloneNode(false);
			clone.setAttribute('type', "password");
			input.parentNode.replaceChild(clone, input);
			clone.focus();
			establerCursorPosicion(clone.value.length, clone);
		}else{
			input.type = "password";
		}
	}
}

//************* 
//	Inserta en el campo input el caracter asociado al evento ocurrido.
//	Parámetros:
//		input: campo input
//		e: evento
//*************
function insertValue(input,e){
	var value = input.value;
	var tecla = (document.all) ? e.keyCode : e.which;
	var val = String.fromCharCode(tecla);
	if(validateAlphanumericSpaces(e)){
		if(value != "" && value != null){
			input.value = value+val;
		}else{
			input.value = val;
		}
	}
}

//*************
//Situa el cursor en la posicion indicada dentro del campo.
//Parametros:
//input: campo input
//e: evento
//*************
function establerCursorPosicion(pos, elemento){ 
	if(typeof document.selection != 'undefined' && document.selection){        //método IE
		var tex=elemento.value;
		elemento.value='';
		elemento.focus();
		var str = document.selection.createRange();
		elemento.value=tex;
		str.move("character", pos);
		str.moveEnd("character", 0);
		str.select();
	}
	else if(typeof elemento.selectionStart != 'undefined'){                    //método estándar
		elemento.setSelectionRange(pos,pos);                        
	}
}

function closeWin() { window.top.close(); }

// ************* 
// Abre un PopUp modal tomando como orgien FatWire, para ello se debe dar 
// los siguientes parámetros:
//   width: ancho de la ventana
//   height: Alto de la ventana
//   URLFatWire: URL completo de FatWire. Por ejemplo: http://edicion2.todo1.com/NASApp/cs/ContentServer?pagename=Empresas/Channel/noframes&omitbtns=true
//   idFatWire:  Identificación dentro de FatWire. Por ejemplo: '1155214493367'
// *************
function openModalPopUpFromFatwire(width, height, URLFatWire, idFatWire){
	var IE = navigator.appName=="Microsoft Internet Explorer";
	var NS = navigator.appName=="Netscape";
	var bVer = parseInt(navigator.appVersion);
	var left, top, params='';

	sURL=URLFatWire+'&id='+idFatWire;

	if (bVer >= 4) {
		left = ( (screen.width-width) >>1 );
		top = ( (screen.height-height) >>1 );
	} else {
		left = ( (800-width) >>1 );
		top = ( (600-height) >>1 );
	}

	if(IE)height+=45;

	if (IE) params += ";dialogTop:" + top + ";dialogLeft:" + left;
	else if (NS) params += ",screenX=" + left + ",screenY=" + top;

	if (IE) window.showModalDialog(sURL, window, 'toolbar:no;scroll:no;resizable:no;dialogWidth:' + width + 'px;dialogHeight:' +height +'px'+params);
	else window.open(sURL, '_blank', 'toolbar=no,scrollbars=auto,resizable=no,modal=yes,width=' + width + ',height=' + height + params);
}

// ************* 
// Abre un PopUp modal tomando como orgien un URL dado.
// Parámetros:
//   width: ancho de la ventana
//   height: Alto de la ventana
//   sURL: URL completo
// *************
function openModalPopUpFromURL(width, height, sURL){
	var IE = navigator.appName=="Microsoft Internet Explorer";
	var NS = navigator.appName=="Netscape";
	var bVer = parseInt(navigator.appVersion);
	var left, top, params='';

	if (bVer >= 4) {
		left = ( (screen.width-width) >>1 );
		top = ( (screen.height-height) >>1 );
	} else {
		left = ( (800-width) >>1 );
		top = ( (600-height) >>1 );
	}

	if(IE)height+=45;

	if (IE) params += ";dialogTop:" + top + ";dialogLeft:" + left;
	else if (NS) params += ",screenX=" + left + ",screenY=" + top;

	if (IE) window.showModalDialog(sURL, window, 'toolbar:no;scroll:no;resizable:no;dialogWidth:' + width + 'px;dialogHeight:' +height +'px'+params);
	else window.open(sURL, '_blank', 'toolbar=no,scrollbars=auto,resizable=no,modal=yes,width=' + width + ',height=' + height + params);
}

//*************
//Remueve el producto Tarjeta Efectivo de la lista de seleccion
//Parámetros:
//id: Id del select a modificar 
//*************
function removeTEFromOptions(id) {
	var accountFromId = document.getElementById(id);
	var aBorrar;

	if(accountFromId!=null) {
		for(var i=0; i<accountFromId.options.length; i++) {
			var aux = accountFromId.options[i].value.split("_");

			if(aux.length>2) {
				if(accountFromId.options[i].value != "0" && aux[2] == "TE") {
					aBorrar = accountFromId.options[i];
					aBorrar.parentNode.removeChild(aBorrar);
					removeTEFromOptions(id);
					break;
				}
			}

			else {
				if(aux[0].substring(0,4)=="5888") {
					aBorrar = accountFromId.options[i];
					aBorrar.parentNode.removeChild(aBorrar);
					removeTEFromOptions(id);
					break;
				}
			}
		}
	}
}

//************* 
//Remueve el producto Tarjeta Efectivo de las listas de seleccion generada dinamicamente 
//Parámetros:
//tagName: Tagname del select a modificar 
//size: Longitud de las listas a modificar 
//properties: Propiedad especifica de cada lista
//*************
function removeMultiTEFromOptions(tagName, size, properties) {
	if(size>0) {
		for(var i=0; i<size; i++) {
			var tag = document.getElementsByName(tagName + "[" + i + "]." + properties);
			if(tag != null && tag[0]!=null) {
				removeTarjetaEfectivo(tag[0]);
			}
		}
	}
}

//************* 
//Remueve el producto Tarjeta Efectivo de las listas de seleccion generada dinamicamente 
//Parámetros:
//tagName: Tagname del select a modificar 
//size: Longitud de las listas a modificar 
//properties: Propiedad especifica de cada lista
//*************
function removeMultiTEFromOptionsPaymentsService(tagName, size) {
	if(size>0) {
		for(var i=0; i<size; i++) {
			var tag = document.getElementsByName(tagName);
			if(tag != null && tag[0]!=null) {
				removeTarjetaEfectivo(tag[0]);
			}
		}
	}
}

//************* 
//Remueve el producto Tarjeta Efectivo de las listas de seleccion generada dinamicamente 
//Parámetros:
//tagName: Tagname del select a modificar 
//size: Longitud de las listas a modificar 
//properties: Propiedad especifica de cada lista
//*************
function removeMultiTEFromOptionsCDR(tagName, size, properties) {

	if(tagName == 'accountFromId'){
		var tag = document.getElementsByName(tagName);

		if(tag != null && tag[0]!=null) {
			removeTarjetaEfectivo(tag[0]);
		}
	}else{

		if(tagName == 'creditPrincipalAccountId'){
			var tag = document.getElementsByName(tagName);

			if(tag != null && tag[0]!=null) {
				removeTarjetaEfectivoCapital(tag[0]);
			}
		}else{

			if(tagName == 'creditInterestAccountId'){
				var tag = document.getElementsByName(tagName);

				if(tag != null && tag[0]!=null) {
					removeTarjetaEfectivoInterest(tag[0]);
				}
			}
		}
	}
}

//*************
//Remueve el producto Tarjeta Efectivo de la lista de seleccion
//Parámetros:
//select: tag select del select a modificar 
//*************
function removeTarjetaEfectivo(select) {
	var aBorrar;

	for(var j=0; j<select.length; j++) {
		if(select.options[j].value != "0" && select.options[j].value.split("_")[2] == "TE") {
			aBorrar = select.options[j];
			aBorrar.parentNode.removeChild(aBorrar);
			removeTarjetaEfectivo(select);
			break;
		}
	}
}

function removeTarjetaEfectivoCapital(select) {
	var aBorrar;

	for(var j=0; j<select.options.length; j++) {
		if(select.options[j].value != "0" && select.options[j].value.split("_")[2] == "TE") {
			aBorrar = creditPrincipalAccountId.options[j];
			aBorrar.parentNode.removeChild(aBorrar);
			removeTarjetaEfectivoCapital(select);
			break;
		}
	}
}

function removeTarjetaEfectivoInterest(select) {
	var aBorrar;

	for(var j=0; j<select.options.length; j++) {
		if(select.options[j].value != "0" && select.options[j].value.split("_")[2] == "TE") {
			aBorrar = creditInterestAccountId.options[j];
			aBorrar.parentNode.removeChild(aBorrar);
			removeTarjetaEfectivoInterest(select);
			break;
		}
	}
}

//************* 
//Remplaza todas las ocurrencias de un caracter en un string
//Parámetros:
//text: cadena en la cual se buscara los valores a reemplazar
//busca: valor a reemplazar
//reemplaza: nuevo valor
//*************
function replaceAll( text, busca, reemplaza ){
	while (text.toString().indexOf(busca) != -1){
		text = text.toString().replace(busca,reemplaza);
	}
	return text;
}

function FormatoCI(n) {
	n = String(n);
	var RgX = /^(.*\s)?([-+\u00A3\u20AC]?\d+)(\d{3}\b)/;
	return n == (n = n.replace(RgX, "$1$2.$3")) ? n : FormatoCI(n);
}

function AmountFormatter(arg) {
	var campo = document.getElementById(arg);
	var amount = campo.value;
	var entero;
	var decimal;

	amount = replaceAll(amount, '.', '');
	amount = replaceAll(amount, ',', '');

	if(amount.length > 2) {
		entero = FormatoCI(parseFloat(amount.substring(0, amount.length-2)));
		decimal =  eval(amount.substring(amount.length-2, amount.length));

		if(decimal < 10) {
			decimal = "0" + decimal;
		}

		campo.value = entero + "," + decimal;
	}

	else {
		if(amount.length<2) {
			amount = "0" + amount;
		}

		if(amount==="0") {
             amount = "00";
        }

		campo.value =  "0,"+ amount;
	}
}

//************** Funcion para permitir que se ingresen solo numeros y comas *******************//
//*********************************************************************************************//
function acceptNumAndComma(event) {
	// NOTA: Backspace = 8, Enter = 13, '0' = 48, '9' = 57 , ',' = 44
	event = event || window.event;
	return (event.keyCode <= 13 || (event.keyCode >= 48 && event.keyCode <= 57) || event.keyCode==44);
}

//************** Funcion para permitir que se ingresen solo numeros y punto *******************//
//*********************************************************************************************//
function acceptNumAndDot(event) {
	// NOTA: Backspace = 8, Enter = 13, '0' = 48, '9' = 57 , '.' = 44
	event = event || window.event;
	return (event.keyCode <= 13 || (event.keyCode >= 48 && event.keyCode <= 57) || event.keyCode==46);
}

//****************** Funcion para permitir que se ingresen solo numeros ***********************//
//*********************************************************************************************//
function acceptOnlyNum(event) {
	//NOTA: Backspace = 8, Enter = 13, '0' = 48, '9' = 57
	event = event || window.event;
	return (event.keyCode <= 13 || (event.keyCode >= 48 && event.keyCode <= 57));
}

/********************************Funcion que solo permite ingresar letras y espacios en blanco***************/
/************************************************************************************************************/
function justAllowLettersAndBlanks(e){
    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key).toLowerCase();
    letras = " abcdefghijklmnñopqrstuvwxyz";
    especiales = "8-37-39-46";

    tecla_especial = false
    for(var i in especiales){
         if(key == especiales[i]){
             tecla_especial = true;
             break;
         }
     }

     if(letras.indexOf(tecla)==-1 && !tecla_especial){
         return false;
     }
}

/********************************Funcion que solo permite ingresar letras, numeros y espacios en blanco******/
/************************************************************************************************************/
function justAllowLettersNumsAndBlanks(e){
    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key).toLowerCase();
    letras = " abcdefghijklmnñopqrstuvwxyz0123456789";
    especiales = "8-37-39-46";

    tecla_especial = false
    for(var i in especiales){
         if(key == especiales[i]){
             tecla_especial = true;
             break;
         }
     }

     if(letras.indexOf(tecla)==-1 && !tecla_especial){
         return false;
     }
}