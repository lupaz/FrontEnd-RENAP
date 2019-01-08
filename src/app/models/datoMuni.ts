import { DatosMuni } from './datosMuni';

export class DataM {
    constructor(listaMunicipios = null) {
        this.listaMunicipios=listaMunicipios;
    }    
    listaMunicipios:DatosMuni;
}