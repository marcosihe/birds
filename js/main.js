//Validación de nombre y apellido
requiredField = (input) => {
    if (input.value.trim() === '') { //input.value.length === '' //Es otra opción compara con la cadena vacía
        input.className = 'form-control is-invalid';
        return false;
    }else{
        input.className = 'form-control is-valid';
        return true;
    }
}

//Validación de e-mail
validateEmail = (email) => {
    let expression = /\w+@\w+\.[a-z]{2,}$/;
    if(email.value.trim() != '' && expression.test(email.value)){
        email.className = 'form-control is-valid';
        return true;
    }else {
        email.className = 'form-control is-invalid';
        return false;
    }
}

//validación de número de teléfono
validateNumber = (number) => {
    if (number.value.trim() != '' && !isNaN(number.value)) {
        number.className = 'form-control is-valid';
        return true;
    }else{
        number.className = 'form-control is-invalid';
        return false;
    }
}

//validación de consulta
validateConsult = text => {
    if (text.value.trim() != '' && text.value.length >= 10) {
        text.className = 'form-control is-valid';
        return true;
    }else{
        text.className = 'form-control is-invalid';
        return false;
    }
}

//Validación general - submit button
let sendEmail = () => {
    emailjs.send("service_m4vl49a","template_tny4kwn",{
        from_name: document.querySelector('#name').value,
        to_name: "Administrador",
        consult: document.querySelector('#consult').value,
        email: document.querySelector('#email').value,
        phone: document.querySelector('#phone').value 
        }).then(function (response){
            //Esta función se ejecuta cuando se cumplió la promesa
            let alert = document.querySelector('#alert');
            alert.className = 'alert alert-success text-center mt-3';
            alert.innerHTML = '¡Datos enviados exitosamente! Nos contactaremos con Ud. a la brevedad.';
            resetForm();
        }, function (error){
            //Esta función se ejecuta cuando NO se cumple la promesa
            let alert = document.querySelector('#alert');
            alert.className = 'alert alert-danger text-center mt-3';
            alert.innerHTML = 'Error en el envío de datos. Intente nuevamente más tarde.';
            resetForm();
        })
}

generalValidation = e => { 
    e.preventDefault();
    if (requiredField(document.querySelector('#name')) &&
    validateEmail(document.querySelector('#email')) &&
    validateNumber(document.querySelector('#phone')) &&
    validateConsult(document.querySelector('#consult'))) {
        sendEmail();
    }else{
        let alert = document.querySelector('#alert');
        alert.className = 'alert alert-warning text-center mt-3';
        alert.innerHTML = 'Debe completar todos los campos obligatorios';
    }
}

let resetForm = () => {
    document.querySelector('#suscriptionForm').reset();
    document.querySelector('#name').className = 'form-control';
    document.querySelector('#email').className = 'form-control';
    document.querySelector('#phone').className = 'form-control';
    document.querySelector('#consult').className = 'form-control'; 
}

let clearAlertStyles = () => {
    let alert = document.querySelector('#alert');
    alert.className = '';
    alert.innerHTML = '';
}