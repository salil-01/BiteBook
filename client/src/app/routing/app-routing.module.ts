import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from '../components/register/register.component';
import { UserorderComponent } from '../components/userorder/userorder.component';
import { AdminauthService } from '../guards/adminauth.service';
import { UserauthService } from '../guards/userauth.service';
import { AdminComponent } from '../pages/admin/admin.component';
import { HomepageComponent } from '../pages/homepage/homepage.component';
import { LoginComponent } from '../pages/login/login.component';
import { MenuComponent } from '../pages/menu/menu.component';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
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
    path: 'menu',
    component: MenuComponent,
    canActivate: [UserauthService],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminauthService],
  },
  {
    path: 'myorders',
    component: UserorderComponent,
    canActivate: [UserauthService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
