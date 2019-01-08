import { Component, OnInit } from '@angular/core';
import { DefuncionService } from '../../services/defuncion.service';
import { NgForm, NgModel, NgControl } from '@angular/forms';
import * as jsPDF from 'jspdf';
import { DatosDef } from '../../models/datosDef';
import { Defuncion } from 'src/app/models/defuncion';

//para dptos y munis
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { Departamentos } from 'src/app/models/departamentos';
import { Municipios } from 'src/app/models/municipios';
import { delay } from 'q';
//fecha/hora
import { formatDate } from '@angular/common';

declare var M: any;

@Component({
  selector: 'app-defunciones',
  templateUrl: './defunciones.component.html',
  styleUrls: ['./defunciones.component.css'],
  providers: [DefuncionService]
})
export class DefuncionesComponent implements OnInit {

  preloader = false;
  modify: Boolean = false;

  departamentos: {};
  municipios: {};
  idPais: any;
  idDepartamento: any;
  idMunicicipio: any;

  constructor(private autenticacionService: AutenticacionService, private defuncionService: DefuncionService) {
    this.idPais = localStorage.getItem('Pais');
    this.getDepartementos(this.idPais);
    this.idMunicicipio = localStorage.getItem('Muni');

  }

  ngOnInit() {
    //this.defuncionService.defuncion = new Defuncion();
    
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.defuncionService.selectedDefuncion = new Defuncion();
      this.defuncionService.selectedDefuncion.data = new DatosDef();
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
    var fecha = '';
    fecha = formatDate(now, 'dd/MM/yyyy hh:mm:ss a', 'en-US', '-0600');
    doc.text('Registo Nacional de las Personas', 105, 10, null, null, 'center');
    doc.setFontSize(10);
    doc.text('República de Guatemala', 105, 15, null, null, 'center');

    doc.setFontSize(12);
    doc.text('Registro Civil de las Personas', 105, 25, null, null, 'center');
    doc.text('Certificado de Defunción', 105, 30, null, null, 'center');
    //imagenes;
    var img = new Image();
    img.src = 'assets/renap.jpg';
    doc.addImage(img, 'JPG', 4, 2, 45, 15);

    var img = new Image();
    img.src = 'assets/logo2.png';
    doc.addImage(img, 'PNG', 10, 50, 195, 195);

    var img = new Image();
    img.src = 'assets/foto.png';
    doc.addImage(img, 'PNG', 10, 75, 40, 40);

    var img = new Image();
    img.src = 'assets/foto.png';
    doc.addImage(img, 'PNG', 10, 175, 40, 40);


    doc.setFontStyle("normal");
    doc.text('El infrascrito Registrador Civil de las Personas del Registro Nacional de las Personas del', 105, 40, null, null, 'center');
    doc.text('Municipio de ' + this.defuncionService.defuncion.data.municipio + ', Departamento de ' + this.defuncionService.defuncion.data.departamento, 105, 45, null, null, 'center');

    doc.text('CERTIFICA', 105, 55, null, null, 'center');

    doc.text('Que con fecha inscrita en el acta de defunción de los presentes, en el registro civil del municipio de', 105, 60, null, null, 'center');
    doc.text(this.defuncionService.defuncion.data.municipio + ', Departamento de ' + this.defuncionService.defuncion.data.departamento +
      ', quedó inscrita la defunción No. 13021995', 105, 65, null, null, 'center');

    doc.setFontSize(12);
    doc.setFont("times");
    doc.setFontStyle("bold");
    //-----datos Hombre
    doc.text('Datos del Inscrito:', 60, 75);
    //CUI
    doc.setLineWidth(0.5);
    doc.setFontStyle("normal");
    doc.setFontSize(10);
    doc.text(this.defuncionService.defuncion.data.cui, 60, 80);
    doc.line(60, 82, 200, 82);
    doc.setFontSize(9);
    doc.text('Código Único de Identificación CUI', 60, 85);
    //Nombres y apellidos
    doc.setFontSize(10);
    doc.text(this.defuncionService.defuncion.data.nombre + ' ' + this.defuncionService.defuncion.data.apellido, 60, 90);
    doc.line(60, 92, 200, 92);
    doc.setFontSize(9);
    doc.text('Nombres y apellidos del inscrito', 60, 95);
    //Lugar Nac
    doc.setFontSize(10);
    doc.text(this.defuncionService.defuncion.data.pais + ', ' + this.defuncionService.defuncion.data.departamento + ', ' + this.defuncionService.defuncion.data.municipio, 60, 100);
    doc.line(60, 102, 200, 102);
    doc.setFontSize(9);
    doc.text('Pais, Departamento, Municipio de nacimiento', 60, 105);
    //Fecha Nac
    doc.setFontSize(10);
    doc.text(this.defuncionService.defuncion.data.fechaNacimiento, 60, 110);
    doc.line(60, 112, 200, 112);
    doc.setFontSize(9);
    doc.text('Fecha de nacimiento', 60, 115);
    //Recidencia
    doc.setFontSize(10);
    doc.text(this.defuncionService.defuncion.data.lugarDefuncion, 60, 120);
    doc.line(60, 122, 200, 122);
    doc.setFontSize(9);
    doc.text('Residencia', 60, 125);
    //Genero
    doc.setFontSize(10);
    doc.text(this.defuncionService.defuncion.data.genero, 60, 130);
    doc.line(60, 132, 200, 132);
    doc.setFontSize(9);
    doc.text('Género', 60, 135);
    //estado civil
    doc.setFontSize(10);
    doc.text(this.defuncionService.defuncion.data.estadoCivil, 60, 140);
    doc.line(60, 142, 200, 142);
    doc.setFontSize(9);
    doc.text('Estado Civil', 60, 145);
    //datos conyuge
    doc.setFontSize(10);
    doc.text(this.defuncionService.defuncion.data.nombreConyuge+' '+this.defuncionService.defuncion.data.apellidoConyuge, 60, 150);
    doc.line(60, 152, 200, 152);
    doc.setFontSize(9);
    doc.text('Nombres y apellidos del conyugue', 60, 155);
    //Ocupacion
    doc.setFontSize(10);
    doc.text('Desconocida', 60, 160);
    doc.line(60, 162, 200, 162);
    doc.setFontSize(9);
    doc.text('Ocupación', 60, 165);

    //-----datos del compa
    doc.setFontSize(12);
    doc.setFont("times");
    doc.setFontStyle("bold");
    doc.text('Datos del Compareciente:', 60, 175);
    //CUI
    doc.setLineWidth(0.5);
    doc.setFontStyle("normal");
    doc.setFontSize(10);
    doc.text(this.defuncionService.defuncion.data.cuiCompareciente, 60, 180);
    doc.line(60, 182, 200, 182);
    doc.setFontSize(9);
    doc.text('Código Único de Identificación CUI', 60, 185);
    //Nombres y apellidos
    doc.setFontSize(10);
    doc.text(this.defuncionService.defuncion.data.nombreCompareciente + ' ' + this.defuncionService.defuncion.data.apellidoCompareciente, 60, 190);
    doc.line(60, 192, 200, 192);
    doc.setFontSize(9);
    doc.text('Nombres y apellidos del comparciente', 60, 195);
    //Lugar Nac
    doc.setFontSize(10);
    doc.text(this.defuncionService.defuncion.data.paisCompareciente + ', ' + this.defuncionService.defuncion.data.departamentoCompareciente + ', ' + this.defuncionService.defuncion.data.municipioCompareciente, 60, 200);
    doc.line(60, 202, 200, 202);
    doc.setFontSize(9);
    doc.text('Pais, Departamento, Municipio de nacimiento', 60, 205);
    //recidencia del Compa
    doc.setFontSize(10);
    doc.text(this.defuncionService.defuncion.data.recidenciaCompareciente, 60, 210);
    doc.line(60, 212, 200, 212);
    doc.setFontSize(9);
    doc.text('Residencia del comparciente', 60, 215);
    //Ocupacion
    doc.setFontSize(10);
    doc.text('Desconocida', 60, 220);
    doc.line(60, 222, 200, 222);
    doc.setFontSize(9);
    doc.text('Ocupación', 60, 225);


    //-----datos defuncion
    doc.setFontSize(12);
    doc.setFont("times");
    doc.setFontStyle("bold");
    doc.text('Datos del defuncion:', 60, 235);
    //lugar del defuncion
    doc.setLineWidth(0.5);
    doc.setFontStyle("normal");
    doc.setFontSize(10);
    doc.text(this.defuncionService.defuncion.data.paisDefuncion+', '+this.defuncionService.defuncion.data.departamentoDefuncion+', '+this.defuncionService.defuncion.data.lugarDefuncion, 60, 240);
    doc.line(60, 242, 200, 242);
    doc.setFontSize(9);
    doc.text('Lugar de fallecimiento', 60, 245);
    //fecha del defuncion
    doc.setFontSize(10);
    doc.text(this.defuncionService.defuncion.data.fechaDefuncion, 60, 250);
    doc.line(60, 252, 200, 252);
    doc.setFontSize(9);
    doc.text('Fecha del fallecimiento', 60, 255);
    //regimen economico
    doc.setFontSize(10);
    doc.text(this.defuncionService.defuncion.data.causa, 60, 260);
    doc.line(60, 262, 200, 262);
    doc.setFontSize(9);
    doc.text('Causa', 60, 265);


    /*doc.setFontSize(12);
    doc.setFont("times");
    doc.setFontStyle("bold");
    doc.text('Observación:', 10, 215);
    doc.setFontStyle("normal");
    doc.setFontSize(11);
    doc.text('De conformidad con la sentencia emitida por el juzgado tercero de primera instancia de familia del municipio de', 10, 220);
    doc.text(this.defuncionService.defuncion.data.municipio + ' departamento de Guatemala, con fecha ' + this.defuncionService.defuncion.data.fechaMatrimonio + ', certifica el defuncion de los presentes.', 10, 225);*/

    var valy =0;
    doc.setFontSize(9);
    doc.setLineWidth(0.5);
    doc.line(10, 275 + valy, 200, 275 + valy);
    doc.text('ÚLTIMA LÍNEA', 105, 280 + valy, null, null, 'center');

    doc.text('Acta de Defunción Ref: 1824200', 10, 285);
    doc.text(10, 290, "Fecha de Generación:");
    doc.text(fecha, 160, 290);
    doc.save("Acta_Def" + this.defuncionService.defuncion.data.cui+ ".pdf");//*/
  }

  searchDefuncion(value: String) {
    if (value) {
      this.preloader = true;
      var json = '{"cui":"' + value + '",\n"idPais" : "'+this.idPais+'"}';
      this.defuncionService.imprimirDefuncion(json)
        .subscribe(res => {
          this.defuncionService.defuncion = res as Defuncion;
          //console.log(this.defuncionService.defuncion.datos.cui);
          this.preloader = false;
        },
          (error: any) => {
            M.toast({ html: 'ERROR: ' + error.error.mensaje, displayLength: '5000' });
            this.preloader = false;
          }
        );
    }
  }

  addActaDefuncion(form: NgForm) {
    console.log(form.value);
    form.value.municipio = this.idMunicicipio;
    form.value.fechaDefuncion = this.convertirFecha(form.value.fechaDefuncion);
    var status = "0";
    //    
    this.defuncionService.registrarDefuncion(form.value)
      .subscribe((res: any) => {
        this.resetForm(form);
        status = res.status;
        if (status === "1") {
          M.toast({ html: 'Acta de defunción creada Correctamente.', displayLength: '8000' });
        }
        else {
          M.toast({ html: 'ERROR: ' + res.mensage, displayLength: '5000' });
        }
        //console.log(res);
      },
        (error: any) => {
          M.toast({ html: 'ERROR: ' + error.error.mensaje, displayLength: '5000' });
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

    delay(500).then(() => {
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
