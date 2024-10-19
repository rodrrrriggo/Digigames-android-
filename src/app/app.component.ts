import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private alertController: AlertController, private navCtrl: NavController) {}

  ngOnInit() {}

  // Función para cerrar sesión
  async logout() {
    // Eliminar la información del usuario del localStorage
    localStorage.removeItem('id_usuario');
    localStorage.removeItem('id_rol');
    localStorage.removeItem('nombre');

    // Presentar alerta de cierre de sesión
    await this.presentAlert();

    // Redirigir a la página de inicio de sesión
    this.navCtrl.navigateBack('/login');
  }

  // Alerta de cierre de sesión
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'DIGIGAMES DICE:',
      message: 'Sesión cerrada con éxito!',
      buttons: ['Vuelve Pronto'],
    });

    await alert.present();
  }
}

