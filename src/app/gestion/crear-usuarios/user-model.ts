import { password, required, email, prop } from '@rxweb/reactive-form-validators'

export class userModel  {


	@prop()
	@required({message: 'El campo nombres es requerido'})
    nombres: string = null;
    
    @prop()
	@required({message: 'El campo apellidos es requerido'})
    apellidos: string = null;

    @prop()
	@required({message: 'El campo documento es requerido'})
    documento: string = null;
    
    @prop()
	@required({message: 'El campo telefono es requerido'})
    telefono: string = null;
    
    @prop()
    @email({message: 'Este campo debe ser un correo valido'})
	@required({message: 'El correo es requerido'})
    correo: string = null;

    @prop()
	@required({message: 'El usuario es requerido'})
    usuario: string = null;

	@prop()
	@required({message: 'La clave es requerida'})
    clave: string = null;

}
