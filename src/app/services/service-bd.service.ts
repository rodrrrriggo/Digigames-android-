import { Injectable } from '@angular/core';
import { SQLite,SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Juego } from '../models/juego';
import { Usuario } from '../models/usuario';
import { Users } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class ServiceBDService {


  //variable de conexión a la Base de Datos
  public database!: SQLiteObject;

  //TABLAS BD

  tablaRol: string = "CREATE TABLE IF NOT EXISTS rol(id_rol INTEGER PRIMARY KEY NOT NULL, nombre_rol VARCHAR(50))";

  tablaEstado: string = "CREATE TABLE IF NOT EXISTS estado(id_estado INTEGER PRIMARY KEY NOT NULL, nombre_estado VARCHAR(50))";

  tablaProductos: string = "CREATE TABLE IF NOT EXISTS productos(id_producto INTEGER PRIMARY KEY AUTOINCREMENT, foto_producto Blob, nombre_producto VARCHAR(50),precio INTEGER)";


  //TABLAS CON FOREIGN KEY

  tablaUsuarios: string = "CREATE TABLE IF NOT EXISTS usuarios(id_usuario INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(50) NOT NULL , correo VARCHAR(50) NOT NULL UNIQUE, telefono VARCHAR(50) NOT NULL, contrasena VARCHAR(50) NOT NULL, id_rol INTEGER, FOREIGN KEY (id_rol) REFERENCES rol(id_rol))";

  tablaVenta: string = "CREATE TABLE IF NOT EXISTS venta(id_venta INTEGER PRIMARY KEY AUTOINCREMENT, cantidad_venta INTEGER, total_venta INTEGER, usuarios_id_usuarios INTEGER, FOREIGN KEY(usuarios_id_usuarios) REFERENCES usuarios(id_usuario)), estado_id_estado INTEGER, FOREIGN KEY(estado_id_estado) REFERENCES estado(id_estado))";

  tablaDetalleVenta: string = "CREATE TABLE IF NOT EXISTS detalle_venta(id_detalle INTEGER PRIMARY KEY AUTOINCREMENT, cantidad INTEGER, subtotal INTEGER, venta_id_venta FOREIGN KEY(venta_id_venta) REFERENCES venta(id_venta), productos_id_producto INTEGER, FOREIGN KEY(productos_id_producto) REFERENCES producto(id_producto))";


  //INSERCION DE DATOS

  registroRolA: string = "INSERT OR IGNORE INTO rol(id_rol, nombre_rol) VALUES (1, 'Administrador')";

  registroRolU: string = "INSERT OR IGNORE INTO rol(id_rol, nombre_rol) VALUES (2, 'Usuario')";
  
  registroJuego: string = "INSERT OR IGNORE INTO productos(id_producto, foto_producto, nombre_producto, precio) VALUES (1, '../assets/img/eafc.jpg', 'EAFC 25', 59990)";


  registroAdmin: string = "INSERT or IGNORE INTO usuarios(id_usuario, nombre, correo, telefono, contrasena, id_rol) VALUES (1, 'RodrigoAdminDG', 'rod.guzmang@digigames.cl', '12345678', 'Ola12345@', 1)";

  registroAdmin2: string = "INSERT or IGNORE INTO usuarios(id_usuario, nombre, correo, telefono, contrasena, id_rol) VALUES (2, 'IgnacioAdminDG', 'igna.gonzalezg@digigames.cl', '12345678', 'Ola12345@', 1)";


  //VARIABLE OBSERVABLE

  listaJuegos = new BehaviorSubject ([]);

  //VARIABLE OBSERVABLE PARA EL STATUS DE LA BD

  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private usuarioBD = new BehaviorSubject<Users | null>(null);

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

      //usuarios
      await this.database.executeSql(this.tablaRol, []);
      await this.database.executeSql(this.tablaUsuarios, []);

      //usuarios2
      await this.database.executeSql(this.registroRolA, []);
      await this.database.executeSql(this.registroRolU, []);

      await this.database.executeSql(this.registroAdmin, []);
      await this.database.executeSql(this.registroAdmin2, []);

      //productos
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

  getUsuario(correo: string, contrasena: string) {
    return this.database.executeSql('SELECT * FROM usuarios WHERE correo = ? AND contrasena = ?', [correo, contrasena]).then(res => {
      let items: Usuario[] = [];

      if (res.rows.length > 0) {
        for (let i = 0; i < res.rows.length; i++) {
          items.push({
            id_usuario: res.rows.item(i).id_usuario,
            nombre: res.rows.item(i).nombre,
            telefono: res.rows.item(i).telefono,
            correo: res.rows.item(i).correo,
            contrasena: res.rows.item(i).contrasena,
            id_rol: res.rows.item(i).id_rol
          });
        }
      }
      return items.length > 0 ? items[0] : null;
    }).catch(e => {
      console.error('Error al obtener el usuario:', e);
      return null;
    });
  }

  getUsuarioById(id_usuario: number): Observable<Usuario> {
    return new Observable((observer) => {
      this.database.executeSql('SELECT * FROM usuarios WHERE id_usuario = ?', [id_usuario])
        .then((res) => {
          if (res.rows.length > 0) {
            let usuario: Usuario = {
              id_usuario: res.rows.item(0).id_usuario,
              nombre: res.rows.item(0).nombre,
              correo: res.rows.item(0).correo,
              telefono: res.rows.item(0).telefono,
              contrasena: res.rows.item(0).contrasena,
              id_rol: res.rows.item(0).id_rol
            };
            observer.next(usuario);
            observer.complete();
          } else {
            observer.error('No se encontró el usuario');
          }
        })
        .catch((e) => {
          observer.error('Error al obtener el usuario: ' + JSON.stringify(e));
        });
    });
  }

  getUsuarioPerfil(id_usuario: number): Promise<void> {
    return this.database.executeSql('SELECT * FROM usuarios WHERE id_usuario = ?;', [id_usuario])
      .then(res => {
        if (res.rows.length > 0) {
          const users: Users = new Users(
            res.rows.item(0).id_usuario,
            res.rows.item(0).nombre,
            res.rows.item(0).telefono,    // Asegúrate de que este campo exista en tu tabla 'usuarios'
            res.rows.item(0).correo,
            res.rows.item(0).contrasena,  // Asegúrate de que este campo exista si lo necesitas
            res.rows.item(0).id_rol
          );
          this.usuarioBD.next(users);  // Actualiza el observable con los datos del usuario
        }
      })
      .catch(err => {
        console.error('Error al obtener el perfil del usuario', err);
      });
  }

  obtenerTodosLosUsuarios() {
    const query = `SELECT * FROM usuarios`;
    return this.database.executeSql(query, []).then(res => {
      const usuarios = [];
      for (let i = 0; i < res.rows.length; i++) {
        usuarios.push(res.rows.item(i));
      }
      return usuarios;
    });
  }


  fetchUsuario(): Observable<Users| null>{
    return this.usuarioBD.asObservable();

  }


  insertarJuego(nombre_producto: string, precio: number, foto_producto: Blob){
    return this.database.executeSql('INSERT INTO Productos(foto_producto, nombre_producto, precio) VALUES (?,?,?)',[foto_producto,nombre_producto,precio,]).then((res)=>{
      this.presentAlert("Agregar", "Juego agregado exitosamente al catalogo!");
      this.getJuego();
    }).catch(e=>{
      this.presentAlert('Agregar','Error: ' + JSON.stringify(e));
    })
  }

  eliminarProducto(id_producto : string){
    return this.database.executeSql('DELETE FROM productos WHERE id_producto = ?', [id_producto]).then((res)=>{
      this.presentAlert("Eliminar","Juego eliminado correctamente del catalogo!");
      this.getJuego();
    }).catch(e=>{
      this.presentAlert('Eliminar', 'Error : ' +JSON.stringify(e));
    })
  }

  editarProducto(id_producto: string, nombre_producto: string,precio: number, foto_producto: Blob ){
    return this.database.executeSql('UPDATE Productos SET nombre_producto = ?, precio = ?, foto_producto = ? WHERE id_producto = ?',[nombre_producto,precio,foto_producto,id_producto]).then((res)=>{
      this.presentAlert("Modificar", "Juego modificado de manera correcta!");
      this.getJuego();
    }).catch(e=>{
      this.presentAlert('Modificar','Error: ' + JSON.stringify(e));
    })
  }

  insertarUsuario(nombre: string, correo: string, telefono: string, contrasena: string, id_rol: number){
    return this.database.executeSql('INSERT INTO usuarios (nombre, correo, telefono, contrasena, id_rol) VALUES (?, ?, ?, ?, ?);',[nombre,correo,telefono,contrasena,id_rol]).then((res)=>{
      this.presentAlert("Agregar", "Usuario agregado exitosamente!");
    }).catch(e=>{
      this.presentAlert('agregar','Error: ' + JSON.stringify(e));
    })
    
  }

  editarUsuario(id_usuario: number, nombre: string, correo: string, telefono: string) {
    const query = `UPDATE usuarios SET nombre = ?, correo = ?, telefono = ? WHERE id_usuario = ?`;
    return this.database.executeSql(query, [nombre, correo, telefono, id_usuario]).then(() => {
    }).catch(e => {
      this.presentAlert('Error', 'Error al modificar los datos del usuario: ' + JSON.stringify(e));
    });
  }

  editarUsuarioContra(id_usuario: number, contrasena: string) {
    const query = `UPDATE usuarios SET contrasena = ? WHERE id_usuario = ?`;
    return this.database.executeSql(query, [contrasena, id_usuario])
      .then(() => {
        // Mensaje opcional
      })
      .catch(e => {
        this.presentAlert('Error', 'Error al modificar la contraseña del usuario: ' + JSON.stringify(e));
      });
  }


}


