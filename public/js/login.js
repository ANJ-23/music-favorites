// handles login form
const loginFormHandler = async (event) => {
  event.preventDefault();

  // collects values from login form ('email' has id="email-login", 'password' has id="password-login")
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  // if email & password have been filled out, fetch corresponding 'POST' route in "/api/userRoutes.js"
  
  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    // if email & password are correct, redirect user to "dashboard" page (contains list of songs)
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to log in.');
    }
  }
};

// handles sign-up form
const signupFormHandler = async (event) => {
  event.preventDefault();

  // obtains values from sign-up form
  const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  // if username, email, and password forms are filled out, create a new user via '/api/userRoutes.js'
  if (username && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    // if all forms have beeen filled out, redirects to "dashboard" page
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to sign up.');
    }
  }
};

// adds loginFormHandler function to form with class "login-form"
document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

// adds signupFormHandler function to form with class "signup-form"
document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
