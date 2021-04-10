import React from 'react';
import './Footer.css';

const footer = () => {
    const year = new Date().getUTCFullYear();
    return (
        <footer>
            <div className="footer__bottom">
                <p>&copy; {year} all rights reserved</p>
            </div>
        </footer>
    );
}

export default footer;