/**
 * @file data/introSlideshowData.ts
 * @description This file contains the complete dataset for the introductory slideshow.
 * This data-driven approach allows for easy modification of the intro sequence without
 * changing any component code.
 */

export interface IntroSlide {
  id: string;
  imagePrompt: string;
  narration: string;
}

export const introSlideshowData: IntroSlide[] = [
  {
    id: 'intro-1',
    imagePrompt: "A vintage, faded color photograph from the 1970s. A young, hopeful East Asian woman in her early 20s and her husband stand on a foggy dock in San Francisco. The photo has film grain and slightly muted colors, except for the woman's vibrant red lipstick, which stands out starkly. The style evokes a treasured, old family photo but with a Sin City noir, high-contrast feel.",
    narration: "Mei Ling Wong and her husband came to America with calloused hands and ancient knowledge. No money. No English. Just roots—real and spiritual."
  },
  {
    id: 'intro-2',
    imagePrompt: "The interior of a traditional Chinese apothecary, sunlight streaming through a window. Sin City style: photorealistic, high-contrast black and white, with the crimson red label on a single glass jar providing a stark splash of color. Gritty, noir aesthetic with deep shadows and visible dust motes in the light.",
    narration: "She built this place by hand. Taught herself taxes, permits, English. She treated arthritis, heartbreak, and teenage breakouts alike—with care, not judgment."
  },
  {
    id: 'intro-3',
    imagePrompt: "A photorealistic, emotionally charged scene in a rain-slicked cemetery. The image must ONLY contain two people: a somber, middle-aged Mei-Ling Wong and her young daughter, Sophia, standing before a granite headstone. The style is high-contrast, black and white noir, with deep, dramatic shadows. The only color is a single, perfect red rose lying on the grave and a small red ribbon in Sophia's dark hair, its vibrant hue standing out against the monochrome grief.",
    narration: "All of her training couldn't help her save her husband, but she was determined to go on for her family"
  },
  {
    id: 'intro-4',
    imagePrompt: "A photorealistic scene inside a bustling apothecary, focused on exactly three people: a smiling middle-aged Mei-Ling Wong behind the counter, a teenage East Asian Sophia Wong beside her, and a young Indian woman, Emily Patel, also present. The image must contain ONLY these three individuals. Sin City style: high-contrast black and white, with only the red of the apothecary's sign reflected in the window providing color. Gritty, cinematic, noir aesthetic.",
    narration: "Sophia was her daughter. Emily Patel was her shadow. Together, they kept her legacy alive. But legacies don’t always agree on who they belong to."
  },
  {
    id: 'intro-5',
    imagePrompt: "A candid photo of Mei-Ling Wong, a resilient woman in her mid-50s, and James, a modestly attractive and well-kept man in his early 50s, dancing in a kitchen at night. They are laughing, sharing a moment of joy. Sin City style: photorealistic, high-contrast black and white. The deep red of Mei-Ling's dress is the only color. Sharp focus, dramatic shadows, noir aesthetic.",
    narration: "James was new. Steady. Funny. He made her forget her loneliness. Some saw him as a gift. Others… as an invader."
  },
  {
    id: 'intro-6',
    imagePrompt: "A stylized close-up, focusing on a pivotal moment of exchange. The delicate, slightly worn hand of an older Asian woman, her nails painted a searing, vibrant red, is handing an ornate, old-fashioned brass key *to* the larger, confident, manicured hand of a wealthy man wearing an expensive watch. The motion is clear: the woman is giving the key, the man is receiving it. Sin City style: photorealistic, high-contrast black and white graphic novel art. The red nail polish is the only color. Gritty, noir aesthetic with deep shadows, cinematic lighting, and sharp focus.",
    narration: "She was tired. The neighborhood had changed. She was offered a future, but the cost was the past. Not everyone agreed on what she owed… or to whom."
  },
  {
    id: 'intro-7',
    imagePrompt: "The front of a closed apothecary at dawn. Police tape is stretched across the door, but the tape itself is monochrome. The windows are slightly transparent, showing a hint of the dark interior. A single, ominous red glow emanates from deep inside the shop, backlighting the windows. This red glow is the ONLY color in the entire image. The style is high-contrast, photorealistic, gritty noir.",
    narration: "Last night, Mei Ling Wong was found in her shop. No signs of forced entry. No money missing. Just an unanswered question: who took away the heart of the apothecary?"
  }
];
