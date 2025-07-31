/**
 * @file CaseSolvedModal.tsx
 * @description A modal that displays the final score when the player successfully solves the case file.
 */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';
import { hideModal } from '../../../store/uiSlice';
import { resetInvestigation } from '../../../store/caseFileSlice';
import Button from '../../atoms/Button';
import { Award, RefreshCw } from 'lucide-react';

interface CaseSolvedModalProps {
  score: number;
}

const CaseSolvedModal: React.FC<CaseSolvedModalProps> = ({ score }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleReset = () => {
    dispatch(resetInvestigation());
    dispatch(hideModal());
  };

  const handleClose = () => {
    dispatch(hideModal());
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={handleClose}
    >
      <div
        className="bg-brand-surface rounded-xl shadow-2xl w-full max-w-sm border-2 border-brand-accent overflow-hidden animate-slide-in-bottom"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="p-4 bg-brand-accent/10 text-center">
            <div className="flex justify-center items-center gap-3">
                 <Award className="w-8 h-8 text-brand-accent" />
                 <h2 className="text-3xl font-oswald text-white uppercase tracking-wider">Case Closed</h2>
            </div>
        </header>
        <main className="p-6 space-y-4 text-center">
          <p className="text-brand-text-muted">You've successfully reconstructed the timeline.</p>
          <div className="my-4">
              <p className="font-oswald text-brand-text-muted uppercase tracking-wider">Final Score</p>
              <p className="font-mono text-6xl text-brand-accent font-bold animate-pulse-subtle">{score}</p>
          </div>
           <div className="pt-2 flex flex-col gap-2">
             <Button onClick={handleClose} className="w-full">
                Review Timeline
             </Button>
             <Button onClick={handleReset} variant="secondary" className="w-full text-xs flex items-center justify-center gap-2">
                <RefreshCw size={14} />
                Reset Investigation
             </Button>
           </div>
        </main>
      </div>
    </div>
  );
};

export default CaseSolvedModal;
