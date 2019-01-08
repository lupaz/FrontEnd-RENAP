import { DatosMat } from './datosMat';
export class Matrimonio {
    constructor(status ='', mensaje = '', data= null) {
        this.status = status;
        this.mensaje = mensaje;
        this.data = data;
    }    
    status: String;
    mensaje: String;
    data: DatosMat;
}