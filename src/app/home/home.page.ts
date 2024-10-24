import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private alertController: AlertController) {}

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'DIGIGAMES DICE:',
      message: 'Preparate para jugar Rick and Morty: Virtual Rick-ality en DIGIGAMES!',
      buttons: ['Continuar'],
    });

    await alert.present();
  }
}
  

