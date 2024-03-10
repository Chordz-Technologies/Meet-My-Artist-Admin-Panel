import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistpricingComponent } from './artistpricing.component';

describe('ArtistpricingComponent', () => {
  let component: ArtistpricingComponent;
  let fixture: ComponentFixture<ArtistpricingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArtistpricingComponent]
    });
    fixture = TestBed.createComponent(ArtistpricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
