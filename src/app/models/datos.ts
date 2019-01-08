

export class Datos {
    constructor(cui ='', nombre = '', apellido = '', genero='',
    fechaNacimiento='', pais = '',departamento ='',  municipio = '',lugarNacimiento='', 
    cuiPadre= '', nombrePadre ='',apellidoPadre='',fechaNacimientoPadre='',paisPadre='',departamentoPadre= '',municipioPadre= '', 
    cuiMadre= '', nombreMadre ='',apellidoMadre='',fechaNacimientoMadre='',paisMadre='',departamentoMadre= '',municipioMadre= '',) {
        this.cui = cui;
        this.nombre= nombre;
        this.apellido= apellido;
        this.genero = genero;
        this.fechaNacimiento = fechaNacimiento;
        this.pais=pais;        
        this.departamento = departamento;
        this.municipio = municipio;
        this.lugarNacimiento = lugarNacimiento;
        //datos padre
        this.cuiPadre=cuiPadre;
        this.nombrePadre=nombrePadre;
        this.apellidoPadre=apellidoPadre;
        this.fechaNacimientoPadre=fechaNacimientoPadre;
        this.paisPadre=paisPadre;
        this.departamentoPadre=departamentoPadre;
        this.municipioPadre= municipioPadre;
        //datos madre
        this.cuiMadre=cuiMadre;
        this.nombreMadre=nombreMadre;
        this.apellidoMadre=apellidoMadre;
        this.fechaNacimientoMadre=fechaNacimientoMadre;
        this.paisPadre=paisMadre;
        this.departamentoMadre=departamentoMadre;
        this.municipioMadre= municipioMadre;
    }    
    cui: String;
    nombre: String;
    apellido: String;
    genero: String;
    fechaNacimiento: String;    
    pais:String;
    departamento: String;
    municipio: String;
    lugarNacimiento: String;
    cuiPadre: String;
    nombrePadre:String;
    apellidoPadre:String;
    fechaNacimientoPadre:String;
    paisPadre:String;
    departamentoPadre:String;
    municipioPadre:String;
    cuiMadre: String;
    nombreMadre:String;
    apellidoMadre:String;
    fechaNacimientoMadre:String;
    paisMadre:String;
    departamentoMadre:String;
    municipioMadre:String; 
}
