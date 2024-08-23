import React, { useEffect, useState } from 'react';
import cursorImage from '../assets/images/crosshair.png';

const CustomCursor = () => {
  const [dotPosition, setDotPosition] = useState({ x: 0, y: 0 });
  const [circlePosition, setCirclePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const { clientX: x, clientY: y } = event;
      setDotPosition({ x, y });
    };

    const handleMouseDown = () => {
      setIsClicking(true);
      setTimeout(() => setIsClicking(false), 300);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  useEffect(() => {
    const links = document.querySelectorAll('a, button, [role="button"]');
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    links.forEach((link) => {
      link.addEventListener('mouseenter', handleMouseEnter);
      link.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      links.forEach((link) => {
        link.removeEventListener('mouseenter', handleMouseEnter);
        link.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCirclePosition((prev) => ({
        x: prev.x + (dotPosition.x - prev.x) * 0.2, // Adjust interpolation factor to make it smoother
        y: prev.y + (dotPosition.y - prev.y) * 0.2, // Adjust interpolation factor to make it smoother
      }));
    }, 5); // Increase frequency by reducing interval duration

    return () => clearInterval(interval);
  }, [dotPosition]);

  return (
    <div className="cursor-container">
      <div
        className={`cursor-dot ${isHovering ? 'hover' : ''} ${isClicking ? 'click' : ''}`}
        style={{ left: `${dotPosition.x}px`, top: `${dotPosition.y}px` }}
      />
      <img
        src={cursorImage}
        alt="Cursor"
        className={`cursor-image ${isHovering ? 'hover' : ''} ${isClicking ? 'click' : ''}`}
        style={{ left: `${circlePosition.x}px`, top: `${circlePosition.y}px` }}
      />
    </div>
  );
};

export default CustomCursor;
