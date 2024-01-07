import React, { useState } from 'react';
import Notiflix from 'notiflix'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const AuthPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:9999/api/v1/auth/login', {
                username,
                password,
            });

            const { error, token } = response.data;

            if (error === 'OK' && token) {
                console.log('Успешный вход', token);
                Notiflix.Notify.success('You have successfully logged in.')
                localStorage.setItem('authToken', token);
                navigate('/userview');
            } else if (error === 'INVALID_USER_NAME') {
                Notiflix.Notify.failure('We could not find an account with that username.')
            } else if (error === 'NAME_IS_EMPTY') {
                Notiflix.Notify.failure('Username must be at least 4 characters long.')
            } else if (error === 'INVALID_PASSWORD') {
                Notiflix.Notify.failure('Incorrect password.')
            }
            else if (error === 'INVALID_MAX_PASSWORD') {
                Notiflix.Notify.failure('Incorrect length password.')
            }
        } catch (error) {
            console.error('Произошла неожиданная ошибка при авторизации', error.response?.data || error.message);
            Notiflix.Notify.failure('An unexpected error has occurred')
        }
    };


    return (
        <div className='App-container'>
            <h1 className='Auth-title'>Login</h1>
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
                <button type="button" onClick={handleLogin} className='button'>
                    Login
                </button>
            </form>
            <p className='Auth-text'>
                Don't have an account? <Link to="/register">Sign up</Link>.
            </p>
        </div>
    );
};

export default AuthPage;