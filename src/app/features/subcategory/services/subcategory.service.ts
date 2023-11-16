import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { PaginatedResult } from 'src/app/shared/models/PaginatedResult';
import { AddSubcategoryRequest } from '../models/add-subcategory-request.model';
import { Subcategory } from '../models/subcategory.model';
import { UpdateSubcategoryRequest } from './../models/update-subcategory-request.model';

@Injectable({
  providedIn: 'root',
})
export class SubcategoryService {
  private readonly baseUrl: string = environment.apiBaseUrl;

  constructor(private readonly http: HttpClient) {}

  getAllSubcategories(
    page: number = 1,
    pageSize: number = 5
  ): Observable<PaginatedResult<Subcategory>> {
    const url: string = `${this.baseUrl}/api/subcategories?page=${page}&pageSize=${pageSize}`;
    return this.http.get<PaginatedResult<Subcategory>>(url);
  }

  getSubcategoryById(id: string): Observable<Subcategory> {
    const url: string = `${this.baseUrl}/api/subcategories/${id}`;
    return this.http.get<Subcategory>(url);
  }

  addSubcategory(model: AddSubcategoryRequest): Observable<void> {
    const url: string = `${this.baseUrl}/api/subcategories?addAuth=true`;
    return this.http.post<void>(url, model);
  }

  updateSubcategory(
    id: string,
    updateSubcategoryRequest: UpdateSubcategoryRequest
  ): Observable<Subcategory> {
    const url: string = `${this.baseUrl}/api/subcategories/${id}?addAuth=true`;
    return this.http.put<Subcategory>(url, updateSubcategoryRequest);
  }

  deleteSubcategory(id: string): Observable<Subcategory> {
    const url: string = `${this.baseUrl}/api/subcategories/${id}?addAuth=true`;
    return this.http.delete<Subcategory>(url);
  }
}
