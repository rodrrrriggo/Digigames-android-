import { Injectable } from '@angular/core';
import { SQLite,SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Juego } from '../models/juego';

@Injectable({
  providedIn: 'root'
})
export class ServiceBDService {


  //variable de conexión a la Base de Datos
  public database!: SQLiteObject;

  //TABLAS BD

  tablaRol: string = "CREATE TABLE IF NOT EXISTS rol(id_rol INTEGER PRIMARY KEY NOT NULL, nombre_rol VARCHAR(50))";

  tablaEstado: string = "CREATE TABLE IF NOT EXISTS estado(id_estado INTEGER PRIMARY KEY NOT NULL, nombre_estado VARCHAR(50))";

  tablaProductos: string = "CREATE TABLE IF NOT EXISTS productos(id_producto INTEGER PRIMARY KEY AUTOINCREMENT, foto_producto text, nombre_producto VARCHAR(50),precio INTEGER)";


  //TABLAS CON FOREIGN KEY

  tablaUsuarios: string = "CREATE TABLE IF NOT EXISTS usuarios(id_usuario INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(50), correo VARCHAR(50), telefono VARCHAR(50), contrasena VARCHAR(50), rol_id_rol INTEGER, FOREIGN KEY(rol_id_rol) REFERENCES rol(id_rol))";

  tablaVenta: string = "CREATE TABLE IF NOT EXISTS venta(id_venta INTEGER PRIMARY KEY AUTOINCREMENT, cantidad_venta INTEGER, total_venta INTEGER, usuarios_id_usuarios INTEGER, FOREIGN KEY(usuarios_id_usuarios) REFERENCES usuarios(id_usuario)), estado_id_estado INTEGER, FOREIGN KEY(estado_id_estado) REFERENCES estado(id_estado))";

  tablaDetalleVenta: string = "CREATE TABLE IF NOT EXISTS detalle_venta(id_detalle INTEGER PRIMARY KEY AUTOINCREMENT, cantidad INTEGER, subtotal INTEGER, venta_id_venta FOREIGN KEY(venta_id_venta) REFERENCES venta(id_venta), productos_id_producto INTEGER, FOREIGN KEY(productos_id_producto) REFERENCES producto(id_producto))";


  //INSERCION DE DATOS

  registroRol1: string = "INSERT OR IGNORE INTO rol(id_rol, nombre_rol) VALUES (1, 'Administrador')";

  registroRol2: string = "INSERT OR IGNORE INTO rol(id_rol, nombre_rol) VALUES (2, 'Usuario')";
  
  registroJuego: string = "INSERT OR IGNORE INTO productos(id_producto, foto_producto, nombre_producto, precio) VALUES (1, '../assets/img/eafc.jpg', 'EAFC 25', 59990)";


  //VARIABLE OBSERVABLE

  listaJuegos = new BehaviorSubject ([]);

  //VARIABLE OBSERVABLE PARA EL STATUS DE LA BD

  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqlite: SQLite, private platform: Platform, private alertController: AlertController) {
    this.crearBD()
   }

   crearBD(){
    //verificar si la plataforma está lista
    this.platform.ready().then(()=>{
      //crear la base de datos
      this.sqlite.create({
        name: 'bdjuegos.db',
        location: 'default'
      }).then((bd: SQLiteObject)=>{
        //guardar la conexion a la base de datos
        this.database = bd;
        //llamar a la creación de las tablas
        this.crearTablas();
        this.getJuego();
        //modificar el estado de la base de datos
        this.isDBReady.next(true);
      }).catch(e=>{
        this.presentAlert('CrearBD','Error: ' + JSON.stringify(e));
      })
    })
  }
  async crearTablas(){
    try{
      //ejecuto la creación de tablas en orden
      await this.database.executeSql(this.tablaProductos, []);

      //ejecuto los insert en caso que existan
      await this.database.executeSql(this.registroJuego, []);

    }catch(e){
      this.presentAlert('CrearTabla','Error: ' + JSON.stringify(e));
    }

  }

  async presentAlert(titulo:string, msj:string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }

  fetchJuegos(): Observable<Juego[]>{
    return this.listaJuegos.asObservable();
  }

  dbState(){
    return this.isDBReady.asObservable();
  }

  getJuego(){
    return this.database.executeSql('SELECT * FROM productos',[]).then(res=>{
      //variable para almacenar el resultado del select
      let items: Juego[] = [];
      //verificar si el select trae mas de 1 registro
      if(res.rows.length > 0){
        //recorremos el resultado de la consulta
        for(var i = 0; i < res.rows.length; i++){
          //ingresar registro a registro en mi variable
          items.push({
            id_producto: res.rows.item(i).id_producto,
            foto_producto: res.rows.item(i).foto_producto,
            nombre_producto: res.rows.item(i).nombre_producto,
            precio: res.rows.item(i).precio
          })

        }
      }
      this.listaJuegos.next(items as any);
    })
  }
  insertarJuego(nombre_producto: string, precio: number, foto_producto: string){
    return this.database.executeSql('INSERT INTO productos(foto_producto, nombre_producto, precio) VALUES (?,?,?)',[foto_producto, nombre_producto,precio]).then((res)=>{
      this.presentAlert("Agregar", "Juego agregado exitosamente!");
      this.getJuego();
    }).catch(e=>{
      this.presentAlert('Agregar','Error: ' + JSON.stringify(e));
    })
  }

  eliminarProducto(id_producto : string){
    return this.database.executeSql('DELETE FROM productos WHERE id_producto = ?', [id_producto]).then((res)=>{
      this.presentAlert("Eliminar","Producto eliminado de manera correcta");
      this.getJuego();
    }).catch(e=>{
      this.presentAlert('Eliminar', 'Error : ' +JSON.stringify(e));
    })
  }

  editarProducto(id_producto: string, nombre_producto: string,precio: number, foto_producto: string ){
    return this.database.executeSql('UPDATE Productos SET nombre_producto = ?, precio = ?, foto_producto = ? WHERE id_producto = ?',[nombre_producto,precio,foto_producto,id_producto]).then((res)=>{
      this.presentAlert("Modificar", "Juego modificado de manera correcta");
      this.getJuego();
    }).catch(e=>{
      this.presentAlert('Modificar','Error: ' + JSON.stringify(e));
    })
  }

}


