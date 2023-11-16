import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { CategoryListComponent } from './features/category/category-list/category-list.component';
import { AddCategoryComponent } from './features/category/add-category/add-category.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { EditCategoryComponent } from './features/category/edit-category/edit-category.component';
import { MarkdownModule } from 'ngx-markdown';
import { LoginComponent } from './features/auth/login/login.component';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { SubcategoryListComponent } from './features/subcategory/subcategory-list/subcategory-list.component';
import { AddSubcategoryComponent } from './features/subcategory/add-subcategory/add-subcategory.component';
import { EditSubcategoryComponent } from './features/subcategory/edit-subcategory/edit-subcategory.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { ContactListComponent } from './features/contact/contact-list/contact-list.component';
import { AddContactComponent } from './features/contact/add-contact/add-contact.component';
import { EditContactComponent } from './features/contact/edit-contact/edit-contact.component';
import { ContactDetailsComponent } from './features/contact/contact-details/contact-details.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CategoryListComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    LoginComponent,
    RegisterComponent,
    SubcategoryListComponent,
    AddSubcategoryComponent,
    EditSubcategoryComponent,
    ContactListComponent,
    AddContactComponent,
    EditContactComponent,
    ContactDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MarkdownModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
