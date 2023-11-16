import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSubcategoryComponent } from './edit-subcategory.component';

describe('EditSubcategoryComponent', () => {
  let component: EditSubcategoryComponent;
  let fixture: ComponentFixture<EditSubcategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditSubcategoryComponent]
    });
    fixture = TestBed.createComponent(EditSubcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
