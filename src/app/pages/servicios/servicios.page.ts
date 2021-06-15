import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.page.html',
  styleUrls: ['./servicios.page.scss'],
})
export class ServiciosPage implements OnInit {

  @Input() rute: string;

  servicio: string;
  services = [];

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    if(this.rute == "form-business"){
      this.getServicesLocal();
    }
    console.log(this.rute);
  }

  getServicesLocal(){
    if(localStorage.getItem("serv")){
      this.services = JSON.parse(localStorage.getItem("serv"));
    }
  }

  addService(){
    this.services.push(this.servicio);
    this.servicio = null;
  }

  delete(item){
    let pos = this.services.indexOf(item);
    console.log(pos);
    this.services.splice(pos, 1)
  }

  saveServices(){
    this.modalCtrl.dismiss({
      servicios: this.services
    });
  }

}
