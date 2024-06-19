document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const inputNombre = document.getElementById("first-name");
    const inputApellido = document.getElementById("last-name");
    const emailInput = document.getElementById("email");
    const radioInputs = Array.from(form.querySelectorAll('input[type="radio"]'));
    const messageInput = document.getElementById("message");
    const consentInput = document.getElementById("consent");

    // Función para resaltar el borde al hacer click y al escribir
    function handleInputFocus(input) {
        input.style.borderColor = '#4ed94e';
    }

    function handleInputBlur(input) {
        if (!input.value.trim()) {
            input.style.borderColor = '#db273f';
        } else {
            input.style.borderColor = '';
        }
    }

    // Eventos para los inputs de nombre, apellido, email y message
    inputNombre.addEventListener('focus', function() {
        handleInputFocus(this);
    });
    inputNombre.addEventListener('blur', function() {
        handleInputBlur(this);
        if (!this.value.trim()) {
            this.nextElementSibling.textContent = 'Input is required';
        } else {
            this.nextElementSibling.textContent = '';
        }
    });

    inputApellido.addEventListener('focus', function() {
        handleInputFocus(this);
    });
    inputApellido.addEventListener('blur', function() {
        handleInputBlur(this);
        if (!this.value.trim()) {
            this.nextElementSibling.textContent = 'Input is required';
        } else {
            this.nextElementSibling.textContent = '';
        }
    });

    emailInput.addEventListener('focus', function() {
        handleInputFocus(this);
    });
    emailInput.addEventListener('blur', function() {
        if (this.value && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/.test(this.value)) {
            //Sacado de https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
            this.style.borderColor = '#db273f';
            this.nextElementSibling.textContent = 'Invalid email';
        } else {
            handleInputBlur(this);
            this.nextElementSibling.textContent = '';
        }
    });

    // Cambiar el color de fondo de los inputs radio al seleccionarlos
    radioInputs.forEach(radioInput => {
        radioInput.addEventListener('change', function() {
            radioInputs.forEach(radio => {
                radio.parentNode.style.backgroundColor = '';
            });
            this.parentNode.style.backgroundColor = '#61cf61';
            document.querySelector('#query-type .error-message').textContent = '';
        });
    });

    // Validar el textarea message
    messageInput.addEventListener('focus', function() {
        handleInputFocus(this);
    });
    messageInput.addEventListener('blur', function() {
        handleInputBlur(this);
        if (!this.value.trim()) {
            this.nextElementSibling.textContent = 'Input is required';
        } else {
            this.nextElementSibling.textContent = '';
        }
    });

    // Validar el checkbox de consentimiento
    consentInput.addEventListener('change', function() {
        if (!this.checked) {
            this.nextElementSibling.textContent = 'Consent is required';
        } else {
            this.nextElementSibling.textContent = '';
        }
    });

    // Validar el formulario al hacer submit
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        let isValid = true;

        // Validar inputs de nombre y apellido
        if (!inputNombre.value.trim()) {
            inputNombre.style.borderColor = '#db273f';
            inputNombre.nextElementSibling.textContent = 'Input is required';
            isValid = false;
        } else {
            inputNombre.style.borderColor = '';
            inputNombre.nextElementSibling.textContent = '';
        }

        if (!inputApellido.value.trim()) {
            inputApellido.style.borderColor = '#db273f';
            inputApellido.nextElementSibling.textContent = 'Input is required';
            isValid = false;
        } else {
            inputApellido.style.borderColor = '';
            inputApellido.nextElementSibling.textContent = '';
        }

        // Validar email
        if (emailInput.value && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/.test(emailInput.value)) {
            emailInput.style.borderColor = '#db273f';
            emailInput.nextElementSibling.textContent = 'Invalid email';
            isValid = false;
        } else {
            handleInputBlur(emailInput);
            emailInput.nextElementSibling.textContent = '';
        }

        // Validar radio buttons
        let radioChecked = false;
        radioInputs.forEach(radioInput => {
            if (radioInput.checked) {
                radioChecked = true;
            }
        });
        if (!radioChecked) {
            radioInputs.forEach(radioInput => {
                radioInput.parentNode.style.backgroundColor = '#db273f';
            });
            document.querySelector('#query-type .error-message').textContent = 'Select one option';
            isValid = false;
        } else {
            radioInputs.forEach(radioInput => {
                radioInput.parentNode.style.backgroundColor = '';
            });
            document.querySelector('#query-type .error-message').textContent = '';
        }

        // Validar textarea message
        if (!messageInput.value.trim()) {
            messageInput.style.borderColor = '#db273f';
            messageInput.nextElementSibling.textContent = 'Input is required';
            isValid = false;
        } else {
            messageInput.style.borderColor = '';
            messageInput.nextElementSibling.textContent = '';
        }

        // Validar checkbox de consentimiento
        if (!consentInput.checked) {
            consentInput.nextElementSibling.textContent = 'Consent is required';
            isValid = false;
        } else {
            consentInput.nextElementSibling.textContent = '';
        }

        // Mostrar alerta si el formulario es válido
        if (isValid) {
            alert('Form submitted successfully');
        }
    });
});
