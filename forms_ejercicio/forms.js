// Crear funciones que verifiquen los campos del formulario
// y que se ejecuten al enviar el formulario


// 🟢🟢🟢 Funciones auxiliares 🟢🟢🟢

function muestraError(nombre_del_campo, mensaje) {
    let sufijo = "Error";
    let input = document.getElementById(nombre_del_campo);
    let error = document.getElementById(nombre_del_campo + sufijo);
    error.innerHTML = mensaje;
    input.classList.add("error");    
}

function nif(dni) {
    /**
     * Verifica el DNI
     * Si el DNI es correcto devuelve 0
     * Si la letra del DNI no es correcta devuelve 1
     * Si el DNI no es válido devuelve 2
     */
    var numero
    var letr
    var letra
    var expresion_regular_dni

    expresion_regular_dni = /^\d{8}[a-zA-Z]$/;

    if (expresion_regular_dni.test(dni) == true) {
        numero = dni.substr(0, dni.length - 1);
        letr = dni.substr(dni.length - 1, 1);
        numero = numero % 23;
        letra = 'TRWAGMYFPDXBNJZSQVHLCKET';
        letra = letra.substring(numero, numero + 1);
        if (letra != letr.toUpperCase()) {
            return 1
        } else {
            return 0;
        }
    } else {
        return 2;
    }
}


// 🟢🟢🟢 Funciones ya hechas 🟢🟢🟢

function checkDNI() {
    var dni = document.getElementById("dni").value;
    resultado = nif(dni);
    return resultado;
}

function checkEmail() {
    var email = document.getElementById("email").value;
    var expresion_regular_email = /\S+@\S+\.\S+/;
    return expresion_regular_email.test(email);
}

function checkPassword() {
    // Verificar que la contraseña tenga al menos 8 caracteres
    // y que tenga al menos una letra mayúscula, una minúscula y un número
    // y que no tenga caracteres especiales
    var password = document.getElementById("password").value;
    var mayuscula = false;
    var minuscula = false;
    var numero = false;
    var caracter = false;
    // Verifica todo antes de devolver true
    if (password.length >= 8) {
        for (var i = 0; i < password.length; i++) {
            if (password.charCodeAt(i) >= 65 && password.charCodeAt(i) <= 90) {
                mayuscula = true;
            } else if (password.charCodeAt(i) >= 97 && password.charCodeAt(i) <= 122) {
                minuscula = true;
            } else if (password.charCodeAt(i) >= 48 && password.charCodeAt(i) <= 57) {
                numero = true;
            } else {
                caracter = true;
            }
        }
        if (mayuscula == true && minuscula == true && caracter == false) {
            return true;
        }
    }

}

// 🟠🟠🟠 Funciones a completar 🟠🟠🟠

function checkNombre() {
    // Condición: el nombre debe tener al menos 3 caracteres

    // 👇👇👇  Escribe aquí tu código  👇👇👇

    return false;
}

function checkApellido() {
    // Condición: el apellido debe tener al menos 3 caracteres

    // 👇👇👇  Escribe aquí tu código  👇👇👇

    return false;
}

function checkTelefono() {
    // Condición: el teléfono debe tener al menos 9 números

    // 👇👇👇  Escribe aquí tu código  👇👇👇

    return false;
}

function checkConfirmPassword() {
    // Condición: las contraseñas deben coincidir

    // 👇👇👇  Escribe aquí tu código  👇👇👇

    return false;
    
}

function checkProvincia() {
    // Condición: debe haber seleccionada una provincia, si no se ha elegido ninguna, el valor es 0

    // 👇👇👇  Escribe aquí tu código  👇👇👇

    return false;
}

function checkCondiciones() {
    // Condición: las condiciones deben estar aceptadas

    // 👇👇👇  Escribe aquí tu código  👇👇👇

    return false;
}H
// Función que verifica el formulario antes de enviarlo
function checkForm() {
    // Verificar que todos los campos estén correctos
    // y que la contraseña y su confirmación sean iguales
    let resultado = true;

    // Si algún campo no es correcto, resultado = false
    // Hay que verificar todos los campos y mostrar los errores
    // en los campos correspondientes
    // Si un campo es correcto, hay que borrar el mensaje de error
    // y la clase error del campo

    // 👇👇👇  Escribe aquí tu código  👇👇👇

    // Ejemplo con DNI, email y contraseña
    let checkDNI_result = checkDNI();
    let error_text_dni = document.getElementById("dniError");
    let input_dni = document.getElementById("dni");
    switch (checkDNI_result) {
        case 0:
            error_text_dni.innerHTML = "";
            input_dni.classList.remove("error");
            break;
        case 1:
            error_text_dni.innerHTML = "La letra del DNI no es correcta";
            input_dni.classList.add("error");
            break;
        case 2:
            error_text_dni.innerHTML = "El DNI no es válido";
            input_dni.classList.add("error");
            break;
    }
    if (checkDNI_result != 0) {
        resultado = false;
    }

    if (!checkEmail()) {
        let error_text = document.getElementById("emailError");
        error_text.innerHTML = "El email no es válido";
        let input = document.getElementById("email");
        input.classList.add("error");
        resultado = false;
    }else{
        let error_text = document.getElementById("emailError");
        error_text.innerHTML = "";
        let input = document.getElementById("email");
        input.classList.remove("error");
    }

    if (!checkPassword()) {
        let error_text = document.getElementById("passwordError");
        error_text.innerHTML = "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número";
        let input = document.getElementById("password");
        input.classList.add("error");
        resultado = false;
    }else{
        let error_text = document.getElementById("passwordError");
        error_text.innerHTML = "";
        let input = document.getElementById("password");
        input.classList.remove("error");
    }

    // 👇👇👇  Escribe aquí tu código  👇👇👇


    return resultado;
}


// 🟢🟢🟢 Función que se ejecuta al enviar el formulario 🟢🟢🟢
document.getElementById("enviar").onclick = function () {
    // Comprobar que el formulario es correcto
    // Si no es correcto, mostrar un mensaje de error
    // Si es correcto, mostrar un mensaje de éxito
    let resultado_formulario = checkForm();
    let mensaje = "";
    let mensaje_span = document.getElementById("mensaje");
    if (resultado_formulario == false) {
        mensaje = "El formulario no se puede enviar porque hay errores";
        mensaje_span.innerHTML = mensaje;
        return false;
    }
    mensaje = "El formulario es correcto y se puede enviar";
    mensaje_span.innerHTML = mensaje;
    return false;
}
