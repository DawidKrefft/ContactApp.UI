import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { UpdateCategoryRequest } from './../models/update-category-request.model';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css'],
})
export class EditCategoryComponent implements OnInit, OnDestroy {
  id: string | null = null;
  paramsSubscription?: Subscription;
  editCategorySubscription?: Subscription;
  category?: Category;
  validationErrors: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        if (this.id) {
          // get the data from the API for this category Id
          this.categoryService.getCategoryById(this.id).subscribe({
            next: (response) => {
              this.category = response;
            },
          });
        }
      },
    });
  }

  onFormSubmit(): void {
    const UpdateCategoryRequest: UpdateCategoryRequest = {
      name: this.category?.name ?? '',
    };

    if (this.id) {
      this.editCategorySubscription = this.categoryService
        .updateCategory(this.id, UpdateCategoryRequest)
        .subscribe({
          next: (response) => {
            this.router.navigateByUrl('/admin/categories');
          },
          error: (error) => {
            if (error.status === 500) {
              this.validationErrors = error.error.title.split(', ');
            } else {
              console.error('Error updating category:', error);
            }
          },
        });
    }
  }

  onDelete(): void {
    if (this.id) {
      this.categoryService.deleteCategory(this.id).subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/categories');
        },
      });
    }
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.editCategorySubscription?.unsubscribe();
  }
}
