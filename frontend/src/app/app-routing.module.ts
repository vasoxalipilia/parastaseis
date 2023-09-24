import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleAdminGuard } from './user/auth/role.admin.guard';
import { RoleOrganizerGuard } from './user/auth/role.organizer.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'user',
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'admin',
    canLoad: [RoleOrganizerGuard],
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
