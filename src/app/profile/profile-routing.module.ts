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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class ProfileRoutingModule {}
