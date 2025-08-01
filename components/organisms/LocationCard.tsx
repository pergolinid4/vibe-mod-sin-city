/**
 * @file LocationCard.tsx
 * @description Renders the detailed view for a single location, including dynamic, interactive hotspots.
 * This component showcases a robust system for hotspot placement, ensuring a reliable user experience.
 */

import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Location, PlayerAction, CardType } from '../../types';
import { setActiveCard, goBack } from '../../store/uiSlice';
import { AppDispatch } from '../../store';
import { useCardImage } from '../../hooks/useCardImage';
import { useHotspotAnalysis } from '../../hooks/useHotspotAnalysis';
import Hotspot from '../atoms/Hotspot';
import BackButton from '../atoms/BackButton';
import ImageWithLoader from '../molecules/ImageWithLoader';
import { useADA } from '../../hooks/useADA';
import Spinner from '../atoms/Spinner';

const LocationCard: React.FC<{ location: Location }> = ({ location }) => {
  const dispatch = useDispatch<AppDispatch>();
  const triggerADA = useADA();
  
  const { imageUrl, isLoading: isImageLoading } = useCardImage(location, 'selectiveColor');

  // The hook now receives the locationId to enable caching.
  const { dynamicHotspots, isAnalyzing } = useHotspotAnalysis(imageUrl, location.hotspots, location.id);

  const handleGoBack = () => {
    dispatch(goBack());
    triggerADA(PlayerAction.VIEW_LIST, `Player has returned to the previous view.`);
  };

  const handleHotspotClick = (targetId: string, targetType: CardType | 'evidenceGroup', label: string) => {
    dispatch(setActiveCard({ id: targetId, type: targetType }));
    triggerADA(
      PlayerAction.TAP_HOTSPOT, 
      `Player has tapped on hotspot "${label}" inside ${location.name}.`,
      location.imagePrompt
    );
  };
  
  const visibleHotspots = useMemo(() => {
    return location.hotspots.map((hotspot, index) => {
        let coords: { top: string; left: string; } | null = null;
        
        if (hotspot.coords) {
            coords = { 
                top: String(hotspot.coords.top), 
                left: String(hotspot.coords.left) 
            };
        } 
        else if (dynamicHotspots && dynamicHotspots[hotspot.id]) {
            const dynamicCoord = dynamicHotspots[hotspot.id];
            coords = {
                top: `${dynamicCoord.y * 100}%`,
                left: `${dynamicCoord.x * 100}%`,
            };
        }
        
        // The fallback logic now only runs if analysis is complete *and* coords are still missing.
        if (!isAnalyzing && !coords) {
            const totalHotspots = location.hotspots.length;
            const fallbackLeft = `${(index + 1) * (100 / (totalHotspots + 1))}%`;
            coords = {
                top: '85%',
                left: fallbackLeft,
            };
        }
        
        if (!coords) {
            return null;
        }

        return {
          ...hotspot,
          finalCoords: coords
        }
    }).filter(Boolean);
  }, [location.hotspots, dynamicHotspots, isAnalyzing]);


  // The overall loading state is true if either the image is generating or analysis is in progress.
  // This ensures the spinner is shown until both are ready.
  const isContentLoading = isImageLoading || isAnalyzing;

  return (
    <div className="relative w-full h-full flex flex-col bg-black animate-slide-in-bottom">
      <header className="absolute top-0 left-0 right-0 z-20 p-4 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center gap-2 overflow-hidden">
          <BackButton onClick={handleGoBack} />
          <h1 className="text-2xl font-oswald text-white drop-shadow-lg truncate uppercase tracking-wide">{location.name}</h1>
        </div>
        <div className="w-32 flex-shrink-0" />
      </header>

      <main className="flex-1 w-full h-full overflow-hidden relative bg-brand-bg">
        {/* The spinner now covers the whole content area while loading */}
        {isContentLoading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-brand-bg">
                <Spinner />
            </div>
        )}
        
        {/* The image is rendered underneath, but will only be visible once the loader is gone */}
        <ImageWithLoader imageUrl={imageUrl} isLoading={false} alt={location.name} isMignolaStyle={true} objectFit="contain" />
        
        {/* Hotspots will render only after loading is fully complete, preventing pop-in. */}
        {!isContentLoading && visibleHotspots.map(hotspot => (
            hotspot && (
                <Hotspot
                    key={hotspot.id}
                    coords={hotspot.finalCoords}
                    label={hotspot.label}
                    type={hotspot.type}
                    onClick={() => handleHotspotClick(hotspot.targetCardId, hotspot.targetCardType, hotspot.label)}
                />
            )
        ))}
      </main>
      
      <footer className="p-4 pb-40 bg-brand-surface/80 backdrop-blur-sm z-10 border-t-2 border-brand-border text-center">
          <p className="text-lg font-oswald uppercase tracking-wider text-brand-accent">{location.sceneSummary || location.lastEventDescription}</p>
      </footer>
    </div>
  );
};

export default LocationCard;