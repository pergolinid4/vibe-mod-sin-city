/**
 * @file hooks/useHotspotAnalysis.ts
 * @description This custom hook encapsulates the logic for analyzing a location image to find hotspots.
 * It now features a robust caching mechanism to prevent re-analyzing the same image,
 * improving performance and reducing API costs.
 */
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { analyzeImageForHotspots } from '../services/geminiService';
import { Hotspot } from '../types';
import { RootState, AppDispatch } from '../store';
import { setDynamicHotspotCoords, selectDynamicHotspotsForLocation } from '../store/storySlice';
import { dbService } from '../services/dbService';

interface HotspotAnalysisResult {
  dynamicHotspots: { [key: string]: { x: number; y: number } } | null;
  isAnalyzing: boolean;
}

/**
 * A hook to manage the analysis of an image for dynamic hotspot coordinates, now with caching.
 * @param {string | null} imageUrl - The URL of the image to analyze.
 * @param {Hotspot[]} hotspotsToFind - An array of hotspot definitions to search for.
 * @param {string} locationId - The unique ID of the location, used as the cache key.
 * @returns {HotspotAnalysisResult} An object containing the coordinates of found hotspots and the loading state.
 */
export const useHotspotAnalysis = (
  imageUrl: string | null,
  hotspotsToFind: Hotspot[],
  locationId: string
): HotspotAnalysisResult => {
  const dispatch = useDispatch<AppDispatch>();
  const cachedCoords = useSelector((state: RootState) => selectDynamicHotspotsForLocation(state, locationId));

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [dynamicHotspots, setDynamicHotspots] = useState<{ [key: string]: { x: number; y: number } } | null>(cachedCoords || null);
  
  const analysisStartedRef = useRef(false);

  useEffect(() => {
    // If we have cached coordinates, use them immediately and don't proceed with analysis.
    if (cachedCoords) {
      setDynamicHotspots(cachedCoords);
      return;
    }
    
    // Guard against running analysis multiple times or without necessary data.
    if (!imageUrl || analysisStartedRef.current || cachedCoords) {
      return;
    }

    const itemsToAnalyze = hotspotsToFind
      .filter(h => !h.coords && h.aiHint)
      .map(h => ({ id: h.id, label: h.label, hint: h.aiHint }));

    if (itemsToAnalyze.length === 0) {
      return;
    }

    const analyze = async (locId: string) => {
      analysisStartedRef.current = true;
      setIsAnalyzing(true);

      try {
        const blob = await dbService.getImage(locId);
        if (!blob) {
            throw new Error(`Image blob not found in IndexedDB for ID: ${locId}`);
        }
        
        const base64Data = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                // reader.result is a data URL (e.g., "data:image/jpeg;base64,..."). We need only the base64 part.
                const base64String = (reader.result as string)?.split(',')[1];
                if (base64String) {
                    resolve(base64String);
                } else {
                    reject(new Error("Failed to read base64 string from blob."));
                }
            };
            // --- FIX: Correctly handle FileReader errors ---
            // The `onerror` event handler was rejecting the ProgressEvent object,
            // resulting in a non-descriptive "[object Object]" error message.
            // This now correctly rejects with `reader.error`, which is a DOMException
            // containing a useful error message.
            reader.onerror = () => reject(reader.error);
            reader.readAsDataURL(blob);
        });

        const coords = await analyzeImageForHotspots(base64Data, itemsToAnalyze);
        if (coords) {
            // Save the successful analysis results to the Redux cache.
            dispatch(setDynamicHotspotCoords({ locationId, coords }));
            setDynamicHotspots(coords);
        } else {
             setDynamicHotspots(null);
        }
      } catch (error) {
        console.error("Failed to process image for hotspot analysis:", error);
        setDynamicHotspots(null);
      } finally {
        setIsAnalyzing(false);
      }
    };
    
    analyze(locationId);

  }, [imageUrl, hotspotsToFind, locationId, dispatch, cachedCoords]);

  return { dynamicHotspots, isAnalyzing: isAnalyzing && !cachedCoords };
};
