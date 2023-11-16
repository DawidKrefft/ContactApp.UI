import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddSubcategoryRequest } from '../models/add-subcategory-request.model';
import { SubcategoryService } from '../services/subcategory.service';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category.model';
import { PaginatedResult } from 'src/app/shared/models/PaginatedResult';

@Component({
  selector: 'app-add-subcategory',
  templateUrl: './add-subcategory.component.html',
  styleUrls: ['./add-subcategory.component.css'],
})
export class AddSubcategoryComponent implements OnInit, OnDestroy {
  id: string | null = null;
  paramsSubscription?: Subscription;
  editSubcategorySubscription?: Subscription;
  subcategory: AddSubcategoryRequest = { name: '', categoryId: '' };
  categories$: Observable<PaginatedResult<Category>> | null = null;
  selectedCategory: string = '';
  validationErrors: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private subcategoryService: SubcategoryService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  onFormSubmit(): void {
    const updateSubcategoryRequest: AddSubcategoryRequest = {
      name: this.subcategory.name,
      categoryId: this.selectedCategory,
    };

    this.editSubcategorySubscription = this.subcategoryService
      .addSubcategory(updateSubcategoryRequest)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/subcategories');
        },
        error: (error) => {
          // Handle specific error cases if needed
          if (error.status === 500) {
            this.validationErrors.push('Validation error. Check your input.');
          } else {
            console.error('Error adding subcategory:', error);
          }
        },
      });
  }

  onDelete(): void {
    if (this.id) {
      this.subcategoryService.deleteSubcategory(this.id).subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/subcategories');
        },
      });
    }
  }

  loadCategories(page: number = 1, pageSize: number = 50) {
    this.categories$ = this.categoryService.getAllCategories(page, pageSize);
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.editSubcategorySubscription?.unsubscribe();
  }
}
