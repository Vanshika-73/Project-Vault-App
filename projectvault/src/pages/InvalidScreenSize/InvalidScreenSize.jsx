import React, { useState, useEffect } from 'react';
import './InvalidScreenSize.css';
function InvalidScreenSize() {
    const imagePath = process.env.PUBLIC_URL + '/images/logo-t.png';
    return (
        <div className='invalid-screen-page'>
            <div className='invalid-header'>
                <img src={imagePath} />
            </div>
            <div className='invalid-body'>
                <h1>This website is only accessible on big screens like Laptop, Tablets, etc !!</h1>
            </div>
        </div>
        
    );
}

export default InvalidScreenSize;
