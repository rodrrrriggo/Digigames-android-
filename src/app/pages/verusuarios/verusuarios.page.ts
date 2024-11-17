import { Component, OnInit } from '@angular/core';
import { ServiceBDService } from 'src/app/services/service-bd.service';

@Component({
  selector: 'app-verusuarios',
  templateUrl: './verusuarios.page.html',
  styleUrls: ['./verusuarios.page.scss'],
})
export class VerusuariosPage implements OnInit {

  rolUsuario: string | null = null;

  usuarios: any[] = [];

  constructor(private bd: ServiceBDService) { }

  ngOnInit() {
    this.cargarUsuarios();

    this.rolUsuario = localStorage.getItem('id_rol');
  }

  cargarUsuarios() {
    this.bd.obtenerTodosLosUsuarios().then(usuarios => {
      this.usuarios = usuarios;
    }).catch(error => {
      console.error('Error al cargar usuarios', error);
    });
  }

  // Método para banear a un usuario
  banearUsuario(id_usuario: number) {
    this.bd.banearUsuario(id_usuario).then(() => {
      this.cargarUsuarios(); // Recargar la lista de usuarios
    }).catch(error => {
      console.error('Error al banear al usuario', error);
    });
  }

  // Método para desbanear a un usuario
  desbanearUsuario(id_usuario: number) {
    this.bd.desbanearUsuario(id_usuario).then(() => {
      this.cargarUsuarios(); // Recargar la lista de usuarios
    }).catch(error => {
      console.error('Error al desbanear al usuario', error);
    });
  }
}
