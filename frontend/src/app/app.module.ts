import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule } from '@angular/material';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TrendingvideosComponent } from './trendingvideos/trendingvideos.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { MatTabsModule } from '@angular/material/tabs';
import {MatDividerModule} from '@angular/material/divider';
import {MatGridListModule} from '@angular/material/grid-list';
import { DashboardComponent } from './dashboard/dashboard.component';
import {HttpClientModule} from '@angular/common/http' 
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { ReactiveFormsModule }         from '@angular/forms';
import { MaterialModule } from './material.module';
import { HomeComponent } from './home/home.component';



@NgModule({
  declarations: [AppComponent, HeaderComponent, NavbarComponent, LoginComponent, TrendingvideosComponent, FooterComponent, DashboardComponent, UserRegistrationComponent, HomeComponent],
  imports: [BrowserModule, ReactiveFormsModule, MaterialModule, MatGridListModule, AppRoutingModule, FormsModule, BrowserAnimationsModule, MatSliderModule, MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, HttpClientModule, MatTabsModule, MatDividerModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
