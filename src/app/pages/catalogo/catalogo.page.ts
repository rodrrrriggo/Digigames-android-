import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.page.html',
  styleUrls: ['./catalogo.page.scss'],
})
export class CatalogoPage implements OnInit {

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
      message: 'Juego agregado con exito; Revisa tu carrito!',
      buttons: ['Continuar'],
    });

    await alert.present();
  }
}
