import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceBDService } from 'src/app/services/service-bd.service';

@Component({
  selector: 'app-editarjuego',
  templateUrl: './editarjuego.page.html',
  styleUrls: ['./editarjuego.page.scss'],
})
export class EditarjuegoPage implements OnInit {

JuegoMod: any;

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
    this.bd.editarProducto(this.JuegoMod.id_producto, this.JuegoMod.nombre_producto, this.JuegoMod.precio, this.JuegoMod.foto_producto);
    this.router.navigate(['/vistaadmin']);
  }
  
}
