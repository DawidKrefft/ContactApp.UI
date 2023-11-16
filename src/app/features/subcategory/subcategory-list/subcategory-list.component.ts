import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubcategoryService } from '../services/subcategory.service';
import { Subcategory } from '../models/subcategory.model';
import { Observable, Subject, takeUntil } from 'rxjs';
import { PaginatedResult } from 'src/app/shared/models/PaginatedResult';

@Component({
  selector: 'app-subcategory-list',
  templateUrl: './subcategory-list.component.html',
  styleUrls: ['./subcategory-list.component.css'],
})
export class SubcategoryListComponent implements OnInit, OnDestroy {
  subcategories$?: Observable<PaginatedResult<Subcategory>>;
  private destroy$ = new Subject<void>();

  constructor(private subcategoryService: SubcategoryService) {}

  ngOnInit(): void {
    this.loadSubcategories();
  }

  loadSubcategories(page: number = 1, pageSize: number = 5) {
    this.subcategories$ = this.subcategoryService
      .getAllSubcategories(page, pageSize)
      .pipe(takeUntil(this.destroy$));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
