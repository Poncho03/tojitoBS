import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-fotosneg',
  templateUrl: './fotosneg.page.html',
  styleUrls: ['./fotosneg.page.scss'],
})
export class FotosnegPage implements OnInit {

  userID: string;
  auxFotos: string[] = [];
  linksFotos: string[] = [];
  numFotos: number =  3;

  constructor(
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private dataService: DataService,
    private afAuth: AngularFireAuth
  ) { }

  ngOnInit() {
    this.getInfoUser();
  }

  getInfoUser(){
    this.afAuth.onAuthStateChanged( data => {
      this.userID = data.uid;
    })
  }

  async openActionSheetPhotos(){
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Seleccionar archivo de...',
      buttons: [
        { text: 'Cámara', icon: 'camera', handler: () => {
          this.tomarFoto();
        } },
        { text: 'Galeria', icon: 'image', handler: () => {
          console.log('Se abre Galería');
        } },
        { text: 'Cancelar', role: 'cancel', icon: 'close' }
      ]
    });
    await actionSheet.present();
  }

  async tomarFoto(){
    const image = await Plugins.Camera.getPhoto({
      quality: 50,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });
    this.auxFotos.push(image.dataUrl);
    this.numFotos = 3 - this.auxFotos.length;
  }

  borrarFoto(item){
    let pos = this.auxFotos.indexOf(item);
    this.auxFotos.splice(pos, 1);
    this.numFotos = 3 - this.auxFotos.length;
  }

  async savePhotos(){
    if (this.auxFotos.length == 0) {
      this.dataService.showToast("Tiene que agregar al menos una fotografía.");
    }
    else {
      this.linksFotos = await this.dataService.downloadFile(await this.dataService.uploadFile(this.auxFotos, this.userID));
      this.modalCtrl.dismiss({
        fotos: this.linksFotos
      });
    }
  }

}
