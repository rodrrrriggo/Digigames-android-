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

  // Variables para manejar los datos del perfil del usuario
  nombre: string = '';  
  correo: string = '';  
  contrasena: string = '';
  confirmarContrasena: string = '';
  usuario: Usuario | null = null;

  constructor(
    public alertController: AlertController,
    private toastController: ToastController,
    private router: Router,
    private serviceBD: ServiceBDService
  ) {}

  ngOnInit() {
    this.cargarDatosUsuario();  // Carga los datos del usuario cuando la página se inicializa
  }

  // Método para cargar los datos del usuario desde el servicio
  cargarDatosUsuario() {
    const id_usuario = Number(localStorage.getItem('id_usuario'));
    
    // Verificar si se obtiene el ID del usuario correctamente
    if (id_usuario) {
      this.serviceBD.getUsuarioById(id_usuario).subscribe(
        (usuario: Usuario) => {
          // Asignar los datos del usuario obtenidos desde la base de datos
          this.usuario = usuario;
          this.nombre = usuario.nombre || '';  // Asigna el nombre del usuario
          this.correo = usuario.correo || '';  // Asigna el correo del usuario
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

  // Método para manejar la actualización de los datos del perfil del usuario
  async ingresoUsuarios() {
    // Aquí puedes agregar la lógica para modificar el perfil del usuario
    // Validar y enviar los datos modificados al servicio para que actualice la información en la base de datos
    if (this.usuario) {
      // Lógica de actualización de datos
      console.log('Actualizar perfil:', this.nombre, this.correo);
    } else {
      console.error('No hay usuario cargado para modificar.');
    }
  }

  // Método para mostrar mensajes Toast
  async presentToast(position: 'middle', texto: string) {
    const toast = await this.toastController.create({
      position: position,
      message: texto,
      duration: 2000,
    });
    await toast.present();
  }
}