import React from 'react';
import { CustomCursorProvider, useCursor } from './components/CustomCursor';
import ParticleBackground from './components/ParticleBackground';
import TypedHeader from './components/TypedHeader';
import FloatingIcons from './components/FloatingIcons';
import VideoMock from './components/VideoMock';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { ArrowRight, Terminal, ShieldAlert, Code } from 'lucide-react';

const HeroCTA = () => {
    const { setCursorState, resetCursor } = useCursor();
    return (
        <div className="flex flex-wrap gap-4">
            <a 
                href="https://try-architect-demo.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#1a1a1a] text-white rounded-full font-medium text-lg hover:scale-105 transition-transform duration-200"
                onMouseEnter={() => setCursorState("Try Demo")}
                onMouseLeave={resetCursor}
            >
            Try Demo
            </a>
            <button className="px-8 py-4 bg-transparent border border-[#e5e5e5] text-[#1a1a1a] rounded-full font-medium text-lg hover:bg-gray-50 transition-colors duration-200">
            Watch the Workflow
            </button>
        </div>
    )
}

const App: React.FC = () => {
  return (
    <CustomCursorProvider>
      <Navbar />
      <main className="relative w-full min-h-screen">
        <ParticleBackground />

        {/* Hero Section */}
        <section className="welcome-wrapper relative pt-32 pb-20 md:pt-48 md:pb-32">
          <div className="grid-container">
            <div className="grid-row">
              <div className="grid-col col-12 col-md-12 lg:col-md-10">
                <div className="mb-10 min-h-[160px] md:min-h-[200px]">
                  <TypedHeader strings={[
                      "Stop dreaming in circles.",
                      "Stop coding without a map.",
                      "Start Architecting."
                  ]} />
                </div>
                <p className="text-xl md:text-2xl text-gray-500 max-w-2xl mb-12 font-light leading-relaxed">
                  The first AI workspace that translates your scattered ideas into executable technical blueprints. From napkin sketch to PRD in seconds.
                </p>
                <HeroCTA />
              </div>
            </div>
            
            {/* Agitation Section - Chaos to Order */}
            <div className="grid-row mt-32 md:mt-48">
              <div className="grid-col col-12">
                <FloatingIcons />
              </div>
            </div>
          </div>
        </section>

        {/* Feature Grid - The Solution */}
        <section className="feature-explorer-section py-20 bg-gradient-to-b from-white to-gray-50 border-t border-[#f4f4f5]">
          <div className="grid-container">
            
            {/* Card 1: The AI CTO */}
            <div className="grid-row items-center mb-32">
              <div className="grid-col col-12 col-md-5 mb-8 md:mb-0">
                <div className="pr-8">
                  <h3 className="text-3xl font-semibold mb-4 tracking-tight">The AI CTO.</h3>
                  <p className="text-lg text-gray-500 mb-6 leading-relaxed">
                    It doesn't just draw boxes. It understands stack compatibility, data flow, and edge cases. You talk, it structures.
                  </p>
                  <div className="flex items-center gap-2 font-mono text-sm text-blue-600">
                    <ArrowRight size={16} />
                    <span>See the demo</span>
                  </div>
                </div>
              </div>
              <div className="grid-col col-12 col-md-7">
                <VideoMock />
              </div>
            </div>

            {/* Card 2 & 3: Grid Split */}
            <div className="grid-row">
               {/* Card 2: Ghost Nodes */}
               <div className="grid-col col-12 col-md-6 mb-8 md:mb-0">
                   <div className="h-full bg-white border border-[#e5e5e5] rounded-3xl p-8 hover:shadow-lg transition-shadow duration-300 relative overflow-hidden group">
                       <div className="mb-8 relative z-10">
                           <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center mb-6">
                               <ShieldAlert className="text-orange-500" />
                           </div>
                           <h3 className="text-2xl font-semibold mb-2">It knows what you forgot.</h3>
                           <p className="text-gray-500">Missed the rate limiter? Forgot the auth callback? The Architect suggests 'Ghost Nodes' to complete your logic.</p>
                       </div>
                       
                       {/* Visual */}
                       <div className="relative h-48 bg-[#fafafa] rounded-xl border border-dashed border-gray-300 flex items-center justify-center">
                           <div className="absolute inset-0 flex items-center justify-center">
                               <div className="bg-white border-2 border-orange-200 border-dashed rounded-lg p-4 shadow-sm animate-pulse">
                                   <div className="flex items-center gap-3">
                                       <div className="w-8 h-8 rounded bg-orange-100 flex items-center justify-center">
                                           <span className="text-xs font-bold text-orange-600">AUTH</span>
                                       </div>
                                       <div>
                                           <div className="text-sm font-semibold text-gray-800">Auth Service</div>
                                           <div className="text-xs text-orange-500">Missing Dependency</div>
                                       </div>
                                   </div>
                               </div>
                           </div>
                           {/* Decorative lines */}
                           <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-200 -z-10" />
                           <div className="absolute left-1/2 top-0 w-[1px] h-full bg-gray-200 -z-10" />
                       </div>
                   </div>
               </div>

               {/* Card 3: Export to Reality */}
               <div className="grid-col col-12 col-md-6">
                   <div className="h-full bg-[#1a1a1a] text-white rounded-3xl p-8 hover:shadow-xl transition-shadow duration-300 relative overflow-hidden">
                       <div className="mb-8 relative z-10">
                           <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                               <Terminal className="text-white" />
                           </div>
                           <h3 className="text-2xl font-semibold mb-2">Export to Reality.</h3>
                           <p className="text-gray-400">Don't get stuck in the diagram. One click generates your create-next-app boilerplate and README.md.</p>
                       </div>

                       {/* Visual */}
                       <div className="relative bg-[#000] rounded-xl border border-white/10 p-4 font-mono text-xs overflow-hidden">
                           <div className="flex gap-1.5 mb-4">
                               <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                               <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                               <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                           </div>
                           <div className="space-y-1 text-gray-300">
                               <p><span className="text-green-400">➜</span> <span className="text-blue-400">~</span> npx create-architect-app my-saas</p>
                               <p className="text-gray-500">Initializing project structure...</p>
                               <p className="pl-4">✓ <span className="text-white">Next.js 14 Configured</span></p>
                               <p className="pl-4">✓ <span className="text-white">Tailwind CSS Installed</span></p>
                               <p className="pl-4">✓ <span className="text-white">Supabase Client Generated</span></p>
                               <p className="pl-4">✓ <span className="text-white">Stripe Webhooks Ready</span></p>
                               <p className="mt-2 text-green-400">Done in 2.4s. Happy hacking.</p>
                               <div className="w-2 h-4 bg-gray-500 animate-pulse mt-1" />
                           </div>
                       </div>
                   </div>
               </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </CustomCursorProvider>
  );
};

export default App;