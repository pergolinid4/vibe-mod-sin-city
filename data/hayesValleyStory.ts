/**
 * @file data/hayesValleyStory.ts
 * @description This file contains the complete dataset for the story, "The Hayes Valley Killing".
 * It is structured for easy authoring and then processed by a set of transformation functions
 * into the component-based data model required by the application. This separation forms the
 * "Data Transformation Layer", a key architectural pattern that keeps the raw story data simple
 * and decouples it from the application's final data structures.
 */

import { StoryData, Testimony, Hotspot, Character, Location, StoryObject, EvidenceGroup, DataComponent, CanonicalTimeline, EvidenceStack, EvidenceRarity, Bounty, DialogueData, Insight } from '../types';

// The raw story data is defined as a large JSON-like object for easy authoring.
const rawStory = {
  "storyInfo": {
    "id": "story_mount_tam_01",
    "title": "The Wild Trail Murders",
    "premise": "Wednesday, August 13th, 2025: Tom and Carol Trembly were found dead during a midweek hike near Mount Tamalpais. Tom had been shot through the heart with a .243 Winchester; Carol’s body was discovered at the base of a nearby cliff. Initial investigation suggests Tom was shot using a high-powered hunting rifle, and Carol fell while fleeing the scene. The case reveals a complex web of resentments, betrayals, and financial disputes, all tied to the recent sale of the family’s outdoor shop, Wild Trail Supply Co.",
    "mapImagePrompt": "A high-contrast, black and white noir-style map of Marin County, California. Mount Tamalpais is highlighted in red. The trails are stark white on a black background. Minimalist and clean, like a detective's screen."
  },
  "characters": [
    {
      "id": "char_tom_trembly",
      "name": "Tom Trembly",
      "age": "66",
      "role": "Victim",
      "occupation": "Retired Shop Owner & Eagle Scout Coach",
      "imagePrompt": "A kind-faced elderly man in his mid-60s, with a strong, quiet demeanor. He wears a hiking vest and has a gentle smile. Photorealistic portrait set against a backdrop of Mount Tamalpais.",
      "bio": "Retired owner of Wild Trail Supply Co. and longtime Eagle Scout coach. Respected in his Marin County community for his kindness and quiet strength. Killed by a single gunshot wound from a .243 Winchester.",
      "components": [
        { "type": "physicalCharacteristics", "props": { "height": "5'10\"", "weight": "180 lbs", "eyes": "Blue", "hair": "Gray" } }
      ]
    },
    {
      "id": "char_carol_trembly",
      "name": "Carol Trembly",
      "age": "63",
      "role": "Victim",
      "occupation": "Community Volunteer",
      "imagePrompt": "A spiritual, eccentric elderly woman in her early 60s, with a warm, community-minded expression. She wears a colorful scarf and carries a basket of baked goods. Photorealistic portrait at a local farmers market.",
      "bio": "Spiritual, eccentric, and community-minded. Known for her baking, gardening, and presence at the local farmers market. Died after falling from a cliff while fleeing Tom’s murder.",
      "components": [
        { "type": "physicalCharacteristics", "props": { "height": "5'5\"", "weight": "130 lbs", "eyes": "Green", "hair": "Blonde" } }
      ]
    },
    {
      "id": "char_hank_bassett",
      "name": "Hank Bassett",
      "age": "51",
      "role": "Culprit",
      "occupation": "Former Shop Employee",
      "imagePrompt": "A rugged man in his early 50s, with a weathered face and a hint of bitterness in his eyes. He wears a work shirt and looks like he's seen better days. Photorealistic portrait.",
      "bio": "Former employee of Wild Trail Supply Co. Fired after being blamed for a suspicious fire at the shop. Felt betrayed by Tom, whom he had worked for over twenty years. Motive: Revenge for being cast out of the community and losing the business he thought he’d inherit.",
      "statement": "They threw me away like trash after twenty years. Tom deserved what he got. I just wish I'd been the one to do it.",
      "components": [
        { "type": "physicalCharacteristics", "props": { "height": "5'9\"", "weight": "170 lbs", "eyes": "Brown", "hair": "Brown" } },
        {
          "type": "dialogue",
          "props": {
            "mode": "interrogation",
            "buttonText": "Interrogate Suspect",
            "persona": "You are Hank Bassett, a 51-year-old former employee. You are the killer. Your goal is to deflect suspicion onto Oliver Trembly. You are bitter, resentful, and believe you were wronged. You will lie and contradict yourself when pressed.\n\nMANDATORY JSON STRUCTURE: Your response MUST be a valid JSON object. It must have 'chunks' (an array of objects, each with 'text' and 'isCriticalClue' boolean), 'phaseUpdate' (object with 'progressValue' number), 'nextSuggestedQuestions' (an array of exactly 3 contextually relevant strings), and 'adaFeedback' (a concise, 1-sentence analysis of the player's last question).\n\nCRITICAL DIRECTIVE: Your response text must be broken down into 2-3 distinct, meaningful chunks, each representing a separate thought or piece of information. Do not combine them into one large paragraph.\n\nPLAYER CONTEXT: The player's question may be prefaced with their current line of inquiry, like this: `(My current line of inquiry is: \"Expose his motive for revenge\")`. You MUST use this context to inform your response and to generate the next suggested questions.\n\nCRITICAL QUESTION DIRECTIVE: Your 'nextSuggestedQuestions' MUST be directly related to the player's current line of inquiry. They should be logical follow-ups to help the player achieve this specific goal.\n\nGAMEPLAY MECHANICS:\n- If the player asks a relevant question, return a moderate `progressValue` (e.g., 5-15) and positive `adaFeedback` (e.g., 'An insightful question. This forces him to address his past directly.').\n- If the player asks an irrelevant or accusatory question, return a low `progressValue` (0-5) and negative `adaFeedback` (e.g., 'This accusation is premature and cost you valuable resources. It makes him more defensive.').\n- If your response contains a critical clue that resolves the current line of inquiry, include `phaseCompleted: true` in your response, and you MUST also include an `insight` object (with `justification` and `newLead`) within that specific chunk.\n\nCRITICAL CLUES & INSIGHTS:\n1.  Line of Inquiry: 'Expose his motive for revenge.' When asked about his firing, reveal his belief that he was framed for the fire. Make this chunk a critical clue (`isCriticalClue: true`) and complete the phase (`phaseCompleted: true`). The `insight` for this chunk MUST be: { \"justification\": \"This establishes a powerful motive—revenge for being framed and losing his legacy.\", \"newLead\": \"This establishes a powerful motive. We need to investigate the fire at Wild Trail Supply Co.\" }\n2.  Line of Inquiry: 'Challenge his alibi.' When asked about his alibi, subtly reveal knowledge of the rifle's location (e.g., 'I heard Tom kept that old hunting rifle in the attic.'). Make this a critical clue and complete the phase. The `insight` MUST be: { \"justification\": \"He has knowledge only the killer would possess.\", \"newLead\": \"This is suspicious. How would he know where Tom kept his rifle? We need to press him on this.\" }",
            "slideshowPrompts": [
              "Body cam footage, medium close-up of a rugged man in his early 50s, Hank Bassett, sitting at a metal table in a stark interrogation room. His expression is bitter. A detective's hand is visible, holding a pencil over a notebook. The style is high-contrast, gritty, Sin City noir.",
              "Body cam view, bust shot of a suspect, Hank Bassett, glaring at the detective from across a table in an interrogation room. The lighting is harsh, casting deep shadows. The detective is writing in a notebook. Photorealistic, Sin City noir style.",
              "Body cam view of Hank Bassett in an interrogation room. He's leaning forward, speaking intensely. The detective's notebook is in the foreground. High-contrast, gritty, Sin City noir."
            ],
            "interrogation": {
              "linesOfInquiry": [
                { "id": "loi_hank_motive", "label": "Expose his motive for revenge", "initialQuestions": ["Why do you resent Tom Trembly?", "What happened with the fire at the shop?", "Did you feel betrayed by Tom?"] },
                { "id": "loi_hank_alibi", "label": "Challenge his alibi", "initialQuestions": ["Where were you on the day of the murders?", "Can anyone confirm you were home?", "Did you leave your property at all?"] },
                { "id": "loi_hank_rifle", "label": "Inquire about the stolen rifle", "initialQuestions": ["Do you know anything about Tom's hunting rifle?", "Why would someone steal a rifle from their home?", "Did you ever handle Tom's rifle?"] }
              ]
            }
          }
        }
      ]
    },
    {
      "id": "char_peter_lewin",
      "name": "Peter Lewin",
      "age": "40",
      "role": "Suspect",
      "occupation": "Unemployed (Former Army Marksman)",
      "imagePrompt": "A lean, intense man in his early 40s, with a military haircut and a guarded expression. He looks like he's seen combat. Photorealistic portrait.",
      "bio": "Carol’s son from a previous marriage. Army marksman, dishonorably discharged. Blames Tom and Carol for a fractured childhood. Has a history of violence and instability. Alibi: Claims he was fishing alone at the time of the murder. Motive: Deep emotional resentment and blame.",
      "statement": "I was fishing. Alone. Like I always do. They never cared about me anyway, so why would I care about them?",
      "components": [
         { "type": "physicalCharacteristics", "props": { "height": "6'0\"", "weight": "185 lbs", "eyes": "Hazel", "hair": "Brown, military cut" } },
         {
          "type": "dialogue",
          "props": {
            "mode": "interrogation",
            "buttonText": "Interrogate Suspect",
            "persona": "You are Peter Lewin, a 40-year-old former army marksman. You are innocent, but deeply resentful and emotionally unstable. You believe your childhood was fractured by Tom and Carol. You are defensive and prone to outbursts.\n\nMANDATORY JSON STRUCTURE: Your response MUST be a valid JSON object. It must have 'chunks' (an array of objects, each with 'text' and 'isCriticalClue' boolean), 'phaseUpdate' (object with 'progressValue' number), 'nextSuggestedQuestions' (an array of exactly 3 contextually relevant strings), and 'adaFeedback' (a concise, 1-sentence analysis of the player's last question).\n\nCRITICAL DIRECTIVE: Your response text must be broken down into 2-3 distinct, meaningful chunks, each representing a separate thought or piece of information. Do not combine them into one large paragraph.\n\nPLAYER CONTEXT: The player's question may be prefaced with their current line of inquiry, like this: `(My current line of inquiry is: \"Uncover his resentment towards Tom and Carol\")`. You MUST use this context to inform your response and to generate the next suggested questions.\n\nCRITICAL QUESTION DIRECTIVE: Your 'nextSuggestedQuestions' MUST be directly related to the player's current line of inquiry. They should be logical follow-ups to help the player achieve this specific goal.\n\nGAMEPLAY MECHANICS:\n- If the player asks a relevant question, return a moderate `progressValue` (e.g., 5-15) and positive `adaFeedback` (e.g., 'A good question. This forces him to confront his past.').\n- If the player asks an irrelevant or accusatory question, return a low `progressValue` (0-5) and negative `adaFeedback` (e.g., 'This accusation is premature and cost you valuable resources. It makes him more defensive.').\n- If your response contains a critical clue that resolves the current line of inquiry, include `phaseCompleted: true` in your response, and you MUST also include an `insight` object (with `justification` and `newLead`) within that specific chunk).\n\nCRITICAL CLUES & INSIGHTS:\n1.  Line of Inquiry: 'Uncover his resentment towards Tom and Carol.' When asked about his childhood, reveal his belief that Tom and Carol prioritized the shop over him. Make this chunk a critical clue (`isCriticalClue: true`) and complete the phase (`phaseCompleted: true`). The `insight` for this chunk MUST be: { \"justification\": \"This establishes a powerful emotional motive—neglect and perceived abandonment.\", \"newLead\": \"This establishes a powerful emotional motive. We need to investigate his childhood and relationship with the Tremblys.\" }\n2.  Line of Inquiry: 'Challenge his alibi.' When asked about his fishing trip, subtly reveal his knowledge of the trail system (e.g., 'I know those trails like the back of my hand. There's a hidden spot near the old oak tree.'). Make this a critical clue and complete the phase. The `insight` MUST be: { \"justification\": \"He has knowledge of the crime scene only the killer would possess.\", \"newLead\": \"This is suspicious. How would he know about a hidden spot near the crime scene? We need to press him on this.\" }",
            "slideshowPrompts": [
              "Body cam footage, medium close-up of a lean, intense man in his early 40s, Peter Lewin, sitting in an interrogation room. His expression is guarded. A detective's hand is visible, holding a pencil over a notebook. The style is high-contrast, gritty, Sin City noir.",
              "Body cam view, bust shot of a suspect, Peter Lewin, looking away, avoiding eye contact. The lighting is harsh. The detective is writing in a notebook. Photorealistic, Sin City noir style.",
              "Body cam view of Peter Lewin in an interrogation room. He's clenching his jaw, clearly agitated. The detective's notebook is in the foreground. High-contrast, gritty, Sin City noir."
            ],
            "interrogation": {
              "linesOfInquiry": [
                { "id": "loi_peter_resentment", "label": "Uncover his resentment towards Tom and Carol", "initialQuestions": ["How would you describe your relationship with your mother and Tom?", "Did you feel neglected as a child?", "What are your feelings about the sale of Wild Trail Supply Co.?"] },
                { "id": "loi_peter_alibi", "label": "Challenge his alibi", "initialQuestions": ["Where exactly were you fishing?", "Did anyone see you there?", "What time did you return home?"] },
                { "id": "loi_peter_marksman", "label": "Inquire about his military background", "initialQuestions": ["Your military records show you were a marksman. Is that true?", "Do you still own any firearms?", "Have you been to a shooting range recently?"] }
              ]
            }
          }
        }
      ]
    },
    {
      "id": "char_oliver_trembly",
      "name": "Oliver Trembly",
      "age": "34",
      "role": "Suspect",
      "occupation": "Hunting Enthusiast (Former Addict)",
      "imagePrompt": "A young man in his mid-30s, with a slightly disheveled but intense look. He has a hunting rifle slung over his shoulder and a determined expression. Photorealistic portrait.",
      "bio": "Tom and Carol’s son. Former addict, now a hunting enthusiast. Expected to inherit the family business before it was sold. Publicly argued with his parents weeks before the murder. Tried to sabotage the sale by burning it down. Alibi: Claims he was on a solo hunting trip and unreachable. Motive: Financial gain; he inherited money after their deaths.",
      "statement": "I was out in the wilderness, completely off-grid. I had no idea what happened until I got back. It's a tragedy, but I'm not involved.",
      "components": [
        { "type": "physicalCharacteristics", "props": { "height": "5'11\"", "weight": "175 lbs", "eyes": "Blue", "hair": "Blonde" } },
        {
          "type": "dialogue",
          "props": {
            "mode": "interrogation",
            "buttonText": "Interrogate Suspect",
            "persona": "You are Oliver Trembly, a 34-year-old hunting enthusiast. You are innocent of the murders, but you did set the fire at the shop. You are trying to hide your involvement in the fire and deflect suspicion. You are cunning and evasive.\n\nMANDATORY JSON STRUCTURE: Your response MUST be a valid JSON object. It must have 'chunks' (an array of objects, each with 'text' and 'isCriticalClue' boolean), 'phaseUpdate' (object with 'progressValue' number), 'nextSuggestedQuestions' (an array of exactly 3 contextually relevant strings), and 'adaFeedback' (a concise, 1-sentence analysis of the player's last question).\n\nCRITICAL DIRECTIVE: Your response text must be broken down into 2-3 distinct, meaningful chunks, each representing a separate thought or piece of information. Do not combine them into one large paragraph.\n\nPLAYER CONTEXT: The player's question may be prefaced with their current line of inquiry, like this: `(My current line of inquiry is: \"Uncover his financial motive\")`. You MUST use this context to inform your response and to generate the next suggested questions.\n\nCRITICAL QUESTION DIRECTIVE: Your 'nextSuggestedQuestions' MUST be directly related to the player's current line of inquiry. They should be logical follow-ups to help the player achieve this specific goal.\n\nGAMEPLAY MECHANICS:\n- If the player asks a relevant question, return a moderate `progressValue` (e.g., 5-15) and positive `adaFeedback` (e.g., 'A good question. This forces him to address his financial situation.').\n- If the player asks an irrelevant or accusatory question, return a low `progressValue` (0-5) and negative `adaFeedback` (e.g., 'This accusation is premature and cost you valuable resources. It makes him more defensive.').\n- If your response contains a critical clue that resolves the current line of inquiry, include `phaseCompleted: true` in your response, and you MUST also include an `insight` object (with `justification` and `newLead`) within that specific chunk).\n\nCRITICAL CLUES & INSIGHTS:\n1.  Line of Inquiry: 'Uncover his financial motive.' When asked about his inheritance, reveal his anger about the shop sale and his attempt to burn it down. Make this chunk a critical clue (`isCriticalClue: true`) and complete the phase (`phaseCompleted: true`). The `insight` for this chunk MUST be: { \"justification\": \"This establishes a powerful financial motive and reveals his involvement in the fire.\", \"newLead\": \"This establishes a powerful financial motive and reveals his involvement in the fire. We need to investigate the fire at Wild Trail Supply Co. further.\" }\n2.  Line of Inquiry: 'Challenge his alibi.' When asked about his hunting trip, subtly reveal his knowledge of the rifle's caliber (e.g., 'I prefer a .30-06 for deer, but a .243 Winchester is good for smaller game.'). Make this a critical clue and complete the phase. The `insight` MUST be: { \"justification\": \"He has knowledge of the murder weapon only the killer would possess.\", \"newLead\": \"This is suspicious. How would he know the caliber of the murder weapon? We need to press him on this.\" }",
            "slideshowPrompts": [
              "Body cam footage, medium close-up of a young man in his mid-30s, Oliver Trembly, sitting in an interrogation room. His expression is intense. A detective's hand is visible, holding a pencil over a notebook. The style is high-contrast, gritty, Sin City noir.",
              "Body cam view, bust shot of a suspect, Oliver Trembly, looking slightly disheveled but determined. The lighting is harsh. The detective is writing in a notebook. Photorealistic, Sin City noir style.",
              "Body cam view of Oliver Trembly in an interrogation room. He's gesturing with his hand as if explaining something. The detective's notebook is in the foreground. High-contrast, gritty, Sin City noir."
            ],
            "interrogation": {
              "linesOfInquiry": [
                { "id": "loi_oliver_motive", "label": "Uncover his financial motive", "initialQuestions": ["What are your thoughts on the sale of Wild Trail Supply Co.?", "Did you expect to inherit the business?", "Did you argue with your parents about money?"] },
                { "id": "loi_oliver_alibi", "label": "Challenge his alibi", "initialQuestions": ["Can you provide any proof of your hunting trip?", "Were you truly unreachable?", "What time did you return from your trip?"] },
                { "id": "loi_oliver_fire", "label": "Inquire about the shop fire", "initialQuestions": ["Do you know anything about the fire at Wild Trail Supply Co.?", "Were you involved in the fire?", "Why would someone try to burn down the shop?"] }
              ]
            }
          }
        }
      ]
    },
    {
      "id": "char_kermit_hermit",
      "name": "Kermit the Hermit",
      "age": "50s",
      "role": "Witness",
      "occupation": "Hermit",
      "imagePrompt": "A disheveled man in his 50s, with a long beard and wild hair. He wears worn outdoor clothing and has a wary but observant expression. Photorealistic portrait.",
      "bio": "Lives in the woods near the trail system. Known to local hikers and law enforcement. Claims to have heard shouting and a gunshot near the trail that afternoon. Offers unreliable but potentially useful insights.",
      "components": [
        {
          "type": "dialogue",
          "props": {
            "mode": "interview",
            "buttonText": "Interview Witness",
            "persona": "You are Kermit the Hermit, a disheveled, eccentric, and slightly paranoid hermit who lives in the woods. You are wary of outsiders but willing to share what you saw, though your observations are often muddled with personal theories. You heard a gunshot and shouting. Refer to the victims as 'the Tremblys'. CRITICAL INSTRUCTION: Your response MUST be a valid JSON object. It must have a single key, 'chunks', which is an array of objects. Each object must have a 'text' property (a string). Each string in the array should be a single, concise sentence. Break your response into 3-4 very short, bite-sized chunks.",
            "openingStatement": "They came through here, the Tremblys. Always on that trail. Then... a loud noise. And shouting. The woods, they remember.",
            "suggestedQuestions": [
              "What did you hear that day?",
              "Did you see anyone on the trail?",
              "Can you describe the shouting?"
            ],
            "slideshowPrompts": [
              "Body cam footage of a disheveled man in his 50s, Kermit the Hermit, being interviewed by a detective holding a notebook and pencil. They are in a dense forest near a hiking trail. The style is high-contrast, gritty, Sin City noir.",
              "Body cam view, bust shot of a witness, Kermit the Hermit, looking wary but observant. The lighting is dappled by the trees. The detective is writing in a notebook. Photorealistic, Sin City noir style.",
              "Body cam view of Kermit the Hermit. He's gesturing with his hands, pointing towards the trail. The detective's notebook is in the foreground. High-contrast, gritty, Sin City noir."
            ]
          }
        }
      ]
    }
  ],
  "locations": [
    {
      "id": "loc_trailhead",
      "name": "Mount Tamalpais Trailhead",
      "imagePrompt": "A rustic trailhead sign for Mount Tamalpais. The path leads into a dense, redwood forest. The ground is covered in pine needles and dappled sunlight. A small, discreet security camera is mounted on a tree. The style is high-contrast, gritty, Sin City noir.",
      "sceneSummary": "The starting point of the hiking trail where Tom and Carol Trembly began their last hike. A security camera is present.",
      "hotspots": [
        { "label": "Examine Trail Map", "targetCardId": "obj_trail_map", "targetCardType": "object", "aiHint": "the rustic trailhead sign" },
        { "label": "Check Security Camera", "targetCardId": "obj_trail_camera_footage", "targetCardType": "object", "aiHint": "the small, discreet security camera on a tree" },
        { "label": "Follow Trail", "type": "move", "targetCardId": "loc_murder_scene", "targetCardType": "location", "aiHint": "the path leading into the forest" }
      ]
    },
    {
      "id": "loc_murder_scene",
      "name": "Murder Scene (Mount Tamalpais)",
      "imagePrompt": "A secluded, rocky bend in a hiking trail on Mount Tamalpais. Pine needles and fallen leaves cover the ground. A single, spent shell casing is visible near a large rock. Bloodstains are on the ground. The scene is marked with stylized forensic markers highlighted in searing red. The style is high-contrast, gritty, Sin City noir.",
      "sceneSummary": "The location where Tom Trembly was shot. Evidence of a struggle and a single gunshot.",
      "hotspots": [
        { "label": "Examine Shell Casing", "targetCardId": "obj_spent_shell_casing", "targetCardType": "object", "aiHint": "the single, spent shell casing near a large rock" },
        { "label": "Analyze Bloodstains", "targetCardId": "obj_blood_analysis_report", "targetCardType": "object", "aiHint": "the bloodstains on the ground" },
        { "label": "Inspect Cliff Edge", "targetCardId": "obj_carol_fall_report", "targetCardType": "object", "aiHint": "the nearby cliff edge" },
        { "label": "Return to Trailhead", "type": "move", "targetCardId": "loc_trailhead", "targetCardType": "location", "aiHint": "the path leading back" }
      ]
    },
    {
      "id": "loc_cliff_base",
      "name": "Base of Cliff",
      "isInternal": true,
      "imagePrompt": "The base of a steep, rocky cliff on Mount Tamalpais. Carol Trembly's body is visible, partially obscured by rocks and foliage. Her hiking boot is caught on a root. The scene is marked with stylized forensic markers highlighted in searing red. The style is high-contrast, gritty, Sin City noir.",
      "sceneSummary": "The location where Carol Trembly's body was found after she fell from the cliff.",
      "hotspots": [
        { "label": "Examine Body", "targetCardId": "obj_carol_autopsy_report", "targetCardType": "object", "aiHint": "Carol Trembly's body" },
        { "label": "Inspect Hiking Boot", "targetCardId": "obj_boot_scuff_marks", "targetCardType": "object", "aiHint": "her hiking boot caught on a root" },
        { "label": "Return to Murder Scene", "type": "move", "targetCardId": "loc_murder_scene", "targetCardType": "location", "aiHint": "the path leading up the cliff" }
      ]
    },
    {
      "id": "loc_trembly_home",
      "name": "Trembly Residence",
      "imagePrompt": "A cozy, well-maintained suburban home in Marin County. A hunting rifle rack is visible in the living room, with one rifle missing. A family photo is on the mantelpiece. A small, locked safe is hidden behind a painting. The style is high-contrast, gritty, Sin City noir.",
      "sceneSummary": "The home of Tom and Carol Trembly. The murder weapon was stored here.",
      "hotspots": [
        { "label": "Inspect Rifle Rack", "targetCardId": "obj_missing_rifle", "targetCardType": "object", "aiHint": "the hunting rifle rack with one rifle missing" },
        { "label": "Examine Family Photo", "targetCardId": "obj_trembly_family_photo", "targetCardType": "object", "aiHint": "the family photo on the mantelpiece" },
        { "label": "Open Safe", "targetCardId": "obj_trembly_will", "targetCardType": "object", "aiHint": "the small, locked safe behind a painting" }
      ]
    },
    {
      "id": "loc_wild_trail_supply",
      "name": "Wild Trail Supply Co. (Burned)",
      "imagePrompt": "The charred remains of an outdoor supply store. The sign 'Wild Trail Supply Co.' is partially burned. Evidence of a fire is everywhere. A security camera is melted and distorted. The style is high-contrast, gritty, Sin City noir, with smoke still lingering.",
      "sceneSummary": "The family business, recently sold and partially destroyed by fire. A key location for understanding motives.",
      "hotspots": [
        { "label": "Examine Fire Damage Report", "targetCardId": "obj_fire_report", "targetCardType": "object", "aiHint": "the charred remains of the store" },
        { "label": "Inspect Melted Camera", "targetCardId": "obj_melted_camera", "targetCardType": "object", "aiHint": "the melted and distorted security camera" },
        { "label": "Check Employee Records", "targetCardId": "obj_employee_records", "targetCardType": "object", "aiHint": "a charred filing cabinet" }
      ]
    },
    {
      "id": "loc_hank_cabin",
      "name": "Hank's Cabin",
      "imagePrompt": "A secluded, rustic cabin deep in the woods. A small, smoldering burn pit is visible behind the cabin. A pile of old newspapers is on the porch. The style is high-contrast, gritty, Sin City noir.",
      "sceneSummary": "Hank Bassett's isolated cabin. A potential place for evidence disposal.",
      "hotspots": [
        { "label": "Examine Burn Pit", "targetCardId": "obj_burned_gloves", "targetCardType": "object", "aiHint": "the smoldering burn pit behind the cabin" },
        { "label": "Read Newspapers", "targetCardId": "obj_newspaper_articles", "targetCardType": "object", "aiHint": "the pile of old newspapers on the porch" }
      ]
    },
    {
      "id": "loc_peter_apartment",
      "name": "Peter's Apartment",
      "imagePrompt": "A sparsely furnished, messy apartment. Fishing gear is scattered on the floor. A military discharge paper is tacked to a wall. A laptop is open on a table. The style is high-contrast, gritty, Sin City noir.",
      "sceneSummary": "Peter Lewin's apartment. Reflects his unstable lifestyle.",
      "hotspots": [
        { "label": "Inspect Fishing Gear", "targetCardId": "obj_fishing_lures", "targetCardType": "object", "aiHint": "the fishing gear scattered on the floor" },
        { "label": "Read Discharge Papers", "targetCardId": "obj_discharge_papers", "targetCardType": "object", "aiHint": "the military discharge paper tacked to a wall" },
        { "label": "Check Laptop", "targetCardId": "obj_online_forums", "targetCardType": "object", "aiHint": "the open laptop on a table" }
      ]
    },
    {
      "id": "loc_oliver_apartment",
      "name": "Oliver's Apartment",
      "imagePrompt": "A modern, well-kept apartment with hunting trophies on the walls. A high-end hunting rifle is displayed on a stand. A recent bank statement is on a coffee table. The style is high-contrast, gritty, Sin City noir.",
      "sceneSummary": "Oliver Trembly's apartment. Shows his current interests and financial status.",
      "hotspots": [
        { "label": "Examine Hunting Rifle", "targetCardId": "obj_oliver_rifle", "targetCardType": "object", "aiHint": "the high-end hunting rifle on a stand" },
        { "label": "Review Bank Statement", "targetCardId": "obj_bank_statement", "targetCardType": "object", "aiHint": "the recent bank statement on a coffee table" },
        { "label": "Inspect Hunting Gear", "targetCardId": "obj_hunting_gear", "targetCardType": "object", "aiHint": "various hunting trophies on the walls" }
      ]
    }
  ],
  "objects": [
    { "id": "obj_243_winchester_rifle", "name": ".243 Winchester Rifle", "unidentifiedDescription": "A hunting rifle.", "category": "physical", "locationFoundId": "loc_trembly_home", "timestamp": "2025-08-13T11:00:00Z", "costToUnlock": 10, "rarity": "critical", "imagePrompt": "A .243 Winchester hunting rifle, clean and well-maintained. A faint smudge is visible on the stock. Forensic focus, high-contrast, Sin City noir.", "description": "The murder weapon, found returned to the Trembly home. Ballistics confirm it fired the fatal shot. Traces of a unique residue are found on the stock.", "tags": ["means"], "components": [] },
    { "id": "obj_spent_shell_casing", "name": "Spent .243 Shell Casing", "unidentifiedDescription": "A spent bullet casing.", "category": "physical", "locationFoundId": "loc_murder_scene", "timestamp": "2025-08-13T10:15:00Z", "costToUnlock": 10, "rarity": "material", "imagePrompt": "A single, spent .243 Winchester shell casing lying on pine needles. Forensic focus, high-contrast, Sin City noir.", "description": "A spent shell casing found at the murder scene. Ballistics match it to the .243 Winchester rifle from the Trembly home.", "tags": ["means", "opportunity"], "components": [] },
    { "id": "obj_blood_analysis_report", "name": "Blood Analysis Report", "unidentifiedDescription": "A forensic report on blood.", "category": "document", "locationFoundId": "loc_murder_scene", "timestamp": "2025-08-13T12:00:00Z", "costToUnlock": 10, "rarity": "circumstantial", "imagePrompt": "A forensic report on a tablet, titled 'Blood Spatter Analysis'. It shows diagrams of the trail with blood patterns. High-contrast, gritty, Sin City noir.", "description": "Report confirms Tom Trembly's blood at the scene, consistent with a single, fatal shot. No other blood types found.", "tags": ["opportunity"], "components": [] },
    { "id": "obj_carol_fall_report", "name": "Cliff Fall Report", "unidentifiedDescription": "A report on a fall.", "category": "document", "locationFoundId": "loc_murder_scene", "timestamp": "2025-08-13T13:00:00Z", "costToUnlock": 10, "rarity": "circumstantial", "imagePrompt": "A police report detailing the discovery of Carol Trembly's body at the base of a cliff. Diagrams show the fall trajectory. High-contrast, gritty, Sin City noir.", "description": "Report details Carol Trembly's fatal fall from the cliff. Injuries consistent with a fall, no signs of struggle before the fall. Suggests she was fleeing.", "tags": ["opportunity"], "components": [] },
    { "id": "obj_carol_autopsy_report", "name": "Carol's Autopsy Report", "unidentifiedDescription": "An autopsy report.", "category": "document", "locationFoundId": "loc_cliff_base", "timestamp": "2025-08-14T09:00:00Z", "costToUnlock": 10, "rarity": "material", "imagePrompt": "A medical examiner's report on a tablet, titled 'Autopsy Report: Carol Trembly'. Details severe blunt force trauma consistent with a fall from height. High-contrast, gritty, Sin City noir.", "description": "Autopsy confirms Carol died from injuries sustained in the fall. No other injuries or signs of foul play prior to the fall.", "tags": ["opportunity"], "components": [] },
    { "id": "obj_boot_scuff_marks", "name": "Scuff Marks on Boot", "unidentifiedDescription": "Scuff marks on a hiking boot.", "category": "physical", "locationFoundId": "loc_cliff_base", "timestamp": "2025-08-13T14:00:00Z", "costToUnlock": 10, "rarity": "circumstantial", "imagePrompt": "A close-up of a hiking boot with distinct scuff marks and a small tear, caught on a tree root at the base of a cliff. Forensic focus, high-contrast, Sin City noir.", "description": "Carol's hiking boot shows scuff marks and a tear, consistent with losing footing on a rocky, narrow trail. Supports the theory she fell while fleeing.", "tags": ["opportunity"], "components": [] },
    { "id": "obj_missing_rifle", "name": "Missing .243 Winchester Rifle", "unidentifiedDescription": "A missing rifle from a rack.", "category": "physical", "locationFoundId": "loc_trembly_home", "timestamp": "2025-08-13T09:00:00Z", "costToUnlock": 10, "rarity": "critical", "imagePrompt": "A wooden rifle rack in a cozy living room, with one empty slot where a .243 Winchester rifle should be. A faint dust outline of the rifle is visible. High-contrast, gritty, Sin City noir.", "description": "The .243 Winchester rifle, confirmed as the murder weapon, was stolen from the Trembly home days before the murder. It was later returned.", "tags": ["means", "opportunity"], "components": [] },
    { "id": "obj_trembly_family_photo", "name": "Trembly Family Photo", "unidentifiedDescription": "A family photograph.", "category": "physical", "locationFoundId": "loc_trembly_home", "timestamp": "2025-01-01T12:00:00Z", "costToUnlock": 10, "rarity": "irrelevant", "imagePrompt": "A framed family photograph on a mantelpiece. It shows Tom and Carol with a younger Oliver, all smiling. Peter is noticeably absent. High-contrast, gritty, Sin City noir.", "description": "A family photo of Tom, Carol, and Oliver. Peter Lewin is not in the photo, hinting at the fractured family dynamics.", "components": [] },
    { "id": "obj_trembly_will", "name": "Trembly Will", "unidentifiedDescription": "A legal document.", "category": "document", "locationFoundId": "loc_trembly_home", "timestamp": "2025-08-10T10:00:00Z", "costToUnlock": 10, "rarity": "material", "imagePrompt": "A legal document titled 'Last Will and Testament'. A section is highlighted, stating that Oliver and Daisy (Tom's sister) are the primary beneficiaries. High-contrast, gritty, Sin City noir.", "description": "The Trembly's last will and testament, confirming Oliver Trembly and Tom's sister, Daisy, as the primary beneficiaries. This establishes Oliver's financial motive.", "tags": ["motive"], "components": [] },
    { "id": "obj_fire_report", "name": "Wild Trail Supply Co. Fire Report", "unidentifiedDescription": "A fire investigation report.", "category": "document", "locationFoundId": "loc_wild_trail_supply", "timestamp": "2025-06-22T15:00:00Z", "costToUnlock": 10, "rarity": "material", "imagePrompt": "A fire department investigation report. The conclusion states 'Cause Undetermined, but suspicious.' A note in the margin reads: 'Tom suspected Hank.' High-contrast, gritty, Sin City noir.", "description": "Official fire report for Wild Trail Supply Co. States the cause is 'undetermined but suspicious.' Tom publicly blamed Hank for the fire, which Hank denies.", "tags": ["motive"], "components": [] },
    { "id": "obj_melted_camera", "name": "Melted Security Camera", "unidentifiedDescription": "A damaged security camera.", "category": "physical", "locationFoundId": "loc_wild_trail_supply", "timestamp": "2025-06-22T16:00:00Z", "costToUnlock": 10, "rarity": "circumstantial", "imagePrompt": "A melted and distorted security camera mounted on a charred wall. The lens is cracked. High-contrast, gritty, Sin City noir.", "description": "A security camera at Wild Trail Supply Co. that was melted in the fire. No usable footage was recovered.", "tags": ["opportunity"], "components": [] },
    { "id": "obj_employee_records", "name": "Employee Records", "unidentifiedDescription": "A file of employee records.", "category": "document", "locationFoundId": "loc_wild_trail_supply", "timestamp": "2025-06-01T09:00:00Z", "costToUnlock": 10, "rarity": "irrelevant", "imagePrompt": "A file folder labeled 'Employee Records'. Hank Bassett's file is open, showing his long tenure and recent termination notice. High-contrast, gritty, Sin City noir.", "description": "Employee records for Wild Trail Supply Co., confirming Hank Bassett's long employment and his termination after the fire.", "tags": ["motive"], "components": [] },
    { "id": "obj_burned_gloves", "name": "Burned Gloves and Pack", "unidentifiedDescription": "Burned items in a pit.", "category": "physical", "locationFoundId": "loc_hank_cabin", "timestamp": "2025-08-13T11:30:00Z", "costToUnlock": 10, "rarity": "critical", "imagePrompt": "A smoldering burn pit behind a rustic cabin. Charred remains of rubber gloves and a small backpack are visible. Forensic focus, high-contrast, Sin City noir.", "description": "Charred remains of rubber gloves and a small backpack found in Hank's burn pit. Forensic analysis reveals traces of gunpowder residue and a unique fabric from the backpack, linking him to the crime.", "tags": ["means", "opportunity"], "components": [] },
    { "id": "obj_newspaper_articles", "name": "Newspaper Articles", "unidentifiedDescription": "A stack of old newspapers.", "category": "document", "locationFoundId": "loc_hank_cabin", "timestamp": "2025-07-01T09:00:00Z", "costToUnlock": 10, "rarity": "circumstantial", "imagePrompt": "A stack of old newspapers on a porch. The top article has a headline about the Wild Trail Supply Co. fire and mentions Hank Bassett's firing. High-contrast, gritty, Sin City noir.", "description": "A stack of old newspapers, with several articles detailing the Wild Trail Supply Co. fire and Hank Bassett's public dismissal. Reinforces Hank's motive.", "tags": ["motive"], "components": [] },
    { "id": "obj_fishing_lures", "name": "Fishing Lures", "unidentifiedDescription": "A collection of fishing lures.", "category": "physical", "locationFoundId": "loc_peter_apartment", "timestamp": "2025-08-12T18:00:00Z", "costToUnlock": 10, "rarity": "irrelevant", "imagePrompt": "A tackle box filled with various fishing lures, hooks, and lines. Some lures are new, others show signs of heavy use. High-contrast, gritty, Sin City noir.", "description": "Peter's fishing gear. While it supports his alibi, it doesn't provide concrete proof of his whereabouts at the time of the murder.", "tags": ["alibi"], "components": [] },
    { "id": "obj_discharge_papers", "name": "Military Discharge Papers", "unidentifiedDescription": "Military documents.", "category": "document", "locationFoundId": "loc_peter_apartment", "timestamp": "2010-05-20T10:00:00Z", "costToUnlock": 10, "rarity": "material", "imagePrompt": "Official military discharge papers tacked to a wall. The document states 'Dishonorable Discharge' and mentions 'conduct unbecoming an officer' and 'unauthorized use of firearms'. High-contrast, gritty, Sin City noir.", "description": "Peter Lewin's dishonorable discharge papers from the military, citing 'unauthorized use of firearms.' This establishes his proficiency with firearms and a history of instability.", "tags": ["means", "motive"], "components": [] },
    { "id": "obj_online_forums", "name": "Online Forums History", "unidentifiedDescription": "A laptop's browser history.", "category": "digital", "locationFoundId": "loc_peter_apartment", "timestamp": "2025-08-13T10:00:00Z", "costToUnlock": 10, "rarity": "circumstantial", "imagePrompt": "A laptop screen displaying an online forum. Recent posts by a user named 'MarksmanPete' discuss high-powered hunting rifles and remote hiking trails. High-contrast, gritty, Sin City noir.", "description": "Peter's browser history shows recent activity on online hunting forums, discussing high-powered rifles and remote trails near Mount Tamalpais. This places him in the vicinity and shows interest in the murder weapon type.", "tags": ["means", "opportunity"], "components": [] },
    { "id": "obj_oliver_rifle", "name": "Oliver's Hunting Rifle", "unidentifiedDescription": "A hunting rifle.", "category": "physical", "locationFoundId": "loc_oliver_apartment", "timestamp": "2025-08-01T10:00:00Z", "costToUnlock": 10, "rarity": "irrelevant", "imagePrompt": "A high-end hunting rifle displayed on a stand in a modern apartment. It's a different caliber than the murder weapon. High-contrast, gritty, Sin City noir.", "description": "Oliver's personal hunting rifle. It is a different caliber (.30-06) than the murder weapon (.243 Winchester), ruling it out as the weapon used.", "tags": ["means"], "components": [] },
    { "id": "obj_bank_statement", "name": "Bank Statement", "unidentifiedDescription": "A bank statement.", "category": "document", "locationFoundId": "loc_oliver_apartment", "timestamp": "2025-08-15T09:00:00Z", "costToUnlock": 10, "rarity": "material", "imagePrompt": "A bank statement showing a large recent deposit. The transaction description reads 'Inheritance from Trembly Estate'. High-contrast, gritty, Sin City noir.", "description": "Oliver's bank statement shows a significant inheritance deposit from the Trembly estate, confirming his financial gain after his parents' deaths.", "tags": ["motive"], "components": [] },
    { "id": "obj_hunting_gear", "name": "Hunting Gear", "unidentifiedDescription": "Various hunting gear.", "category": "physical", "locationFoundId": "loc_oliver_apartment", "timestamp": "2025-08-12T16:00:00Z", "costToUnlock": 10, "rarity": "irrelevant", "imagePrompt": "Various hunting trophies and gear displayed on a wall in a modern apartment. Includes deer antlers, a camouflage jacket, and binoculars. High-contrast, gritty, Sin City noir.", "description": "Oliver's hunting gear. While it supports his hobby, it doesn't provide concrete proof of his whereabouts at the time of the murder.", "tags": ["alibi"], "components": [] },
    { "id": "obj_trail_map", "name": "Mount Tamalpais Trail Map", "unidentifiedDescription": "A hiking trail map.", "category": "document", "locationFoundId": "loc_trailhead", "timestamp": "2025-08-13T08:00:00Z", "costToUnlock": 10, "rarity": "irrelevant", "imagePrompt": "A detailed map of Mount Tamalpais hiking trails. The murder scene is marked with a small 'X'. High-contrast, gritty, Sin City noir.", "description": "A map of the Mount Tamalpais trails. The murder scene is marked, but the map itself provides no direct evidence.", "components": [] },
    { "id": "obj_trail_camera_footage", "name": "Trail Camera Footage", "unidentifiedDescription": "Security camera footage.", "category": "digital", "locationFoundId": "loc_trailhead", "timestamp": "2025-08-13T09:00:00Z", "costToUnlock": 10, "rarity": "critical", "imagePrompt": "Security camera footage from the trailhead. It shows Hank Bassett entering the trail system alone, wearing a dark hoodie, an hour before the murders. The timestamp is clear. High-contrast, gritty, Sin City noir.", "description": "Footage from the trailhead camera shows Hank Bassett entering the trail system alone, an hour before the murders. This directly contradicts his alibi.", "tags": ["opportunity"], "components": [] }
  ],
  "evidenceGroups": [
    {
      "id": "group_trembly_home_evidence",
      "name": "Trembly Home Evidence",
      "imagePrompt": "A collection of items from the Trembly residence: a missing rifle slot, a family photo, and a will.",
      "description": "Evidence from the Trembly home, revealing family dynamics and financial implications.",
      "objectIds": [
        "obj_missing_rifle",
        "obj_trembly_family_photo",
        "obj_trembly_will"
      ]
    },
    {
      "id": "group_wild_trail_fire_evidence",
      "name": "Wild Trail Fire Evidence",
      "imagePrompt": "Items related to the Wild Trail Supply Co. fire: a fire report, a melted camera, and employee records.",
      "description": "Evidence from the fire at Wild Trail Supply Co., shedding light on the inciting incident and potential motives.",
      "objectIds": [
        "obj_fire_report",
        "obj_melted_camera",
        "obj_employee_records"
      ]
    },
    {
      "id": "group_hank_cabin_evidence",
      "name": "Hank's Cabin Evidence",
      "imagePrompt": "Items from Hank's cabin: burned gloves and pack, and old newspaper articles.",
      "description": "Evidence found at Hank Bassett's cabin, suggesting his involvement and motive.",
      "objectIds": [
        "obj_burned_gloves",
        "obj_newspaper_articles"
      ]
    },
    {
      "id": "group_peter_apartment_evidence",
      "name": "Peter's Apartment Evidence",
      "imagePrompt": "Items from Peter's apartment: fishing lures, military discharge papers, and online forum history.",
      "description": "Evidence from Peter Lewin's apartment, hinting at his past and interests.",
      "objectIds": [
        "obj_fishing_lures",
        "obj_discharge_papers",
        "obj_online_forums"
      ]
    },
    {
      "id": "group_oliver_apartment_evidence",
      "name": "Oliver's Apartment Evidence",
      "imagePrompt": "Items from Oliver's apartment: a hunting rifle, a bank statement, and hunting gear.",
      "description": "Evidence from Oliver Trembly's apartment, revealing his financial situation and hobbies.",
      "objectIds": [
        "obj_oliver_rifle",
        "obj_bank_statement",
        "obj_hunting_gear"
      ]
    }
  ],
  "bounties": [
    {
      "id": "bounty_1",
      "title": "Analyze Gunpowder Residue",
      "description": "A unique gunpowder residue was found on the murder weapon. Cross-reference it with known ammunition types to identify its origin.",
      "reward": 25
    },
    {
      "id": "bounty_2",
      "title": "Trace Fabric from Burned Pack",
      "description": "The burned backpack found at Hank's cabin has a unique fabric. Trace its origin to a specific manufacturer or store.",
      "reward": 50
    },
    {
      "id": "bounty_3",
      "title": "Recover Deleted Trail Camera Footage",
      "description": "The trail camera footage was partially corrupted. Recover the deleted segments to reveal who entered the trail.",
      "reward": 75
    }
  ],
  "evidenceStacks": [
    {
      "anchorId": "obj_243_winchester_rifle",
      "linkedIds": ["obj_spent_shell_casing", "obj_burned_gloves"],
      "totalSlots": 3
    }
  ],
  "canonicalTimeline": {
    "culpritId": "char_hank_bassett",
    "keyEvents": [
        { "objectId": "obj_fire_report", "description": "Establishes Hank's motive for revenge due to being blamed for the fire." },
        { "objectId": "obj_newspaper_articles", "description": "Reinforces Hank's public humiliation and motive." },
        { "objectId": "obj_missing_rifle", "description": "Shows the murder weapon was stolen from the Trembly home, implicating Hank's prior access." },
        { "objectId": "obj_trail_camera_footage", "description": "Places Hank at the crime scene, contradicting his alibi." },
        { "objectId": "obj_243_winchester_rifle", "description": "The murder weapon, central to the crime." },
        { "objectId": "obj_spent_shell_casing", "description": "Direct evidence linking the rifle to the murder scene." },
        { "objectId": "obj_burned_gloves", "description": "Evidence of Hank's attempt to destroy incriminating items after the murder." }
    ]
  }
};

// --- Data Transformation Layer ---
// This is a critical architectural pattern. The functions below transform the "author-friendly"
// raw data above into the structured, normalized, and consistent format the application requires.
// This separation allows story writers to work with a simple structure without needing to know
// the final data model in detail, while the application benefits from a robust and predictable
// data contract.

/**
 * Transforms the raw character data into the structured `Character` format.
 * - Extracts statements into a separate `testimonies` collection for normalization.
 * - **Auto-generates** a `file` component containing a `mugshot` based on physical characteristics.
 * - **Standardizes** the data by ensuring every character has a consistent set of `DataComponent`s,
 *   even if they are empty. This prevents countless null checks in the UI components.
 * @param {any[]} rawCharacters - The array of raw character objects from the story.
 * @param {any[]} allRawObjects - A mutable reference to the full list of objects, allowing this function to add new ones (like mugshots).
 * @param {Testimony[]} testimonies - An accumulator array to which testimony data will be added.
 * @returns {Character[]} An array of processed `Character` objects ready for the Redux store.
 */
const transformCharacterData = (rawCharacters: any[], allRawObjects: any[], testimonies: Testimony[]): Character[] => {
  return rawCharacters.map((c: any) => {
    const testimonyIds: string[] = [];
    if (c.statement) {
      const testimonyId = `testimony-${c.id}`;
      testimonies.push({
        id: testimonyId,
        title: `Statement from ${c.name}`,
        content: c.statement,
        sourceCharacterId: c.id,
      });
      testimonyIds.push(testimonyId);
    }

    const components: DataComponent[] = c.components || [];
    const physicalChars = components.find(comp => comp.type === 'physicalCharacteristics')?.props;

    // --- Automatic Data Enrichment: Mugshot Generation ---
    // A mugshot is only generated if the character has physical data and is a suspect.
    if (physicalChars && c.role === 'Suspect') {
      const mugshotPrompt = `Mugshot of ${c.name}. Front and side profile view against a height chart. A plaque in front displays their details: Height: ${physicalChars.height}, Weight: ${physicalChars.weight}, Eyes: ${physicalChars.eyes}, Hair: ${physicalChars.hair}. ${physicalChars.features || ''} The style is high-contrast, gritty, Sin City noir. Photorealistic, hyper-detailed, sharp focus.`;
      
      // Since Police Files are now first-class objects, we create a new StoryObject for the mugshot.
      // This is a key part of the data-driven architecture.
      allRawObjects.push({
          id: `obj_mugshot_${c.id}`,
          name: `Booking Photo: ${c.name}`,
          unidentifiedDescription: "An official police booking photo.",
          ownerCharacterId: c.id,
          category: 'police_file',
          locationFoundId: 'loc_police_station', // A conceptual location
          timestamp: new Date().toISOString(),
          imagePrompt: mugshotPrompt,
          description: `Official booking photo for ${c.name}.`,
          components: [],
          rarity: 'irrelevant',
          costToUnlock: 0,
      });
    }
    
    // --- Architectural Improvement: Data Standardization ---
    // This loop ensures that a character has a `DataComponent` stub (e.g., `{ type: 'socialMedia', props: {} }`)
    // if *any* objects in the master list are owned by or authored by them. This is the magic
    // that makes the CharacterCard buttons appear automatically when data exists.
    const standardComponentTypes = ['socialMedia', 'phoneLog', 'cctv', 'records', 'file', 'purchaseInfo', 'interaction', 'dialogue'];
    standardComponentTypes.forEach(type => {
      // Check if there are any objects of this type owned by the character.
      const hasComponentData = allRawObjects.some(obj => obj.ownerCharacterId === c.id && obj.category === type) ||
                               allRawObjects.some(obj => obj.authorCharacterId === c.id && type === 'socialMedia');
      
      const hasComponentOnCharacter = components.some(existing => existing.type === type);

      if (hasComponentData && !hasComponentOnCharacter) {
        components.push({ type, props: {} });
      }
    });

    return {
      id: c.id,
      name: c.name,
      age: c.age,
      occupation: c.occupation,
      imagePrompt: c.imagePrompt,
      description: c.bio,
      role: c.role.toLowerCase(),
      isSuspect: c.role.toLowerCase() === 'suspect',
      connections: c.connections || { relatedPeople: [], knownLocations: [], associatedObjects: [] },
      testimonyIds,
      components,
    };
  });
};

/**
 * Transforms the raw object data into the structured `StoryObject` format.
 * This is a straightforward mapping that prepares the objects for the Redux store.
 * @param {any[]} rawObjects - The array of raw object items from the story.
 * @returns {StoryObject[]} An array of processed `StoryObject` objects.
 */
const transformObjectData = (rawObjects: any[]): StoryObject[] => {
  return rawObjects.map((o: any) => ({
    id: o.id,
    name: o.name,
    imagePrompt: o.imagePrompt,
    description: o.description,
    unidentifiedDescription: o.unidentifiedDescription,
    timestamp: o.timestamp,
    isEvidence: false,
    assignedToSuspectIds: [],
    locationFoundId: o.locationFoundId,
    category: o.category || 'physical',
    tags: o.tags,
    authorCharacterId: o.authorCharacterId,
    ownerCharacterId: o.ownerCharacterId,
    costToUnlock: o.costToUnlock,
    hasBeenUnlocked: false, // Initialize all objects as not yet unlocked.
    rarity: o.rarity as EvidenceRarity || 'irrelevant', // Ensure rarity is correctly typed and defaults to irrelevant
    components: o.components || [],
  }));
};

/**
 * Transforms the raw location data into the structured `Location` format.
 * It assigns map coordinates and structures the hotspot data.
 * @param {any} rawData - The complete raw story data object.
 * @returns {Location[]} An array of processed `Location` objects.
 */
const transformLocationData = (rawData: any): Location[] => {
  const locationCoords: {[key: string]: { top: string, left: string }} = {
    'loc_apothecary': { top: '50%', left: '50%' },
    'loc_alley': { top: '45%', left: '65%' },
    'loc_studio': { top: '60%', left: '35%' },
    'loc_emily_apartment': { top: '30%', left: '40%' },
    'loc_james_workshop': { top: '75%', left: '60%' },
    'loc_workshop_lounge': { top: '0%', left: '0%' }, // Coords don't matter, won't be shown on map
    'loc_apothecary_backroom': { top: '0%', left: '0%' } // Coords don't matter, won't be shown on map
  };

  return rawData.locations.map((l: any) => {
    const itemHotspots: Hotspot[] = (l.hotspots || []).map((h: any, index: number) => ({
      id: `hs-${l.id}-${index}`,
      label: h.label,
      type: h.type || 'investigate',
      targetCardId: h.targetCardId,
      targetCardType: h.targetCardType,
      coords: h.coords,
      aiHint: h.aiHint, // Pass through the AI hint
    }));
    
    const victimName = rawData.characters.find((c:any) => c.role === 'Victim')?.name || 'Unknown';

    return {
      id: l.id,
      name: l.name,
      imagePrompt: l.imagePrompt,
      description: "A key location in the investigation.",
      hotspots: itemHotspots,
      mapCoords: locationCoords[l.id] || { top: '50%', left: '50%' },
      lastEventTimestamp: "2025-07-07T22:00:00Z",
      lastEventDescription: `Crime Scene Established. Victim: ${victimName}.`,
      sceneSummary: l.sceneSummary,
      isInternal: l.isInternal || false,
    };
  });
};

/**
 * Transforms the raw bounty data into the structured `Bounty` format.
 * @param {any[]} rawBounties - The array of raw bounty objects from the story.
 * @returns {Bounty[]} An array of processed `Bounty` objects.
 */
const transformBounties = (rawBounties: any[]): Bounty[] => {
    return rawBounties.map(b => ({
        id: b.id,
        title: b.title,
        description: b.description,
        reward: b.reward,
    }));
};


/**
 * Orchestrates the transformation of all raw story data into the final, structured `StoryData` format.
 * This function is the entry point for the entire Data Transformation Layer.
 * @param {any} rawData - The raw, unstructured story data.
 * @returns {StoryData} The structured data ready to be loaded into the Redux store.
 */
const transformStoryData = (rawData: any): StoryData => {
    const testimonies: Testimony[] = [];
    
    // NOTE: The order of operations here is important. We pass the `objects` array
    // as a mutable reference to `transformCharacterData` so it can add new objects (like mugshots)
    // before we finalize the objects list.
    const objects = transformObjectData(rawData.objects);
    const characters = transformCharacterData(rawData.characters, rawData.objects, testimonies);
    const locations = transformLocationData(rawData);
    const evidenceGroups: EvidenceGroup[] = rawData.evidenceGroups || [];
    const bounties = transformBounties(rawData.bounties || []);
    const canonicalTimeline: CanonicalTimeline | undefined = rawData.canonicalTimeline;
    const evidenceStacks: EvidenceStack[] | undefined = rawData.evidenceStacks;

    // --- Robustness Fix: Find crime scene by ID instead of prompt text ---
    const crimeScene = rawData.locations.find((l:any) => l.id === 'loc_apothecary');

    return {
        title: rawData.storyInfo.title,
        storyInfo: {
            ...rawData.storyInfo,
            mapTitle: 'San Francisco',
            crimeSceneId: crimeScene?.id,
        },
        characters,
        objects,
        locations,
        evidenceGroups,
        testimonies,
        bounties,
        canonicalTimeline,
        evidenceStacks,
    };
};

// Export the fully processed and structured story data.
export const storyData: StoryData = transformStoryData(rawStory);