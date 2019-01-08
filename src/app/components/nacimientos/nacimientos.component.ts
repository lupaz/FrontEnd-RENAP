import { Component, OnInit } from '@angular/core';
import { NacimientoService } from '../../services/nacimiento.service';
import { NgForm, NgModel, NgControl } from '@angular/forms';
import { Datos } from '../../models/datos';
import { Nacimiento } from 'src/app/models/nacimiento';
import * as jsPDF from 'jspdf'
//para dptos y munis
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { Departamentos } from 'src/app/models/departamentos';
import { Municipios } from 'src/app/models/municipios';
import { delay } from 'q';
//fecha/hora
import {formatDate } from '@angular/common';

declare var M: any;

@Component({
  selector: 'app-nacimientos',
  templateUrl: './nacimientos.component.html',
  styleUrls: ['./nacimientos.component.css'],
  providers: [NacimientoService]
})

export class NacimientosComponent implements OnInit {
  preloader = false;
  modify: Boolean = false;

  //vars depto y muni
  departamentos: {};
  municipios: {};
  idPais:any;
  idDepartamento: any;
  idMunicicipio: any;

  generos: {};


  constructor(private autenticacionService: AutenticacionService, private nacimientoService: NacimientoService) {    
    this.idPais = localStorage.getItem('Pais');
    this.getDepartementos(this.idPais);
    this.idMunicicipio = localStorage.getItem('Muni');
    this.generos = [
      { id: 0, genero: "Mujer" },
      { id: 1, genero: "Hombre" }
    ];
   
    delay(0).then(() => {     
      this.cargarSelect3();        
    });
    

  }

  ngOnInit() {
    //this.nacimientoService.nacimiento = new Nacimiento();
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.nacimientoService.selectedNacimiento = new Nacimiento();
      this.nacimientoService.selectedNacimiento.data = new Datos();
    }
  }

  imprimeActa() {
    //console.log("Aca hizo algo");
    var doc = new jsPDF();
    //console.log(doc.getFontList());
    //configuracion letra
    doc.setFontSize(14);
    doc.setFont("times");
    doc.setFontStyle("bold");
    var now = new Date();
    var fecha ='';
    fecha = formatDate(now, 'dd/MM/yyyy hh:mm:ss a', 'en-US', '-0600');
    doc.text('Registo Nacional de las Personas', 105, 10,null,null,'center');
    doc.setFontSize(10);
    doc.text('República de Guatemala',105,15,null,null,'center');

    doc.setFontSize(12);
    doc.text('Registro Civil de las Personas',105,25,null,null,'center');
    doc.text('Certificado de Nacimineto',105,30,null,null,'center');
    //imagenes;
    var img = new Image();
    img.src = 'assets/renap.jpg';
    doc.addImage(img, 'JPG', 4, 2,45,15);
    
    var img = new Image();
    img.src = 'assets/logo2.png';
    doc.addImage(img, 'PNG', 10, 50, 195, 195);

    var img = new Image();
    img.src = 'assets/foto.png';
    doc.addImage(img, 'PNG', 10, 97,40, 40);

    var img = new Image();
    img.src = 'assets/foto.png';
    doc.addImage(img, 'PNG', 25, 145,40, 40);

    var img = new Image();
    img.src = 'assets/foto.png';
    doc.addImage(img, 'PNG', 145, 145,40, 40);
    
    doc.setFontStyle("normal");
    doc.text('El infrascrito Registrador Civil de las Personas del Registro Nacional de las Personas del',105,40,null,null,'center');
    doc.text('Municipio de '+this.nacimientoService.nacimiento.data.municipio+', Departamento de '+this.nacimientoService.nacimiento.data.departamento,105,45,null,null,'center');

    doc.text('CERTIFICA',105,55,null,null,'center');
    
    doc.text('Que con fecha inscrita en el acta de nacimiento del presente, en el registro civil del municipio de',105,60,null,null,'center');
    doc.text(this.nacimientoService.nacimiento.data.municipio+', Departamento de '+this.nacimientoService.nacimiento.data.departamento+
    ', quedo inscrito el nacimiento No. 13021995',105,65,null,null,'center');


    doc.setFontSize(18);
    doc.text('-'+this.nacimientoService.nacimiento.data.nombre+', '+this.nacimientoService.nacimiento.data.apellido,105,80,null,null,'center');
    doc.setLineWidth(1);
    doc.line(10, 82, 200, 82);
    doc.setFontSize(10);
    doc.text('Nombres y Apellidos del inscrito',105,86,null,null,'center');

    doc.setFont("times");
    doc.setFontStyle("bold");
    //-----data personales
    doc.text('Datos del inscrito:', 60, 95);
    //CUI
    doc.setLineWidth(0.5);
    doc.setFontStyle("normal");
    doc.setFontSize(10);
    doc.text(this.nacimientoService.nacimiento.data.cui, 60, 100);
    doc.line(60, 102, 200, 102);
    doc.setFontSize(9);
    doc.text('Código Único de Identificación CUI',60,105);
    //Fecha Nac
    doc.setFontSize(10);
    doc.text(this.nacimientoService.nacimiento.data.fechaNacimiento, 60, 111);
    doc.line(60, 113, 200, 113);
    doc.setFontSize(9);
    doc.text('Fecha de nacimiento',60,116);
    //Lugar Nac
    doc.setFontSize(10);
    doc.text(this.nacimientoService.nacimiento.data.lugarNacimiento+', '+this.nacimientoService.nacimiento.data.pais, 60, 122);
    doc.line(60, 124, 200, 124);
    doc.setFontSize(9);
    doc.text('Lugar de nacimiento',60,127);    
    //Genero
    doc.setFontSize(10);
    doc.text(this.nacimientoService.nacimiento.data.genero, 60, 133);
    doc.line(60, 135, 200, 135);
    doc.setFontSize(9);
    doc.text('Género',60,138);
    
    var valy=45;
    //----Datos Madre
    doc.setFont("times");
    doc.setFontStyle("bold");
    //data personales
    doc.text('Datos de la madre:', 10, 145+valy);
    //CUI
    doc.setLineWidth(0.5);
    doc.setFontStyle("normal");
    doc.setFontSize(10);
    doc.text(this.nacimientoService.nacimiento.data.cuiMadre, 10, 150+valy);
    doc.line(10, 152+valy,80, 152+valy);
    doc.setFontSize(9);
    doc.text('Código Único de Identificación CUI',10,155+valy);
    //Nombres y Aps
    doc.setFontSize(10);
    doc.text('-'+this.nacimientoService.nacimiento.data.nombreMadre+', '+this.nacimientoService.nacimiento.data.apellidoMadre,10, 160+valy);
    doc.line(10, 162+valy, 80, 162+valy);
    doc.setFontSize(9);
    doc.text('Nombres y apellidos de la madre',10,165+valy);
    //Fecha Nac
    doc.setFontSize(10);
    doc.text(this.nacimientoService.nacimiento.data.fechaNacimientoMadre,10, 170+valy);
    doc.line(10, 172+valy, 80, 172+valy);
    doc.setFontSize(9);
    doc.text('Fecha de nacimiento',10,175+valy);
    //Lugar Nac
    doc.setFontSize(10);
    doc.text(this.nacimientoService.nacimiento.data.paisMadre+', '+this.nacimientoService.nacimiento.data.departamentoMadre+', '+this.nacimientoService.nacimiento.data.municipioMadre, 10, 180+valy);
    doc.line(10, 182+valy, 80, 182+valy);
    doc.setFontSize(9);
    doc.text('Lugar de nacimiento',10,185+valy);
    
    //----Datos Padre
    doc.setFont("times");
    doc.setFontStyle("bold");
    //data personales
    doc.text('Datos del padre:', 120, 145+valy);
    //CUI
    doc.setLineWidth(0.5);
    doc.setFontStyle("normal");
    doc.setFontSize(10);
    doc.text(this.nacimientoService.nacimiento.data.cuiPadre, 130, 150+valy);
    doc.line(130, 152+valy,200, 152+valy);
    doc.setFontSize(9);
    doc.text('Código Único de Identificación CUI',130,155+valy);
    //Nombres y Aps
    doc.setFontSize(10);
    doc.text('-'+this.nacimientoService.nacimiento.data.nombrePadre+', '+this.nacimientoService.nacimiento.data.apellidoPadre,130, 160+valy);
    doc.line(130, 162+valy, 200, 162+valy);
    doc.setFontSize(9);
    doc.text('Nombres y apellidos del padre',130,165+valy);
    //Fecha Nac
    doc.setFontSize(10);
    doc.text(this.nacimientoService.nacimiento.data.fechaNacimientoPadre,130, 170+valy);
    doc.line(130, 172+valy, 200, 172+valy);
    doc.setFontSize(9);
    doc.text('Fecha de nacimiento',130,175+valy);
    //Lugar Nac
    doc.setFontSize(10);
    doc.text(this.nacimientoService.nacimiento.data.paisPadre+', '+this.nacimientoService.nacimiento.data.departamentoPadre+', '+this.nacimientoService.nacimiento.data.municipioPadre, 130, 180+valy);
    doc.line(130, 182+valy, 200, 182+valy);
    doc.setFontSize(9);
    doc.text('Lugar de nacimiento',130,185+valy);
  
    doc.setLineWidth(0.5);
    doc.line(10,200+valy,200,200+valy);
    doc.text('ÚLTIMA LÍNEA',105,205+valy,null,null,'center');

    doc.text('Acta de Nacimiento Ref: 1824200', 10, 285);
    doc.text(10, 290, "Fecha de Generación:");
    doc.text(fecha, 160, 290);
    doc.save("Acta_Nac" + this.nacimientoService.nacimiento.data.cui + ".pdf");//*/
  }

  searchNacimiento(value: String) {
    if (value) {
      this.preloader = true;
      var json = '{"cui":"' + value + '"}';
      this.nacimientoService.imprimirNacimiento(json)
        .subscribe((res:any) => {
          this.nacimientoService.nacimiento = res as Nacimiento;
          //console.log(this.nacimientoService.nacimiento.datos.cui);
          this.preloader = false;
        },
        (error:any)=>{
          M.toast({ html: 'ERROR: '+error.error.mensaje, displayLength: '5000' });
          this.preloader = false;
        }
        );
    }
  }

  addActaNacimiento(form: NgForm) {
    //console.log(form.value);  
    form.value.municipio=this.idMunicicipio;
    form.value.fechaNacimiento=this.convertirFecha(form.value.fechaNacimiento);      
    var status="0";
    //
    this.nacimientoService.registrarNacimiento(form.value)
      .subscribe((res: any) => {
        this.resetForm(form);
        //console.log(res);        
        status = res.status;
        if( status === "1"){        
          M.toast({ html: 'Acta de nacimiento creada, CUI: ' + res.data.cui, displayLength: '8000' });
        }
        else{
          M.toast({ html: 'ERROR: ' + res.mensage, displayLength: '5000' });
        }        
      },(error:any)=>{
        M.toast({ html: 'ERROR: '+error.error.mensaje, displayLength: '5000' }); 
      }
      );
      //*/    
  }

  //metodos depto y muni

  getDepartementos(idPais) {
    var json = '{"idPais": "'+idPais+'"}';
    this.autenticacionService.getDeptos(json)
      .subscribe(res => {
        this.autenticacionService.departamentos = res as Departamentos;
        //this.departamentos={};
        this.departamentos = this.autenticacionService.departamentos.data.listaDepartamentos;
        console.log(this.departamentos);
      });

    delay(500).then(() => {
      this.cargarSelect1();
    });

  }

  getMunicipios(idDepto) {
    var json = '{"idDepartamento": "' + idDepto + '"}';
    this.autenticacionService.getMunicipios(json)
      .subscribe(res => {
        //this.autenticacionService.municipios= new Municipios();       
        this.autenticacionService.municipios = res as Municipios;
        this.municipios = this.autenticacionService.municipios.data.listaMunicipios;
        //console.log(this.municipios);
      });

    delay(500).then(() => {
      this.cargarSelect2();
    });
  }

  cargarSelect1() {
    var elem = document.getElementById('select');
    var instance = M.FormSelect.init(elem);
    //var elems = document.querySelectorAll('select');
    //var instances = M.FormSelect.init(elems, this.departamentos);
  }

  cargarSelect2() {
    var elem = document.getElementById('select2');
    var instance = M.FormSelect.init(elem, {});
  }

  cargarSelect3() {
    var elem = document.getElementById('selectGen');
    var instance = M.FormSelect.init(elem);
  }

  deptoSelected(deptoSelected) {
    //console.log("Selecciono un depto No. "+deptoSelected);
    this.idDepartamento = deptoSelected;
    this.getMunicipios(deptoSelected);
  }

  muniSelected(muniSelected) {
    //console.log("Selecciono un municipio id -> "+muniSelected);
    this.idMunicicipio = muniSelected;
  }

  convertirFecha(fecha:string){
    var newFecha =fecha.split("-");
    var format=newFecha[2]+'/'+newFecha[1]+'/'+newFecha[0];
    return format;
  }
}
