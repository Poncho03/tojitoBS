import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FotosnegPageRoutingModule } from './fotosneg-routing.module';

import { FotosnegPage } from './fotosneg.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FotosnegPageRoutingModule
  ],
  declarations: [FotosnegPage]
})
export class FotosnegPageModule {}
