
import React, { useEffect, useState } from 'react';
import { ParsedResult } from '../types';
import { generateMoodboardImage } from '../services/geminiService';
import { RefreshCw, Star, Sparkles, Flame } from 'lucide-react';

interface ResultsProps {
  result: ParsedResult;
  onRetake: () => void;
}

const Results: React.FC<ResultsProps> = ({ result, onRetake }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loadingImage, setLoadingImage] = useState(false);

  useEffect(() => {
    const fetchImage = async () => {
      if (result.moodboardPrompt) {
        setLoadingImage(true);
        const url = await generateMoodboardImage(result.moodboardPrompt);
        setImageUrl(url);
        setLoadingImage(false);
      }
    };
    fetchImage();
  }, [result]);

  return (
    <div className="min-h-screen bg-black text-zinc-200 p-4 md:p-8 animate-fade-in">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
        
        {/* Left Column: Visuals & Core Stats */}
        <div className="space-y-8">
          <div className="relative w-full aspect-square glass-panel border-zinc-800 overflow-hidden flex items-center justify-center bg-zinc-900">
             {loadingImage ? (
               <div className="flex flex-col items-center gap-4">
                 <div className="w-12 h-12 border-4 border-zinc-800 border-t-rose-500 rounded-full animate-spin"></div>
                 <span className="text-xs uppercase tracking-widest animate-pulse text-rose-500">Conjuring Moodboard...</span>
               </div>
             ) : imageUrl ? (
               <img src={imageUrl} alt="Moodboard" className="w-full h-full object-cover animate-fade-in" />
             ) : (
               <div className="p-8 text-center text-zinc-600">
                 <span className="block mb-2 text-4xl opacity-20">☾</span>
                 <p className="text-xs uppercase tracking-widest">Visual Manifestation Failed</p>
                 <p className="text-[10px] mt-2 opacity-50">{result.moodboardPrompt}</p>
               </div>
             )}
          </div>

          <div className="glass-panel p-6 border-t-4 border-t-rose-900">
            <h3 className="text-xs font-bold uppercase tracking-widest text-rose-500 mb-4">Energy Signature</h3>
            <div className="space-y-2">
              {result.celebrities.map((celeb, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-zinc-400">
                  <span className="w-1.5 h-1.5 bg-zinc-600 rounded-full"></span>
                  {celeb}
                </div>
              ))}
            </div>
          </div>
          
          {/* Cosmic Layer for Left Column on Desktop, stacks on mobile */}
          {result.cosmic && (
            <div className="glass-panel p-6 bg-gradient-to-br from-purple-900/20 to-black border border-purple-500/20 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"></div>
               <h3 className="text-xs font-bold uppercase tracking-widest text-purple-400 mb-3 flex items-center gap-2">
                 <Star size={14} /> Cosmic Layer
               </h3>
               <h4 className="text-xl font-display text-zinc-200 mb-2">{result.cosmic.zodiacHeader}</h4>
               <p className="text-sm text-zinc-400 leading-relaxed">{result.cosmic.analysis}</p>
            </div>
          )}
        </div>

        {/* Right Column: Text Analysis */}
        <div className="flex flex-col gap-8">
          <div className="text-center lg:text-left">
            <div className="inline-block px-3 py-1 border border-zinc-700 rounded-full text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-4">
              Archetype Identified
            </div>
            <h1 className="text-4xl md:text-6xl font-display text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-slate-200 to-rose-400 mb-2">
              {result.title}
            </h1>
            <p className="text-xl text-rose-500/80 font-display">{result.subtitle}</p>
          </div>

          <div className="glass-panel p-6 md:p-8 relative overflow-hidden group">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-rose-500/10 rounded-full blur-3xl group-hover:bg-rose-500/20 transition-all duration-700"></div>
            <p className="text-lg md:text-xl font-light italic leading-relaxed text-zinc-300 relative z-10">
              "{result.vibe}"
            </p>
          </div>

          {/* New Cosmic Sections */}
          {result.cosmic && (
            <>
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-400 flex items-center gap-2">
                   <Sparkles size={14} /> Message From The Universe
                </h3>
                <div className="p-6 border border-emerald-900/30 bg-emerald-950/5 rounded-sm">
                  <p className="font-serif italic text-lg text-emerald-100/80 leading-loose text-center">
                    "{result.cosmic.universeMessage}"
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                 <h3 className="text-xs font-bold uppercase tracking-widest text-blue-400">2026 Seduction Prophecy</h3>
                 <ul className="space-y-3">
                   {result.cosmic.prophecy.map((item, idx) => (
                     <li key={idx} className="flex gap-3 text-sm text-zinc-300 bg-zinc-900/50 p-3 rounded border border-zinc-800">
                        <span className="text-blue-500 font-bold">0{idx + 1}</span>
                        {item}
                     </li>
                   ))}
                 </ul>
              </div>
            </>
          )}

          {/* Brutally Honest Section (Removed Roast) */}
          <div className="grid gap-6">
             <div>
               <h4 className="text-xs uppercase tracking-widest text-rose-500 mb-3 flex items-center gap-2">
                 <Flame size={14} className="text-rose-500" />
                 Brutal Reality
               </h4>
               <div className="p-5 bg-rose-950/10 border border-rose-900/30 rounded text-sm leading-relaxed text-zinc-400">
                 {result.brutalHonesty.split('\n').map((line, idx) => (
                   <p key={idx} className="mb-2 last:mb-0">{line}</p>
                 ))}
               </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-zinc-500 mb-2">Compatibility</h4>
            <p className="text-sm text-zinc-400 border-l-2 border-zinc-700 pl-4 py-1">
              {result.matches}
            </p>
          </div>
          
          <div className="pt-8 flex gap-4 justify-center lg:justify-start border-t border-zinc-800/50">
            <button 
               onClick={onRetake} 
               className="flex items-center gap-2 px-6 py-3 bg-zinc-900 hover:bg-zinc-800 text-white text-sm uppercase tracking-wider transition-colors"
            >
              <RefreshCw size={16} />
              Retake
            </button>
          </div>

        </div>
      </div>
      
      <div className="mt-16 text-center text-zinc-700 text-[10px] uppercase tracking-widest">
        AuraType Analysis Engine v2.5
      </div>
    </div>
  );
};

export default Results;
