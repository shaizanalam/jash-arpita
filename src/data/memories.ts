// ============================================
// MEMORIES & PHOTOS DATA
// ============================================

export interface Memory {
  id: string;
  /** Path to the image file (relative to /public) */
  image: string;
  /** Caption shown below the polaroid */
  caption: string;
  /** Context / Location pill tag */
  tag?: string;
  /** Optional date / subtag */
  date?: string;
  /** Rotation angle in degrees for natural polaroid tilt */
  rotation: number;
}

export const memories: Memory[] = [
  {
    id: "memory-1",
    image: "/images/memories/memory-1.jpg",
    caption: "Those sweet moments & yellow hearts 💛",
    tag: "School Memories",
    date: "Golden Times",
    rotation: -3.5,
  },
  {
    id: "memory-2",
    image: "/images/memories/memory-2.jpg",
    caption: "Special days that stay in the heart ✨",
    tag: "Raipur Days",
    date: "Unforgettable",
    rotation: 3.5,
  },
];
