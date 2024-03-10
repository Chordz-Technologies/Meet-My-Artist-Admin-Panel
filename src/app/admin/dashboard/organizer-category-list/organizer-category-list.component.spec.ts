import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizerCategoryListComponent } from './organizer-category-list.component';

describe('OrganizerCategoryListComponent', () => {
  let component: OrganizerCategoryListComponent;
  let fixture: ComponentFixture<OrganizerCategoryListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrganizerCategoryListComponent]
    });
    fixture = TestBed.createComponent(OrganizerCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
