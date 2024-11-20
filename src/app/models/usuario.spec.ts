import { Usuario } from './usuario';


//Esta prueba esta diseñana para que verifique que se puedan asignar propiedades a la clase usuario, ya sea nombre, 
//telefono, correo, contrasena, id_rol, preguntaSeguridad y respuestaSeguridad, el tema de los roles tambien son importantes.
describe('Usuario', () => {
  it('Se deberian de asignar propiedades (rellenar campos) de manera valida, todos y cada uno', () => {
    const usuario = new Usuario();

    usuario.id_usuario = 2;
    usuario.nombre = 'Usuario Prueba Duoc';
    usuario.telefono = '123456789';
    usuario.correo = 'usuario.prueba.duoc@correo.com';
    usuario.contrasena = 'usuarioprueba123@';
    usuario.id_rol = 'usuario';
    usuario.preguntaSeguridad = 'Nombre de la primera mascota';
    usuario.respuestaSeguridad = 'Max';

    expect(usuario.id_usuario).toBe(2);
    expect(usuario.nombre).toBe('Usuario Prueba Duoc');
    expect(usuario.telefono).toBe('123456789');
    expect(usuario.correo).toBe('usuario.prueba.duoc@correo.com');
    expect(usuario.contrasena).toBe('usuarioprueba123@');
    expect(usuario.id_rol).toBe('usuario');
    expect(usuario.preguntaSeguridad).toBe('Nombre de la primera mascota');
    expect(usuario.respuestaSeguridad).toBe('Max');
  });
});
