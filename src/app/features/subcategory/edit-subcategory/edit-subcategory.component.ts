import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { SubcategoryService } from '../services/subcategory.service';
import { Subcategory } from '../models/subcategory.model';
import { UpdateSubcategoryRequest } from './../models/update-subcategory-request.model';
import { PaginatedResult } from 'src/app/shared/models/PaginatedResult';
import { Category } from '../../category/models/category.model';
import { CategoryService } from '../../category/services/category.service';

@Component({
  selector: 'app-edit-subcategory',
  templateUrl: './edit-subcategory.component.html',
  styleUrls: ['./edit-subcategory.component.css'],
})
export class EditSubcategoryComponent implements OnInit, OnDestroy {
  id: string | null = null;
  paramsSubscription?: Subscription;
  editSubcategorySubscription?: Subscription;
  subcategory?: Subcategory;
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

    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        if (this.id) {
          this.subcategoryService.getSubcategoryById(this.id).subscribe({
            next: (response) => {
              this.subcategory = response;
              // Initialize selectedCategories with the current category id
              this.selectedCategory = response.categoryId.toString();
            },
          });
        }
      },
    });
  }

  onFormSubmit(): void {
    const updateSubcategoryRequest: UpdateSubcategoryRequest = {
      name: this.subcategory?.name ?? '',
      categoryId: this.selectedCategory,
    };

    if (this.id) {
      this.editSubcategorySubscription = this.subcategoryService
        .updateSubcategory(this.id, updateSubcategoryRequest)
        .subscribe({
          next: (response) => {
            this.router.navigateByUrl('/admin/subcategories');
          },
          error: (error) => {
            // Handle specific error cases if needed
            if (error.status === 500) {
              this.validationErrors.push('Validation error. Check your input.');
            } else {
              console.error('Error updating subcategory:', error);
            }
          },
        });
    }
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
