import { DatosDiv } from './datosDiv';
export class Divorcio {
    constructor(status ='', mensaje = '', data = null) {
        this.status = status;
        this.mensaje = mensaje;
        this.data = data;
    }    
    status: String;
    mensaje: String;
    data: DatosDiv;
}