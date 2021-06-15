import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, NavController } from '@ionic/angular';
import { Usuario } from '../interface/usuario';
import { ToolsService } from './tools.service';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  user = {} as Usuario

  constructor(
    private toolsService: ToolsService,
    private afAuth: AngularFireAuth,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private firestore: AngularFirestore
  ) { }

  async getUser(){
    await this.afAuth.onAuthStateChanged( data => {
      this.user.id = data.uid;
      this.user.foto = data.photoURL;
    })
  }

  //Actualizar nombre del usuario
  async dataName(name: string, id: string){
    (await this.afAuth.currentUser).updateProfile({
      displayName: name
    });
    this.firestore.collection("usuarios").doc(id).update({
      nombre: name
    }).then(()=>{
      this.toolsService.showToast("Nombre de usuario actualizado con éxito.")
      this.getUser();
    }).catch(()=>{
      this.toolsService.showToast("Ha ocurrido un error, intente más tarde.")
    })
  }

  //Actualizar telefono del usuario
  async dataTel(data: string, id: string){
    await this.firestore.collection("usuarios").doc(id).update({
      tel: data
    }).then(()=>{
      this.toolsService.showToast("Teléfono actualizado con éxito.")
      this.getUser()
    }).catch(()=>{
      this.toolsService.showToast("Ha ocurrido un error, intente más tarde.")
    })
  }

   //Contraseña
   async dataPass(data: string, id: string){
    (await this.afAuth.currentUser).updatePassword(data).then(()=>{
      this.updatePassCol(data, id);
    }).catch(()=>{
      this.toolsService.showToast("No se puede actualizar contraseña ya que no cumple la cantidad de caractéres.")
    })
  }
  async updatePassCol(data: string, id: string){
    await this.firestore.collection("usuarios").doc(id).update({
      contrasena: data
    }).then(()=>{
      this.toolsService.showToast("Contraseña actualizada con éxito.")
      this.singOut();
    })
  }

  //Cerrar sesión
  async singOut(){
    let loader = this.loadingCtrl.create({
      message: 'Cerrando sesión'
    });
    (await loader).present();
    this.afAuth.signOut().then(() => {
      console.log('Se ha cerrado la sesión');
      this.navCtrl.navigateRoot('init');
    }).catch( exit => {
      console.log(exit);
    });
    (await loader).dismiss();
  }

  //Borrar cuenta de usuario de coleccion
  async eliminarUserColecc(id: string){
    await this.firestore.collection("usuarios").doc(id).delete().then(() => {
      console.log("Usuario eliminado con éxito de la colección.");
      this.eliminarUserAuth();
    }).catch( e => {
      console.log(e);
    })
  }
  //Borrar cuenta de usuario de Auth
  async eliminarUserAuth(){
    let user = this.afAuth.currentUser;
    let loader = this.loadingCtrl.create({
      message: 'Eliminando cuenta...'
    });
    (await loader).present();

    (await user).delete().then( () => {
      this.toolsService.showToast("Usuario eliminado con éxito.");
      console.log("Usuario eliminado de Autenticación");
      this.navCtrl.navigateBack('init');
    }).catch(()=> {
      this.toolsService.showToast('Ha ocurrido un error, intente más tarde');
    });
    (await loader).dismiss();
  }
}
