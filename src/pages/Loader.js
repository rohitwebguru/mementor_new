// src/components/Loader.js
import React, { useEffect } from 'react';
import './loader.css'; // Ensure to create this CSS file for styling

const Loader = () => {
    useEffect(() => {
        let progress = 0;
        const progressBar = document.querySelector('.progress');
        const percentageText = document.querySelector('.percentage');

        function updateProgress() {
            if (progress < 100) {
                progress += 1;
                progressBar.style.width = progress + '%';
                percentageText.textContent = progress + '%';
                setTimeout(updateProgress, 50);
            }
        }

        updateProgress();
    }, []);

    return (
        <div className="loader-container">
            <div className="loader">
                <div className="liquid"></div>
                <div className="liquid"></div>
                <div className="liquid"></div>
                <div className="liquid"></div>
                <div className="progress-bar">
                    <div className="progress"></div>
                    <div className="percentage">0%</div>
                </div>
            </div>
            <svg>
                <filter id="gooey">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
                    <feColorMatrix values="
                        1 0 0 0 0
                        0 1 0 0 0
                        0 0 1 0 0
                        0 0 0 20 -10
                        " />
                </filter>
            </svg>
        </div >
    );
};

export default Loader;
