import { Injectable } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  constructor(
    private toastCtrl: ToastController,
    private modalCtrl: ModalController
  ) { }

  async showToast(message: string){
    this.toastCtrl.create({
      message: message,
      duration: 3000
    }).then( toastData => toastData.present());
  }

  async presentModal(value: any, props: any){
    const modal = await this.modalCtrl.create({
      component: value,
      componentProps: {
        'rute': props
      }
    });
    await modal.present();
    const {data} = await modal.onDidDismiss();
    return data;
  }
}
