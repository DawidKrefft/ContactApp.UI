import { Component, OnDestroy } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { CategoryService } from '../services/category.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent implements OnDestroy {
  model: AddCategoryRequest;
  private addCategorySubscription?: Subscription;
  validationErrors: string[] = [];

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.model = {
      name: '',
    };
  }

  onFormSubmit() {
    this.addCategorySubscription = this.categoryService
      .addCategory(this.model)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/categories');
        },
        error: (error) => {
          // Handle specific error cases if needed
          if (error.status === 500) {
            this.validationErrors = error.error.title.split(', ');
          } else {
            console.error('Error adding category:', error);
          }
        },
      });
  }

  ngOnDestroy(): void {
    this.addCategorySubscription?.unsubscribe();
  }
}
