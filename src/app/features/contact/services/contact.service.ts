import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedResult } from 'src/app/shared/models/PaginatedResult';
import { Contact } from '../models/contact.model';
import { AddContactRequest } from '../models/add-contact-request.model';
import { UpdateContactRequest } from '../models/update-contact-request.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private readonly baseUrl: string = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getAllContacts(
    page: number = 1,
    pageSize: number = 5
  ): Observable<PaginatedResult<Contact>> {
    const url = `${this.baseUrl}/api/contacts?page=${page}&pageSize=${pageSize}`;
    return this.http.get<PaginatedResult<Contact>>(url);
  }

  getContactById(id: number): Observable<Contact> {
    const url = `${this.baseUrl}/api/contacts/${id}`;
    return this.http.get<Contact>(url);
  }

  createContact(request: AddContactRequest): Observable<Contact> {
    const url = `${this.baseUrl}/api/contacts`;
    return this.http.post<Contact>(url, request);
  }

  updateContact(
    id: number,
    request: UpdateContactRequest
  ): Observable<Contact> {
    const url = `${this.baseUrl}/api/contacts/${id}`;
    return this.http.put<Contact>(url, request);
  }

  deleteContact(id: number): Observable<void> {
    const url = `${this.baseUrl}/api/contacts/${id}`;
    return this.http.delete<void>(url);
  }
}
