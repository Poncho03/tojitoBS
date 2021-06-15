import { Component, Input, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';

@Component({
  selector: 'app-fotosneg',
  templateUrl: './fotosneg.page.html',
  styleUrls: ['./fotosneg.page.scss'],
})
export class FotosnegPage implements OnInit {

  @Input() rute: string;

  auxFotos: string[];
  numFotos: number = 3;

  constructor(
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController
  ) {
    this.auxFotos = [];
  }

  ngOnInit() {
    if(this.rute == "form-business"){
      this.getPhotosLocal();
    }
  }

  getPhotosLocal(){
    if(localStorage.getItem("foto")){
      this.auxFotos = JSON.parse(localStorage.getItem("foto"));
      this.numFotos = 3 - this.auxFotos.length;
      console.log(this.auxFotos);
    }
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
    console.log(this.auxFotos);
  }

  borrarFoto(item){
    let pos = this.auxFotos.indexOf(item);
    this.auxFotos.splice(pos, 1);
    this.numFotos = 3 - this.auxFotos.length;
  }

  savePhotos(){
    this.modalCtrl.dismiss({
      fotos: this.auxFotos
    });
  }

  /*
  async savePhotos(){
    if (this.auxFotos.length == 0) {
      this.toolsService.showToast("Tiene que agregar al menos una fotografía.");
    }
    else {
      this.linksFotos = await this.dataService.downloadFile(await this.dataService.uploadFile(this.auxFotos, this.userID));
      this.modalCtrl.dismiss({
        fotos: this.linksFotos
      });
    }
  }
  */

}
