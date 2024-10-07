import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { ServiceBDService } from 'src/app/services/service-bd.service';

@Component({
  selector: 'app-agregarjuego',
  templateUrl: './agregarjuego.page.html',
  styleUrls: ['./agregarjuego.page.scss'],
})
export class AgregarjuegoPage implements OnInit {

  nombre!: string 
  precio!: number;
  foto_producto!: string;
  selectedFile: File | null = null; // Archivo de imagen seleccionado
  previewUrl: any = null; // URL para la vista previa de la imagen

  constructor(public alertController: AlertController, private toastController: ToastController, private router: Router, private bd: ServiceBDService, private activedroute: ActivatedRoute) {}

  ngOnInit() {
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

  crear (){
    this.bd.insertarJuego(this.nombre, this.precio, this.foto_producto);
    this.router.navigate(['/vistaadmin'],)
  }  
}