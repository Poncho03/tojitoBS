import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Usuario } from 'src/app/interface/usuario';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user = {} as Usuario;
  conPass: string;
  dataCheck = {
    eti: 'Acepto términos y condiciones',
    value: false
  }

  constructor(
    private toolsService: ToolsService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  registro(){
    localStorage.setItem('datauser', JSON.stringify(this.user));
    this.navCtrl.navigateRoot('form-business');
  }

}
