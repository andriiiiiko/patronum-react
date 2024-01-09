import React from 'react';
import './App.css'
import './styles/divWithImage.css'

const imagesData = [
    {id: 1, src: './images/photo1.jpg', alt: 'Photo 1', name: 'Andrii', role: 'Team Lead'},
    {id: 2, src: './images/photo2.jpg', alt: 'Photo 2', name: 'Sergey', role: 'Developer'},
    {id: 3, src: './images/photo3.jpg', alt: 'Photo 3', name: 'Vlad', role: 'Developer'},
    {id: 4, src: './images/photo4.jpg', alt: 'Photo 4', name: 'Diana', role: 'Developer'},
    {id: 5, src: './images/photo5.jpg', alt: 'Photo 5', name: 'Nazar', role: 'Developer'},
    {id: 6, src: './images/photo6.jpg', alt: 'Photo 6', name: 'Oleksii', role: 'Developer'},
    {id: 7, src: './images/photo7.jpg', alt: 'Photo 7', name: 'Yelysei', role: 'Developer'},
    {id: 8, src: './images/photo8.jpg', alt: 'Photo 8', name: 'Vitaliy', role: 'Developer'},
];

const About = () => {
    return (
        <div className='App-container'>
            <h1 className='App-title'>Team Final Project Java 13 GoIT</h1>
            <div className='About-info'>
                <div className='App-command'>
                    <h2 className='App-command-title'>PATRONUM</h2>
                    <div className="divWithImage">
                        <img src="/images/logo.jpg" alt="Logo team"/>
                    </div>
                </div>
                <div className='App-team'>
                    <h2>Team members.</h2>
                    <div className='App-team-info'>
                        {imagesData.map((image) => (
                            <div key={image.id} className='team-member'>
                                <img src={image.src} alt={image.alt}
                                     style={{width: '150px', height: '150px'}}/>
                                <span>{image.name}</span>
                                <span>{image.role}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <br/>
            <div>
            <h4>Special thanks for help with the React Andrey Khaylo.</h4>
            </div>
        </div>
    );
};


export default About;
