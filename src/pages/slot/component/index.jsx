"use client"

import React, { useState, useEffect } from 'react';
import Spinner from "./spinner";

interface TextSymbol {
  type: 'text';
  value: string;
}

interface ImageSymbol {
  type: 'image';
  src: string;
  loaded: boolean; // Added a flag to track image loading
}

type Symbol = TextSymbol | ImageSymbol;

interface SlotMachineProps {
  imgArray1: string[];
  imgArray2: string[];
  imgArray3: string[];
  textArray1: string[];
  textArray2: string[];
}

const SlotMachine: React.FC<SlotMachineProps> = ({ imgArray1, imgArray2, imgArray3, textArray1, textArray2 }) => {
  const [spinning, setSpinning] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  //@ts-ignore
  const [results, setResults] = useState<Array<Symbol>>([[], [], [], [], []]);

  useEffect(() => {
    // Load actual images asynchronously
    const loadImages = async () => {
      const loadedResults = await Promise.all(
        results.map(async (symbol) => {
          if (symbol.type === 'image' && !symbol.loaded) {
            const image = new Image();
            image.src = (symbol as ImageSymbol).src;
            await new Promise((resolve) => {
              image.onload = () => {
                symbol.loaded = true;
                resolve(true);
              };
            });
          }
          return symbol;
        })
      );
      setResults(loadedResults);
    };
    loadImages();
  }, [results]);

  const getRandomSymbol = (arr: string[]): Symbol => {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return { type: 'image', src: arr[randomIndex], loaded: false }; // Initialize loaded as false
  };

  const spinReels = () => {
    setSpinning(true);
    const newResults: Symbol[] = [];
    for (let col = 0; col < 5; col++) {
      let symbol: Symbol;
      switch (col) {
        case 0:
          symbol = getRandomSymbol(imgArray1);
          break;
        case 1:
          symbol = { type: 'text', value: textArray1[Math.floor(Math.random() * textArray1.length)] };
          break;
        case 2:
          symbol = getRandomSymbol(imgArray2);
          break;
        case 3:
          symbol = { type: 'text', value: textArray2[Math.floor(Math.random() * textArray2.length)] };
          break;
        case 4:
          symbol = getRandomSymbol(imgArray3);
          break;
        default:
          symbol = { type: 'text', value: 'Error' };
          break;
      }
      newResults.push(symbol);
    }
    setResults(newResults);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex === 4 ? 0 : prevIndex + 1));
      setSpinning(false);
    }, 1000);
  };
  const renderSymbol = (symbol: Symbol, index: number) => {
    const delay = index * 0.2;
    return (
      <div key={index} className="symbol" style={{ animationDelay: `${delay}s` }}>
        {symbol.type === 'text' ? (
          <span className="text">{symbol.value}</span>
        ) : symbol.loaded ? ( // Render image only when loaded
          <img className="image" src={(symbol as ImageSymbol).src} alt="symbol" />
        ) : (
          <img className="image" src="placeholder.jpg" alt="loading" /> // Placeholder image
        )}
      </div>
    );
  };

  return (  
       <>
        {/* <div className="slot-machine">
      <div className="reel-row">
        {results.map(renderSymbol)}
      </div>
      <button onClick={spinReels} disabled={spinning} className={`spin-button ${spinning ? 'spinning' : ''}`}>
        {spinning ? 'Spinning...' : 'Spin'}
      </button>
    </div> */}
    
    {/* <Spinner /> */}

       </>
   
  );
};

export default SlotMachine;
