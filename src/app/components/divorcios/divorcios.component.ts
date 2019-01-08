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
    }
  }

  imprimeActa() {

  }

  searchDivorcio() {
    var resBusqueda = "0";
    var respuesta: any;
    if (this.cui_Hombre && this.cui_Mujer) {
      this.preloader = true;
      var json = '{"cuiHombre": "' + this.cui_Hombre + '",\n"cuiMujer": "' + this.cui_Mujer + '"}';
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

  deptoSelected(deptoSelected) {
    //console.log("Selecciono un depto No. "+deptoSelected);
    this.idDepartamento = deptoSelected;
    this.getMunicipios(deptoSelected);
  }

  muniSelected(muniSelected) {
    //console.log("Selecciono un municipio id -> "+muniSelected);
    this.idMunicicipio = muniSelected;
  }

  convertirFecha(fecha: string) {
    var newFecha = fecha.split("-");
    var format = newFecha[2] + '/' + newFecha[1] + '/' + newFecha[0];
    return format;
  }

}
