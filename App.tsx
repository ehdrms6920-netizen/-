import React, { useState, useMemo, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ProjectCard from './components/ProjectCard';
import ProfileModal from './components/ProfileModal';
import DesignerPanel from './components/DesignerPanel';
import { Project, Category } from './types';
import { Settings } from 'lucide-react';

const INITIAL_PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'Hyundai Motorstudio',
    category: 'director',
    caption: 'Global brand campaign direction focusing on sustainable mobility and spatial experience. A synthesis of technology and nature.',
    location: 'Seoul/Global',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1565058688588-444985223c72?q=80&w=1000&auto=format&fit=crop', // Modern structure
  },
  {
    id: 'p2',
    title: 'Lee Ufan Foundation',
    category: 'exhibition',
    caption: 'Collaborative exhibition design emphasizing "Relation". Arranging stone and steel in dialogue with white void space.',
    location: 'Arles, FR',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1620610996885-3b9cd4b57421?q=80&w=1000&auto=format&fit=crop', // Stone/Minimal
  },
  {
    id: 'p3',
    title: 'Samsung Foundation',
    category: 'director',
    caption: 'Cultural strategy and visual direction for the new heritage pavilion. Bridging traditional Korean aesthetics with futuristic displays.',
    location: 'Seoul, KR',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1507643179173-442f01faa931?q=80&w=1000&auto=format&fit=crop', // White Museum Interior
  },
  {
    id: 'p4',
    title: 'Charcoal Study 01',
    category: 'art',
    caption: 'Personal series. Layering charcoal on textured paper to explore the depth of shadows in built environments.',
    location: 'Studio',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1583324113626-70df0f4deaab?q=80&w=1000&auto=format&fit=crop', // Abstract Dark Texture
  },
  {
    id: 'p5',
    title: 'Church of the Light',
    category: 'exhibition',
    caption: 'A study of void and divinity inspired by Ando. Concrete walls cut by light, creating a sanctuary of silence.',
    location: 'Osaka, JP',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1483361884393-24696085a6fc?q=80&w=1000&auto=format&fit=crop', // Concrete & Light
  },
  {
    id: 'p6',
    title: 'Void Sketch',
    category: 'art',
    caption: 'Architectural drawing exploring negative space. Ink and graphite on vellum.',
    location: 'Studio',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1?q=80&w=1000&auto=format&fit=crop', // Abstract Lines
  },
  {
    id: 'p7',
    title: 'Water Temple',
    category: 'installation',
    caption: 'A descent into the sacred through a wall of water. The lotus pond reflects the sky, blurring the boundary between nature and structure.',
    location: 'Awaji, JP',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1533240361-cc2059302633?q=80&w=1000&auto=format&fit=crop', // Dark Water/Reflection
  },
  {
    id: 'p8',
    title: 'Salk Institute Study',
    category: 'research',
    caption: 'Monumental symmetry framing the horizon. Concrete aging with the sun, embodying timelessness and scientific clarity.',
    location: 'San Diego, US',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=1000&auto=format&fit=crop', // Geometric Architecture
  }
];

const VALID_CATEGORIES: Category[] = ['all', 'director', 'exhibition', 'branding', 'installation', 'research', 'photography', 'art'];

const App: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  
  // Initialize filter from URL
  const [currentFilter, setCurrentFilter] = useState<Category>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const filter = params.get('filter');
      if (filter && VALID_CATEGORIES.includes(filter as Category)) {
        return filter as Category;
      }
    }
    return 'all';
  });

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  // Designer Mode State
  const [isDesignerPanelOpen, setIsDesignerPanelOpen] = useState(false);
  const [isDesignerMode, setIsDesignerMode] = useState(false);

  // Handle URL updates and Browser Back/Forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const filter = params.get('filter');
      if (filter && VALID_CATEGORIES.includes(filter as Category)) {
        setCurrentFilter(filter as Category);
      } else {
        setCurrentFilter('all');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleFilterChange = (newFilter: Category) => {
    setCurrentFilter(newFilter);
    const url = new URL(window.location.href);
    if (newFilter === 'all') {
      url.searchParams.delete('filter');
    } else {
      url.searchParams.set('filter', newFilter);
    }
    window.history.pushState({}, '', url);
  };

  // Computed
  const filteredProjects = useMemo(() => {
    return currentFilter === 'all' 
      ? projects 
      : projects.filter(p => p.category === currentFilter);
  }, [projects, currentFilter]);

  // Handlers
  const handleAddProject = (newProjectData: Omit<Project, 'id'>) => {
    const newProject: Project = {
      ...newProjectData,
      id: `p-${Date.now()}`,
    };
    setProjects(prev => [newProject, ...prev]);
  };

  const handleDeleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="max-w-[1400px] mx-auto p-6 md:p-12 min-h-screen grid grid-cols-1 md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] gap-12 md:gap-16">
      
      {/* Left Sidebar */}
      <Sidebar 
        currentFilter={currentFilter}
        onFilterChange={handleFilterChange}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      {/* Main Content */}
      <main className="flex flex-col gap-10">
        <header className="flex justify-between items-baseline pb-4 border-b border-black">
          <h2 className="text-sm font-bold uppercase tracking-[0.1em] text-ink m-0">
            {currentFilter === 'all' ? 'Selected Projects' : currentFilter}
          </h2>
          <span className="text-xs text-neutral-400 tabular-nums font-medium">
            {filteredProjects.length} <span className="text-[10px] uppercase tracking-wider ml-1">Items</span>
          </span>
        </header>

        <div className={`
          ${currentFilter === 'exhibition' ? 'flex flex-col' : 'grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12'}
        `}>
          {filteredProjects.map(p => (
            <ProjectCard 
              key={p.id}
              project={p}
              isDesignerMode={isDesignerMode}
              onDelete={handleDeleteProject}
              layout={currentFilter === 'exhibition' ? 'list' : 'grid'}
            />
          ))}
          {filteredProjects.length === 0 && (
            <div className="col-span-full py-32 text-center text-neutral-300 text-sm font-light">
              No projects found in this category.
            </div>
          )}
        </div>
      </main>

      {/* Profile Modal */}
      <ProfileModal 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
      />

      {/* Floating Toggle for Designer Mode */}
      <button
        onClick={() => setIsDesignerPanelOpen(prev => !prev)}
        className={`fixed bottom-8 right-8 w-10 h-10 flex items-center justify-center z-[100] transition-all duration-300 shadow-float border
          ${isDesignerMode 
            ? 'bg-black text-white border-black' 
            : 'bg-white text-black border-neutral-200 hover:border-black'
          }
        `}
        title="Designer Mode"
      >
        <Settings 
          size={18} 
          className={isDesignerMode ? 'animate-spin-slow' : ''} 
        />
      </button>

      {/* Designer Panel */}
      <DesignerPanel
        isOpen={isDesignerPanelOpen}
        isDesignerMode={isDesignerMode}
        onUnlock={() => setIsDesignerMode(true)}
        onLock={() => setIsDesignerMode(false)}
        onAddProject={handleAddProject}
      />
      
    </div>
  );
};

export default App;