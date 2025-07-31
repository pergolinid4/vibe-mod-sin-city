/**
 * @file MugshotCard.tsx
 * @description A dedicated card view for displaying a character's booking photo and physical details.
 * This component ensures a consistent UI for all types of evidence and information.
 */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Character } from '../../types';
import { goBack } from '../../store/uiSlice';
import { AppDispatch, RootState } from '../../store';
import ImageWithLoader from '../molecules/ImageWithLoader';
import BackButton from '../atoms/BackButton';
import { useCardImage } from '../../hooks/useCardImage';
import DataPair from '../molecules/DataPair';
import { selectObjectById } from '../../store/storySlice';

const MugshotCard: React.FC<{ character: Character }> = ({ character }) => {
  const dispatch = useDispatch<AppDispatch>();
  
  const handleGoBack = () => {
    dispatch(goBack());
  };
  
  // The mugshot is now a StoryObject, so we select it by its derived ID.
  const mugshotObject = useSelector((state: RootState) => selectObjectById(state, `obj_mugshot_${character.id}`));
  
  // Use the mugshot's prompt to generate the image.
  const { imageUrl, isLoading } = useCardImage(mugshotObject || null, 'selectiveColor');
  
  const physicalChars = character.components.find(c => c.type === 'physicalCharacteristics')?.props;

  return (
    <div className="w-full h-full flex flex-col bg-black animate-slide-in-bottom">
      <div className="relative w-full h-auto aspect-[3/4] flex-shrink-0 bg-brand-bg">
        <header className="absolute top-0 left-0 right-0 z-20 p-4 flex items-center bg-gradient-to-b from-black/80 to-transparent">
          <BackButton onClick={handleGoBack} />
        </header>
        
        <ImageWithLoader imageUrl={imageUrl} isLoading={isLoading} alt={`Mugshot of ${character.name}`} objectFit="contain" />
        
        <div className="absolute inset-0 bg-gradient-to-t from-brand-surface to-transparent"></div>
      </div>

      <div className="flex-1 w-full bg-brand-surface p-4 pb-40 overflow-y-auto">
        <h1 className="text-3xl font-oswald text-white uppercase tracking-wider">{`${character.name} - Booking Photo`}</h1>
        <p className="text-brand-text-muted text-lg mb-4">Police Department File</p>
        
        {physicalChars && (
          <div className="border-t border-brand-border/50 pt-4">
             <h2 className="text-xl font-oswald text-brand-primary mb-2 uppercase">Physical Characteristics</h2>
             <div className="bg-black/30 p-3 rounded-lg border border-brand-border">
                <DataPair label="Height" value={physicalChars.height} />
                <DataPair label="Weight" value={physicalChars.weight} />
                <DataPair label="Eyes" value={physicalChars.eyes} />
                <DataPair label="Hair" value={physicalChars.hair} />
                <DataPair label="Distinctive Features" value={physicalChars.features} />
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MugshotCard;
