import React, { useState } from 'react';
import Notiflix from 'notiflix'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const RegistrationPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleRegistration = async () => {
        try {
            const response = await axios.post('http://localhost:9999/api/v1/auth/register', {
                username,
                password,
                confirmPassword,
            });

            const { error } = response.data;

            if (error === 'OK') {
                console.log('Successful registration');
                Notiflix.Notify.success('You have been successfully registered.')
                navigate('/login');
            } else if (error === 'USER_ALREADY_EXISTS') {
                Notiflix.Notify.failure('This user is already registered.')
            } else if (error === 'INVALID_USERNAME') {
                Notiflix.Notify.failure('Username must be at least 4 characters long.')
            } else if (error === 'INVALID_PASSWORD') {
                Notiflix.Notify.failure('Password must be at least 8 characters and include an uppercase letter and a digit.')
            } else if (error === 'INVALID_CONFIRM_PASSWORD') {
                Notiflix.Notify.failure('Password and Confirm password does not match.')
            } else {
                console.error('Registration error:', error);
                Notiflix.Notify.failure('Something went wrong. Please try again.')
            }
        } catch (error) {
            console.error('An unexpected error occurred during registration', error.response?.data || error.message);
            Notiflix.Notify.failure('An unexpected error occurred.')
        }
    };

      const toggleShowPassword = () => {
        setShowPassword(!showPassword);
      };

  return (
    <div className='App-container'>
      <h1 className='Auth-title'>Registration</h1>
      <form className='Form'>
        <label className='Form-label'>
          <p>Username:</p>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label className='Form-label'>
          <p>Password:</p>
          <div className="PasswordInput">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="ShowPasswordCheckbox" onClick={toggleShowPassword}>
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>
        </label>
        <br />
        <label className='Form-label'>
          <p>Confirm Password:</p>
          <div className="PasswordInput">
            <input
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </label>
        <br />
        <button type="button" onClick={handleRegistration} className='button'>
          Register
        </button>
      </form>
      <p className='Auth-text'>
        Already have an account? <Link to="/login">Log in</Link>.
      </p>
    </div>
  );
};

export default RegistrationPage;