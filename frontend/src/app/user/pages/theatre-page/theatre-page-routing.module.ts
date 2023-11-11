import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
    path: 'reservation',
    loadChildren: () =>
      import('../../reservation-page/reservation-page.module').then(
        (m) => m.ReservationPageModule
      ),
    data: {
      title: 'reservation',
      breadcrumb: {
        label: 'reservation',
        url: 'reservation',
      },
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TheatrePageRoutingModule {}
