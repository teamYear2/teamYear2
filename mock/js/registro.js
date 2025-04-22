document.getElementById('registerForm').addEventListener('submit', function (event) {
    event.preventDefault();
  
    const data = {
      name: document.getElementById('name').value,
      lastName: document.getElementById('lastName').value,
      dni: document.getElementById('dni').value,
      dateOfBirth: document.getElementById('date_of_birth').value,
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
      termsAccepted: document.getElementById('terms').checked,
    };
  
    if (!data.termsAccepted) {
      alert('Debes aceptar los términos y condiciones.');
      return;
    }
  
    console.log('Formulario enviado:', data);
    alert('Registro exitoso (simulado)');
  });
  
 
  
  