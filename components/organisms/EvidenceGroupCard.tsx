/**
 * @file EvidenceGroupCard.tsx
 * @description A component to display a collection of evidence items found together.
 * This "container" card allows the player to discover multiple clues from a single hotspot.
 * This file has been refactored for performance by extracting the `ObjectRow` component.
 */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EvidenceGroup, StoryObject } from '../../types';
import { AppDispatch, RootState } from '../../store';
import { goBack, setActiveCard } from '../../store/uiSlice';
import { selectObjectsInGroup } from '../../store/storySlice';
import ObjectRow from '../molecules/ObjectRow';
import BackButton from '../atoms/BackButton';

const EvidenceGroupCard: React.FC<{ evidenceGroup: EvidenceGroup }> = ({ evidenceGroup }) => {
    const dispatch = useDispatch<AppDispatch>();
    const objectsInGroup = useSelector((state: RootState) => selectObjectsInGroup(state, evidenceGroup.id));

    return (
        <div className="w-full h-full flex flex-col bg-brand-surface animate-slide-in-bottom">
            {/* Static Header */}
            <header className="p-4 flex items-center gap-4 border-b-2 border-brand-border flex-shrink-0 bg-black">
                <BackButton onClick={() => dispatch(goBack())} />
                <h1 className="text-3xl font-oswald text-white uppercase tracking-wider truncate">
                    {evidenceGroup.name}
                </h1>
            </header>

            {/* Scrollable Content Area */}
            <div className="flex-1 w-full p-4 pb-40 overflow-y-auto">
                {/* Description at the top */}
                <p className="text-white mb-6 leading-relaxed">{evidenceGroup.description}</p>
                
                {/* "Items Found" is now the main content */}
                <h2 className="text-2xl font-oswald text-brand-primary mb-3 border-b border-brand-primary/30 pb-1 uppercase tracking-wider">
                    Items Found
                </h2>
                <div className="space-y-3">
                    {objectsInGroup.map(obj => <ObjectRow key={obj.id} object={obj} />)}
                </div>
            </div>
        </div>
    );
};

export default EvidenceGroupCard;
