/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import './firstScreen.css'; // קובץ CSS לעיצוב העמוד
import img from "./planet101.png";

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false); // משתנה להצגת מסך הרשמה
  const [registrationError, setRegistrationError] = useState('');

  const handleLogin = () => {
    console.log('Logging in with:', username, password);
  };

  const handleRegister = () => {
    setIsRegistering(true); // מעבר למצב הרשמה
  };

  const handleRegistrationSubmit = () => {
    if (username.length < 6 || password.length < 6) {
      setRegistrationError('Username and password must be at least 6 characters long.');
    } else {
      setRegistrationError('');
      console.log('Registering with:', username, password);
      // כאן תוכל לקרוא לשירות ה- API שלך או לפונקציה בצד השרת המבצעת את השמירה של המשתמש
      // לדוגמה:
      fetch('Users.txt', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        console.log('Registration successful:', data);
      })
      .catch(error => {
        console.error('Registration failed:', error);
      });
    }
  };

  return (
    <div>
         
         <img src={img} className="rotating-image"/>
      <h1 className='title-firstScreen'>Welcome to Doc.U</h1>
      {isRegistering ? (
        <div className="login-container">
          <h2 className="login-title">Register</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="login-input"
          />
          {registrationError && (
            <div className="registration-error">
              {registrationError}
            </div>
          )}
          <div>
            <button onClick={handleRegistrationSubmit} className="register-button">הרשמה</button>
          </div>
        </div>
      ) : (
        <div className="login-container">
          <h2 className="login-title">Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
          <div className="login-buttons">
            <button onClick={handleLogin} className="login-button">כניסה</button>
            <button onClick={handleRegister} className="register-button">הרשמה</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginPage;
