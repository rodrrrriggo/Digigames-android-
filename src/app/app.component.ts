import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import {StatusBar, Style} from '@capacitor/status-bar';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  constructor(private alertController: AlertController, private navCtrl: NavController) {
    
    StatusBar.setBackgroundColor({ color: '#ffce31' });
    
    StatusBar.setStyle({ style: Style.Light });
  }

  ngOnInit() {}

  
  // Función para cerrar sesión
  async logout() {
    localStorage.removeItem('id_usuario');
    localStorage.removeItem('id_rol');
    localStorage.removeItem('nombre');

    await this.presentAlert();

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

