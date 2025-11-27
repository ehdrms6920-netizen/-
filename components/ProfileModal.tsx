import React from 'react';
import { X } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] bg-white/80 backdrop-blur-sm flex items-center justify-center animate-[fadeIn_0.3s_ease-out]">
      <div className="w-[90%] max-w-[480px] bg-white border border-black p-8 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-neutral-400 hover:text-black transition-colors"
        >
          <X size={24} />
        </button>
        
        <h2 className="text-xl font-bold mb-8 text-ink uppercase tracking-widest border-b border-black pb-4">Profile</h2>
        
        <div className="text-[0.95rem] leading-[1.8] text-neutral-600 space-y-5 font-light">
          <p>
            <strong className="text-black font-medium">Donggeun Kim</strong> is a spatial designer and photographer exploring the silence of architecture. 
          </p>
          <p>
            Deeply influenced by the masters of light and heavy materiality—<strong className="text-black font-medium">Tadao Ando</strong> and <strong className="text-black font-medium">Louis Kahn</strong>—he seeks to create spaces that feel ancient yet modern. His work focuses on the honest expression of concrete, the geometry of shadows, and the spirituality of voids.
          </p>
          <p>
            Beyond physical space, he captures the fleeting textures of urban decay and light through his photography, treating every frame as a constructed architectural section.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;