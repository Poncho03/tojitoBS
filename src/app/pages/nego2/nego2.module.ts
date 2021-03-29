import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Nego2PageRoutingModule } from './nego2-routing.module';

import { Nego2Page } from './nego2.page';
import { MenuPage } from '../menu/menu.page';
import { ServiciosPage } from '../servicios/servicios.page';
import { MenuPageModule } from '../menu/menu.module';
import { ServiciosPageModule } from '../servicios/servicios.module';
import { FotosnegPage } from '../fotosneg/fotosneg.page';
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
    Nego2PageRoutingModule,
    MenuPageModule,
    ServiciosPageModule,
    FotosnegPageModule
  ],
  declarations: [Nego2Page]
})
export class Nego2PageModule {}
