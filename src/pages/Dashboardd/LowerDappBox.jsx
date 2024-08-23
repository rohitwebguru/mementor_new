import React from 'react';
import './dashboard.css'; // Import Dashboard-specific CSS

const LowerDappBox = ({ solPrice, solPriceChange, rayPrice, rayPriceChange }) => {
    return (
        <div className="dashboard-box">
            {/* LOWER BOX */}
            <div className="coin-grid">
                <div className="g-col-4-header"><u>From</u></div>
                <div className="g-col-4-header"><u>Price</u></div>
                <div className="g-col-4-header"><u>24 Hour Price Change</u></div>
                <div className="g-col-4-header"><u>Graph 1</u></div>

                <div className="g-col-4">SOL</div>
                <div className="g-col-4">${solPrice !== null ? solPrice.toFixed(2) : 'Loading...'}</div>
                <div className="g-col-4">{solPriceChange !== null ? `${solPriceChange.toFixed(2)}%` : 'Loading...'}</div>
                <div className="g-col-4">GRAPH 1</div>

                <div className="g-col-4-header"><u>To</u></div>
                <div className="g-col-4-header"><u>Price</u></div>
                <div className="g-col-4-header"><u>24 Hour Price Change</u></div>
                <div className="g-col-4-header"><u>Graph 2</u></div>

                <div className="g-col-4">RAY</div>
                <div className="g-col-4">${rayPrice !== null ? rayPrice.toFixed(2) : 'Loading...'}</div>
                <div className="g-col-4">{rayPriceChange !== null ? `${rayPriceChange.toFixed(2)}%` : 'Loading...'}</div>
                <div className="g-col-4">GRAPH 2</div>
            </div>
        </div>
    );
}

export default LowerDappBox;
