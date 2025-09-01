import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { MusicListComponent } from '../music-list/music-list.component';
import { CommonModule } from '@angular/common';
import { MusicService, Song } from '../music.service';
import { LyricsSectionComponent } from '../lyrics-section/lyrics-section.component';

@Component({
  selector: 'app-music-player',
  imports: [LyricsSectionComponent, MusicListComponent, CommonModule],
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.css'],
  standalone: true,
})
export class MusicPlayerComponent implements OnInit, OnDestroy {
  @Output() selectTrack = new EventEmitter<Song>();

  isPlaying = false;
  showLyrics = false;
  audio = new Audio();

  // 🎛️ NEW: repeat, shuffle, progress
  repeatMode: 'none' | 'repeat-all' | 'repeat-one' = 'none';
  isShuffle = false;
  progress = 0;
  duration = 0;

  constructor(public musicService: MusicService) {
    this.loadSong(this.currentSong); // Initial load
  }

  ngOnInit() {
    this.audio.addEventListener('timeupdate', this.updateProgress);
    this.audio.addEventListener('ended', this.handleSongEnd);
  }

  ngOnDestroy() {
    this.audio.removeEventListener('timeupdate', this.updateProgress);
    this.audio.removeEventListener('ended', this.handleSongEnd);
  }

  get currentSong(): Song {
    return this.musicService.getCurrentSong();
  }

  loadSong(song: Song) {
    this.audio.src = song.src;
    this.audio.load();
    if (this.isPlaying) {
      this.audio.play();
    }
  }

  togglePlay() {
    this.isPlaying = !this.isPlaying;
    if (this.isPlaying) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
  }

  toggleLyrics() {
    this.showLyrics = !this.showLyrics;
  }

  previousSong() {
    const songs = this.musicService.songs;
    const index = songs.indexOf(this.currentSong);
    const prevIndex = (index - 1 + songs.length) % songs.length;
    const prevSong = songs[prevIndex];
    this.musicService.setCurrentSong(prevSong);
    this.loadSong(prevSong);
    if (this.isPlaying) this.audio.play();
  }

  // 🔁 Replace this with support for shuffle & repeat
  nextSong() {
    this.playNextSong();
  }

  // 🎯 Play a specific song
  selectFromList(song: Song) {
    this.musicService.setCurrentSong(song);
    this.loadSong(song);
    this.isPlaying = true;
    this.audio.play();
  }

  playTrack(song: Song) {
    this.selectTrack.emit(song);
  }

  // 🧠 Logic to handle what to do when a song ends
  handleSongEnd = () => {
    if (this.repeatMode === 'repeat-one') {
      this.audio.currentTime = 0;
      this.audio.play();
    } else {
      this.playNextSong();
    }
  };

  // 🔀 Support shuffle & repeat-all
  playNextSong() {
    const songs = this.musicService.songs;
    let nextIndex;

    if (this.isShuffle) {
      do {
        nextIndex = Math.floor(Math.random() * songs.length);
      } while (songs[nextIndex] === this.currentSong);
    } else {
      const currentIndex = songs.indexOf(this.currentSong);
      nextIndex = (currentIndex + 1) % songs.length;
    }

    const nextSong = songs[nextIndex];
    this.musicService.setCurrentSong(nextSong);
    this.loadSong(nextSong);
    if (this.isPlaying) this.audio.play();
  }

  // 🎛️ Toggle shuffle & repeat modes
  toggleShuffle() {
    this.isShuffle = !this.isShuffle;
  }

  toggleRepeatMode() {
    if (this.repeatMode === 'none') {
      this.repeatMode = 'repeat-all';
    } else if (this.repeatMode === 'repeat-all') {
      this.repeatMode = 'repeat-one';
    } else {
      this.repeatMode = 'none';
    }
  }

  // 🎚️ Progress
  updateProgress = () => {
    this.progress = (this.audio.currentTime / this.audio.duration) * 100;
    this.duration = this.audio.duration;
  };

  seek(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = parseFloat(input.value);
    this.audio.currentTime = (value / 100) * this.audio.duration;
  }
}
