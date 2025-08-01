/**
 * @file ImageWithLoader.tsx
 * @description A reusable component that displays an image with a loading spinner.
 * It gracefully handles loading and error states. This component has been enhanced
 * with an `objectFit` prop for greater flexibility.
 */
import React from 'react';
import Spinner from '../atoms/Spinner';

interface ImageWithLoaderProps {
  imageUrl: string | null;
  isLoading: boolean;
  alt: string;
  /** Determines how the image should be resized to fit its container. */
  objectFit?: 'cover' | 'contain';
  /** The desired visual style for the image, influencing CSS classes. */
  colorTreatment?: 'monochrome' | 'selectiveColor' | 'map' | 'mignolaStyle';
}

const ImageWithLoader: React.FC<ImageWithLoaderProps> = ({ imageUrl, isLoading, alt, objectFit = 'cover', colorTreatment = 'monochrome' }) => {
  
  if (isLoading) {
    return (
      <div className="w-full h-full bg-brand-surface flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!imageUrl) {
    return (
      <div className="w-full h-full bg-brand-surface flex items-center justify-center text-brand-text-muted p-4 text-center">
        <p>Image not available.</p>
      </div>
    );
  }

  const objectFitClass = objectFit === 'cover' ? 'object-cover' : 'object-contain';
  // Dynamically apply style class based on colorTreatment
  const styleClass = colorTreatment === 'mignolaStyle' ? 'mignola-style' : '';

  return <img src={imageUrl} alt={alt} className={`w-full h-full animate-fade-in ${objectFitClass} ${styleClass}`} />;
};

export default ImageWithLoader;