import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Song {
  title: string;
  artist: string;
  album: string;
  src: string;
  cover: string;
  lyrics: string;
}

@Injectable({ providedIn: 'root' })
export class MusicService {
  songs: Song[] = [
    {
      title: 'Forever Love',
      artist: 'Bonolo Solomon',
      album: 'Romance LP',
      src: 'music/audio1.mp3',
      cover: 'BioBg.jpg',
      lyrics: 'Forever in love, night and day...\nYour voice, my peace...'
    },
    {
      title: 'Midnight Drive',
      artist: 'Bonolo Solomon',
      album: 'Singles',
      src: 'music/audio2.mp3',
      cover: 'Image2.jpg',
      lyrics: 'Cruising down the freeway...\nHeadlights and memories...'
    }
  ];

  private currentSongSubject = new BehaviorSubject<Song>(this.songs[0]);
  currentSong$ = this.currentSongSubject.asObservable();

  setCurrentSong(song: Song) {
    this.currentSongSubject.next(song);
  }

  getCurrentSong(): Song {
    return this.currentSongSubject.getValue();
  }
}
