import { DataD } from './datoDepto';
export class Departamentos {
    constructor(status ='', mensaje = '', data= null) {
        this.status = status;
        this.mensaje = mensaje;
        this.data = data;
    }    
    status: String;
    mensaje: String;
    data: DataD;
}