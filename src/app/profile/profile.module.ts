import { AngularMaterialModule } from './../angular-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileViewComponent } from './profile-view/profile-view.component';

@NgModule({
  declarations: [ProfileViewComponent],
  imports: [CommonModule, ProfileRoutingModule, AngularMaterialModule],
})
export class ProfileModule {}
