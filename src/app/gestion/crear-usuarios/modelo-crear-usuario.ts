import { password, required, email, prop } from '@rxweb/reactive-form-validators'

export class CreateUserModel  {

	@prop()
	@required({message: 'El campo nombres es requerido'})
	nombres: string = '';

	@prop()
	@required({message: 'El campo apellidos es requerido'})
	apellidos: string = '';

	@prop()
	@required({message: 'El campo telefono es requerido'})
	telefono: string = '';

	@prop()
	@required({message: 'El campo correo es requerido'})
	correo: string = '';

	@prop()
	@required({message: 'El campo usuario es requerido'})
	usuario: string = '';

	@prop()
	@required({message: 'El campo contraseña es requerido'})
	clave: string = '';

	@prop()
	@required({message: 'El campo documento es requerido'})
	documento: string = '';

	@prop()
	@required({message: 'El campo estado es requerido'})
	estado: number = 1;

	@prop()
	@required({message: 'El campo usuario creador es requerido'})
	usuario_creador: number;

	@prop()
	@required({message: 'El campo perfil es requerido'})
	fk_perfil: number = 2;

}
