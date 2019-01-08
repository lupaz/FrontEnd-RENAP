export class DatosDef {
    constructor(cui ='', nombre='',apellido='',genero='',fechaNacimiento='',pais='',departamento='',municipio='',
    lugarNacimiento='',estadoCivil='',nombreConyuge='',apellidoConyuge='',
    cuiCompareciente= '',nombreCompareciente='',apellidoCompareciente='',paisCompareciente='',departamentoCompareciente='',municipioCompareciente='',recidenciaCompareciente='',
    paisDefuncion='', departamentoDefuncion ='',lugarDefuncion='', fechaDefuncion= '',causa='') {
        
        this.cui = cui;
        this.nombre=nombre;
        this.apellido=apellido;
        this.genero = genero;
        this.fechaNacimiento = fechaNacimiento;
        this.pais=pais;
        this.departamento = departamento;
        this.municipio = municipio;
        this.lugarNacimiento=lugarNacimiento;
        this.estadoCivil= estadoCivil;
        this.nombreConyuge= nombreConyuge;
        this.apellidoConyuge= apellidoConyuge;


        this.cuiCompareciente = cuiCompareciente;
        this.nombreCompareciente = nombreCompareciente;
        this.apellidoCompareciente = apellidoCompareciente;
        this.paisCompareciente = paisCompareciente;
        this.departamentoCompareciente = departamentoCompareciente;
        this.municipioCompareciente= municipioCompareciente;
        this.recidenciaCompareciente= recidenciaCompareciente;
        this.paisDefuncion= paisDefuncion;
        this.departamentoDefuncion=departamentoDefuncion;
        this.lugarDefuncion=lugarDefuncion;
        this.fechaDefuncion= fechaDefuncion;
        this.causa= causa;
    } 

    cui: String;
    nombre:String;
    apellido:String;
    genero:String;
    fechaNacimiento:String;
    pais:String;
    departamento:String;
    municipio:String;
    lugarNacimiento:String;
    estadoCivil:String;
    nombreConyuge:String;
    apellidoConyuge:String;
    //datos compa
    cuiCompareciente: String;
    nombreCompareciente:String;
    apellidoCompareciente:String;
    paisCompareciente:String;
    departamentoCompareciente:String;
    municipioCompareciente:String;
    recidenciaCompareciente:String;
    paisDefuncion:String;
    departamentoDefuncion:String;
    lugarDefuncion:String;
    fechaDefuncion:String;
    causa:String;
}