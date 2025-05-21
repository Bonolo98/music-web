import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Track {
  title: string;
  artist: string;
  cover: string;
  audioUrl: string;
}

@Component({
  selector: 'app-music',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './music.component.html',
  styleUrl: './music.component.css',
})
export class MusicComponent {
  activeTab: 'albums' | 'singles' = 'albums';
  currentTrack: Track | null = null;

  albums: Track[] = [
    {
      title: 'Album One',
      artist: 'Artist A',
      cover: 'https://via.placeholder.com/150/111',
      audioUrl: 'audio1.mp3',
    },
    {
      title: 'Album Two',
      artist: 'Artist B',
      cover: 'https://via.placeholder.com/150/222',
      audioUrl: 'https://example.com/audio2.mp3',
    },
  ];

  singles: Track[] = [
    {
      title: 'Single One',
      artist: 'Artist C',
      cover: 'https://via.placeholder.com/150/333',
      audioUrl: 'https://example.com/audio3.mp3',
    },
    {
      title: 'Single Two',
      artist: 'Artist D',
      cover: 'https://via.placeholder.com/150/444',
      audioUrl: 'https://example.com/audio4.mp3',
    },
  ];

  playSong(song: Track) {
    this.currentTrack = song;
    // Logic to load audio if you're using <audio> or Audio() programmatically
  }
}
