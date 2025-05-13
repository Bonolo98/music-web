import { CommonModule, ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {

  constructor(private viewPortScroller: ViewportScroller, private router: Router){}

  scrollToSection(sectionId: string){
    this.viewPortScroller.scrollToAnchor(sectionId);
  }

  goToDiscography(){
    this.router.navigate(['/discography']);
  }

}
