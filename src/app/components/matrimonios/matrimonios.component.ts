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
    }
  }

  imprimeActa() {

  }

  searchMatrimonio() {
    var resBusqueda = "0";
    var respuesta: any;
    if (this.cui_Hombre && this.cui_Mujer) {
      this.preloader = true;
      var json = '{"cuiHombre": "' + this.cui_Hombre + '",\n"cuiMujer": "' + this.cui_Mujer + '"}';
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

  convertirFecha(fecha: string) {
    var newFecha = fecha.split("-");
    var format = newFecha[2] + '/' + newFecha[1] + '/' + newFecha[0];
    return format;
  }

}
