// ============================================
// EDIT THIS FILE TO ADD YOUR SONGS
// ============================================

export interface Song {
  /** Song title */
  title: string;
  /** Artist name */
  artist: string;
  /** Path to album cover image (relative to /public) */
  cover: string;
  /** Optional short memory associated with this song */
  memory?: string;
  /** Optional Spotify embed URL */
  spotifyUrl?: string;
}

export const songs: Song[] = [];
