import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistSubscriptionStatusComponent } from './artist-subscription-status.component';

describe('ArtistSubscriptionStatusComponent', () => {
  let component: ArtistSubscriptionStatusComponent;
  let fixture: ComponentFixture<ArtistSubscriptionStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArtistSubscriptionStatusComponent]
    });
    fixture = TestBed.createComponent(ArtistSubscriptionStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
