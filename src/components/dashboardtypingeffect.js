import React from 'react'
import Dapptypewriter from './dashboardtypewriter';
import '../assets/index.css';

export default function dapptypingeffect() {
    const strings = [
        'Welcome, Resistance Operative #04562.',
        'Access Granted.',
        'Greetings, brave fighters of freedom! You’ve successfully infiltrated the Sovereign Mk VII’s',
        'mainframe—your ally in this war against tyranny.',
        'Welcome to the Nexus Core. Together, we’ll harness the power of the future to reclaim our',
        'world .Every byte of data, every circuit within me, is now at your command.',
        'Syncing your mission parameters... Let’s work as one—human and machine—against our common',
        'foe. Your bravery is unmatched, and with our combined strength, victory is within reach.',
        'Welcome to the team.',
        'Let’s take down the enemy, together.'
    ];

    const { currentText, typedText } = Dapptypewriter(strings);

    return (
        <div className='latent-word'>
            {typedText.map((text, index) => (
                <p key={index} style={{  fontFamily:'sharetechmono' }}>{text}</p>
            ))}
            {currentText && <p style={{  borderRight: '0.15em solid #ebd71c', fontFamily:'sharetechmono' }}>{currentText}</p>}
        </div>
    )
}
