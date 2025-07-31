

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { showModal, hideModal } from '../../store/uiSlice';
import { markMessagesAsRead } from '../../store/adaSlice';
import { Fingerprint, X } from 'lucide-react';

const ADAFab: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { hasNewMessages } = useSelector((state: RootState) => state.ada);
    const activeModal = useSelector((state: RootState) => state.ui.activeModal);

    const isAdaOpen = activeModal === 'ada';

    const handleToggle = () => {
        if (isAdaOpen) {
            dispatch(hideModal());
        } else {
            dispatch(showModal({ type: 'ada' }));
            if (hasNewMessages) {
                dispatch(markMessagesAsRead());
            }
        }
    };

    return (
        <div 
            className="fixed bottom-16 left-1/2 -translate-x-1/2 z-40"
            style={{ marginBottom: 'env(safe-area-inset-bottom)' }}
        >
            <button
                onClick={handleToggle}
                className={`w-20 h-20 rounded-full flex items-center justify-center
                    bg-brand-surface border-4 transition-all duration-300 ease-in-out transform
                    ${isAdaOpen ? 'border-brand-primary' : 'border-brand-border'}
                    ${hasNewMessages && !isAdaOpen ? 'animate-pulse-glow' : ''}
                    hover:scale-110 hover:border-brand-primary shadow-2xl shadow-black/50
                `}
                aria-label={isAdaOpen ? "Close ADA" : "Open ADA"}
            >
                {isAdaOpen ? (
                    <X className="w-10 h-10 text-brand-primary" />
                ) : (
                    <Fingerprint className="w-10 h-10 text-brand-primary" />
                )}
            </button>
        </div>
    );
};

export default ADAFab;