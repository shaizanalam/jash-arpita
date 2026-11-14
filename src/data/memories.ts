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

export const memories: Memory[] = [];
