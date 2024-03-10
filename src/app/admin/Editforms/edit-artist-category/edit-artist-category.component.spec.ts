import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditArtistCategoryComponent } from './edit-artist-category.component';

describe('EditArtistCategoryComponent', () => {
  let component: EditArtistCategoryComponent;
  let fixture: ComponentFixture<EditArtistCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditArtistCategoryComponent]
    });
    fixture = TestBed.createComponent(EditArtistCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
