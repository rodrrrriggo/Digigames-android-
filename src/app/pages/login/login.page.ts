import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { ServiceBDService } from 'src/app/services/service-bd.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  correo: string = "";
  contrasena: string = "";
  rolUsuario: string | null = null;

  constructor(private bd: ServiceBDService, public alertcontroller: AlertController, private navcontroller: NavController, ) {}

  ngOnInit() {

    localStorage.clear();
 
    const correo = localStorage.getItem('correo');
    this.rolUsuario = localStorage.getItem('id_rol'); 

    if (correo) {
      this.navcontroller.navigateForward('/vistaadmin');
    }
  }
  

  loginUsuario() {
    this.bd.getUsuario(this.correo, this.contrasena)
      .then((correo) => {
        if (correo) {
          const usuarios = correo;
          localStorage.setItem('id_usuario', usuarios.id_usuario.toString());
          localStorage.setItem('id_rol', usuarios.id_rol);
          localStorage.setItem('nombre', usuarios.nombre);
  
          this.navcontroller.navigateForward('/vistaadmin');
          alert('Bienvenido a DIGIGAMES!');
        } else {
          alert('Correo o contraseña incorrectos, Reintenta nuevamente');
        }
      })
      .catch(e => console.error('Error en el login', e));
  }
}
  



