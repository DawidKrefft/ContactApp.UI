import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoryListComponent } from './subcategory-list.component';

describe('SubcategoryListComponent', () => {
  let component: SubcategoryListComponent;
  let fixture: ComponentFixture<SubcategoryListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubcategoryListComponent]
    });
    fixture = TestBed.createComponent(SubcategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
