import React from 'react';
import { Project } from '../types';
import { X } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  isDesignerMode: boolean;
  onDelete: (id: string) => void;
  layout?: 'grid' | 'list';
}

const categoryColors: Record<string, string> = {
  director: 'bg-rose-600',
  exhibition: 'bg-blue-600',
  branding: 'bg-orange-500',
  installation: 'bg-emerald-600',
  research: 'bg-violet-600',
  photography: 'bg-yellow-500',
  art: 'bg-stone-500',
  default: 'bg-neutral-400'
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, isDesignerMode, onDelete, layout = 'grid' }) => {
  const dotColor = categoryColors[project.category as string] || categoryColors.default;

  // LIST VIEW LAYOUT (For Exhibitions)
  if (layout === 'list') {
    return (
      <article className="group relative w-full flex flex-col md:flex-row gap-6 md:gap-12 py-8 border-b border-neutral-100 hover:bg-neutral-50/50 transition-colors">
        {isDesignerMode && (
          <button
            onClick={() => onDelete(project.id)}
            className="absolute top-4 right-0 z-10 bg-black text-white text-[10px] px-3 py-1.5 flex items-center gap-1 hover:bg-red-600 transition-colors rounded-full"
          >
            <span>Remove</span>
            <X size={10} />
          </button>
        )}
        
        {/* Large Thumbnail */}
        <div className="w-full md:w-[45%] aspect-[16/9] bg-neutral-100 overflow-hidden relative rounded-lg cursor-pointer">
           {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs uppercase tracking-widest text-neutral-300">
              No Preview
            </div>
          )}
        </div>

        {/* Detailed Info */}
        <div className="flex-1 flex flex-col justify-center py-2">
           <div className="flex items-center gap-2 mb-4">
             <span className={`w-2 h-2 rounded-full ${dotColor}`} />
             <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">{project.category}</span>
           </div>

           <h3 className="text-3xl font-bold text-ink mb-6 tracking-tight leading-tight group-hover:underline decoration-1 underline-offset-8">
             {project.title}
           </h3>

           <p className="text-sm text-neutral-600 leading-loose max-w-xl mb-8 font-light">
             {project.caption}
           </p>

           <div className="flex items-center gap-8 text-xs uppercase tracking-widest text-neutral-400">
             <div className="flex flex-col gap-1">
               <span className="text-[9px] text-neutral-300">Location</span>
               <span className="text-black font-medium">{project.location}</span>
             </div>
             <div className="flex flex-col gap-1">
               <span className="text-[9px] text-neutral-300">Year</span>
               <span className="text-black font-medium">{project.year}</span>
             </div>
           </div>
        </div>
      </article>
    );
  }

  // GRID VIEW LAYOUT (Standard)
  return (
    <article className="group relative bg-card flex flex-col gap-4 transition-transform duration-300 hover:-translate-y-1">
      {/* Delete Chip (Visible in Designer Mode) */}
      {isDesignerMode && (
        <button
          onClick={() => onDelete(project.id)}
          className="absolute top-2.5 right-2.5 z-10 bg-black text-white text-[10px] px-3 py-1.5 opacity-100 flex items-center gap-1 shadow-sm hover:bg-red-600 transition-colors rounded-full"
        >
          <span>Remove</span>
          <X size={10} />
        </button>
      )}

      {/* Thumbnail with Rounded Corners */}
      <div className="w-full h-[240px] overflow-hidden bg-neutral-100 flex items-center justify-center relative border border-transparent group-hover:border-neutral-200 transition-colors rounded-lg cursor-pointer">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover grayscale transition-all duration-500 hover:grayscale-0"
          />
        ) : (
          <div className="text-xs uppercase tracking-[0.2em] text-neutral-400 text-center px-5">
            {project.title}
          </div>
        )}
      </div>

      {/* Meta Info */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-start gap-4">
          <h3 className="text-[1rem] font-bold tracking-tight m-0 text-ink">
            {project.title}
          </h3>
          
          {/* Category with Point Color */}
          <span className="flex items-center gap-1.5 text-[9px] uppercase tracking-widest py-1 px-0 text-neutral-500 whitespace-nowrap">
            <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
            {project.category}
          </span>
        </div>
        
        <p className="text-xs text-neutral-500 leading-relaxed line-clamp-2">
          {project.caption}
        </p>

        {/* Footer */}
        <div className="flex justify-between items-center text-[10px] text-neutral-400 uppercase tracking-widest pt-2 border-t border-dotted border-neutral-200">
          <span>{project.location}</span>
          <span className="tabular-nums font-medium text-black">{project.year}</span>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;