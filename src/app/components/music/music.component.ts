import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

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
  latestSong: any;
  loading = true;
  error: string | null = null;
  private refreshSubscription!: Subscription;

  // Update these with your Spotify artist ID and Spotify API credentials
  private readonly artistId = '4kaNxQusxlke6nfnusb2fT';
  private readonly clientId = '9a6b7a3928da4c679066790372850ab8';
  private readonly clientSecret = '6873e1a2ddbc46a5ba4b07ce13beeb24';
  private accessToken: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.authenticateWithSpotify();

    // Check for new songs every hour (adjust interval as needed)
    this.refreshSubscription = interval(3600000).subscribe(() => {
      if (this.accessToken) {
        this.fetchLatestSong();
      } else {
        this.authenticateWithSpotify();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  private authenticateWithSpotify(): void {
    const authUrl = 'https://accounts.spotify.com/api/token';
    const authHeaders = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + btoa(`${this.clientId}:${this.clientSecret}`),
    };
    const authBody = 'grant_type=client_credentials';

    this.http.post<any>(authUrl, authBody, { headers: authHeaders }).subscribe(
      (response) => {
        this.accessToken = response.access_token;
        this.fetchLatestSong();
      },
      (error) => {
        this.error = 'Failed to authenticate with Spotify';
        this.loading = false;
        console.error('Spotify authentication error:', error);
      }
    );
  }

  public fetchLatestSong(): void {
    if (!this.accessToken) return;

    const apiUrl = `https://api.spotify.com/v1/artists/${this.artistId}/albums?include_groups=album,single&limit=1`;
    const headers = {
      Authorization: `Bearer ${this.accessToken}`,
    };

    this.http
      .get<any>(apiUrl, { headers })
      .pipe(
        switchMap((albumsResponse) => {
          if (!albumsResponse.items || albumsResponse.items.length === 0) {
            throw new Error('No albums found');
          }
          const latestAlbum = albumsResponse.items[0];
          const tracksUrl = `https://api.spotify.com/v1/albums/${latestAlbum.id}/tracks`;
          return this.http.get<any>(tracksUrl, { headers });
        })
      )
      .subscribe(
        (tracksResponse) => {
          if (tracksResponse.items && tracksResponse.items.length > 0) {
            this.latestSong = {
              name: tracksResponse.items[0].name,
              album: tracksResponse.items[0].artists[0].name,
              releaseDate: tracksResponse.items[0].release_date,
              url: tracksResponse.items[0].external_urls.spotify,
              imageUrl:
                tracksResponse.items[0].album?.images[0]?.url ||
                'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmMWYxZjEiLz48L3N2Zz4=',
            };
          }
          this.loading = false;
        },
        (error) => {
          this.error = 'Failed to fetch latest song';
          this.loading = false;
          console.error('Spotify API error:', error);
        }
      );
  }

  openInSpotify(): void {
    if (this.latestSong?.url) {
      window.open(this.latestSong.url, '_blank');
    }
  }
}
