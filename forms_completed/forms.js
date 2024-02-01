// Crear funciones que verifiquen los campos del formulario
// y que se ejecuten al enviar el formulario

// Funciones auxiliares
function muestraError(nombre_del_campo, mensaje) {
    let sufijo = "Error";
    let input = document.getElementById(nombre_del_campo);
    let error = document.getElementById(nombre_del_campo + sufijo);
    error.innerHTML = mensaje;
    input.classList.add("error");
}

// Función que verifica la provincia dentro de un select
function checkProvincia() {
    let provincia = document.getElementById("provincia").value;
    if (provincia == 0) {
        return false;
    }
    return true;
}


// Función que verifica el campo nombre
function checkNombre() {
    var nombre = document.getElementById("nombre").value;
    if (nombre.length < 3) {
        return false;
    }
    return true;
}

// Función que verifica el campo apellido
function checkApellido() {
    var apellido = document.getElementById("apellidos").value;
    if (apellido.length < 3) {
        return false;
    }
    return true;
}

function nif(dni) {
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

// Funcion verificar el DNI
function checkDNI() {
    var dni = document.getElementById("dni").value;
    resultado = nif(dni);
    return resultado;
}

// Función que verifica el campo email
function checkEmail() {
    var email = document.getElementById("email").value;
    // Verificar estructura del email por expresión regular
    var expresion_regular_email = /\S+@\S+\.\S+/;
    return expresion_regular_email.test(email);
}

// Función que verifica el campo telefono
function checkTelefono() {
    var telefono = document.getElementById("telefono").value;
    if (telefono.length < 9) {
        return false;
    }
    return true;
}

// Función que verifica que se acepten las condiciones
function checkCondiciones() {
    return document.getElementById("acepto").checked;
}

// Función que verifica la contraseña
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

// Función que verifica la confirmación de la contraseña
function checkConfirmPassword() {
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("password2").value;
    if (password != confirmPassword) {
        return false;
    }
    return true;
}

// Función que verifica el formulario antes de enviarlo
function checkForm() {
    // Verificar que todos los campos estén correctos
    // y que la contraseña y su confirmación sean iguales
    let resultado = true;

    if (checkNombre() == false) {
        let error_text = document.getElementById("nombreError");
        error_text.innerHTML = "El nombre debe tener al menos 3 caracteres";
        let input = document.getElementById("nombre");
        input.classList.add("error");
        resultado = false;
    }else{
        let error_text = document.getElementById("nombreError");
        error_text.innerHTML = "";
        let input = document.getElementById("nombre");
        input.classList.remove("error");
    }

    if (checkApellido() == false) {
        let error_text = document.getElementById("apellidosError");
        error_text.innerHTML = "El apellido debe tener al menos 3 caracteres";
        let input = document.getElementById("apellidos");
        input.classList.add("error");
        resultado = false;
    }else{
        let error_text = document.getElementById("apellidosError");
        error_text.innerHTML = "";
        let input = document.getElementById("apellidos");
        input.classList.remove("error");
    }

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

    if (!checkTelefono()) {
        let error_text = document.getElementById("telefonoError");
        error_text.innerHTML = "El teléfono debe tener al menos 9 caracteres";
        let input = document.getElementById("telefono");
        input.classList.add("error");
        resultado = false;
    }else{
        let error_text = document.getElementById("telefonoError");
        error_text.innerHTML = "";
        let input = document.getElementById("telefono");
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

    if (!checkConfirmPassword()) {
        let error_text = document.getElementById("password2Error");
        error_text.innerHTML = "Las contraseñas no coinciden";
        let input = document.getElementById("password2");
        input.classList.add("error");
        resultado = false;
    }else{
        let error_text = document.getElementById("password2Error");
        error_text.innerHTML = "";
        let input = document.getElementById("password2");
        input.classList.remove("error");
    }

    if (!checkProvincia()) {
        let error_text = document.getElementById("provinciaError");
        error_text.innerHTML = "Debes seleccionar una provincia";
        let input = document.getElementById("provincia");
        input.classList.add("error");
        resultado = false;
    }else{
        let error_text = document.getElementById("provinciaError");
        error_text.innerHTML = "";
        let input = document.getElementById("provincia");
        input.classList.remove("error");
    }

    if (!checkCondiciones()) {
        let error_text = document.getElementById("aceptoError");
        error_text.innerHTML = "Debes aceptar las condiciones";
        let input = document.getElementById("acepto");
        input.classList.add("error");
        resultado = false;
    }
    else{
        let error_text = document.getElementById("aceptoError");
        error_text.innerHTML = "";
        let input = document.getElementById("acepto");
        input.classList.remove("error");
    }

    return resultado;
}

// Función que se ejecuta al enviar el formulario
document.getElementById("enviar").onclick = function () {
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