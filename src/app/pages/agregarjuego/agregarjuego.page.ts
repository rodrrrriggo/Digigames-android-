import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { ServiceBDService } from 'src/app/services/service-bd.service';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-agregarjuego',
  templateUrl: './agregarjuego.page.html',
  styleUrls: ['./agregarjuego.page.scss'],
})
export class AgregarjuegoPage implements OnInit {

  nombre!: string 
  precio!: number;
  foto_producto: any;

  constructor(private bd: ServiceBDService, private router: Router, private activerouter: ActivatedRoute) {}

  ngOnInit() {
  }

  crear (){
    this.bd.insertarJuego(this.nombre, this.precio, this.foto_producto);
    this.router.navigate(['/vistaadmin'],)
  }  

  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri
    });

    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    this.foto_producto = image.webPath;


  };

}
