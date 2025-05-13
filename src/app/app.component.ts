import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'music-web';


  catalog = [
    { "Title" : "The Trailer EP",
        "artist" : "",
        "releaseDate" : "2028",
        
    },
    { "Title" : "The Trailer EP",
        "artist" : "",
        "releaseDate" : "2028",
        
    },
    { "Title" : "The Trailer EP",
        "artist" : "",
        "releaseDate" : "2028",
        
    },]
}
