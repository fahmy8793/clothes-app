import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AddClothesComponent } from './pages/add-clothes/add-clothes.component';
import { NavbarComponent } from './navbar/navbar.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'addclothes', component: AddClothesComponent },
  { path: 'navbar', component: NavbarComponent },

];
