import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Menu } from '../interface/menu';
import { Negocio } from '../interface/negocio';
import { Usuario } from '../interface/usuario';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  user = {} as Usuario

  constructor(
    private afAuth: AngularFireAuth,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private firestore: AngularFirestore,
    private navCtrl: NavController,
    private afStorage: AngularFireStorage
  ) { }

  async getUser(){
    await this.afAuth.onAuthStateChanged( data => {
      this.user.id = data.uid;
      this.user.foto = data.photoURL;
    })
  }

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
        this.showToast('Tenemos problemas de conexión, por favor, intente más tarde.');
      }
      else {
        if (error.code === 'auth/user-not-found') {
          this.showToast('El correo electrónico ingresado no se encuentra registrado.');
        }
        else {
          this.showToast('Ups!, parece que la contraseña es incorrecta, intenta de nuevo.');
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
        this.showToast('Tenemos problemas de conexión, por favor, intente más tarde.');
      }
      else{
        this.showToast('La dirección de correo electrónico ya se encuentra registrada.');
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
      this.showToast("Ocurrió un error, intente más tarde")
    }
  }

  //----------------------------------------------------------------------------
  //Actualizar nombre del negocio
  async updateDataName(data: string, id: string){
    await this.firestore.collection("negocios").doc(id).update({
      nombre: data
    }).then( ()=>{
      this.showToast("Nombre actualizado con éxito.")
    }).catch(()=>{
      this.showToast("Ha ocurrido un error, intente más tarde.")
    })
  }
  //Actualizar eslogan del negocio
  async updateDataEslogan(data: string, id: string){
    await this.firestore.collection("negocios").doc(id).update({
      eslogan: data
    }).then( ()=>{
      this.showToast("Eslogan actualizado con éxito.")
    }).catch(()=>{
      this.showToast("Ha ocurrido un error, intente más tarde.")
    })
  }
  //Actualizar dirección del negocio
  async updateDataDir(data: string, id: string){
    await this.firestore.collection("negocios").doc(id).update({
      direccion: data
    }).then( ()=>{
      this.showToast("Dirección actualizada con éxito.")
    }).catch(()=>{
      this.showToast("Ha ocurrido un error, intente más tarde.")
    })
  }
  //Actualizar telefono del negocio
  async updateDataTel(data: string, id: string){
    await this.firestore.collection("negocios").doc(id).update({
      tel: data
    }).then( ()=>{
      this.showToast("Teléfono actualizado con éxito.")
    }).catch(()=>{
      this.showToast("Ha ocurrido un error, intente más tarde.")
    })
  }
  //Actualizar descripcion del negocio
  async updateDataDesc(data: string, id: string){
    await this.firestore.collection("negocios").doc(id).update({
      desc: data
    }).then( ()=>{
      this.showToast("Descripción actualizada con éxito.")
    }).catch(()=>{
      this.showToast("Ha ocurrido un error, intente más tarde.")
    })
  }
  //Actualizar servicios del negocio
  async updateDataServ(data: string [], id: string){
    await this.firestore.collection("negocios").doc(id).update({
      servicios: data
    }).then( ()=>{
      this.showToast("Servicios actualizados con éxito.")
    }).catch(()=>{
      this.showToast("Ha ocurrido un error, intente más tarde.")
    })
  }
  //Actualizar menu del negocio
  async updateDataMenu(data: Menu [], id: string){
    await this.firestore.collection("negocios").doc(id).update({
      menu: data
    }).then( ()=>{
      this.showToast("Menú actualizado con éxito.")
    }).catch(()=>{
      this.showToast("Ha ocurrido un error, intente más tarde.")
    })
  }

  //----------------------------------------------------------------------------
  //Actualizar nombre del usuario
  async dataName(name: string, id: string){
    (await this.afAuth.currentUser).updateProfile({
      displayName: name
    });
    this.firestore.collection("usuarios").doc(id).update({
      nombre: name
    }).then(()=>{
      this.showToast("Nombre de usuario actualizado con éxito.")
      this.getUser();
    }).catch(()=>{
      this.showToast("Ha ocurrido un error, intente más tarde.")
    })
  }

  //Actualizar telefono del usuario
  async dataTel(data: string, id: string){
    await this.firestore.collection("usuarios").doc(id).update({
      tel: data
    }).then(()=>{
      this.showToast("Teléfono actualizado con éxito.")
      this.getUser()
    }).catch(()=>{
      this.showToast("Ha ocurrido un error, intente más tarde.")
    })
  }

   //Contraseña
   async dataPass(data: string, id: string){
    (await this.afAuth.currentUser).updatePassword(data).then(()=>{
      this.updatePassCol(data, id);
    }).catch(()=>{
      this.showToast("No se puede actualizar contraseña ya que no cumple la cantidad de caractéres.")
    })
  }
  async updatePassCol(data: string, id: string){
    await this.firestore.collection("usuarios").doc(id).update({
      contrasena: data
    }).then(()=>{
      this.showToast("Contraseña actualizada con éxito.")
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
      this.showToast("Usuario eliminado con éxito.");
      console.log("Usuario eliminado de Autenticación");
      this.navCtrl.navigateBack('init');
    }).catch(()=> {
      this.showToast('Ha ocurrido un error, intente más tarde');
    });
    (await loader).dismiss();
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

  //Mensaje
  showToast(message: string){
    this.toastCtrl.create({
      message: message,
      duration: 3000
    }).then( toasData => toasData.present());
  }

}
