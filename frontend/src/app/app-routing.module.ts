import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component'
import { LoginComponent } from './login/login.component';


const routes : Routes = [
  {path: '', redirectTo:'/home',pathMatch : 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'register', component: UserRegistrationComponent},
  {path: 'dashboard', component:DashboardComponent},
  {path: 'login', component:LoginComponent}
]



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
export const routingComponents = [DashboardComponent,UserRegistrationComponent, HomeComponent, LoginComponent];