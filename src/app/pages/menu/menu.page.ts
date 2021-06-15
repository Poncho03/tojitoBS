import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  @Input() rute: string;

  nombre: string;
  precio: number;
  menuFull = []

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    if(this.rute == "form-business"){
      this.getMenuLocal();
    }
    console.log(this.rute);
  }

  getMenuLocal(){
    if(localStorage.getItem("menu")){
      this.menuFull = JSON.parse(localStorage.getItem("menu"));
    }
  }

  addFood(){
    let menu = {
      nombre: this.nombre,
      precio: this.precio
    }
    this.menuFull.push(menu);
    this.nombre = null;
    this.precio = null;
  }

  delete(item){
    let pos = this.menuFull.indexOf(item);
    console.log(pos);
    this.menuFull.splice(pos, 1)
  }

  saveMenu(){
    this.modalCtrl.dismiss({
      menu: this.menuFull
    });
  }

}
