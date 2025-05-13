import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
// import * as disc from '../../models/catalogue.json';
import { ActivatedRoute } from '@angular/router';
import { DiscServiceService } from '../../services/disc-service.service';


@Component({
  selector: 'app-discography',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './discography.component.html',
  styleUrl: './discography.component.css'
})
export class DiscographyComponent {
  dateToday!: string;
  name!: string;
  // catalogue: any = (disc as any).default;
  id!: number;
  songs: any[] = [];
  selectedSong: any = null;

  constructor(private route: ActivatedRoute, private discService: DiscServiceService){
    // console.log(disc)
  }


  ngOnInit():void{
    this.discService.getDiscography().subscribe(data => {
      this.songs = data;
    })
    console.log(this.songs);
  
  }

  showModal(songId: number):void {
  this.selectedSong = this.songs.find(song => song.id === songId);
  console.log(this.selectedSong);
 }

}
