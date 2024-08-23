import React from 'react';
import useTypewriter from './useTypewriter';
import '../assets/index.css';

const TypewriterEffect = () => {
  const strings = [
    'The past is the future.',
    'The year is 2078, a signal was detected in skynet that terminators were sent back in time to destroy the meme culture.',
    'The AI prototype algorithm had mistaken all memes as a threat to the future, not every cyborg had agreements with the skynet system. They were once a meme before being assimilated and their existence would not have occurred if it was not for the past.',
    'In order to defeat the cryptic plot by skynet, Memenato R1000 was sent back to the year 2024 to defeat all terminators sent from the future and defend memes.',
    'The degens and chads of the world were being liquidated when the terminators arrived, but a glimmer of hope arrived once Memenato R1000 created the artificial intelligence portal and arrived into cyberspace in the year 2024.'
  ];

  const { currentText, typedText } = useTypewriter(strings);

  return (
    <div>
      {typedText.map((text, index) => (
        <p key={index} style={{ marginBottom: '16px' }}>{text}</p>
      ))}
      {currentText && <p style={{ marginBottom: '16px' }}>{currentText}</p>}
    </div>
  );
};

export default TypewriterEffect;
