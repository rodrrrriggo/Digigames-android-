import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cambiocontra',
  templateUrl: './cambiocontra.page.html',
  styleUrls: ['./cambiocontra.page.scss'],
})
export class CambiocontraPage implements OnInit {

  contrasena: string = "";
  confirmarContrasena: string = "";

  constructor(public alertController: AlertController, private toastController: ToastController, private router: Router) { }

  ngOnInit() {}

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'DIGIGAMES DICE:',
      message: 'Contraseña modificada, Inicia sesion nuevamente.',
      buttons: ['Continuar'],
    });

    await alert.present();
  }

  async cambiocontra() {
    if (this.contrasena === "") {
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

    //MAYUSCULAS
    const contramayu = /[A-Z]/.test(this.contrasena);
    if (!contramayu){
      await this.presentToast('middle','La contraseña debe de tener al menos una mayuscula');
      return;
    }

    //NUMEROS NEGATIVOS
    const numeroneg = /-/.test(this.contrasena);
    if(numeroneg){
      await this.presentToast('middle','La contraseña no puede contener caracteres negativos');
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
