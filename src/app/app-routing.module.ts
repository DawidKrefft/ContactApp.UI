import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './features/category/category-list/category-list.component';
import { AddCategoryComponent } from './features/category/add-category/add-category.component';
import { EditCategoryComponent } from './features/category/edit-category/edit-category.component';
import { LoginComponent } from './features/auth/login/login.component';
import { authGuard } from './features/auth/guards/auth.guard';
import { SubcategoryListComponent } from './features/subcategory/subcategory-list/subcategory-list.component';
import { EditSubcategoryComponent } from './features/subcategory/edit-subcategory/edit-subcategory.component';
import { AddSubcategoryComponent } from './features/subcategory/add-subcategory/add-subcategory.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { ContactListComponent } from './features/contact/contact-list/contact-list.component';
import { AddContactComponent } from './features/contact/add-contact/add-contact.component';
import { EditContactComponent } from './features/contact/edit-contact/edit-contact.component';

const routes: Routes = [
  {
    path: '',
    component: ContactListComponent,
  },
  {
    path: 'admin/contacts/add',
    component: AddContactComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin/contacts/:id',
    component: EditContactComponent,
    canActivate: [authGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'admin/categories',
    component: CategoryListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin/categories/add',
    component: AddCategoryComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin/categories/:id',
    component: EditCategoryComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin/subcategories',
    component: SubcategoryListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin/subcategories/add',
    component: AddSubcategoryComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin/subcategories/:id',
    component: EditSubcategoryComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
