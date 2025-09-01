import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { MusicService, Song } from '../music.service';

@Component({
  selector: 'app-music-list',
  imports: [CommonModule],
  templateUrl: './music-list.component.html',
  styleUrls: ['./music-list.component.css'],
  standalone: true,
})
export class MusicListComponent {
  @Output() selectTrack = new EventEmitter<Song>();

  constructor(public musicService: MusicService) { }

  playTrack(song: Song) {
    this.selectTrack.emit(song); // ✅ This ensures $event is a Song
  }

}
