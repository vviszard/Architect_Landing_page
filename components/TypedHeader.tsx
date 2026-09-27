import React, { useEffect, useRef, useState } from 'react';

interface TypedHeaderProps {
  strings: string[];
}

const TypedHeader: React.FC<TypedHeaderProps> = ({ strings }) => {
  const [currentStringIndex, setCurrentStringIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const typeSpeed = 50;
    const deleteSpeed = 30;
    const pauseDuration = 1500;

    const handleTyping = () => {
      const fullString = strings[currentStringIndex];

      if (isPaused) return;

      if (!isDeleting) {
        // Typing
        setCurrentText(fullString.substring(0, currentText.length + 1));
        
        // Finished typing
        if (currentText.length === fullString.length) {
          // If it's the last string, don't delete, just stay there (or loop? Instructions say: "Start Architecting." (Hold, Cursor Blinks))
          // "Type: 'Start Architecting.' (Hold, Cursor Blinks)" implies stop at last one.
          if (currentStringIndex === strings.length - 1) {
             setIsPaused(true); // Stop indefinitely
             return;
          }
          setIsPaused(true);
          setTimeout(() => {
            setIsPaused(false);
            setIsDeleting(true);
          }, pauseDuration);
        }
      } else {
        // Deleting
        setCurrentText(fullString.substring(0, currentText.length - 1));

        // Finished deleting
        if (currentText.length === 0) {
          setIsDeleting(false);
          setCurrentStringIndex((prev) => (prev + 1) % strings.length);
        }
      }
    };

    const timer = setTimeout(handleTyping, isDeleting ? deleteSpeed : typeSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, isPaused, currentStringIndex, strings]);

  // Cursor positioning logic
  useEffect(() => {
    if (!containerRef.current || !cursorRef.current) return;
    
    // We need to find the position of the last character
    const spans = containerRef.current.querySelectorAll('span');
    
    if (spans.length > 0) {
      const lastSpan = spans[spans.length - 1];
      const containerRect = containerRef.current.getBoundingClientRect();
      const spanRect = lastSpan.getBoundingClientRect();
      
      const relX = spanRect.right - containerRect.left;
      const relY = spanRect.top - containerRect.top;
      const height = spanRect.height;
      
      cursorRef.current.style.transform = `translate3d(${relX}px, ${relY + 4}px, 0)`;
      cursorRef.current.style.height = `${height * 0.8}px`;
      cursorRef.current.style.opacity = '1';
    } else {
      // Start position
      cursorRef.current.style.transform = `translate3d(0px, 4px, 0)`;
      cursorRef.current.style.height = `1em`; // approximation
      // Hide cursor if text is empty during delete phase to avoid jumping, or keep at 0
    }
  }, [currentText]);

  return (
    <div className="relative inline-block w-full max-w-5xl min-h-[1.2em]" ref={containerRef}>
      <h1 className="text-4xl md:text-6xl font-medium tracking-tight leading-tight text-[#1a1a1a]">
        {currentText.split('').map((char, index) => (
          <span key={index}>{char}</span>
        ))}
        {/* Placeholder to keep height when empty */}
        {currentText.length === 0 && <span className="opacity-0">|</span>}
      </h1>
      
      {/* The Custom Caret */}
      <div 
        ref={cursorRef}
        className={`absolute top-0 left-0 w-[3px] bg-[#2563eb] transition-all duration-75 ease-out ${isPaused && currentStringIndex === strings.length - 1 ? 'animate-pulse' : ''}`}
        style={{ height: '1em' }}
      />
    </div>
  );
};

export default TypedHeader;
