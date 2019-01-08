import { DatosDef } from './datosDef';


export class Defuncion {
    constructor(status ='', mensaje = '', data = null) {
        this.status = status;
        this.mensaje = mensaje;
        this.data = data;
    }    
    status: String;
    mensaje: String;
    data: DatosDef;
}