const btnSignIn = document.getElementById("sign-in");
const btnSignUp = document.getElementById("sign-up");

const formRegister = document.querySelector(".register");
const formLogin = document.querySelector(".login");

/*para la interaccion desdel el boton de iniciar sesion
el formulario se oculta y aparece el de iniciar sesion*/

btnSignIn.addEventListener("click", e => {
    formRegister.classList.add("hide");
    formLogin.classList.remove("hide");
});

/* aca sucede lo mismo pero se oculta el login y se carga el de registrar*/
btnSignUp.addEventListener("click", e => {
    formLogin.classList.add("hide");
    formRegister.classList.remove("hide");
});



//para guardar datos
const registerForm = document.querySelector(".form-register");

registerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = registerForm.querySelector('input[name="name"]').value;
    const email = registerForm.querySelector('input[name="email"]').value;
    const password = registerForm.querySelector('input[name="password"]').value;

    const userData = {
        name: name,
        email: email,
        password: password,
    };

    // Guardar los datos en el almacenamiento local
    localStorage.setItem('userData', JSON.stringify(userData));

    // Redirige al usuario a la página de inicio de sesión
    window.location.href = 'login.html'; // Cambia esto a la ruta de tu página de inicio de sesión
});

//para logearme 

const loginForm = document.querySelector(".form-login");

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = loginForm.querySelector('input[name="email"]').value;
    const password = loginForm.querySelector('input[name="password"]').value;

    // Obtener los datos de usuario registrados en el almacenamiento local
    const storedUserData = JSON.parse(localStorage.getItem('userData'));

    if (storedUserData && email === storedUserData.email && password === storedUserData.password) {
        // Inicio de sesión exitoso
        // Redirige al usuario a la página principal o a la página deseada
        window.location.href = '../registro/registro.html'; // Cambia esto a la ruta de tu página principal
    } else {
        // Credenciales incorrectas, muestra un mensaje de error
        alert('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
    }
});

// Obtén los datos almacenados en el almacenamiento local
const storedUserData = JSON.parse(localStorage.getItem('userData'));

if (storedUserData) {
    console.log('Datos almacenados en el almacenamiento local:');
    console.log('Nombre:', storedUserData.name);
    console.log('Correo Electrónico:', storedUserData.email);
    // No muestres la contraseña por razones de seguridad
} else {
    console.log('No hay datos almacenados en el almacenamiento local.');
}