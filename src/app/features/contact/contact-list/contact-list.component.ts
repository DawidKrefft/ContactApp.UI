import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { Contact } from '../models/contact.model';
import { Observable, Subject, takeUntil } from 'rxjs';
import { PaginatedResult } from 'src/app/shared/models/PaginatedResult';
import { AuthService } from '../../auth/services/auth.service';
import { User } from '../../auth/models/user.model';
import { Category } from '../../category/models/category.model';
import { Subcategory } from '../../subcategory/models/subcategory.model';
import { CategoryService } from '../../category/services/category.service';
import { SubcategoryService } from '../../subcategory/services/subcategory.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent implements OnInit, OnDestroy {
  user?: User;
  contacts$?: Observable<PaginatedResult<Contact>>;
  isDetailsModalVisible: boolean = false;
  selectedContact: Contact | undefined;
  private destroy$ = new Subject<void>();
  category?: Category;
  subcategory?: Subcategory;
  nameOfContactCategory: string | undefined;
  nameOfContactSubcategory: string | undefined;

  constructor(
    private authService: AuthService,
    private contactService: ContactService,
    private categoryService: CategoryService,
    private subcategoryService: SubcategoryService
  ) {}

  ngOnInit(): void {
    this.loadContacts();
    this.authService.user().subscribe({
      next: (response) => {
        this.user = response;
      },
    });
    this.user = this.authService.getUser();
  }

  loadContacts(page: number = 1, pageSize: number = 5) {
    this.contacts$ = this.contactService
      .getAllContacts(page, pageSize)
      .pipe(takeUntil(this.destroy$));
  }

  openDetailsModal(contactId: number) {
    this.contactService.getContactById(contactId).subscribe({
      next: (contact) => {
        // Fetch category details
        this.categoryService.getCategoryById(contact.categoryId).subscribe({
          next: (category) => {
            this.category = category;
            this.nameOfContactCategory = category.name;
            console.log(this.nameOfContactCategory);
          },
        });
        // Fetch subcategory details
        if (contact.subcategoryId) {
          this.subcategoryService
            .getSubcategoryById(contact.subcategoryId)
            .subscribe({
              next: (subcategory) => {
                this.subcategory = subcategory;
                this.nameOfContactSubcategory = subcategory.name;
              },
            });
        }

        this.isDetailsModalVisible = true;
        this.selectedContact = contact;
      },
    });
  }

  closeDetailsModal() {
    this.isDetailsModalVisible = false;
    this.selectedContact = undefined;
    this.nameOfContactCategory = undefined;
    this.nameOfContactSubcategory = undefined;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
