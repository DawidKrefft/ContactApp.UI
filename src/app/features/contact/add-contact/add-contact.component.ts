import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from '../services/contact.service';
import { AddContactRequest } from '../models/add-contact-request.model';
import { Subcategory } from '../../subcategory/models/subcategory.model';
import { Category } from '../../category/models/category.model';
import { CategoryService } from '../../category/services/category.service';
import { SubcategoryService } from '../../subcategory/services/subcategory.service';
import { Observable } from 'rxjs';
import { PaginatedResult } from 'src/app/shared/models/PaginatedResult';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css'],
})
export class AddContactComponent implements OnInit {
  selectedCategory: string = '';
  selectedSubcategory: string | undefined = '';
  categories$: Observable<PaginatedResult<Category>> | null = null;
  subcategories$: Observable<PaginatedResult<Subcategory>> | null = null;
  contact: AddContactRequest = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    dateOfBirth: new Date(),
    categoryName: '',
    subcategoryName: '',
  };

  category?: Category;
  subcategory?: Subcategory;
  validationErrors: string[] = [];

  constructor(
    private contactService: ContactService,
    private categoryService: CategoryService,
    private subcategoryService: SubcategoryService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.loadCategories();
    this.loadSubcategories();
  }

  onSelectionChange(): void {
    this.fetchCategoryAndSubcategory();
  }

  onFormSubmit(): void {
    const addContactRequest: AddContactRequest = {
      firstName: this.contact?.firstName,
      lastName: this.contact?.lastName ?? '',
      email: this.contact?.email ?? '',
      password: this.contact?.password ?? '',
      phoneNumber: this.contact?.phoneNumber ?? '',
      dateOfBirth: this.contact?.dateOfBirth ?? new Date(),
      categoryName: this.category?.name,
      subcategoryName: this.subcategory?.name,
    };

    this.contactService.createContact(addContactRequest).subscribe({
      next: (response) => {
        this.router.navigateByUrl(`/`);
      },
      error: (error) => {
        if (error.status === 500) {
          this.validationErrors = error.error.title.split(', ');
        } else {
          console.error('Error creating contact:', error);
        }
      },
    });
  }

  private fetchCategoryAndSubcategory(): void {
    if (this.selectedCategory) {
      this.categoryService.getCategoryById(this.selectedCategory).subscribe({
        next: (category) => {
          this.category = category;
        },
      });
    }

    if (this.selectedSubcategory) {
      this.subcategoryService
        .getSubcategoryById(this.selectedSubcategory)
        .subscribe({
          next: (subcategory) => {
            this.subcategory = subcategory;
          },
        });
    }
  }

  loadCategories(page: number = 1, pageSize: number = 50) {
    this.categories$ = this.categoryService.getAllCategories(page, pageSize);
  }

  loadSubcategories(page: number = 1, pageSize: number = 50) {
    this.subcategories$ = this.subcategoryService.getAllSubcategories(
      page,
      pageSize
    );
  }
}
