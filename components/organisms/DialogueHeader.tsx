/**
 * @file DialogueHeader.tsx
 * @description A component that renders the header for the unified DialogueCard. It conditionally
 * displays either a simple header for interviews or a complex header with a progress meter for interrogations.
 */
import React from 'react';
import ProbableCauseMeter from '../molecules/ProbableCauseMeter';

interface DialogueHeaderProps {
  mode: 'interview' | 'interrogation';
  probableCause?: number;
  goalName?: string;
}

const DialogueHeader: React.FC<DialogueHeaderProps> = ({ mode, probableCause, goalName }) => {
  if (mode !== 'interrogation') {
    return null; // Interviews have a simpler layout and don't need this complex header.
  }

  return (
    <div className="px-4 pt-2 pb-4 bg-brand-surface border-b border-brand-border flex-shrink-0">
      <ProbableCauseMeter
        value={probableCause || 0}
        goalName={goalName || 'Probable Cause'}
      />
    </div>
  );
};

export default DialogueHeader;