import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/models/usuario';
import { ServiceBDService } from 'src/app/services/service-bd.service';

@Component({
  selector: 'app-perfiladmin',
  templateUrl: './perfiladmin.page.html',
  styleUrls: ['./perfiladmin.page.scss'],
})
export class PerfiladminPage implements OnInit {

  nombre: string = '';  
  correo: string = ''; 
  telefono: string = ''; 
  usuario: Usuario | null = null;

  constructor(
    public alertController: AlertController,
    private toastController: ToastController,
    private router: Router,
    private serviceBD: ServiceBDService
  ) {}

  ngOnInit() {
    this.cargarDatosUsuario(); 
  }

 
  cargarDatosUsuario() {
    const id_usuario = Number(localStorage.getItem('id_usuario'));
    

    if (id_usuario) {
      this.serviceBD.getUsuarioById(id_usuario).subscribe(
        (usuario: Usuario) => {
          this.usuario = usuario;
          this.correo = usuario.correo || '';
          this.telefono = usuario.telefono || '';
          this.nombre = usuario.nombre || '';  
        },
        (error) => {
          console.error('Error al cargar los datos del usuario:', error);
          this.presentToast('middle', 'Error al cargar los datos del usuario.');
        }
      );
    } else {
      console.error('No se encontró un ID de usuario en el localStorage.');
      this.presentToast('middle', 'No se encontró un ID de usuario.');
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
