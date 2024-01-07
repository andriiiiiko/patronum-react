import React, { useEffect, useState } from 'react';
import Notiflix from 'notiflix'
import axios from 'axios';
import { BsEye } from "react-icons/bs";

const ViewAllPage = () => {
    const [data, setData] = useState([]);

    const handleRedirectClick = async (shortUrl) => {
        try {
            const response = await axios.post('http://localhost:9999/api/v1/urls/view/redirect', { shortUrl });
            const { error, originalUrl } = response.data;

            if (error === 'OK') {
                window.open(originalUrl, '_blank', 'noopener noreferrer');// в новой вкладке
                // window.location.href = originalUrl; //в текушей вкладке
            } else {
                Notiflix.Notify.failure('Error fetching redirect data.')
            }
        } catch (error) {
            console.error('Unexpected error while fetching redirect data', error);
            Notiflix.Notify.failure('Unexpected error while fetching redirect data.')
        }
    };

    const formatExpirationDate = (expirationDate) => {
        const dateObject = new Date(expirationDate);

        const day = String(dateObject.getDate()).padStart(2, '0');
        const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Добавляем 1, так как месяцы начинаются с 0
        const year = dateObject.getFullYear();
        const hours = String(dateObject.getHours()).padStart(2, '0');
        const minutes = String(dateObject.getMinutes()).padStart(2, '0');

        const formattedDate = `${hours}:${minutes}   ${day}/${month}/${year}`;

        return formattedDate;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:9999/api/v1/urls/view/all');
                const { error, urls } = response.data;

                if (error === 'OK') {
                    setData(urls);
                } else {
                    Notiflix.Notify.failure('Error fetching data.')
                }
            } catch (error) {
                console.error('Unexpected error while fetching data', error);
                Notiflix.Notify.failure('Unexpected error while fetching data.')
            }
        };

        fetchData();
    }, []);

    return (
        <div className='App-container'>
            <h1 className='Auth-title'>View All</h1>
            <div className='Info-title Form-label'>
                <p>ShortUrl</p>
                <p>Time</p>
            </div>
            {data.map((item) => (
                <div key={item.id} className='Info-all'>
                    <div className='info-text'>
                        <p>
                            <a href={item.shortUrl} onClick={(e) => {
                                e.preventDefault();
                                handleRedirectClick(item.shortUrl);
                            }}>
                                {item.shortUrl}
                            </a>
                        </p>
                        <p><BsEye/> {item.visitCount}</p>
                    </div>
                    <div className='info-text'>
                        <span><a href={item.expirationDate}>{formatExpirationDate(item.expirationDate)}</a></span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ViewAllPage;

