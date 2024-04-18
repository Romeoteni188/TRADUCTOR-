document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío del formulario

    // Obtener los valores del formulario
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Crear objeto de usuario
    const user = {
        name: name,
        email: email,
        password: password
    };

    // Realizar la solicitud POST al endpoint /register
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        if (response.ok) {
            alert('Usuario registrado exitosamente');
            // Puedes redirigir a otra página o realizar otras acciones después de registrar al usuario
        } else {
            alert('Error al registrar el usuario');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error al conectar con el servidor');
    });
});
