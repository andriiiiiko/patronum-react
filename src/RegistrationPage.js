import React, { useState } from 'react';
import Notiflix from 'notiflix'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const RegistrationPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
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
                console.log('Успешная регистрация');
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
                console.error('Ошибка регистрации:', error);
                Notiflix.Notify.failure('Something went wrong. Please try again.')
            }
        } catch (error) {
            console.error('Произошла неожиданная ошибка при регистрации', error.response?.data || error.message);
            Notiflix.Notify.failure('An unexpected error occurred.')
        }
    };

    return (
        <div className='App-container'>
            <h1 className='Auth-title'>Registration</h1>
            <form className='Form'>
                <label className='Form-label'>
                    <p>
                        Username:
                    </p>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <br />
                <label className='Form-label'>
                    <p>
                        Password:
                    </p>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <br />
                <label className='Form-label'>
                    <p>
                        Confirm Password:
                    </p>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
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
