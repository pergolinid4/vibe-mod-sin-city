/**
 * @file data/caseFileData.ts
 * @description This file contains the complete dataset for the new "Interactive Case File" feature.
 * It is structured to be self-contained and easily imported by the case file's Redux slice.
 */

import { CaseFileData, Clue, EvidenceSlot, TimelineAnchor, TimelineAnchorCategory } from '../types';

// Define all the clues available to the player in the evidence pool.
const clues: Clue[] = [
  // Motive Clues
  { id: 'clue-motive-primary', eventKey: 'MOTIVE_PRIMARY_DEVELOPER_OFFER', text: "A lucrative offer from a property developer to buy the apothecary was found on Mei-Ling's desk. This put the family's legacy at risk and created a powerful financial motive for Sophia to prevent the sale.", type: 'PRIMARY', points: 150, category: 'motive' },
  { id: 'clue-motive-support-1', eventKey: 'MOTIVE_SUPPORT_ARGUMENT', text: "Sophia had a loud, intense argument with her mother on the night of the murder over the future of the apothecary.", type: 'SUPPORTING', points: 25, bonusPoints: 10, category: 'motive' },
  { id: 'clue-motive-support-2', eventKey: 'MOTIVE_SUPPORT_LEGACY', text: "Sophia's art and identity were deeply tied to the cultural legacy of the apothecary; its sale would feel like a personal betrayal.", type: 'SUPPORTING', points: 25, bonusPoints: 10, category: 'motive' },
  { id: 'clue-motive-support-3', eventKey: 'MOTIVE_SUPPORT_EVICTION', text: "Mei-Ling had recently told Sophia she would need to move out of her subsidized live-work art studio, which was owned by the family business.", type: 'SUPPORTING', points: 25, bonusPoints: 10, category: 'motive' },

  // Opportunity Clues
  { id: 'clue-opp-primary', eventKey: 'OPP_PRIMARY_BACKUP_FOOTAGE', text: "Uncorrupted backup security footage clearly shows Sophia Wong, wearing gloves, placing the murder weapon into the trunk of James Lee's car.", type: 'PRIMARY', points: 150, category: 'opportunity' },
  { id: 'clue-opp-support-1', eventKey: 'OPP_SUPPORT_GLITCH', text: "The primary security footage from the alleyway was deliberately erased for a 15-minute window around the time of the murder.", type: 'SUPPORTING', points: 25, bonusPoints: 10, category: 'opportunity' },
  { id: 'clue-opp-support-2', eventKey: 'OPP_SUPPORT_SEARCH_HISTORY', text: "Sophia searched for 'how to remove blood stains from wood floors' on her laptop before the body was officially reported.", type: 'SUPPORTING', points: 25, bonusPoints: 10, category: 'opportunity' },
  
  // Means Clues
  { id: 'clue-means-primary', eventKey: 'MEANS_PRIMARY_HAMMER', text: "The murder weapon was a common claw hammer. While found in another's car, critical forensic evidence links it directly back to the primary suspect's location.", type: 'PRIMARY', points: 150, category: 'means' },
  { id: 'clue-means-support-1', eventKey: 'MEANS_SUPPORT_PAINT_MATCH', text: "Forensic analysis confirmed a perfect chemical match between the unique fluorescent paint found on the murder weapon and the paint from Sophia's art studio.", type: 'SUPPORTING', points: 25, bonusPoints: 10, category: 'means' },
  { id: 'clue-means-support-2', eventKey: 'MEANS_SUPPORT_GLOVES', text: "Rubber gloves with traces of the same fluorescent paint were found in trash cans at both the crime scene and Sophia's studio.", type: 'SUPPORTING', points: 25, bonusPoints: 10, category: 'means' },
  { id: 'clue-means-support-3', eventKey: 'MEANS_SUPPORT_HEIGHT', text: "Blood spatter analysis indicates the attacker was approximately 5'5\" tall, consistent with Sophia's height and inconsistent with James Lee's.", type: 'SUPPORTING', points: 25, bonusPoints: 10, category: 'means' },
];

// Define the structure of the timeline anchors and their slots.
const anchors: TimelineAnchor[] = [
  {
    id: 'motive',
    title: "The Motive",
    timeLabel: "Days Before The Incident",
    primarySlot: { slotId: 'motive-primary', correctEventKey: 'MOTIVE_PRIMARY_DEVELOPER_OFFER', placedClueId: null },
    supportingSlots: [
      { slotId: 'motive-support-1', placedClueId: null },
      { slotId: 'motive-support-2', placedClueId: null },
      { slotId: 'motive-support-3', placedClueId: null },
    ]
  },
  {
    id: 'opportunity',
    title: "The Opportunity",
    timeLabel: "Night of The Incident",
    primarySlot: { slotId: 'opportunity-primary', correctEventKey: 'OPP_PRIMARY_BACKUP_FOOTAGE', placedClueId: null },
    supportingSlots: [
      { slotId: 'opportunity-support-1', placedClueId: null },
      { slotId: 'opportunity-support-2', placedClueId: null },
      { slotId: 'opportunity-support-3', placedClueId: null }, // This slot will remain empty as there is no 3rd supporting clue.
    ]
  },
  {
    id: 'means',
    title: "The Means",
    timeLabel: "The Act Itself",
    primarySlot: { slotId: 'means-primary', correctEventKey: 'MEANS_PRIMARY_HAMMER', placedClueId: null },
    supportingSlots: [
      { slotId: 'means-support-1', placedClueId: null },
      { slotId: 'means-support-2', placedClueId: null },
      { slotId: 'means-support-3', placedClueId: null },
    ]
  },
];

// Assemble and export the complete data structure for the case file.
export const caseFileData: CaseFileData = {
  title: "The Fractured Legacy Case File",
  clues,
  anchors,
};