import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/models/usuario';
import { ServiceBDService } from 'src/app/services/service-bd.service';

@Component({
  selector: 'app-modifdatos',
  templateUrl: './modifdatos.page.html',
  styleUrls: ['./modifdatos.page.scss'],
})
export class ModifdatosPage implements OnInit {

  editUserForm!: FormGroup;
  currentUser!: Usuario;

  constructor(
    private formBuilder: FormBuilder,
    private serviceBD: ServiceBDService,
    private alertController: AlertController,
    private toastController: ToastController,
    private navCtrl: NavController
  ) { }

  ngOnInit() {

    this.editUserForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.pattern('^[a-zA-Z\\s]*$')]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]+$')]], 
    });

  const userId = parseInt(localStorage.getItem('id_usuario') || '0', 10);

  if (userId > 0) {

    this.serviceBD.getUsuarioById(userId).subscribe((usuario) => {
      this.currentUser = usuario;
      this.editUserForm.patchValue({
        nombre: usuario.nombre,
        correo: usuario.correo,
        telefono: usuario.telefono,
      });
    });
  } else {
    console.error('ID de usuario no válido');
    this.navCtrl.navigateBack('/login'); 
  }
}

  isNombreInvalid() {
    return this.editUserForm.get('nombre')?.touched && this.editUserForm.get('nombre')?.invalid;
  }

  getNombreError() {
    const nombreErrors = this.editUserForm.get('nombre')?.errors;
    if (nombreErrors?.['required']) {
      return 'Campo vacio';
    } else if (nombreErrors?.['pattern']) {
      return 'El campo "Nombre" no puede contener numeros ni caracteres especiales.';
    }
    return '';
  }

  isCorreoInvalid() {
    return this.editUserForm.get('correo')?.touched && this.editUserForm.get('correo')?.invalid;
  }

  getCorreoError() {
    const correoErrors = this.editUserForm.get('correo')?.errors;
    if (correoErrors?.['required']) {
      return 'Campo Vacio';
    } else if (correoErrors?.['email']) {
      return 'Ingresa un correo electrónico válido.';
    }
    return '';
  }

  isTelefonoInvalid() {
    return this.editUserForm.get('telefono')?.touched && this.editUserForm.get('telefono')?.invalid;
  }

  getTelefonoError() {
    const telefonoErrors = this.editUserForm.get('telefono')?.errors;
    if (telefonoErrors?.['required']) {
      return 'Campo vacio';
    } else if (telefonoErrors?.['pattern']) {
      return 'Ingresa un número de teléfono válido.';
    }
    return '';
  }

  async onSubmit() {
    if (this.editUserForm.valid) {
      const { nombre, correo, telefono } = this.editUserForm.value;
      this.serviceBD.editarUsuario(this.currentUser.id_usuario, nombre, correo, telefono).then(() => {
        this.presentToast('Tus datos han sido actualizados correctamente.');
        this.navCtrl.navigateBack('/vistaadmin');
      }).catch((error) => {
        this.presentToast('Error', 'Hubo un problema al actualizar tus datos.');
      });
    }
  }

  async presentToast(mensaje: string, color: string = 'success') {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000, 
      position: 'bottom',
      color: color
    });
    await toast.present();
  }
}