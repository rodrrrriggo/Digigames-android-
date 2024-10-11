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
    // Verificar si hay un usuario logueado al iniciar la aplicación
    const correo = localStorage.getItem('correo');
    this.rolUsuario = localStorage.getItem('id_rol'); // Aquí se obtiene el rol del usuario desde localStorage

    if (correo) {
      // Redirigir a la página de productos si hay un usuario logueado
      this.navcontroller.navigateForward('/catalogo');
    }
  }

  loginUsuario() {
    this.bd.getUsuario(this.correo, this.contrasena)
      .then((correo) => {
        if (correo) {
          const usuarios = correo;
          // Guardar el rol del usuario en localStorage
          localStorage.setItem('id_rol', usuarios.id_rol);
          localStorage.setItem('nombre', usuarios.nombre);
  
          // Redirigir a la página home si el login es exitoso
          this.navcontroller.navigateForward('/productos');
          alert('Inicio de sesion exitoso. Bienvenido');
        } else {
          alert('Usuario o contraseña incorrectos');
        }
      })
      .catch(e => console.error('Error en el login', e));
  }
  
}
  



