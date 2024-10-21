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

    this.editUserForm = this.formBuilder.group({
      contrasena: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(9)]],
      confirmar_contrasena: ['', [Validators.required]]
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
  

  onSubmit() {
    if (this.editUserForm.valid && !this.arePasswordsDifferent()) {
      const { contrasena } = this.editUserForm.value;
      this.serviceBD.editarUsuarioContra(this.currentUser.id_usuario, contrasena).then(() => {
        this.presentToast('Tu contraseña fue modificada con éxito, inicia sesión nuevamente.');
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
      duration: 5000,
      position: 'bottom', 
      color: color
    });
    await toast.present();
  }
}
