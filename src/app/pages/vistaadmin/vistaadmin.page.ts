import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Juego } from 'src/app/models/juego';
import { ServiceBDService } from 'src/app/services/service-bd.service';

@Component({
  selector: 'app-vistaadmin',
  templateUrl: './vistaadmin.page.html',
  styleUrls: ['./vistaadmin.page.scss'],
})
export class VistaadminPage implements OnInit {
  
  rolUsuario: string | null = null;

arregloJuegos = [{
  id_producto: 0,
  nombre_producto:'',
  precio:0,
  foto_producto:'',
  stock: 0 // Agrega el campo stock aquí
}]

  constructor(private alertController: AlertController, private bd: ServiceBDService, private router: Router, private toastController: ToastController) {}

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

  comprar(juego: Juego) {
    console.log('Intentando comprar:', juego);
  
    // Crear el alerta de confirmación
    this.presentConfirmAlert(juego);
  }
  
  // Método para mostrar el alerta de confirmación
  async presentConfirmAlert(juego: Juego) {
    const alert = await this.alertController.create({
      header: 'Confirmar Compra',
      message: `¿Estás seguro de que deseas comprar "${juego.nombre_producto}" por $${juego.precio} ?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Compra cancelada');
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            if (juego.stock > 0) {
              const nuevoStock = juego.stock - 1;
              this.bd.actualizarStock(juego.id_producto, nuevoStock)
                .then(() => {
                  console.log(`Compra exitosa. Stock actualizado a ${nuevoStock}`);
                  this.bd.getJuego(); // Recargar datos desde la base de datos
  
                  // Mostrar el toast con el mensaje de éxito
                  this.presentToast(`¡Compra exitosa! Has comprado "${juego.nombre_producto}" en Digigames.`);
                })
                .catch(err => {
                  console.error('Error al realizar la compra:', err);
                });
            } else {
              console.log('Stock agotado:', juego);
            }
          }
        }
      ]
    });
  
    // Mostrar el alerta
    await alert.present();
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


async presentToast(message: string) {
  const toast = await this.toastController.create({
    message: message,
    duration: 2000, // Duración en milisegundos
    position: 'bottom', // Posición en la que aparecerá el toast
    color: 'success'
  });
  toast.present();
}

}



