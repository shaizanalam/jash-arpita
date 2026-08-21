// ============================================
// EDIT THIS FILE TO ADD YOUR SONGS
// ============================================
// Add album artwork to /public/images/songs/
// Then update this array with your songs

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

export const songs: Song[] = [
  {
    title: "Barbaad",
    artist: "Arjit singh",
    cover: "/images/songs/song-01.jpg",
    memory: "The song that you dedicated to me ",
  },
  {
    title: "All I Need",
    artist: "Radiohead",
    cover: "/images/songs/song-02.jpg",
    memory: "The Song I listen When I Miss You",
  },
  {
    title: "Perfect",
    artist: "Jubin Nautiyal",
    cover: "/images/songs/song-03.jpg",
    memory: "Song I Listen When I Had Crush On You",
  },
  {
    title: "All of Me",
    artist: "John Legend",
    cover: "/images/songs/song-04.jpg",
    memory: "Because every word is true",
  },
];
