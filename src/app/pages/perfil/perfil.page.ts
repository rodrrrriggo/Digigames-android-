import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  nombre: string = "";
  correo: string = "";
  contrasena: string = "";
  confirmarContrasena: string = "";

  constructor(
    public alertController: AlertController, private toastController: ToastController, private router: Router) {}

  ngOnInit() {}

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'DIGIGAMES DICE:',
      message: 'Perfil Modificado, Inicia sesion nuevamente.',
      buttons: ['Continuar'],
    });

    await alert.present();
  }

  async ingresoUsuarios() {
    if (this.nombre === "" || this.correo === "" || this.contrasena === "") {
      await this.presentToast('middle', 'Faltan campos por modificar!');
      return;
    }
    

    if (this.contrasena !== this.confirmarContrasena) {
      await this.presentToast('middle', 'Las contraseñas no coinciden.');
      return;
    }

    //LONGITUD DE CONTRASEÑA
    if (this.contrasena.length <8){
      await this.presentToast('middle','La contraseña debe tener una longitud de 8 caracteres');
      return;
    }


    const nombreValido = /^[a-zA-Z ]+$/.test(this.nombre);
    if (!nombreValido) {
      await this.presentToast('middle', 'El nombre no puede contener números.');
      return;
    }

    await this.presentAlert();
    this.router.navigate(['/login']);
  }

    async presentToast(position: 'middle', texto: string) {
    const toast = await this.toastController.create({
      position: position,
      message: texto,
      duration: 2000,
    });

    await toast.present();
  }
}
