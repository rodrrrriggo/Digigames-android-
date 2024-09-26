import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private alertController: AlertController) {}

  ngOnInit() {}

  // Primera alerta
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'DIGIGAMES DICE:',
      message: 'Sesión cerrada con éxito!',
      buttons: ['Vuelve Pronto'],
    });

    await alert.present();
  }
}
