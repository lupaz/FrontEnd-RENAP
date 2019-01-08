export class DatosMat {
    
    constructor(cuiHombre ='',nombreHombre='',apellidoHombre='',paisHombre='',departamentoHombre='',municipioHombre='',
    cuiMujer= '',nombreMujer='',apellidoMujer='',paisMujer='',departamentoMujer='',municipioMujer='',
    municipio = '',lugarMatrimonio = '',fechaMatrimonio='',regimenMatrimonial='') {
        this.cuiHombre=cuiHombre;
        this.nombreHombre=nombreHombre;
        this.apellidoHombre=apellidoHombre;
        this.paisHombre=paisHombre;
        this.departamentoHombre= departamentoHombre;
        this.municipioHombre= municipioHombre;

        this.cuiMujer = cuiMujer;
        this.nombreMujer= nombreMujer;
        this.apellidoMujer= apellidoMujer;
        this.paisMujer= paisMujer;
        this.departamentoMujer= departamentoMujer;
        this.municipioMujer= municipioMujer;

        this.municipio = municipio;
        this.lugarMatrimonio= lugarMatrimonio;
        this.fechaMatrimonio= fechaMatrimonio;
        this.regimenMatrimonial= regimenMatrimonial;
        }    
    //datos man
    cuiHombre: String;
    nombreHombre:String;
    apellidoHombre:String;
    paisHombre:String;
    departamentoHombre:String;
    municipioHombre:String;
    //datos woman
    cuiMujer: String;
    nombreMujer:String;
    apellidoMujer:String;
    paisMujer:String;
    departamentoMujer:String;
    municipioMujer:String;
    
    municipio: String;
    lugarMatrimonio: String;
    fechaMatrimonio: String;
    regimenMatrimonial : String;
}