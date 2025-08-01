import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store';
import { SocialMediaFeedProps, Character, SocialMediaPost } from '../../../types';
import ModalWrapper from './ModalWrapper';
import { hideModal } from '../../../store/uiSlice';
import { selectAllCharacters } from '../../../store/storySlice'; // Moved to top
import ImageWithLoader from '../../molecules/ImageWithLoader';
import { format } from 'date-fns';
import { Heart, MessageCircle, Share2 } from 'lucide-react';

const SocialMediaModal: React.FC = () => {
  const dispatch = useDispatch();
  const activeCardId = useSelector((state: RootState) => state.ui.activeCardId);
  const activeCardType = useSelector((state: RootState) => state.ui.activeCardType);
  const allCharacters = useSelector(selectAllCharacters);

  // Only render if the active card is a social media feed and a character is selected
  if (activeCardType !== 'socialMediaFeed' || !activeCardId) {
    return null;
  }

  const character = allCharacters.find(char => char.id === activeCardId) as Character | undefined;
  const socialMediaComponent = character?.components.find(c => c.type === 'socialMedia');
  const socialMediaFeedProps = socialMediaComponent?.props as SocialMediaFeedProps | undefined;

  if (!character || !socialMediaFeedProps) {
    return null; // Should not happen if activeCardType is 'socialMediaFeed'
  }

  const handleClose = () => {
    dispatch(hideModal());
  };

  return (
    <ModalWrapper title={`${character.name}'s Social Media`}>
      <div className="flex flex-col gap-6 p-4 overflow-y-auto max-h-[70vh]">
        {socialMediaFeedProps.posts.length === 0 ? (
          <p className="text-brand-text-muted text-center">No social media posts found for {character.name}.</p>
        ) : (
          socialMediaFeedProps.posts.map((post: SocialMediaPost) => (
            <div key={post.id} className="bg-brand-surface-2 p-4 rounded-lg shadow-md">
              <div className="flex items-center mb-2">
                <img src={character.imagePrompt} alt={character.name} className="w-10 h-10 rounded-full mr-3 object-cover" />
                <div>
                  <p className="font-oswald text-white text-lg">{character.name}</p>
                  <p className="text-brand-text-muted text-sm">{post.platform} &bull; {format(new Date(post.timestamp), 'MMM dd, yyyy HH:mm')}</p>
                </div>
              </div>
              <p className="text-white text-base mb-3">{post.content}</p>
              {post.imageUrl && (
                <div className="mb-3 rounded-lg overflow-hidden">
                  <ImageWithLoader imageUrl={post.imageUrl} alt="Social media post image" isLoading={false} />
                </div>
              )}
              <div className="flex items-center text-brand-text-muted text-sm">
                {post.likes !== undefined && (
                  <span className="flex items-center mr-4">
                    <Heart size={16} className="mr-1" /> {post.likes}
                  </span>
                )}
                {post.comments !== undefined && (
                  <span className="flex items-center mr-4">
                    <MessageCircle size={16} className="mr-1" /> {post.comments}
                  </span>
                )}
                {post.shares !== undefined && (
                  <span className="flex items-center">
                    <Share2 size={16} className="mr-1" /> {post.shares}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </ModalWrapper>
  );
};

export default SocialMediaModal;