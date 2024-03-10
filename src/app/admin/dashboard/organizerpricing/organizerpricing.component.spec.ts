import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizerpricingComponent } from './organizerpricing.component';

describe('OrganizerpricingComponent', () => {
  let component: OrganizerpricingComponent;
  let fixture: ComponentFixture<OrganizerpricingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrganizerpricingComponent]
    });
    fixture = TestBed.createComponent(OrganizerpricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
