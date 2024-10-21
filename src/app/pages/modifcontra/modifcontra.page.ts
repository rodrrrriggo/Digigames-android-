import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { ServiceBDService } from 'src/app/services/service-bd.service';

@Component({
  selector: 'app-modifcontra',
  templateUrl: './modifcontra.page.html',
  styleUrls: ['./modifcontra.page.scss'],
})
export class ModifcontraPage implements OnInit {

  correo: string = "";

  constructor(private alertController: AlertController, private toastController: ToastController, private router: Router, private serviceBD: ServiceBDService) { }

  ngOnInit() {
  }

  async modifcontrasena() {
    if (this.correo === "") {
      await this.presentToast('middle', 'El campo de correo no puede estar vacío.');
      return;
    }

    if (!this.correo.includes("@")) {
      await this.presentToast('middle', 'Por favor, ingresa un correo electrónico válido.');
      return;
    }

    // Buscar el usuario por correo
    const usuario = await this.serviceBD.getUsuarioByCorreo(this.correo);
    
    if (usuario) {
      // Guardar el ID del usuario en localStorage
      localStorage.setItem('id_usuario', usuario.id_usuario.toString());
      
      // Redirigir a la página de cambio de contraseña
      this.router.navigate(['/cambiocontra']);
    } else {
      await this.presentToast('middle', 'No se encontró un usuario con este correo.');
    }
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
