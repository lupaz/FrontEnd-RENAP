import { Component, OnInit } from '@angular/core';
import { MatrimonioService } from '../../services/matrimonio.service';
import { NgForm, NgModel, NgControl } from '@angular/forms';
import { Matrimonio } from 'src/app/models/matrimonio';
import { DatosMat } from 'src/app/models/datosMat';
import * as jsPDF from 'jspdf'

//para dptos y munis
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { Departamentos } from 'src/app/models/departamentos';
import { Municipios } from 'src/app/models/municipios';
import { delay } from 'q';
//fecha/hora
import { formatDate } from '@angular/common';



declare var M: any;

@Component({
  selector: 'app-matrimonios',
  templateUrl: './matrimonios.component.html',
  styleUrls: ['./matrimonios.component.css'],
  providers: [MatrimonioService]
})
export class MatrimoniosComponent implements OnInit {

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
  regimenes: {};


  constructor(private autenticacionService: AutenticacionService, private matrimonioService: MatrimonioService) {
    this.idPais = localStorage.getItem('Pais');
    this.getDepartementos(this.idPais);
    this.idMunicicipio = localStorage.getItem('Muni');
    this.regimenes = [
      { id: 1, regimen: "Comunidad Absoluta de Bienes" },
      { id: 2, regimen: "Separacion Absoluta de Bienes" },
      { id: 3, regimen: "Comunidad de Gananciales" }
    ];

    delay(0).then(() => {
      this.cargarSelect3();
    });

  }

  ngOnInit() {

  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.matrimonioService.selectedMatrimonio = new Matrimonio();
      this.matrimonioService.selectedMatrimonio.data = new DatosMat();
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
    doc.text('Certificado de Matrimonio',105,30,null,null,'center');
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
    doc.text('Municipio de '+this.matrimonioService.matrimonio.data.municipio+', Departamento de Guatemala',105,45,null,null,'center');

    doc.text('CERTIFICA',105,55,null,null,'center');
    
    doc.text('Que con fecha inscrita en el acta de matrimonio de los presentes, en el registro civil del municipio de',105,60,null,null,'center');
    doc.text(this.matrimonioService.matrimonio.data.municipio+', Departamento de Guatemala'+
    ', quedo inscrito el matrimonio No. 13021995',105,65,null,null,'center');

    doc.setFontSize(12);
    doc.setFont("times");
    doc.setFontStyle("bold");
    //-----datos Hombre
    doc.text('Datos del Hombre:', 60, 75);
    //CUI
    doc.setLineWidth(0.5);
    doc.setFontStyle("normal");
    doc.setFontSize(10);
    doc.text(this.matrimonioService.matrimonio.data.cuiHombre+"", 60, 80);
    doc.line(60, 82, 200, 82);
    doc.setFontSize(9);
    doc.text('Código Único de Identificación CUI',60,85);
    //Nombres y apellidos
    doc.setFontSize(10);
    doc.text(this.matrimonioService.matrimonio.data.nombreHombre+' '+this.matrimonioService.matrimonio.data.apellidoHombre, 60, 90);
    doc.line(60, 92, 200, 92);
    doc.setFontSize(9);
    doc.text('Nombres y apellidos del hombre',60,95);
    //Lugar Nac
    doc.setFontSize(10);
    doc.text(this.matrimonioService.matrimonio.data.paisHombre+', '+this.matrimonioService.matrimonio.data.departamentoHombre+', '+this.matrimonioService.matrimonio.data.municipioHombre, 60, 100);
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
    doc.text(this.matrimonioService.matrimonio.data.cuiMujer+"", 60, 130);
    doc.line(60, 132, 200, 132);
    doc.setFontSize(9);
    doc.text('Código Único de Identificación CUI',60,135);
    //Nombres y apellidos
    doc.setFontSize(10);
    doc.text(this.matrimonioService.matrimonio.data.nombreMujer+' '+this.matrimonioService.matrimonio.data.apellidoMujer, 60, 140);
    doc.line(60, 142, 200, 142);
    doc.setFontSize(9);
    doc.text('Nombres y apellidos del hombre',60,145);
    //Lugar Nac
    doc.setFontSize(10);
    doc.text(this.matrimonioService.matrimonio.data.paisMujer+', '+this.matrimonioService.matrimonio.data.departamentoMujer+', '+this.matrimonioService.matrimonio.data.municipioMujer, 60, 150);
    doc.line(60, 152, 200, 152);
    doc.setFontSize(9);
    doc.text('Pais, Departamento, Municipio de nacimiento',60,155);    
    //Ocupacion
    doc.setFontSize(10);
    doc.text('Desconocida', 60, 160);
    doc.line(60, 162, 200, 162);
    doc.setFontSize(9);
    doc.text('Ocupación',60,165);

    //-----datos matrimonio
    doc.setFontSize(12);
    doc.setFont("times");
    doc.setFontStyle("bold");
    doc.text('Datos del matrimonio:', 60, 175);
    //lugar del matrimonio
    doc.setLineWidth(0.5);
    doc.setFontStyle("normal");
    doc.setFontSize(10);
    doc.text(this.matrimonioService.matrimonio.data.lugarMatrimonio+"", 60, 180);
    doc.line(60, 182, 200, 182);
    doc.setFontSize(9);
    doc.text('Lugar del matrimonio',60,185);
    //fecha del matrimonio
    doc.setFontSize(10);
    doc.text(this.matrimonioService.matrimonio.data.fechaMatrimonio+"", 60, 190);
    doc.line(60, 192, 200, 192);
    doc.setFontSize(9);
    doc.text('Fecha del matrimonio',60,195);
    //regimen economico
    doc.setFontSize(10);
    doc.text(this.matrimonioService.matrimonio.data.regimenMatrimonial+"", 60, 200);
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
    doc.text(this.matrimonioService.matrimonio.data.municipio+' departamento de Guatemala, con fecha '+this.matrimonioService.matrimonio.data.fechaMatrimonio+', certifica el matrimonio de los presentes.', 10, 225);

    var valy=15;  
    doc.setFontSize(9);
    doc.setLineWidth(0.5);
    doc.line(10,225+valy,200,225+valy);
    doc.text('ÚLTIMA LÍNEA',105,230+valy,null,null,'center');

    doc.text('Acta de Matrimonio Ref: 1824200', 10, 285);
    doc.text(10, 290, "Fecha de Generación:");
    doc.text(fecha, 160, 290);
    doc.save("Acta_Mat" + this.matrimonioService.matrimonio.data.cuiHombre+'_'+this.matrimonioService.matrimonio.data.cuiMujer+ ".pdf");//*/
  }

  searchMatrimonio() {
    var resBusqueda = "0";
    var respuesta: any;
    if (this.cui_Hombre && this.cui_Mujer) {
      this.preloader = true;
      var json = '{"cuiHombre": "' + this.cui_Hombre + '",\n"cuiMujer": "' + this.cui_Mujer + '",\n"idPais": "'+this.idPais+'"}';
      console.log(json);
      this.matrimonioService.imprimirMatrimonio(json)
        .subscribe((res: any) => {
          respuesta = res;
          resBusqueda = res.status;
          this.matrimonioService.matrimonio = res as Matrimonio;
          console.log(this.matrimonioService.matrimonio);
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

  addActaMatrimonio(form: NgForm) { 
    form.value.municipio = this.idMunicicipio;
    form.value.fechaMatrimonio = this.convertirFecha(form.value.fechaMatrimonio);
    //console.log(form.value);
    var status = "0";
    this.matrimonioService.registrarMatrimonio(form.value)
      .subscribe((res: any) => {
        this.resetForm(form);
        //console.log(res);
        status = res.status;
        if (status === "1") {
          M.toast({ html: 'Acta de matrimonio creada, Correctamente: ', displayLength: '8000' });
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

  cargarSelect3() {
    var elem = document.getElementById('selectReg');
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
    var format=newFecha[2]+newFecha[1]+newFecha[0]+"000000";
    return format;
  }

}
