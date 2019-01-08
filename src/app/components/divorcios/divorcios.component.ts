import { Component, OnInit } from '@angular/core';
import { DivorcioService } from '../../services/divorcio.service';
import { NgForm, NgModel, NgControl } from '@angular/forms';
import { Divorcio } from 'src/app/models/divorcio';
import { DatosMat } from 'src/app/models/datosMat';
import * as jsPDF from 'jspdf'

//para dptos y munis
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { Departamentos } from 'src/app/models/departamentos';
import { Municipios } from 'src/app/models/municipios';
import { delay } from 'q';
//fecha/hora
import { formatDate } from '@angular/common';
import { DatosDiv } from 'src/app/models/datosDiv';

declare var M: any;

@Component({
  selector: 'app-divorcios',
  templateUrl: './divorcios.component.html',
  styleUrls: ['./divorcios.component.css'],
  providers: [DivorcioService]
})
export class DivorciosComponent implements OnInit {

  preloader = false;
  modify: Boolean = false;
  //vars
  cui_Hombre: any;
  cui_Mujer: any;

  departamentos: {};
  municipios: {};
  idPais: any;
  idDepartamento: any;
  idMunicicipio: any;

  constructor(private autenticacionService: AutenticacionService, private divorcioService: DivorcioService) {
    this.idPais = localStorage.getItem('Pais');
    this.getDepartementos(this.idPais);
    this.idMunicicipio = localStorage.getItem('Muni');

  }

  ngOnInit() {

  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.divorcioService.selectedDivorcio = new Divorcio();
      this.divorcioService.selectedDivorcio.data = new DatosDiv();
      this.idPais = localStorage.getItem('Pais');
    }
  }

  imprimeActa() {
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
    doc.text('Certificado de Divorcio',105,30,null,null,'center');
    //imagenes;
    var img = new Image();
    img.src = 'assets/renap.jpg';
    doc.addImage(img, 'JPG', 4, 2,45,15);
    
    var img = new Image();
    img.src = 'assets/logo2.png';
    doc.addImage(img, 'PNG', 10, 50, 195, 195);

    var img = new Image();
    img.src = 'assets/foto.png';
    doc.addImage(img, 'PNG', 10, 75,40, 40);

    var img = new Image();
    img.src = 'assets/foto.png';
    doc.addImage(img, 'PNG', 10, 125,40, 40);

    
    doc.setFontStyle("normal");
    doc.text('El infrascrito Registrador Civil de las Personas del Registro Nacional de las Personas del',105,40,null,null,'center');
    doc.text('Municipio de '+this.divorcioService.divorcio.data.municipio+', Departamento de Guatemala',105,45,null,null,'center');

    doc.text('CERTIFICA',105,55,null,null,'center');
    
    doc.text('Que con fecha inscrita en el acta de divorcio de los presentes, en el registro civil del municipio de',105,60,null,null,'center');
    doc.text(this.divorcioService.divorcio.data.municipio+', Departamento de Guatemala'+
    ', quedo inscrito el divorcio No. 13021995',105,65,null,null,'center');

    doc.setFontSize(12);
    doc.setFont("times");
    doc.setFontStyle("bold");
    //-----datos Hombre
    doc.text('Datos del Hombre:', 60, 75);
    //CUI
    doc.setLineWidth(0.5);
    doc.setFontStyle("normal");
    doc.setFontSize(10);
    doc.text(this.divorcioService.divorcio.data.cuiHombre, 60, 80);
    doc.line(60, 82, 200, 82);
    doc.setFontSize(9);
    doc.text('Código Único de Identificación CUI',60,85);
    //Nombres y apellidos
    doc.setFontSize(10);
    doc.text(this.divorcioService.divorcio.data.nombreHombre+' '+this.divorcioService.divorcio.data.apellidoHombre, 60, 90);
    doc.line(60, 92, 200, 92);
    doc.setFontSize(9);
    doc.text('Nombres y apellidos del hombre',60,95);
    //Lugar Nac
    doc.setFontSize(10);
    doc.text(this.divorcioService.divorcio.data.paisHombre+', '+this.divorcioService.divorcio.data.departamentoHombre+', '+this.divorcioService.divorcio.data.municipioHombre, 60, 100);
    doc.line(60, 102, 200, 102);
    doc.setFontSize(9);
    doc.text('Pais, Departamento, Municipio de nacimiento',60,105);    
    //Ocupacion
    doc.setFontSize(10);
    doc.text('Desconocida', 60, 110);
    doc.line(60, 112, 200, 112);
    doc.setFontSize(9);
    doc.text('Ocupación',60,115);
    
    //-----datos Mujer
    doc.setFontSize(12);
    doc.setFont("times");
    doc.setFontStyle("bold");
    doc.text('Datos de la Mujer:', 60, 125);
    //CUI
    doc.setLineWidth(0.5);
    doc.setFontStyle("normal");
    doc.setFontSize(10);
    doc.text(this.divorcioService.divorcio.data.cuiMujer, 60, 130);
    doc.line(60, 132, 200, 132);
    doc.setFontSize(9);
    doc.text('Código Único de Identificación CUI',60,135);
    //Nombres y apellidos
    doc.setFontSize(10);
    doc.text(this.divorcioService.divorcio.data.nombreMujer+' '+this.divorcioService.divorcio.data.apellidoMujer, 60, 140);
    doc.line(60, 142, 200, 142);
    doc.setFontSize(9);
    doc.text('Nombres y apellidos del hombre',60,145);
    //Lugar Nac
    doc.setFontSize(10);
    doc.text(this.divorcioService.divorcio.data.paisMujer+', '+this.divorcioService.divorcio.data.departamentoMujer+', '+this.divorcioService.divorcio.data.municipioMujer, 60, 150);
    doc.line(60, 152, 200, 152);
    doc.setFontSize(9);
    doc.text('Pais, Departamento, Municipio de nacimiento',60,155);    
    //Ocupacion
    doc.setFontSize(10);
    doc.text('Desconocida', 60, 160);
    doc.line(60, 162, 200, 162);
    doc.setFontSize(9);
    doc.text('Ocupación',60,165);

    //-----datos divorcio
    doc.setFontSize(12);
    doc.setFont("times");
    doc.setFontStyle("bold");
    doc.text('Datos del divorcio:', 60, 175);
    //lugar del divorcio
    doc.setLineWidth(0.5);
    doc.setFontStyle("normal");
    doc.setFontSize(10);
    doc.text(this.divorcioService.divorcio.data.lugarDivorcio, 60, 180);
    doc.line(60, 182, 200, 182);
    doc.setFontSize(9);
    doc.text('Lugar del divorcio',60,185);
    //fecha del divorcio
    doc.setFontSize(10);
    doc.text(this.divorcioService.divorcio.data.fechaDivorcio, 60, 190);
    doc.line(60, 192, 200, 192);
    doc.setFontSize(9);
    doc.text('Fecha del divorcio',60,195);
    //regimen economico
    doc.setFontSize(10);
    doc.text(this.divorcioService.divorcio.data.regimenMatrimonial, 60, 200);
    doc.line(60, 202, 200, 202);
    doc.setFontSize(9);
    doc.text('Régimen Económico',60,205);    

    
    
    doc.setFontSize(12);
    doc.setFont("times");
    doc.setFontStyle("bold");
    doc.text('Observación:', 10, 215);
    doc.setFontStyle("normal");
    doc.setFontSize(11);
    doc.text('De conformidad con la sentencia emitida por el juzgado tercero de primera instancia de familia del municipio de', 10, 220);
    doc.text(this.divorcioService.divorcio.data.municipio+' departamento de Guatemala, con fecha '+this.divorcioService.divorcio.data.fechaDivorcio+', certifica el divorcio de los presentes.', 10, 225);

    var valy=15;  
    doc.setFontSize(9);
    doc.setLineWidth(0.5);
    doc.line(10,225+valy,200,225+valy);
    doc.text('ÚLTIMA LÍNEA',105,230+valy,null,null,'center');

    doc.text('Acta de Divorcio Ref: 1824200', 10, 285);
    doc.text(10, 290, "Fecha de Generación:");
    doc.text(fecha, 160, 290);
    doc.save("Acta_Div" + this.divorcioService.divorcio.data.cuiHombre+'_'+this.divorcioService.divorcio.data.cuiMujer+ ".pdf");//*/
  }

  searchDivorcio() {
    var resBusqueda = "0";
    var respuesta: any;
    if (this.cui_Hombre && this.cui_Mujer) {
      this.preloader = true;
      var json = '{"cuiHombre": "' + this.cui_Hombre + '",\n"cuiMujer": "' + this.cui_Mujer + '",\n"idPais": "'+this.idPais+'"}';
      console.log(json);
      this.divorcioService.imprimirDivorcio(json)
        .subscribe((res: any) => {
          respuesta = res;
          resBusqueda = res.status;
          this.divorcioService.divorcio = res as Divorcio;
          console.log(this.divorcioService.divorcio);
          this.preloader = false;
        },
          (error: any) => {
            //console.log(error.error);
            M.toast({ html: 'ERROR: ' + error.error.mensaje, displayLength: '5000' });
            this.preloader = false;
          }
        );
    }
  }

  addActaDivorcio(form: NgForm) { 
    form.value.municipio = this.idMunicicipio;
    form.value.fechaDivorcio = this.convertirFecha(form.value.fechaDivorcio);
    //console.log(form.value);
    var status = "0";
    this.divorcioService.registrarDivorcio(form.value)
      .subscribe((res: any) => {
        this.resetForm(form);
        //console.log(res);
        status = res.status;
        if (status === "1") {
          M.toast({ html: 'Acta de divorcio creada, Correctamente: ', displayLength: '8000' });
        }
        else {
          M.toast({ html: 'ERROR: ' + res.mensage, displayLength: '5000' });
        }        
      },
        (error: any) => {
          M.toast({ html: 'ERROR: '+error.error.mensaje, displayLength: '5000' });
        }
      );//*/    
  }


  //metodos depto y muni

  getDepartementos(idPais) {
    var json = '{"idPais": "' + idPais + '"}';
    this.autenticacionService.getDeptos(json)
      .subscribe(res => {
        this.autenticacionService.departamentos = res as Departamentos;
        //this.departamentos={};
        this.departamentos = this.autenticacionService.departamentos.data.listaDepartamentos;
        console.log(this.departamentos);
      });

    delay(600).then(() => {
      this.cargarSelect1();
    });

  }

  getMunicipios(idDepto) {
    var json = '{"idDepartamento": "' + idDepto + '",\n"idPais" : "'+this.idPais+'"}';
    this.autenticacionService.getMunicipios(json)
      .subscribe(res => {
        //this.autenticacionService.municipios= new Municipios();       
        this.autenticacionService.municipios = res as Municipios;
        this.municipios = this.autenticacionService.municipios.data.listaMunicipios;
        //console.log(this.municipios);
      });

    delay(600).then(() => {
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
    var format=newFecha[2]+newFecha[1]+newFecha[0]+"000000";
    return format;
  }

}
