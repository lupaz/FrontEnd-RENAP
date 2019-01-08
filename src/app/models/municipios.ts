import { DataM } from './datoMuni';
export class Municipios {
    constructor(status ='', mensaje = '', data= null) {
        this.status = status;
        this.mensaje = mensaje;
        this.data = data;
    }    
    status: String;
    mensaje: String;
    data: DataM;
}