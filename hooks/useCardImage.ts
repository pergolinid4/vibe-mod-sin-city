/**
 * @file hooks/useCardImage.ts
 * @description This custom hook encapsulates the logic for displaying an image for a game card.
 * It checks a Redux-based cache for an existing image URL. If not found, it adds a request
 * to a centralized, sequential queue to be processed, preventing API rate-limiting.
 */

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { queueImageGeneration, processImageGenerationQueue } from '../store/storySlice';
import { Character, StoryObject, Location } from '../types';

// A union type for any card-like object that has an ID and an image prompt.
type Card = (Character | StoryObject | Location | { id: string; imagePrompt: string });

/**
 * A hook to manage fetching and displaying a card's image via a central queue.
 *
 * @param {Card | null} card - The card object (e.g., Character, StoryObject) for which to get an image.
 * @param {'monochrome' | 'selectiveColor' | 'map'} colorTreatment - The desired visual style for the image.
 * @returns {{ imageUrl: string | null, isLoading: boolean }} An object containing the image URL (or null) and a boolean loading state.
 */
export const useCardImage = (
  card: Card | null, 
  colorTreatment: 'monochrome' | 'selectiveColor' | 'map'
) => {
  const dispatch = useDispatch<AppDispatch>();
  
  const base64ImageUrl = useSelector((state: RootState) => (card ? state.story.imageUrls[card.id] : null));
  const isLoadingFromState = useSelector((state: RootState) => (card ? state.story.imageLoading[card.id] : false));

  // State to hold the Object URL
  const [objectUrl, setObjectUrl] = useState<string | null>(null);

  useEffect(() => {
    if (base64ImageUrl) {
      // If we have a base64 image, create an Object URL
      setObjectUrl(base64ImageUrl);
    } else {
      // If no base64 image, clear the Object URL
      setObjectUrl(null);
    }

    // Cleanup: revoke the Object URL when the component unmounts or the image changes
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [base64ImageUrl, objectUrl]); // Added objectUrl to dependency array

  useEffect(() => {
    // The core logic: dispatch to the queue only if...
    // 1. A valid card with an image prompt is provided.
    // 2. An image URL is NOT already in the cache (base64ImageUrl is null).
    // 3. The image is NOT already in the process of being loaded.
    if (card && card.imagePrompt && !base64ImageUrl && !isLoadingFromState) {
      dispatch(queueImageGeneration({
          cardId: card.id,
          prompt: card.imagePrompt,
          colorTreatment: colorTreatment
      }));
      // Kick off the queue processor. It has an internal guard to prevent multiple concurrent runs.
      dispatch(processImageGenerationQueue());
    }
  }, [card, base64ImageUrl, isLoadingFromState, colorTreatment, dispatch]);

  const isLoading = isLoadingFromState || (!objectUrl && !!card?.imagePrompt);

  return { imageUrl: objectUrl, isLoading };
};