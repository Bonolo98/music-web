import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent {

  

 images = [
  {id: 1, description: 'This is bonolo', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHzfDz5h5FMP9NsvpsXWLO7uz-bGMQBbn2SQ&s'},
  {id: 1, description: 'This is bonolo', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHzfDz5h5FMP9NsvpsXWLO7uz-bGMQBbn2SQ&s'},
  {id: 1, description: 'This is bonolo', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHzfDz5h5FMP9NsvpsXWLO7uz-bGMQBbn2SQ&s'}
 ]
}
