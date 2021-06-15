import { Injectable } from '@angular/core';
import { Menu } from '../interface/menu';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToolsService } from './tools.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(
    private toolsService: ToolsService,
    private firestore: AngularFirestore
  ) { }

  //Actualizar nombre del negocio
  async updateDataName(data: string, id: string){
    await this.firestore.collection("negocios").doc(id).update({
      nombre: data
    }).then( ()=>{
      this.toolsService.showToast("Nombre actualizado con éxito.")
    }).catch(()=>{
      this.toolsService.showToast("Ha ocurrido un error, intente más tarde.")
    })
  }

  //Actualizar eslogan del negocio
  async updateDataEslogan(data: string, id: string){
    await this.firestore.collection("negocios").doc(id).update({
      eslogan: data
    }).then( ()=>{
      this.toolsService.showToast("Eslogan actualizado con éxito.")
    }).catch(()=>{
      this.toolsService.showToast("Ha ocurrido un error, intente más tarde.")
    })
  }

  //Actualizar dirección del negocio
  async updateDataDir(data: string, id: string){
    await this.firestore.collection("negocios").doc(id).update({
      direccion: data
    }).then( ()=>{
      this.toolsService.showToast("Dirección actualizada con éxito.")
    }).catch(()=>{
      this.toolsService.showToast("Ha ocurrido un error, intente más tarde.")
    })
  }

  //Actualizar telefono del negocio
  async updateDataTel(data: string, id: string){
    await this.firestore.collection("negocios").doc(id).update({
      tel: data
    }).then( ()=>{
      this.toolsService.showToast("Teléfono actualizado con éxito.")
    }).catch(()=>{
      this.toolsService.showToast("Ha ocurrido un error, intente más tarde.")
    })
  }

  //Actualizar descripcion del negocio
  async updateDataDesc(data: string, id: string){
    await this.firestore.collection("negocios").doc(id).update({
      desc: data
    }).then( ()=>{
      this.toolsService.showToast("Descripción actualizada con éxito.")
    }).catch(()=>{
      this.toolsService.showToast("Ha ocurrido un error, intente más tarde.")
    })
  }

  //Actualizar servicios del negocio
  async updateDataServ(data: string [], id: string){
    await this.firestore.collection("negocios").doc(id).update({
      servicios: data
    }).then( ()=>{
      this.toolsService.showToast("Servicios actualizados con éxito.")
    }).catch(()=>{
      this.toolsService.showToast("Ha ocurrido un error, intente más tarde.")
    })
  }
  
  //Actualizar menu del negocio
  async updateDataMenu(data: Menu [], id: string){
    await this.firestore.collection("negocios").doc(id).update({
      menu: data
    }).then( ()=>{
      this.toolsService.showToast("Menú actualizado con éxito.")
    }).catch(()=>{
      this.toolsService.showToast("Ha ocurrido un error, intente más tarde.")
    })
  }
}
