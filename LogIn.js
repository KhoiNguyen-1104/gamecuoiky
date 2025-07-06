function showForm(type) {
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const buttons = document.querySelectorAll('.tab-btn');

  if (type === 'login') {
    loginForm.classList.add('active');
    registerForm.classList.remove('active');
    buttons[0].classList.add('active');
    buttons[1].classList.remove('active');
  } else {
    loginForm.classList.remove('active');
    registerForm.classList.add('active');
    buttons[0].classList.remove('active');
    buttons[1].classList.add('active');
  }
}
