import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOrganizerComponent } from './edit-organizer.component';

describe('EditOrganizerComponent', () => {
  let component: EditOrganizerComponent;
  let fixture: ComponentFixture<EditOrganizerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditOrganizerComponent]
    });
    fixture = TestBed.createComponent(EditOrganizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
