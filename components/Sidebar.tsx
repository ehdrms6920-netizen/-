import React, { useState } from 'react';
import { Category } from '../types';
import { User, Youtube, Instagram, Aperture, Share2, Check } from 'lucide-react';

interface SidebarProps {
  currentFilter: Category;
  onFilterChange: (filter: Category) => void;
  onOpenProfile: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentFilter, onFilterChange, onOpenProfile }) => {
  const [isCopied, setIsCopied] = useState(false);

  const filters: Category[] = [
    'all', 
    'director',
    'exhibition', 
    'branding', 
    'installation', 
    'research', 
    'photography',
    'art'
  ];

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <aside className="sticky top-12 h-fit flex flex-col gap-12">
      {/* Identity */}
      <div className="flex flex-col gap-6">
        <div className="w-12 h-12 border border-black flex items-center justify-center text-[14px] font-bold tracking-widest bg-white text-black select-none">
          DG
        </div>
        <div>
          <h1 className="m-0 text-xl font-bold tracking-tight uppercase leading-none text-ink">
            Donggeun Kim
          </h1>
          <p className="mt-3 text-sm text-neutral-500 font-medium leading-relaxed">
            Spatial Design · Brand Director<br/>Art & Narrative
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-4">
        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-black/30 pl-0.5">
          Filter
        </span>
        <div className="flex flex-col items-start gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => onFilterChange(f)}
              className={`text-2xl font-bold capitalize transition-colors duration-300 text-left leading-tight tracking-tight
                ${
                  currentFilter === f
                    ? 'text-black'
                    : 'text-neutral-300 hover:text-neutral-500'
                }`}
            >
              {f}
            </button>
          ))}
        </div>
      </nav>

      {/* Profile & Footer Group */}
      <div className="flex flex-col gap-6 mt-10 md:mt-auto">
        {/* Action Buttons */}
        <div className="flex flex-col gap-4 items-start border-b border-neutral-100 pb-6">
          <button
            onClick={onOpenProfile}
            className="w-fit inline-flex items-center gap-2 text-sm font-bold text-black hover:text-neutral-600 transition-all"
          >
            <User size={14} />
            <span>Profile / Statement</span>
          </button>
          
          <button
            onClick={handleShare}
            className="w-fit inline-flex items-center gap-2 text-sm font-bold text-black hover:text-neutral-600 transition-all"
          >
            {isCopied ? <Check size={14} className="text-emerald-600" /> : <Share2 size={14} />}
            <span className={isCopied ? "text-emerald-600" : ""}>{isCopied ? 'Link Copied' : 'Share Link'}</span>
          </button>
        </div>

        {/* Channels */}
        <div className="flex gap-5 opacity-60 hover:opacity-100 transition-opacity">
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-neutral-600 transition-colors"
            aria-label="YouTube"
          >
            <Youtube size={18} strokeWidth={1.5} />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-neutral-600 transition-colors"
            aria-label="Instagram"
          >
            <Instagram size={18} strokeWidth={1.5} />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-neutral-600 transition-colors"
            aria-label="VSCO"
          >
            <Aperture size={18} strokeWidth={1.5} />
          </a>
        </div>

        {/* Footnote */}
        <div className="text-[10px] text-neutral-400 leading-relaxed max-w-[200px]">
          &copy; 2025 Donggeun Kim.<br />
          Spatial design, direction & art.
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;