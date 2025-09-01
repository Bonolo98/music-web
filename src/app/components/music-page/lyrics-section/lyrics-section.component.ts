import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MusicService } from '../music.service';

@Component({
  selector: 'app-lyrics-section',
  imports: [CommonModule],
  templateUrl: './lyrics-section.component.html',
  styleUrls: ['./lyrics-section.component.css'],
  standalone: true,
})
export class LyricsSectionComponent {
  @Input() lyrics = '';

  constructor(public musicService: MusicService) { }

  // get lyrics() {
  //   return this.musicService.getCurrentSong().lyrics;
  // }

}
