import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from './../angular-material.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [CommonModule, AngularMaterialModule, RouterModule],
  declarations: [SidenavComponent, HeaderComponent],
  providers: [],
  exports: [HeaderComponent],
})
export class SharedModule {}
