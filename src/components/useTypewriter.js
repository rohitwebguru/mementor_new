import { useState, useEffect } from 'react';

const useTypewriter = (strings, typeSpeed = 40) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paragraphIndex, setParagraphIndex] = useState(0);
  const [typedText, setTypedText] = useState([]);

  useEffect(() => {
    if (paragraphIndex < strings.length) {
      const interval = setInterval(() => {
        setCurrentText((prev) => prev + strings[paragraphIndex][currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, typeSpeed);

      if (currentIndex === strings[paragraphIndex].length) {
        clearInterval(interval);
        setTypedText((prev) => [...prev, strings[paragraphIndex]]);
        setCurrentText('');
        setCurrentIndex(0);
        setParagraphIndex((prev) => prev + 1);
      }

      return () => clearInterval(interval);
    }
  }, [currentIndex, paragraphIndex, strings, typeSpeed]);

  return { currentText, typedText };
};

export default useTypewriter;
