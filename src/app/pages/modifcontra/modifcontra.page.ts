import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { ServiceBDService } from 'src/app/services/service-bd.service';

@Component({
  selector: 'app-modifcontra',
  templateUrl: './modifcontra.page.html',
  styleUrls: ['./modifcontra.page.scss'],
})
export class ModifcontraPage implements OnInit {

  correo: string = '';
  errorCorreo: string = '';

  constructor(private alertController: AlertController, private toastController: ToastController, private router: Router, private bd: ServiceBDService) { }

  ngOnInit() {}

  async verificarCorreo() {
    if (!this.correo || !this.isEmailValid(this.correo)) {
      this.errorCorreo = 'Por favor ingresa un correo válido.';
      return;
    }

    // Verificar si el correo está en la base de datos
    this.bd.getUsuarioPorCorreo(this.correo).then(usuario => {
      if (usuario) {
        this.router.navigate(['/cambiocontra'], { state: { correo: this.correo } });
      } else {
        this.presentToast('El correo no está registrado.');
      }
    });
  }

  // Validación simple de correo electrónico
  isEmailValid(email: string): boolean {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

}
  

