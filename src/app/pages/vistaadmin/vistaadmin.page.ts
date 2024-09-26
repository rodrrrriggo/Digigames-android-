import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-vistaadmin',
  templateUrl: './vistaadmin.page.html',
  styleUrls: ['./vistaadmin.page.scss'],
})
export class VistaadminPage implements OnInit {
  
  constructor(private alertController: AlertController) {}

  ngOnInit() {}


  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'DIGIGAMES DICE:',
      message: 'Sesión cerrada con éxito!',
      buttons: ['Vuelve Pronto'],
    });

    await alert.present();
  }

  async presentAnotherAlert() {
    const alert = await this.alertController.create({
      header: 'DIGIGAMES DICE:',
      message: 'Juego Editado/Eliminado',
      buttons: ['Continuar'],
    });

    await alert.present();
  }
}



