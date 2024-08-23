import React, { useState } from 'react';

const ToBox = ({ currencyName, balance }) => {
    const [amount, setAmount] = useState('');
    const [maxAmount, setMaxAmount] = useState('');

    const handleMaxClick = () => {
        if (balance === '{no wallet connected}') {
            // Handle case where no wallet is connected
            console.log('No wallet connected');
            return;
        }
        setAmount(balance);
    };

    const handleHalfClick = () => {
        if (balance === '{no wallet connected}') {
            // Handle case where no wallet is connected
            console.log('No wallet connected');
            return;
        }
        const halfAmount = parseFloat(balance) / 2;
        setAmount(halfAmount.toFixed(2)); // Adjust decimal places as needed
    };

    return (
        <div className="crypto-input-box">
            <div className="crypto-input-label">To</div>
            <div className="crypto-input-field">
                <span>{currencyName}</span>
                <input
                    type="number"
                    step="0.01"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <div className="balance-info">Balance: {balance}</div>
                <div className="max-half-buttons">
                    <button onClick={handleMaxClick}>Max</button>
                    <button onClick={handleHalfClick}>Half</button>
                </div>
            </div>
        </div>
    );
};

export default ToBox;
