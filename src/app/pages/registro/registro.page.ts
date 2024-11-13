import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceBDService } from 'src/app/services/service-bd.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  form!: FormGroup;
  id_rol: number = 2;



  constructor(private bd: ServiceBDService, private router: Router, private alertController: AlertController, private formbuilder: FormBuilder) {}

  ngOnInit() {

    this.form = this.formbuilder.group({
      nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [ Validators.maxLength(9), Validators.minLength(9)]],
      contrasena: ['', [
        Validators.required,
        Validators.minLength(8),
        this.passwordValidator
      ]],
      confirmar_contrasena: ['', [Validators.required]],
      preguntaSeguridad: ['', Validators.required],
      respuestaSeguridad: ['', Validators.required]
    });
  }

    
    passwordValidator(control: any) {
      const password = control.value;
      const hasLetter = /[a-zA-Z]/.test(password);
      const hasNumber = /[0-9]/.test(password);
      const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
      const valid = hasLetter && hasNumber && hasSymbol;
      return valid ? null : { invalidPassword: true };
    }

    isPreguntaSeguridadInvalid() {
      const control = this.form.get('preguntaSeguridad');
      return control?.touched && control.invalid;
    }
    
    isRespuestaSeguridadInvalid() {
      const control = this.form.get('respuestaSeguridad');
      return control?.touched && control.invalid;
    }

    crear() {
      if (this.form.valid) {
        const { nombre, correo, telefono, contrasena, preguntaSeguridad, respuestaSeguridad } = this.form.value;
        this.bd.insertarUsuario(nombre, correo, telefono, contrasena, this.id_rol, preguntaSeguridad, respuestaSeguridad);
        this.router.navigate(['/login']);
      }
    }

    isNombreInvalid() {
      const control = this.form.get('nombre');
      return control?.touched && control.invalid;
    }

    getNombreError() {
      const control = this.form.get('nombre');
      if (control?.hasError('required')) {
        return 'El nombre no puede estar vacío.';
      } else if (control?.hasError('pattern')) {
        return 'El nombre solo debe contener letras.';
      }
      return '';
    }

    isTelefonoInvalid() {
      const control = this.form.get('telefono');
      return control?.touched && control.invalid;
    }

    getTelefonoError() {
      const control = this.form.get('telefono');
      if (control?.hasError('required')) {
        return 'El teléfono no puede estar vacío.';
      }
      if (control?.hasError('minlength')) {
        return 'El teléfono debe tener 9 dígitos.';
      }
      if (control?.hasError('maxlength')) {
        return 'El teléfono no puede tener más de 9 dígitos.';
      }
      return '';
    }
  
    isEmailInvalid() {
      const control = this.form.get('correo');
      return control?.touched && control.invalid;
    }


    getEmailError() {
      const control = this.form.get('correo');
      if (control?.hasError('required')) {
        return 'El correo no puede estar vacío.';
      } else if (control?.hasError('email')) {
        return 'Correo inválido';
      }
      return '';
    }

    isPasswordInvalid() {
      const control = this.form.get('contrasena');
      return control?.touched && control.invalid;
    }

    getPasswordError() {
      const control = this.form.get('contrasena');
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
      const password = this.form.get('contrasena')?.value;
      const confirmPassword = this.form.get('confirmar_contrasena')?.value;
      return password && confirmPassword && password !== confirmPassword;
    }

    getConfirmPasswordError() {
      return 'Las contraseñas no coinciden.';
    }

  }




  
