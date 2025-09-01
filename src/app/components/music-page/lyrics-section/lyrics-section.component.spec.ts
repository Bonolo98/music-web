import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LyricsSectionComponent } from './lyrics-section.component';

describe('LyricsSectionComponent', () => {
  let component: LyricsSectionComponent;
  let fixture: ComponentFixture<LyricsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LyricsSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LyricsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
