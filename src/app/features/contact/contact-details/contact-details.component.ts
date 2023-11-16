import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from 'src/app/features/category/models/category.model';
import { Contact } from '../models/contact.model';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css'],
})
export class ContactDetailsComponent {
  @Input() contact: Contact | undefined;
  @Input() category: Category | undefined;
  @Input() nameOfContactCategory: string | undefined;
  @Input() nameOfContactSubcategory: string | undefined;
  @Output() closeModalEvent = new EventEmitter<void>();

  closeModal() {
    this.closeModalEvent.emit();
  }
}
