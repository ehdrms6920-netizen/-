import React, { useState } from 'react';
import { Lock, Unlock, Plus } from 'lucide-react';
import { Project, Category } from '../types';

interface DesignerPanelProps {
  isOpen: boolean;
  isDesignerMode: boolean;
  onUnlock: () => void;
  onLock: () => void;
  onAddProject: (p: Omit<Project, 'id'>) => void;
}

const DesignerPanel: React.FC<DesignerPanelProps> = ({
  isOpen,
  isDesignerMode,
  onUnlock,
  onLock,
  onAddProject,
}) => {
  const [passcode, setPasscode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Category>('exhibition');
  const [location, setLocation] = useState('');
  const [year, setYear] = useState('');
  const [caption, setCaption] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleUnlockAttempt = () => {
    if (passcode === '1234') {
      onUnlock();
      setPasscode('');
      setErrorMsg('');
    } else {
      setErrorMsg('Incorrect code.');
    }
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const processSubmission = (imgData: string | null) => {
      onAddProject({
        title,
        category,
        location,
        year,
        caption,
        image: imgData,
      });
      // Reset
      setTitle('');
      setLocation('');
      setYear('');
      setCaption('');
      setImageFile(null);
    };

    if (imageFile) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        processSubmission(evt.target?.result as string);
      };
      reader.readAsDataURL(imageFile);
    } else {
      processSubmission(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-[84px] right-6 w-[320px] bg-[#111111] border border-[#333] p-6 z-[90] text-white shadow-2xl origin-bottom-right animate-[slideUp_0.2s_ease-out]">
      <div className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-6 pb-2 border-b border-neutral-800 flex justify-between items-center">
        <span>Designer Mode</span>
        {isDesignerMode ? <Unlock size={12} /> : <Lock size={12} />}
      </div>

      {!isDesignerMode ? (
        /* LOCKED STATE */
        <div>
          <p className="text-xs text-neutral-400 mb-4 leading-relaxed">
            Restricted access. Enter passcode to edit portfolio.
          </p>
          <div className="mb-3">
            <input
              type="password"
              placeholder="Passcode"
              maxLength={4}
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-700 p-3 text-sm text-white focus:outline-none focus:border-white transition-colors"
            />
          </div>
          <button
            onClick={handleUnlockAttempt}
            className="w-full py-3 bg-white text-black text-xs uppercase tracking-widest font-bold hover:bg-neutral-200 transition-colors"
          >
            Unlock
          </button>
          {errorMsg && <div className="text-red-500 text-[10px] mt-3">{errorMsg}</div>}
        </div>
      ) : (
        /* UNLOCKED STATE */
        <div>
          <p className="text-xs text-neutral-400 mb-4 leading-relaxed">
            Manage your projects.
          </p>
          <form onSubmit={handleAddSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-neutral-500 mb-1.5">Title</label>
              <input
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-700 p-2 text-sm text-white focus:outline-none focus:border-white"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-neutral-500 mb-1.5">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="w-full bg-neutral-900 border border-neutral-700 p-2 text-sm text-white focus:outline-none focus:border-white"
              >
                <option value="director">Brand Director</option>
                <option value="exhibition">Exhibition</option>
                <option value="branding">Branding</option>
                <option value="installation">Installation</option>
                <option value="research">Research</option>
                <option value="photography">Photography</option>
                <option value="art">Art / Drawings</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-neutral-500 mb-1.5">Location</label>
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-700 p-2 text-sm text-white focus:outline-none focus:border-white"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-neutral-500 mb-1.5">Year</label>
                <input
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-700 p-2 text-sm text-white focus:outline-none focus:border-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-neutral-500 mb-1.5">Caption</label>
              <input
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-700 p-2 text-sm text-white focus:outline-none focus:border-white"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-neutral-500 mb-1.5">Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
                className="w-full bg-neutral-900 border border-neutral-700 p-2 text-xs text-white file:mr-2 file:py-1 file:px-2 file:border-0 file:text-[10px] file:bg-white file:text-black hover:file:bg-neutral-200"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-white text-black text-xs uppercase tracking-widest font-bold hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 mt-4"
            >
              <Plus size={14} /> Add Project
            </button>
            <button
              type="button"
              onClick={onLock}
              className="w-full py-2 bg-transparent text-neutral-500 border border-neutral-700 text-[10px] uppercase tracking-widest hover:text-white hover:border-white transition-colors"
            >
              Lock Designer Mode
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default DesignerPanel;