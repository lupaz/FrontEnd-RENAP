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
    }
  }

  imprimeActa() {

  }

  searchDefuncion(value: String) {
    if (value) {
      this.preloader = true;
      var json = '{"cui":"' + value + '"}';
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
    form.value.municipio=this.idMunicicipio;
    form.value.fechaDefuncion=this.convertirFecha(form.value.fechaDefuncion);      
    var status="0";
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
      (error:any)=>{
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
