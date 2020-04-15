import { password, required, email, prop } from '@rxweb/reactive-form-validators'

export class LogInModel  {
	@prop()
	@required({message: 'El Usuario electronico es requerido'})
	usuario: string = '';

	@prop()
	@required({message: 'La clave es requerida'})
	clave: string = '';
}
