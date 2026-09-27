import React, { useEffect, useRef, useState, createContext, useContext } from 'react';
import { CursorContextType } from '../types';

export const CursorContext = createContext<CursorContextType>({
  cursorText: '',
  cursorIcon: null,
  setCursorState: () => {},
  resetCursor: () => {},
});

export const CustomCursorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cursorText, setCursorText] = useState('');
  const [cursorIcon, setCursorIcon] = useState<React.ReactNode | null>(null);

  const setCursorState = (text: string, icon?: React.ReactNode) => {
    setCursorText(text);
    if (icon) setCursorIcon(icon);
  };

  const resetCursor = () => {
    setCursorText('');
    setCursorIcon(null);
  };

  return (
    <CursorContext.Provider value={{ cursorText, cursorIcon, setCursorState, resetCursor }}>
      {children}
      <CursorInner text={cursorText} icon={cursorIcon} />
    </CursorContext.Provider>
  );
};

const CursorInner: React.FC<{ text: string; icon: React.ReactNode | null }> = ({ text, icon }) => {
  const dotRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);
  const previousTimeRef = useRef<number>(0);
  
  // Mouse position state
  const endX = useRef(0);
  const endY = useRef(0);
  
  // Current interpolated position
  const _x = useRef(0);
  const _y = useRef(0);
  
  // Dot position (immediate)
  const _dotX = useRef(0);
  const _dotY = useRef(0);

  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      endX.current = event.clientX;
      endY.current = event.clientY;
      _dotX.current = event.clientX;
      _dotY.current = event.clientY;
      
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${_dotX.current}px, ${_dotY.current}px, 0) translate(-50%, -50%)`;
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    
    // Animation loop for smooth trailing
    const animateCursor = (time: number) => {
      if (previousTimeRef.current !== undefined) {
        // Smooth lerp
        _x.current += (endX.current - _x.current) * 0.15;
        _y.current += (endY.current - _y.current) * 0.15;
      }
      previousTimeRef.current = time;

      if (outlineRef.current) {
        outlineRef.current.style.transform = `translate3d(${_x.current}px, ${_y.current}px, 0) translate(-50%, -50%)`;
      }

      requestRef.current = requestAnimationFrame(animateCursor);
    };

    requestRef.current = requestAnimationFrame(animateCursor);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  useEffect(() => {
    if (text) {
      document.body.classList.add('hover-active');
    } else {
      document.body.classList.remove('hover-active');
    }
  }, [text]);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={outlineRef} className="cursor-dot-outline">
        <div className="cursor-label">
          {icon && <span className="w-4 h-4">{icon}</span>}
          {text}
        </div>
      </div>
    </>
  );
};

export const useCursor = () => useContext(CursorContext);
