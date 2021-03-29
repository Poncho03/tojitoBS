import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController } from '@ionic/angular';
import { Negocio } from 'src/app/interface/negocio';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-nego1',
  templateUrl: './nego1.page.html',
  styleUrls: ['./nego1.page.scss'],
})
export class Nego1Page implements OnInit {

  negocio = {} as Negocio;
  id: string;
  nombre: string;
  correo: string;

  constructor(
    private dataService: DataService,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.nombre = localStorage.getItem('username');
    this.correo = localStorage.getItem('useremail');
  }
  
  ionViewDidEnter(){
    this.getUser();
  }

  async getUser(){
    await this.afAuth.onAuthStateChanged( data => {
      this.id = data.uid;
    });
  }

  async envioNeg1(){
    await this.dataService.creaNegocio(this.negocio, this.id).then(()=>{
      //Finalizar el proceso con éxito redirecciona a la Etapa II
      this.navCtrl.navigateRoot('nego2/'+this.id);
    })
  }

}
