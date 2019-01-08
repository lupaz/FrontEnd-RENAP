import { Datos } from './datos';

export class Nacimiento {
    constructor(status ='', mensaje = '', data = null) {
        this.status = status;
        this.mensaje = mensaje;
        this.data = data;
    }    
    status: String;
    mensaje: String;
    data: Datos;
}