import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ServiceBDService } from 'src/app/services/service-bd.service';

@Component({
  selector: 'app-vistaadmin',
  templateUrl: './vistaadmin.page.html',
  styleUrls: ['./vistaadmin.page.scss'],
})
export class VistaadminPage implements OnInit {
  
  rolUsuario: string | null = null;

arregloJuegos = [{
  nombre_producto:'',
  precio:0,
  foto_producto:''
}]

  constructor(private alertController: AlertController, private bd: ServiceBDService, private router: Router) {}

  ngOnInit() {


    this.rolUsuario = localStorage.getItem('id_rol');

    this.bd.dbState().subscribe(res=>{
      if(res){
        this.bd.fetchJuegos().subscribe(data=>{
          this.arregloJuegos = data;
        })
      }
    })
  }

  

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'DIGIGAMES DICE:',
      message: 'Sesión cerrada con éxito!',
      buttons: ['Vuelve Pronto'],
    });

    await alert.present();
  }

  editar(x:any){
    let navigationExtras: NavigationExtras = {
      state: {
        Productos: x
      }
    }
    this.router.navigate(['/editarjuego'], navigationExtras);
  }

  eliminar(x:any){
    this.bd.eliminarProducto(x.id_producto);
  }
}



