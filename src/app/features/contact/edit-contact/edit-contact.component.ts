import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ContactService } from '../services/contact.service';
import { Contact } from '../models/contact.model';
import { UpdateContactRequest } from '../models/update-contact-request.model';
import { PaginatedResult } from 'src/app/shared/models/PaginatedResult';
import { Category } from '../../category/models/category.model';
import { Subcategory } from '../../subcategory/models/subcategory.model';
import { CategoryService } from '../../category/services/category.service';
import { SubcategoryService } from '../../subcategory/services/subcategory.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css'],
})
export class EditContactComponent implements OnInit, OnDestroy {
  id: number | null = null;
  categories$: Observable<PaginatedResult<Category>> | null = null;
  subcategories$: Observable<PaginatedResult<Subcategory>> | null = null;
  paramsSubscription?: Subscription;
  editContactSubscription?: Subscription;
  contact?: Contact;
  selectedCategory: string = '';
  selectedSubcategory: string | undefined = '';
  category?: Category;
  subcategory?: Subcategory;
  validationErrors: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService,
    private categoryService: CategoryService,
    private subcategoryService: SubcategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadSubcategories();

    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        const idParam = params.get('id');
        this.id = idParam ? +idParam : null;

        if (this.id) {
          this.contactService.getContactById(this.id).subscribe({
            next: (response) => {
              this.contact = response;
              this.selectedCategory = response.categoryId.toString();
              this.selectedSubcategory = response.subcategoryId?.toString();
              this.fetchCategoryAndSubcategory();
              console.log(this.contact);
            },
          });
        }
      },
    });
  }

  onSelectionChange(): void {
    this.fetchCategoryAndSubcategory();
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

  onFormSubmit(): void {
    if (!this.category || !this.subcategory) {
      console.error('Category or subcategory not loaded yet.');
      return;
    }
    console.log(this.category.name);
    console.log(this.subcategory.name);

    const updateContactRequest: UpdateContactRequest = {
      firstName: this.contact?.firstName ?? '',
      lastName: this.contact?.lastName ?? '',
      email: this.contact?.email ?? '',
      password: this.contact?.password ?? '',
      phoneNumber: this.contact?.phoneNumber ?? '',
      dateOfBirth: this.contact?.dateOfBirth ?? new Date(),
      categoryName: this.category.name,
      subcategoryName: this.subcategory.name,
    };

    if (this.id) {
      this.editContactSubscription = this.contactService
        .updateContact(this.id, updateContactRequest)
        .subscribe({
          next: (response) => {
            this.router.navigateByUrl('/');
          },
          error: (error: any) => {
            if (error.status === 500) {
              // Handle validation errors
              this.validationErrors = error.error.title.split(', ');
            } else {
              // Handle other types of errors
              console.error(error);
            }
          },
        });
    }
  }

  onDelete(): void {
    if (this.id) {
      this.contactService.deleteContact(this.id).subscribe({
        next: () => {
          this.router.navigateByUrl('/');
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

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.editContactSubscription?.unsubscribe();
  }
}
