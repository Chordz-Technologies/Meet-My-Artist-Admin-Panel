import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizerSubscriptionStatusComponent } from './organizer-subscription-status.component';

describe('OrganizerSubscriptionStatusComponent', () => {
  let component: OrganizerSubscriptionStatusComponent;
  let fixture: ComponentFixture<OrganizerSubscriptionStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrganizerSubscriptionStatusComponent]
    });
    fixture = TestBed.createComponent(OrganizerSubscriptionStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
