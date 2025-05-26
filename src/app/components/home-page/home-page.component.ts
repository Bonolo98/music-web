import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  styleUrls: ['./home-page.component.css'],
  standalone: true,
})
export class HomePageComponent {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;
  @ViewChild('videoContainer') videoContainer!: ElementRef<HTMLElement>;

  contactForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  videoId = 'https://www.youtube.com/embed/ozyr650ZV30';
  SafeUrlVideo!: SafeResourceUrl;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {
    this.contactForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^\\d{10}$')]],
      message: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  async sendMessage() {
    if (this.contactForm.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('access_key', 'b6f5e857-d127-4c52-8e89-a38301441944');
    formData.append('email', this.contactForm.value.email);
    formData.append('phone', this.contactForm.value.phone);
    formData.append('message', this.contactForm.value.message);

    try {
      const response = await this.http
        .post('https://api.web3forms.com/submit', formData)
        .toPromise();
      this.successMessage = 'Message sent successfully!';
      this.contactForm.reset();
    } catch (error) {
      console.error('Error sending message:', error);
      this.errorMessage = 'Failed to send message. Please try again.';
    }
  }

  ngAfterViewInit() {
    this.checkVideoVisibility();
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.checkVideoVisibility();
  }

  checkVideoVisibility() {
    const video = this.videoPlayer.nativeElement;
    const container = this.videoContainer.nativeElement;
    const rect = container.getBoundingClientRect();

    // Calculate visibility - adjust these values as needed
    const isVisible =
      rect.top >= -rect.height * 0.5 &&
      rect.bottom <= window.innerHeight + rect.height * 0.5;

    if (isVisible) {
      if (video.paused) {
        video.play().catch((e) => console.log('Autoplay prevented:', e));
      }
    } else {
      if (!video.paused) {
        video.pause();
      }
    }
  }
}
