import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './routing/app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MenuComponent } from './pages/menu/menu.component';
import { AdminComponent } from './pages/admin/admin.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditmodalComponent } from './components/editmodal/editmodal.component';
import { AddmodalComponent } from './components/addmodal/addmodal.component';
import { AdminorderComponent } from './components/adminorder/adminorder.component';
import { CommonModule } from '@angular/common';
import { UserorderComponent } from './components/userorder/userorder.component';
import { ReviewmodalComponent } from './components/reviewmodal/reviewmodal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    MenuComponent,
    AdminComponent,
    InventoryComponent,
    EditmodalComponent,
    AddmodalComponent,
    AdminorderComponent,
    UserorderComponent,
    ReviewmodalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    NgxSpinnerModule,
    CommonModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      progressBar: true,
      closeButton: true,
      tapToDismiss: true,
      enableHtml: true,
      // Add more options here as needed
    }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
