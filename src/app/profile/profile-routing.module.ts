import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { AddAddressComponent } from './add-address/add-address.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: 'profile-view',
    component: ProfileViewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-address',
    component: AddAddressComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'verify-email',
    component: VerifyEmailComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class ProfileRoutingModule {}
