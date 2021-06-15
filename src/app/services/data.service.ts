import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Negocio } from '../interface/negocio';
import { Usuario } from '../interface/usuario';
import { ToolsService } from './tools.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  user = {} as Usuario

  constructor(
    private afAuth: AngularFireAuth,
    private loadingCtrl: LoadingController,
    private firestore: AngularFirestore,
    private navCtrl: NavController,
    private afStorage: AngularFireStorage,
    private toolsService: ToolsService
  ) { }

  //Login de usuario
  async login(us: Usuario){
    let loader = this.loadingCtrl.create({
      message: 'Por favor espere...'
    });
    (await loader).present();
    await this.afAuth.signInWithEmailAndPassword(us.correo, us.contrasena).then(() => {
      this.navCtrl.navigateRoot('home');
    }).catch(error => {
      console.log(error);
      if (error.code === 'auth/network-request-failed') {
        this.toolsService.showToast('Tenemos problemas de conexión, por favor, intente más tarde.');
      }
      else {
        if (error.code === 'auth/user-not-found') {
          this.toolsService.showToast('El correo electrónico ingresado no se encuentra registrado.');
        }
        else {
          this.toolsService.showToast('Ups!, parece que la contraseña es incorrecta, intenta de nuevo.');
        }
      }
    });
    (await loader).dismiss();
  }

  //Página de registro de usuario (Register Page)
  async registro(us: Usuario){
    let loader = this.loadingCtrl.create({
      message: 'Validando credenciales...'
    });
    (await loader).present();
    await this.afAuth.createUserWithEmailAndPassword(us.correo, us.contrasena).then(d => {
      d.user.updateProfile({
        displayName: us.nombre,
        photoURL: 'https://firebasestorage.googleapis.com/v0/b/musk-ee343.appspot.com/o/userNull.jpg?alt=media&token=2bb00da0-be22-42e4-8827-67ca3ed67b84',
      });
      this.creaUsuario(us, d.user.uid).then(()=>{
        this.navCtrl.navigateRoot('nego1');
      })
    }).catch(error => {
      console.log(error);
      if(error.code === 'auth/network-request-failed'){
        this.toolsService.showToast('Tenemos problemas de conexión, por favor, intente más tarde.');
      }
      else{
        this.toolsService.showToast('La dirección de correo electrónico ya se encuentra registrada.');
      }
    });
    (await loader).dismiss();
  }

  //Agrega usuario a su colección
  async creaUsuario(us: Usuario, id: string){
    let loader = this.loadingCtrl.create({
      message: 'Por favor espere...'
    });
    (await loader).present();
    try{  
      await this.firestore.collection("usuarios").doc(id).set(us);
    }
    catch(e){}
    (await loader).dismiss();
  }

  //Agregar información del negocio
  async creaNegocio(neg: Negocio, id: string){
    try{  
      await this.firestore.collection("negocios").doc(id).set(neg);
    }
    catch(e){
      this.toolsService.showToast("Ocurrió un error, intente más tarde")
    }
  }

  //----------------------------------------------------------------------------
  //Subir y descarga de archivos multimedia

  //Subir archivos
  async uploadFile(data: string[], id: string){
    let refArray: string[] = [];
    for (let i = 0; i < data.length; i++) {
      let loader = await this.loadingCtrl.create({
        message: 'Subiendo archivos multimedia... ('+(i+1)+'/'+data.length+')'
      });
      (await loader).present();
      let ref = 'negocios/' + id + '/foto#0' + i + '.jpg';
      await this.afStorage.storage.ref().child(ref).putString(data[i], 'data_url').then(() => {
        refArray.push(ref);
      });
      (await loader).dismiss();
    }
    return refArray;
  }

  //Descargar archivos
  async downloadFile(ref: string[]){
    let linkFotos: string[] = [];
    for (let i = 0; i < ref.length; i++) {
      await this.afStorage.storage.ref().child(ref[i]).getDownloadURL().then(d => {
        linkFotos.push(d);
      }).catch(e => {
        console.log(e);
      });
    }
    return linkFotos;
  }

}
