import React from 'react';
import { Database, Server, Globe, Cpu, Shield, Zap } from 'lucide-react';

const icons = [
  { Icon: Database, delay: 0 },
  { Icon: Server, delay: 1.2 },
  { Icon: Globe, delay: 2.5 },
  { Icon: Cpu, delay: 0.8 },
  { Icon: Shield, delay: 3.1 },
  { Icon: Zap, delay: 1.9 },
];

const FloatingIcons: React.FC = () => {
  return (
    <div className="w-full">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-semibold text-[#1a1a1a] mb-4">
          Your brain is not a file system.
        </h2>
        <p className="text-lg text-gray-500 font-light">
          Don't let your million-dollar architecture die in a messy notebook.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-8 py-8 px-4">
        {icons.map(({ Icon, delay }, idx) => (
          <div 
            key={idx}
            className="relative group"
          >
            <div 
              className="flex items-center justify-center w-20 h-20 rounded-full border border-[#e5e5e5] bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
              style={{
                animation: `float 6s ease-in-out infinite`,
                animationDelay: `${delay}s`
              }}
            >
              <Icon className="w-8 h-8 text-gray-400 transition-colors group-hover:text-[#2563eb]" strokeWidth={1.5} />
            </div>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-16px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </div>
  );
};

export default FloatingIcons;
