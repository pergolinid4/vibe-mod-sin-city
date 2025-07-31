/**
 * @file AssignSuspectModal.tsx
 * @description A modal for assigning a piece of evidence to one or more suspects.
 * This component has been refactored to be more robust by fetching fresh data from the store
 * and providing a clearer UI for assigning evidence immediately or deferring the decision.
 */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { hideModal } from '../../store/uiSlice';
import { selectSuspects, assignEvidenceToSuspect, selectObjectById } from '../../store/storySlice';
import { useADA } from '../../hooks/useADA';
import { PlayerAction, Character } from '../../types';
import { X, Check, BookOpen } from 'lucide-react';
import ImageWithLoader from '../molecules/ImageWithLoader';
import { useCardImage } from '../../hooks/useCardImage';

interface AssignSuspectModalProps {
  objectId: string;
}

/**
 * --- Extracted Sub-Component: SuspectRow ---
 * This component is now defined at the top level of the file. This is a crucial
 * performance optimization that gives the component a stable identity, preventing
 * it from being re-created on every render of its parent. The styling has been enhanced
 * for better visual feedback.
 */
const SuspectRow: React.FC<{
  suspect: Character;
  isAssigned: boolean;
  onToggle: () => void;
}> = ({ suspect, isAssigned, onToggle }) => {
  const { imageUrl, isLoading } = useCardImage(suspect, 'selectiveColor');

  return (
    <button
      onClick={onToggle}
      className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-200
          ${isAssigned ? 'bg-brand-primary text-white font-bold shadow-lg shadow-brand-primary/20' : 'bg-brand-bg hover:bg-brand-surface/80'}`
      }
    >
      <div className="flex items-center gap-3 overflow-hidden">
        <div className="w-12 h-16 bg-brand-bg border border-brand-border rounded-md overflow-hidden flex-shrink-0">
          <ImageWithLoader imageUrl={imageUrl} isLoading={isLoading} alt={suspect.name} objectFit="cover" />
        </div>
        <span className="font-oswald uppercase tracking-wide truncate">{suspect.name}</span>
      </div>
      <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all flex-shrink-0
          ${isAssigned ? 'bg-white border-white' : 'border-brand-text-muted'}`
      }>
        {isAssigned && <Check size={16} className="text-brand-primary" />}
      </div>
    </button>
  );
};


const AssignSuspectModal: React.FC<AssignSuspectModalProps> = ({ objectId }) => {
    const dispatch = useDispatch<AppDispatch>();
    const triggerADA = useADA();
    const suspects = useSelector((state: RootState) => selectSuspects(state));

    const currentObject = useSelector((state: RootState) => selectObjectById(state, objectId));
    
    const handleClose = () => {
      dispatch(hideModal());
    };
    
    const handleToggleAssign = (suspectId: string) => {
        if (!currentObject) return;
        
        const isCurrentlyAssigned = currentObject.assignedToSuspectIds.includes(suspectId);
        dispatch(assignEvidenceToSuspect({ objectId, suspectId }));
        
        const suspectName = suspects.find(s => s.id === suspectId)?.name || 'a suspect';
        const actionText = !isCurrentlyAssigned ? `has assigned the ${currentObject.name} to ${suspectName}.` : `has unassigned the ${currentObject.name} from ${suspectName}.`;
        
        triggerADA(PlayerAction.ASSIGN_EVIDENCE, actionText, currentObject.imagePrompt);
    };

    if (!currentObject) {
      return null;
    }

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={handleClose}>
            <div 
                className="bg-brand-surface rounded-xl shadow-2xl w-full max-w-sm border-2 border-brand-border overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <header className="p-4 border-b-2 border-brand-border flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-oswald text-brand-primary uppercase tracking-wider">Assign Evidence</h2>
                        <p className="text-sm text-brand-text-muted">{currentObject.name}</p>
                    </div>
                    <button 
                        className="p-2 rounded-full text-white/50 hover:bg-brand-primary hover:text-white transition-colors"
                        onClick={handleClose}
                        aria-label="Close"
                    >
                        <X size={20} />
                    </button>
                </header>
                <main className="p-4 max-h-[60vh] overflow-y-auto">
                    <p className="text-sm text-brand-text-muted mb-4">Select one or more suspects, or add to the main timeline to review later.</p>
                    <div className="space-y-2">
                         {/* --- New "Assign Later" Option --- */}
                        <button
                          onClick={handleClose}
                          className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors duration-200 bg-brand-bg hover:bg-brand-surface/80`}
                        >
                          <div className="flex items-center gap-3 overflow-hidden">
                            <div className="w-12 h-16 bg-brand-bg border border-dashed border-brand-border rounded-md flex items-center justify-center flex-shrink-0">
                                <BookOpen size={24} className="text-brand-text-muted" />
                            </div>
                            <span className="font-oswald uppercase tracking-wide truncate">All Evidence (Assign Later)</span>
                          </div>
                        </button>
                        
                        <hr className="border-brand-border my-3" />

                        {suspects.map(suspect => (
                            <SuspectRow
                                key={suspect.id}
                                suspect={suspect}
                                isAssigned={currentObject.assignedToSuspectIds.includes(suspect.id)}
                                onToggle={() => handleToggleAssign(suspect.id)}
                            />
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AssignSuspectModal;
