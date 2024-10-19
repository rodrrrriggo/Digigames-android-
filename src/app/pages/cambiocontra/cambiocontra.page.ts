import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/models/usuario';
import { ServiceBDService } from 'src/app/services/service-bd.service';

@Component({
  selector: 'app-cambiocontra',
  templateUrl: './cambiocontra.page.html',
  styleUrls: ['./cambiocontra.page.scss'],
})
export class CambiocontraPage implements OnInit {

  editUserForm!: FormGroup;
  currentUser!: Usuario;

  constructor(
    private formBuilder: FormBuilder,
    private serviceBD: ServiceBDService,
    private alertController: AlertController,
    private navCtrl: NavController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    // Crear el formulario con los validadores
    this.editUserForm = this.formBuilder.group({
      contrasena: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(9)]],
      confirmar_contrasena: ['', [Validators.required]]
    });
  
    // Obtener los datos del usuario y rellenar el formulario (si fuera necesario)
    this.serviceBD.getUsuarioById(3).subscribe((usuario) => {
      this.currentUser = usuario;
      this.editUserForm.patchValue({
        contrasena: '',  // No precargar la contraseña
        confirmar_contrasena: ''  // Campo para confirmar la contraseña
      });
    });
  }

  onSubmit() {
    if (this.editUserForm.valid && !this.arePasswordsDifferent()) {
      const { contrasena } = this.editUserForm.value;
      this.serviceBD.editarUsuarioContra(this.currentUser.id_usuario, contrasena).then(() => {
        this.presentToast('Tu contraseña fue modificada con éxito, inicia sesión nuevamente.'); // Mostrar Toast en lugar de alerta
        this.navCtrl.navigateBack('/login');
      }).catch((error) => {
        this.presentToast('Hubo un problema al actualizar tu contraseña.', 'danger');
      });
    }
  }

  isPasswordInvalid() {
    const control = this.editUserForm.get('contrasena');
    return control?.touched && control.invalid;
  }

  getPasswordError() {
    const control = this.editUserForm.get('contrasena');
    
    if (control?.hasError('required')) {
      return 'La contraseña no puede estar vacía.';
    } else if (control?.hasError('minlength')) {
      return 'La contraseña debe tener al menos 6 caracteres.';
    } else if (control?.hasError('maxlength')) {
      return 'La contraseña no puede tener más de 9 caracteres.';
    }
    
    return '';
  }

  arePasswordsDifferent() {
    const password = this.editUserForm.get('contrasena')?.value;
    const confirmPassword = this.editUserForm.get('confirmar_contrasena')?.value;
    return password && confirmPassword && password !== confirmPassword;
  }

  getConfirmPasswordError() {
    return 'Las contraseñas no coinciden.';
  }

  async presentToast(mensaje: string, color: string = 'success') {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 5000, // Duración del Toast (2 segundos)
      position: 'bottom', // Mostrar en la parte inferior
      color: color
    });
    await toast.present();
  }
}
