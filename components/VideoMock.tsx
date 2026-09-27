import React, { useEffect, useState } from 'react';
import { Play } from 'lucide-react';
import { useCursor } from './CustomCursor';

const VideoMock: React.FC = () => {
  const { setCursorState, resetCursor } = useCursor();
  const [showChat, setShowChat] = useState(false);
  const [showNode, setShowNode] = useState(false);
  const [typedText, setTypedText] = useState("");
  
  const targetText = "Add a high-performance Redis cache for session storage.";

  useEffect(() => {
    // Animation sequence loop
    const runSequence = () => {
      setShowChat(false);
      setShowNode(false);
      setTypedText("");

      // 1. Show chat bubble
      setTimeout(() => {
        setShowChat(true);
      }, 500);

      // 2. Type text
      let i = 0;
      const typeInterval = setInterval(() => {
        if (i < targetText.length) {
          setTypedText(targetText.substring(0, i + 1));
          i++;
        } else {
            clearInterval(typeInterval);
            // 3. Show node after typing done
            setTimeout(() => {
                setShowNode(true);
            }, 500);
        }
      }, 50);

      // Reset triggers in loop (handled by interval in App or just runs once here? 
      // Let's make it run once on mount, then we can clean up if we wanted a loop, 
      // but simple CSS animation loop is easier for the bubble pop-in, 
      // JS for typing is fine.)
    };

    runSequence();
    
    // Loop it
    const loopInterval = setInterval(runSequence, 8000);
    return () => clearInterval(loopInterval);
  }, []);

  return (
    <div 
      className="relative w-full aspect-video bg-[#fafafa] rounded-[32px] overflow-hidden border border-[#e5e5e5] shadow-xl group"
      onMouseEnter={() => setCursorState("See the Workflow", <Play className="fill-black" size={14} />)}
      onMouseLeave={resetCursor}
    >
      {/* Mock Browser Header */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-white border-b border-[#e5e5e5] flex items-center px-6 gap-4 z-10">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#e5e5e5]" />
          <div className="w-3 h-3 rounded-full bg-[#e5e5e5]" />
          <div className="w-3 h-3 rounded-full bg-[#e5e5e5]" />
        </div>
        <div className="h-6 w-32 bg-[#f4f4f5] rounded-full flex items-center px-3">
             <span className="text-[10px] text-gray-400 font-mono">the-architect.ai</span>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="absolute inset-0 pt-12 flex items-center justify-center">
        {/* Background Grid */}
        <div className="absolute inset-0" style={{ 
            backgroundImage: 'radial-gradient(#e5e5e5 1px, transparent 1px)', 
            backgroundSize: '24px 24px' 
        }} />

        {/* Chat Interface Layer (Left Bottom) */}
        <div 
            className={`absolute bottom-8 left-8 bg-white border border-[#e5e5e5] shadow-lg rounded-xl p-4 w-80 transition-all duration-500 transform ${showChat ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
        >
            <div className="flex gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-xs font-bold text-blue-600">AI</span>
                </div>
                <div className="bg-gray-50 rounded-lg rounded-tl-none p-3 text-sm text-gray-700 font-medium">
                    {typedText}<span className="animate-pulse">|</span>
                </div>
            </div>
        </div>

        {/* The Node that appears (Center) */}
        <div 
            className={`relative bg-white border border-blue-200 shadow-xl rounded-lg p-4 w-64 transition-all duration-700 transform ${showNode ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}
        >
             <div className="absolute -top-3 left-4 bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                 New Service
             </div>
             <div className="flex items-center justify-between mb-4">
                 <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded bg-red-50 flex items-center justify-center">
                         <div className="text-red-500 font-mono text-xs font-bold">RDS</div>
                     </div>
                     <div>
                         <div className="text-sm font-semibold text-gray-900">Redis Cache</div>
                         <div className="text-xs text-gray-400 font-mono">cache.t3.micro</div>
                     </div>
                 </div>
                 <div className="w-2 h-2 rounded-full bg-green-500" />
             </div>
             <div className="space-y-2">
                 <div className="flex justify-between text-xs text-gray-500">
                     <span>Port</span>
                     <span className="font-mono">6379</span>
                 </div>
                 <div className="flex justify-between text-xs text-gray-500">
                     <span>Eviction</span>
                     <span className="font-mono">allkeys-lru</span>
                 </div>
             </div>
        </div>
      </div>
    </div>
  );
};

export default VideoMock;
