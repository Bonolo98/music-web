import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DiscServiceService } from '../../services/disc-service.service';

declare global {
  interface Window {
    onSpotifyIframeApiReady: (IFrameAPI: any) => void;
  }
}

@Component({
  selector: 'app-discography',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './discography.component.html',
  styleUrl: './discography.component.css',
})
export class DiscographyComponent {
  episodes = [
    {
      id: 'spotify:episode:7makk4oTQel546B0PZlDM5',
      title: 'My Path to Spotify: Women in Engineering',
    },
    {
      id: 'spotify:episode:43cbJh4ccRD7lzM2730YK3',
      title: 'What is Backstage?',
    },
    {
      id: 'spotify:episode:6I3ZzCxRhRkNqnQNo8AZPV',
      title: 'Introducing Nerd Out@Spotify',
    },
  ];

  private embedController: any;

  ngOnInit(): void {
    this.loadSpotifyScript();
  }

  loadSpotifyScript() {
    const script = document.createElement('script');
    script.src = 'https://open.spotify.com/embed/iframe-api/v1';
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyIframeApiReady = (IFrameAPI: any) => {
      const element = document.getElementById('embed-iframe');
      const options = {
        width: '100%',
        height: '160',
        uri: this.episodes[0].id,
      };
      const callback = (EmbedController: any) => {
        this.embedController = EmbedController;
      };
      IFrameAPI.createController(element, options, callback);
    };
  }

  loadEpisode(uri: string) {
    if (this.embedController) {
      this.embedController.loadUri(uri);
    }
  }
}
