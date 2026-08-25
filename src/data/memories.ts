// ============================================
// EDIT THIS FILE TO ADD YOUR PHOTOS
// ============================================
// Add your photos to /public/images/memories/
// Then update this array with the filenames

export interface Memory {
  /** Path to the image file (relative to /public) */
  image: string;
  /** Caption shown below the polaroid */
  caption: string;
  /** Rotation angle in degrees (negative = left tilt) */
  rotation: number;
}

export const memories: Memory[] = [
  {
    image: "/images/memories/1.jpg",
    caption: "THE TRADITIONAL BEAUTIII",
    rotation: -5,
  },
  {
    image: "/images/memories/2.jpg",
    caption: "BEAUTIFUL LOTUS IN A PERFECT LAKE",
    rotation: 3,
  },
  {
    image: "/images/memories/3.jpg",
    caption: "BUT NOW A  LILLY I GUESS",
    rotation: -7,
  },
  {
    image: "/images/memories/4.jpg",
    caption: "MAY BE THE REASON FOR MY SMILE ",
    rotation: 4,
  },
  {
    image: "/images/memories/5.jpg",
    caption: "THE MOST CUTIEEE PIEEE",
    rotation: -3,
  },
  {
    image: "/images/memories/6.jpg",
    caption: "U WIT UR BROTHAAAA",
    rotation: 6,
  },
  {
    image: "/images/memories/7.jpg",
    caption: "MY FAVOURATE BACCHAAA",
    rotation: -4,
  },
  {
    image: "/images/memories/8.jpg",
    caption: "REALLY WANA SEE THIS KIRAN",
    rotation: 2,
  },
];
