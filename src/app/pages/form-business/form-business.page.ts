import { Component, OnInit } from '@angular/core';
import { Negocio } from 'src/app/interface/negocio';
import { ToolsService } from 'src/app/services/tools.service';
import { FotosnegPage } from '../fotosneg/fotosneg.page';
import { MenuPage } from '../menu/menu.page';
import { ServiciosPage } from '../servicios/servicios.page';

@Component({
  selector: 'app-form-business',
  templateUrl: './form-business.page.html',
  styleUrls: ['./form-business.page.scss'],
})
export class FormBusinessPage implements OnInit {

  negocio = {} as Negocio;
  nombre: string = "";
  colorMenu: string = "";
  colorServ: string = "";
  colorFoto: string = "";

  ruta: string = 'form-business';

  menu: boolean = true;
  serv: boolean = true;
  foto: boolean = true;

  constructor(
    private toolsService: ToolsService
  ) {
    this.nombre = JSON.parse(localStorage.getItem("datauser")).nombre;
  }

  ngOnInit() {
  }

  registrar(){
    this.negocio.menu = JSON.parse(localStorage.getItem("menu"));
    this.negocio.servicios = JSON.parse(localStorage.getItem("serv"));
    this.negocio.fotos = JSON.parse(localStorage.getItem("foto"));
    console.log("Negocio registrado: ", this.negocio);
  }

  async getMenu(){
    const data = await this.toolsService.presentModal(MenuPage, this.ruta);
    if(data.menu.length != 0){
      this.colorMenu = "pink";
      this.menu = false;
      this.toolsService.showToast("Su menú ha sido guardado con éxito");
      localStorage.setItem("menu", JSON.stringify(data.menu));
    }
    else{
      this.colorMenu = "";
      this.menu = true;
      this.toolsService.showToast("Ingresa por lo menos una comida para continuar con tu registro.");
      localStorage.removeItem("menu");
    }
  }

  async getServices(){
    const data = await this.toolsService.presentModal(ServiciosPage, this.ruta);
    if(data.servicios.length != 0){
      this.colorServ = "pink";
      this.serv = false;
      this.toolsService.showToast("Sus servicios han sido guardados con éxito.");
      localStorage.setItem("serv", JSON.stringify(data.servicios));
    }
    else{
      this.colorServ = "";
      this.serv = true;
      this.toolsService.showToast("Ingresa por lo menos un servicio para continuar con tu registro.");
      localStorage.removeItem("serv");
    }
  }

  async getPhotos(){
    const data = await this.toolsService.presentModal(FotosnegPage, this.ruta);
    if(data.fotos.length != 0){
      this.colorFoto = "pink";
      this.foto = false;
      this.toolsService.showToast("Las fotos de su negocio han sido guardadas con éxito.");
      localStorage.setItem("foto", JSON.stringify(data.fotos));
    }
    else{
      this.colorFoto = "";
      this.foto = true;
      this.toolsService.showToast("Ingresa por lo menos una fotografía para continuar con tu registro.");
      localStorage.removeItem("foto");
    }
  }

}
