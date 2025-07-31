/**
 * @file SocialMediaFeedCard.tsx
 * @description A new card component that displays a character's social media feed.
 * This replaces the previous modal, providing a more consistent and interactive UI
 * that aligns with the other card views in the application.
 */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Character, PlayerAction, StoryObject } from '../../types';
import { AppDispatch, RootState } from '../../store';
import { goBack, setActiveCard } from '../../store/uiSlice';
import { selectSocialPostsForCharacter } from '../../store/storySlice';
import ImageWithLoader from '../molecules/ImageWithLoader';
import BackButton from '../atoms/BackButton';
import { useCardImage } from '../../hooks/useCardImage';
import { useADA } from '../../hooks/useADA';

/**
 * --- Extracted Sub-Component: PostCard ---
 * A memoized component to display a single social media post, which is now a StoryObject.
 * This improves performance and makes each post interactive.
 */
const PostCard: React.FC<{ post: StoryObject }> = React.memo(({ post }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { imageUrl, isLoading } = useCardImage(post, 'selectiveColor');

    const handleClick = () => {
        // Clicking a post now navigates to its own ObjectCard.
        dispatch(setActiveCard({ id: post.id, type: 'object' }));
    };

    return (
        <div 
            className="bg-brand-surface rounded-lg overflow-hidden shadow-lg animate-fade-in border border-brand-border cursor-pointer hover:border-brand-primary transition-colors"
            onClick={handleClick}
        >
            <div className="h-96 relative bg-brand-bg">
                <ImageWithLoader imageUrl={imageUrl} isLoading={isLoading} alt={post.name || 'Social media post'} objectFit="cover" />
            </div>
            <div className="p-4">
                <p className="text-brand-text leading-relaxed">{post.description}</p>
                <p className="text-xs text-brand-text-muted mt-2">{new Date(post.timestamp).toLocaleString()}</p>
            </div>
        </div>
    );
});


const SocialMediaFeedCard: React.FC<{ character: Character }> = ({ character }) => {
    const dispatch = useDispatch<AppDispatch>();
    const triggerADA = useADA();
    const posts = useSelector((state: RootState) => selectSocialPostsForCharacter(state, character.id));

    // Trigger ADA analysis when the card is first viewed.
    React.useEffect(() => {
        triggerADA(
            PlayerAction.VIEW_SOCIAL_MEDIA_FEED,
            `Player is viewing the social media feed for ${character.name}.`
        );
    // We only want this to run once when the character changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [character.id]);

    return (
        <div className="w-full h-full flex flex-col bg-brand-bg animate-slide-in-bottom">
            {/* Header, consistent with other cards like EvidenceGroupCard */}
            <header className="p-4 flex items-center gap-4 border-b-2 border-brand-border flex-shrink-0 bg-black">
                <BackButton onClick={() => dispatch(goBack())} />
                <h1 className="text-3xl font-oswald text-white uppercase tracking-wider truncate">
                    {`${character.name}'s Feed`}
                </h1>
            </header>

            {/* Scrollable Content Area */}
            <div className="flex-1 w-full p-4 pb-40 overflow-y-auto">
                {posts.length > 0 ? (
                    <div className="space-y-4">
                        {posts.map(post => <PostCard key={post.id} post={post} />)}
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full text-center">
                        <p className="text-brand-text-muted">No social media activity found for this individual.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SocialMediaFeedCard;
