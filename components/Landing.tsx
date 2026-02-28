import React, { useState } from "react";
import {
  Eye,
  Brain,
  Sparkles,
  Lock,
  ArrowRight,
  Fingerprint,
} from "lucide-react";

interface LandingProps {
  onStart: () => void;
}

const Landing: React.FC<LandingProps> = ({ onStart }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen bg-black text-zinc-100 relative overflow-hidden font-sans selection:bg-rose-500 selection:text-white">
      {/* Noise Texture Overlay */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none z-50 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* Background Gradients */}
      <div className="fixed top-[-20%] left-[-10%] w-[800px] h-[800px] bg-rose-900/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 md:p-8 relative z-10">
        <div className="text-2xl font-display font-bold tracking-tighter text-white">
          Shadow <span className="text-rose-500">Self</span>
        </div>
        <div className="hidden md:flex gap-6 text-xs font-semibold uppercase tracking-widest text-zinc-500">
          <span>Rafay Khan</span>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center pt-12 pb-20 px-4 md:pt-20 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 backdrop-blur-md text-[10px] uppercase tracking-widest text-zinc-400 mb-8 animate-fade-in">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
          Now with Cosmic Accuracy
        </div>

        <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold tracking-tighter leading-[0.9] mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-600">
          UNCOVER YOUR <br />
          <span className="italic font-serif text-rose-500 mix-blend-hard-light">
            SHADOW SELF
          </span>
        </h1>

        <p className="max-w-xl text-lg md:text-xl text-zinc-400 leading-relaxed mb-10">
          This isn't a horoscope. It's a{" "}
          <span className="text-zinc-200 font-medium">
            psychological dissection
          </span>
          . Using Jungian archetypes and AI, we reveal your seduction style,
          your toxic traits, and your 2026 prophecy.
        </p>

        <button
          onClick={onStart}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="group relative px-10 py-5 bg-white text-black font-bold text-lg md:text-xl tracking-wider uppercase overflow-hidden transition-all hover:scale-105"
        >
          <div
            className={`absolute inset-0 bg-rose-500 transform transition-transform duration-300 ease-out ${
              isHovered ? "translate-x-0" : "-translate-x-full"
            }`}
          ></div>
          <span
            className={`relative z-10 flex items-center gap-3 transition-colors duration-300 ${
              isHovered ? "text-white" : "text-black"
            }`}
          >
            Start Analysis <ArrowRight size={20} />
          </span>
        </button>

        <p className="mt-6 text-xs text-zinc-600 uppercase tracking-widest">
          Takes 2 minutes • No Account Required
        </p>
      </main>

      {/* Marquee Banner */}
      <div className="w-full bg-zinc-900/50 border-y border-zinc-800 overflow-hidden py-3 relative z-10 rotate-[-1deg] origin-left scale-105">
        <div className="flex gap-12 animate-[scroll_20s_linear_infinite] whitespace-nowrap text-zinc-500 text-xs font-bold uppercase tracking-[0.2em]">
          <span>/// Seduction Archetypes</span>
          <span>/// Cognitive Functions</span>
          <span>/// Shadow Work</span>
          <span>/// Villain Arc Analysis</span>
          <span>/// Brutal Honesty</span>
          <span>/// 100% Private</span>
          <span>/// Seduction Archetypes</span>
          <span>/// Cognitive Functions</span>
          <span>/// Shadow Work</span>
          <span>/// Villain Arc Analysis</span>
        </div>
      </div>

      {/* Value/Trust Grid */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        {/* Card 1 */}
        <div className="p-8 glass-panel rounded-sm border border-zinc-800 hover:border-rose-900/50 transition-colors group">
          <Brain className="w-8 h-8 text-zinc-500 mb-4 group-hover:text-rose-500 transition-colors" />
          <h3 className="text-lg font-display font-bold text-white mb-2">
            Not Just "Vibes"
          </h3>
          <p className="text-sm text-zinc-400 leading-relaxed">
            We combine MBTI cognitive functions (Ni/Ne/Si/Se) with the 9
            Seduction Archetypes to create a profile that actually feels like
            you.
          </p>
        </div>

        {/* Card 2 */}
        <div className="p-8 glass-panel rounded-sm border border-zinc-800 hover:border-purple-900/50 transition-colors group">
          <Eye className="w-8 h-8 text-zinc-500 mb-4 group-hover:text-purple-500 transition-colors" />
          <h3 className="text-lg font-display font-bold text-white mb-2">
            The "Cosmic" Layer
          </h3>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Connect your birth chart to see how your Zodiac sign weaponizes your
            seduction style. It’s the crossover you didn’t know you needed.
          </p>
        </div>

        {/* Card 3 */}
        <div className="p-8 glass-panel rounded-sm border border-zinc-800 hover:border-emerald-900/50 transition-colors group">
          <Lock className="w-8 h-8 text-zinc-500 mb-4 group-hover:text-emerald-500 transition-colors" />
          <h3 className="text-lg font-display font-bold text-white mb-2">
            Data Suicide
          </h3>
          <p className="text-sm text-zinc-400 leading-relaxed">
            We don't want your data. Your results exist only in this tab. Once
            you close it, the analysis is deleted forever. Total anonymity.
          </p>
        </div>
      </section>

      {/* Social Proof / "Main Character" vibe */}
      <section className="text-center pb-20 px-4">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-zinc-800 text-rose-500 mb-6">
          <Fingerprint size={24} />
        </div>
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
          Are you the Villain or the Muse?
        </h2>
        <p className="text-zinc-500 max-w-lg mx-auto mb-8">
          Join thousands of others who have stopped apologizing for their energy
          and started mastering it.
        </p>
        <button
          onClick={onStart}
          className="text-sm border-b border-zinc-600 pb-1 hover:text-rose-500 hover:border-rose-500 transition-colors uppercase tracking-widest"
        >
          Enter the Simulation
        </button>
      </section>

      {/* Footer / Support */}
      <footer className="py-12 border-t border-zinc-900 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <p className="text-zinc-600 text-xs leading-relaxed mb-4">
            Shadow Self is an open-source experiment. If you enjoy this
            psychological dissection, consider supporting the development of
            more tools like this.
          </p>
          <div className="flex justify-center gap-6 text-xs font-bold uppercase tracking-widest text-zinc-500">
            <a
              href="https://github.com/RafayYousafzai"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-rose-500 transition-colors"
            >
              RafayYousafzai
            </a>
            <a
              href="https://github.com/RafayYousafzai/shadow-self"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-rose-500 transition-colors"
            >
              Source Code
            </a>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default Landing;
