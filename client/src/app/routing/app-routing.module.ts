import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditmodalComponent } from '../components/editmodal/editmodal.component';
import { RegisterComponent } from '../components/register/register.component';
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
  },
  {
    path: 'admin',
    component: AdminComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
