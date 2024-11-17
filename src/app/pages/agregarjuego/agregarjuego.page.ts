import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular'; // Importa ToastController para mostrar notificaciones tipo toast
import { ServiceBDService } from 'src/app/services/service-bd.service';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-agregarjuego',
  templateUrl: './agregarjuego.page.html',
  styleUrls: ['./agregarjuego.page.scss'],
})
export class AgregarjuegoPage implements OnInit {

  nombre!: string;
  precio!: number;
  foto_producto: any;
  stock!: number;

  constructor(
    private bd: ServiceBDService,
    private router: Router,
    private toastController: ToastController // Añade ToastController aquí
  ) {}

  ngOnInit() {}

  async crear() {
    // Verificar que todos los campos estén llenos
    if (!this.nombre || this.precio === null || this.precio === undefined || !this.foto_producto || this.stock === null || this.stock === undefined) {
      this.presentToast('Todos los campos deben estar completos.');
      return;
    }

    // Verificar que el precio no sea negativo
    if (this.precio < 0) {
      this.presentToast('El precio no puede ser negativo.');
      return;
    }

    // Si todas las validaciones pasan, insertar el juego
    this.bd.insertarJuego(this.nombre, this.precio, this.foto_producto, this.stock);
    this.router.navigate(['/vistaadmin']);
  }

  // Método para mostrar Toast
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000, // Duración en milisegundos
      position: 'middle', // Posición en la que aparecerá el toast
    });
    toast.present();
  }

  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri
    });

    this.foto_producto = image.webPath;
  };
}
