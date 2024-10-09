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
    

    this.activerouter.queryParams.subscribe(res=>{
      if(this.router.getCurrentNavigation()?.extras.state){
        this.JuegoMod = this.router.getCurrentNavigation()?.extras?.state?.['Productos'];
      }
    })


  }

  ngOnInit() {
  }


  editar(){
    this.bd.editarProducto(this.JuegoMod.id_producto, this.JuegoMod.nombre_producto, this.JuegoMod.precio, this.foto_producto);
    this.router.navigate(['/vistaadmin']);
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
