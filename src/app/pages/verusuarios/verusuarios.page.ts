import { Component, OnInit } from '@angular/core';
import { ServiceBDService } from 'src/app/services/service-bd.service';

@Component({
  selector: 'app-verusuarios',
  templateUrl: './verusuarios.page.html',
  styleUrls: ['./verusuarios.page.scss'],
})
export class VerusuariosPage implements OnInit {

  usuarios: any[] = [];

  constructor(private bd: ServiceBDService) { }

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.bd.obtenerTodosLosUsuarios().then(usuarios => {
      this.usuarios = usuarios;
    }).catch(error => {
      console.error('Error al cargar usuarios', error);
    });
  }
}
