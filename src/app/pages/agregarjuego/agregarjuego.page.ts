import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-agregarjuego',
  templateUrl: './agregarjuego.page.html',
  styleUrls: ['./agregarjuego.page.scss'],
})
export class AgregarjuegoPage implements OnInit {

  nombre: string = "";
  precio: string = "";
  selectedFile: File | null = null; // Archivo de imagen seleccionado
  previewUrl: any = null; // URL para la vista previa de la imagen

  constructor(public alertController: AlertController, private toastController: ToastController, private router: Router) {}

  ngOnInit() {
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'DIGIGAMES DICE:',
      message: 'Juego agregado exitosamente!',
      buttons: ['Continuar'],
    });

    await alert.present();
  }


  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      // Vista previa de la imagen
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  async registrojuego () {
    if (this.nombre === "" || this.precio === "") {
      await this.presentToast('middle', 'Si quieres agregar un juego, debes completar todos los campos.');
      return;
    }

    const nombreValido = /^[a-zA-Z-0-9 ]+$/.test(this.nombre);
    if (!nombreValido) {
      await this.presentToast('middle', 'El nombre no cumple el formato');
      return;
    }

    await this.presentAlert();
    this.router.navigate(['/vistaadmin']);
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
