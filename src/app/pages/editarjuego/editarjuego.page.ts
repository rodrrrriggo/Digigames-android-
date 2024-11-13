import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceBDService } from 'src/app/services/service-bd.service';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-editarjuego',
  templateUrl: './editarjuego.page.html',
  styleUrls: ['./editarjuego.page.scss'],
})
export class EditarjuegoPage implements OnInit {

  JuegoMod: any;
  foto_producto: any;

  constructor(private bd: ServiceBDService, private router: Router, private activerouter: ActivatedRoute) {
    this.activerouter.queryParams.subscribe(res => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.JuegoMod = this.router.getCurrentNavigation()?.extras?.state?.['Productos'];
        // Mantener la imagen existente si ya está definida
        this.foto_producto = this.JuegoMod?.foto_producto || 'ruta/imagen/por/defecto.png'; 
      }
    });
  }

  ngOnInit() {}

  // Validar el formulario
  isFormValid(): boolean {
    return this.JuegoMod.nombre_producto && this.JuegoMod.precio > 0;
  }

  // Función para editar el juego
  editar() {
    if (this.isFormValid()) {
      this.bd.editarProducto(
        this.JuegoMod.id_producto, 
        this.JuegoMod.nombre_producto, 
        this.JuegoMod.precio, 
        this.foto_producto
      );
      this.router.navigate(['/vistaadmin']);
    } else {
      console.log('Por favor completa todos los campos correctamente');
    }
  }

  // Función para seleccionar una imagen con la cámara
  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri
    });

    // Si se selecciona una nueva imagen, actualizar `foto_producto`
    if (image?.webPath) {
      this.foto_producto = image.webPath;
    }
  };
}
