import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { RoleAdminGuard } from '../user/auth/role.admin.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },

      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeModule),
      },
      // {
      //   path: 'movies',
      //   loadChildren: () =>
      //     import('./movies/movies.module').then((m) => m.MoviesModule),
      // },
      {
        path: 'users',
        canLoad: [RoleAdminGuard],
        loadChildren: () =>
          import('./users/users.module').then((m) => m.UsersModule),
      },
      {
        path: 'event',
        loadChildren: () =>
          import('./event/event.module').then((m) => m.EventModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
