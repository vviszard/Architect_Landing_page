import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useCursor } from './CustomCursor';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { setCursorState, resetCursor } = useCursor();

  const navLinks = [
    { name: 'Manifesto', href: '#' },
    { name: 'Engine', href: '#' },
    { name: 'Pricing', href: '#' },
    { name: 'Blog', href: '#' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60 border-b border-black/5 transition-all duration-300">
      <div className="grid-container h-full">
        <div className="flex items-center justify-between h-full">
            {/* Left: Logo */}
            <div 
                className="flex items-center gap-2 cursor-pointer group" 
                onMouseEnter={() => setCursorState("Home")} 
                onMouseLeave={resetCursor}
            >
                <img 
                    src="/logo.png" 
                    alt="The Architect Logo" 
                    className="w-8 h-8 object-contain group-hover:rotate-6 transition-transform duration-300"
                />
                <span className="font-semibold tracking-tight text-zinc-900 text-lg">The Architect</span>
            </div>

            {/* Center: Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => (
                    <a 
                        key={link.name} 
                        href={link.href} 
                        className="text-sm font-medium text-zinc-500 hover:text-black transition-colors"
                    >
                        {link.name}
                    </a>
                ))}
            </div>

            {/* Right: CTA & Mobile Menu */}
            <div className="flex items-center gap-4">
                <button 
                    className="hidden md:block px-5 py-2 bg-zinc-950 text-white text-sm font-medium rounded-full hover:bg-zinc-800 active:scale-95 transition-all shadow-sm hover:shadow-md"
                    onMouseEnter={() => setCursorState("Join v1.0")}
                    onMouseLeave={resetCursor}
                >
                    Request Access
                </button>

                {/* Mobile Menu Toggle */}
                <button 
                    className="md:hidden p-2 text-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white border-b border-gray-100 p-6 shadow-xl md:hidden flex flex-col gap-6 animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                    <a 
                        key={link.name} 
                        href={link.href} 
                        className="text-lg font-medium text-zinc-600 hover:text-black"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        {link.name}
                    </a>
                ))}
            </div>
            <div className="h-px bg-gray-100 w-full" />
            <button className="w-full px-5 py-3 bg-zinc-950 text-white font-medium rounded-full active:scale-95 transition-transform">
                Request Access
            </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;