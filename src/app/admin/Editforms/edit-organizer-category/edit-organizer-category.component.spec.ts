import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOrganizerCategoryComponent } from './edit-organizer-category.component';

describe('EditOrganizerCategoryComponent', () => {
  let component: EditOrganizerCategoryComponent;
  let fixture: ComponentFixture<EditOrganizerCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditOrganizerCategoryComponent]
    });
    fixture = TestBed.createComponent(EditOrganizerCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
