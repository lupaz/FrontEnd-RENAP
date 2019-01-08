export class DatosDiv {
    
    constructor(cui_hombre ='',cui_mujer= '', registro_matrimonial = '', activo = '',
    departamento ='', municipio = '', lugar= '', fecha= '', regimen_economico= '') {
        this.cui_hombre=cui_hombre;
        this.cui_mujer = cui_mujer;
        this.lugar = lugar;
        this.fecha = fecha;
        this.departamento = departamento;
        this.municipio = municipio;
        this.regimen_economico= regimen_economico;
        this.activo=activo;
        this.registro_matrimonial=registro_matrimonial;
    }    
    cui_hombre: String;
    cui_mujer: String;
    regimen_economico : String;
    activo:String;
    registro_matrimonial:String;
    lugar: String;
    fecha: String;
    departamento: String;
    municipio: String;
}