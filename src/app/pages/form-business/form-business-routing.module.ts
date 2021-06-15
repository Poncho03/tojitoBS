import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormBusinessPage } from './form-business.page';

const routes: Routes = [
  {
    path: '',
    component: FormBusinessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormBusinessPageRoutingModule {}
