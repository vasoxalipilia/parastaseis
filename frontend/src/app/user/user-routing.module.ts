import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  // {
  //   path: 'edit-product',
  //   canLoad: [AuthGuard],
  //   component: EditProductComponent,
  //   data: {
  //     title: 'edit-product',
  //     breadcrumb: [
  //       {
  //         label: 'edit-product',
  //         url: 'edit-product',
  //       },
  //     ],
  //   },
  // },
  {
    path: 'mytickets',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./mytickets/mytickets.module').then((m) => m.MyticketsModule),
    data: {
      title: 'my-tickets',
      breadcrumb: {
        label: 'my-tickets',
        url: 'my-tickets',
      },
    },
  },
  {
    path: 'theatre',
    loadChildren: () =>
      import('./pages/theatre-page/theatre-page.module').then(
        (m) => m.TheatrePageModule
      ),
    data: {
      title: 'theatre',
      breadcrumb: {
        label: 'theatre',
        url: 'theatre',
      },
    },
  },
  {
    path: 'music',
    loadChildren: () =>
      import('./pages/music-page/music-page.module').then(
        (m) => m.MusicPageModule
      ),
    data: {
      title: 'music',
      breadcrumb: {
        label: 'music',
        url: 'music',
      },
    },
  },
  {
    path: 'new',
    loadChildren: () =>
      import('./pages/new-page/new-page.module').then((m) => m.NewPageModule),
    data: {
      title: 'new',
      breadcrumb: {
        label: 'new',
        url: 'new',
      },
    },
  },
  {
    path: 'popular',
    loadChildren: () =>
      import('./pages/popular-page/popular-page.module').then(
        (m) => m.PopularPageModule
      ),
    data: {
      title: 'popular',
      breadcrumb: {
        label: 'popular',
        url: 'popular',
      },
    },
  },
  {
    path: 'recommended',
    loadChildren: () =>
      import('./pages/recommended-page/recommended-page.module').then(
        (m) => m.RecommendedPageModule
      ),
    data: {
      title: 'recommended',
      breadcrumb: {
        label: 'recommended',
        url: 'recommended',
      },
    },
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
    data: {
      title: 'login',
      breadcrumb: {
        label: 'login',
        url: 'login',
      },
    },
  },
  // {
  //   path: 'theatre/reservation',
  //   loadChildren: () =>
  //     import('./shared/reservation-page/reservation-page.module').then(
  //       (m) => m.ReservationPageModule
  //     ),
  //   data: {
  //     title: 'reservation',
  //     breadcrumb: {
  //       label: 'reservation',
  //       url: 'theatre/reservation',
  //     },
  //   },
  // },
  {
    path: 'signup',
    loadChildren: () =>
      import('./signup/signup.module').then((m) => m.SignupModule),
    data: {
      title: 'signup',
      breadcrumb: {
        label: 'signup',
        url: 'signup',
      },
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
