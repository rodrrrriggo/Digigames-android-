import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/models/usuario';
import { ServiceBDService } from 'src/app/services/service-bd.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {


  nombre: string = '';  
  correo: string = '';  
  contrasena: string = '';
  telefono: string = '';
  confirmarContrasena: string = '';
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
          this.nombre = usuario.nombre || '';  
          this.telefono = usuario.telefono || '';  
          this.correo = usuario.correo || ''; 
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


  async ingresoUsuarios() {


    if (this.usuario) {
 
      console.log('Actualizar perfil:', this.nombre, this.correo);
    } else {
      console.error('No hay usuario cargado para modificar.');
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