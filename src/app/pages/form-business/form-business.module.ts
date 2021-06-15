import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormBusinessPageRoutingModule } from './form-business-routing.module';

import { FormBusinessPage } from './form-business.page';

import { MenuPage } from '../menu/menu.page';
import { ServiciosPage } from '../servicios/servicios.page';
import { FotosnegPage } from '../fotosneg/fotosneg.page';
import { MenuPageModule } from '../menu/menu.module';
import { ServiciosPageModule } from '../servicios/servicios.module';
import { FotosnegPageModule } from '../fotosneg/fotosneg.module';

@NgModule({
  entryComponents: [
    MenuPage,
    ServiciosPage,
    FotosnegPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormBusinessPageRoutingModule,
    MenuPageModule,
    ServiciosPageModule,
    FotosnegPageModule
  ],
  declarations: [FormBusinessPage]
})
export class FormBusinessPageModule {}
