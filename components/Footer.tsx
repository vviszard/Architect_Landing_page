import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useCursor } from './CustomCursor';

const Footer: React.FC = () => {
  const { setCursorState, resetCursor } = useCursor();
  const [email, setEmail] = useState('');

  return (
    <footer className="relative w-full pt-32 pb-12 overflow-hidden bg-white">
      {/* Massive Text Background */}
      <div className="w-full relative z-0">
        <svg viewBox="0 0 1320 300" className="w-full h-auto opacity-10">
          <pattern id="grid-pattern-footer" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
             <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1a1a1a" strokeWidth="1"/>
          </pattern>
          <text 
            x="50%" 
            y="80%" 
            textAnchor="middle" 
            className="text-[20vw] font-bold tracking-tighter"
            style={{ 
              fontFamily: "'Inter', sans-serif",
              fill: 'url(#grid-pattern-footer)',
            }}
          >
            SHIP
          </text>
        </svg>
      </div>

      <div className="grid-container relative z-10 -mt-12 md:-mt-32">
        <div className="grid-row justify-center">
             <div className="grid-col col-12 col-md-6">
                 <div className="bg-white/80 backdrop-blur-md border border-[#e5e5e5] p-8 rounded-2xl shadow-2xl">
                     <h3 className="text-2xl font-semibold mb-2 text-center">Join the Waitlist</h3>
                     <p className="text-center text-gray-500 mb-6 text-sm">Batch 1 is 84% full. Secure your node.</p>
                     
                     <div className="flex flex-col sm:flex-row gap-2">
                         <input 
                            type="email" 
                            placeholder="architect@founder.com"
                            className="flex-1 px-4 py-3 bg-[#f4f4f5] border-none rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-[#1a1a1a] placeholder-gray-400"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                         />
                         <button 
                            className="px-6 py-3 bg-[#1a1a1a] text-white font-medium rounded-lg hover:bg-black transition-colors flex items-center justify-center gap-2"
                            onMouseEnter={() => setCursorState("Join v1.0")}
                            onMouseLeave={resetCursor}
                         >
                             Request Access <ArrowRight size={16} />
                         </button>
                     </div>
                 </div>
             </div>
        </div>

        <div className="grid-row justify-between items-end mt-24 text-sm text-gray-400 font-mono">
           <div className="grid-col col-12 col-md-6 mb-4 md:mb-0">
             © 2024 The Architect. Built by <span className="text-zinc-700 font-medium">Vishwas Paliwal</span>.
           </div>
           <div className="grid-col col-12 col-md-6 text-left md:text-right">
             System Status: <span className="text-green-500">All Systems Go</span>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
