import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store';
import { Sighting, Character } from '../../../types';
import ModalWrapper from './ModalWrapper';
import { hideModal } from '../../../store/uiSlice';
import { selectAllCharacters } from '../../../store/storySlice';
import { format } from 'date-fns';

const CctvModal: React.FC = () => {
  const dispatch = useDispatch();
  const activeCardId = useSelector((state: RootState) => state.ui.activeCardId);
  const activeCardType = useSelector((state: RootState) => state.ui.activeCardType);
  const allCharacters = useSelector(selectAllCharacters);

  // Only render if the active card is a CCTV collection and a character is selected
  if (activeCardType !== 'collection' || activeCardId || useSelector((state: RootState) => state.ui.activeCollectionType) !== 'cctv_sighting') {
    return null;
  }

  const character = allCharacters.find(char => char.id === activeCardId) as Character | undefined;
  const cctvComponent = character?.components.find(c => c.type === 'cctv');
  const cctvSightings = cctvComponent?.props as Sighting[] | undefined; // Assuming cctv component directly holds an array of sightings

  if (!character || !cctvSightings) {
    return null; // Should not happen if activeCardType is 'collection' and collectionType is 'cctv_sighting'
  }

  const handleClose = () => {
    dispatch(hideModal());
  };

  return (
    <ModalWrapper title={`${character.name}'s CCTV Sightings`}>
      <div className="flex flex-col gap-6 p-4 overflow-y-auto max-h-[70vh]">
        {cctvSightings.length === 0 ? (
          <p className="text-brand-text-muted text-center">No CCTV sightings found for {character.name}.</p>
        ) : (
          cctvSightings.map((sighting: Sighting) => (
            <div key={sighting.id} className="bg-brand-surface-2 p-4 rounded-lg shadow-md">
              <div className="flex items-center mb-2">
                <div>
                  <p className="font-oswald text-white text-lg">{sighting.locationName}</p>
                  <p className="text-brand-text-muted text-sm">{format(new Date(sighting.timestamp), 'MMM dd, yyyy HH:mm')}</p>
                </div>
              </div>
              <p className="text-white text-base mb-3">{sighting.description}</p>
              {sighting.videoUrl && (
                <div className="mb-3 rounded-lg overflow-hidden bg-black flex items-center justify-center h-48">
                  {/* Placeholder for video. In a real app, this would be a video player. */}
                  <p className="text-brand-text-muted">Video Placeholder</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </ModalWrapper>
  );
};

export default CctvModal;