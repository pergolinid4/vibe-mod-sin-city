/**
 * @file CollectionCard.tsx
 * @description A new, generic card component to display a collection of objects
 * associated with a character component (e.g., phone logs, police files).
 * This is a key part of the new, unified architecture.
 */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Character, StoryObject } from '../../types';
import { AppDispatch, RootState } from '../../store';
import { goBack, setActiveCard } from '../../store/uiSlice';
import { selectObjectsForCharacterCollection } from '../../store/storySlice';
import ObjectRow from '../molecules/ObjectRow';
import BackButton from '../atoms/BackButton';


const CollectionCard: React.FC<{ character: Character; collectionType: string; title: string; }> = ({ character, collectionType, title }) => {
    const dispatch = useDispatch<AppDispatch>();
    const objects = useSelector((state: RootState) => selectObjectsForCharacterCollection(state, character.id, collectionType));

    return (
        <div className="w-full h-full flex flex-col bg-brand-surface animate-slide-in-bottom">
            <header className="p-4 flex items-center gap-4 border-b-2 border-brand-border flex-shrink-0 bg-black">
                <BackButton onClick={() => dispatch(goBack())} />
                <div className="truncate">
                    <h1 className="text-3xl font-oswald text-white uppercase tracking-wider truncate">{title}</h1>
                    <p className="text-brand-text-muted text-sm">{character.name}</p>
                </div>
            </header>

            <div className="flex-1 w-full p-4 pb-40 overflow-y-auto">
                {objects.length > 0 ? (
                    <div className="space-y-3">
                        {objects.map(obj => <ObjectRow key={obj.id} object={obj} />)}
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full text-center">
                        <p className="text-brand-text-muted">No records found for this category.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CollectionCard;
