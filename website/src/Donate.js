import React from 'react';
import Credits from './creditsbar';

function Donate(){
    return(
        <div className='donate-container'>
            <img src="https://img.freepik.com/free-photo/fresh-coffee-steams-wooden-table-close-up-generative-ai_188544-8923.jpg" alt='img'
                height='300px'
                width='600px'
            />
            <h1>
                Be sure to paypal (or make us laugh): 
            </h1>
            <p>
                Nick
            </p>
            <p>
                Trung
            </p>
            <p>
                Evan
            </p>
            <p>
                Connie
            </p>
            <Credits/>
        </div>
    );
}

export default Donate;