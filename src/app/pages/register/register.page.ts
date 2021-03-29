import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interface/usuario';
import { DataService } from 'src/app/services/data.service';

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
    private dataService: DataService
  ) { }

  ngOnInit() {
  }

  registro(){
    localStorage.setItem('username',this.user.nombre);
    localStorage.setItem('useremail',this.user.correo);
    this.dataService.registro(this.user);
  }

}
