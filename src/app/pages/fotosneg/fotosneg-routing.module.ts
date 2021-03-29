import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FotosnegPage } from './fotosneg.page';

const routes: Routes = [
  {
    path: '',
    component: FotosnegPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FotosnegPageRoutingModule {}
