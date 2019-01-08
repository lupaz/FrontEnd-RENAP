import { DatosDepto } from './datosDepto';

export class DataD {
    constructor(listaDepartamentos =null) {
        this.listaDepartamentos=listaDepartamentos;
    }    
    listaDepartamentos:DatosDepto;
}