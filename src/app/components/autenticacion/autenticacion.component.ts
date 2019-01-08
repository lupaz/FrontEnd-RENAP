import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { Departamentos } from 'src/app/models/departamentos';
import { Municipios } from 'src/app/models/municipios';
import { delay } from 'q';



declare var M: any;

@Component({
  selector: 'app-auntenticacion',
  templateUrl: './autenticacion.component.html',
  styleUrls: ['./autenticacion.component.css'],
  providers: [AutenticacionService]
})


export class AutenticacionComponent implements OnInit {


  departamentos: {};
  municipios: {};
  paises: {};
  idPais:any;
  idDepartamento: any;
  idMunicicipio: any;

  constructor(private autenticacionService: AutenticacionService, private router: Router) {    
    this.paises = [
      { id: 1, pais: "Grupo 1" },
      { id: 2, pais: "Grupo 2" },
      { id: 3, pais: "La tiraron" },
      { id: 4, pais: "Grupo 4" },
      { id: 5, pais: "Grupo 5" },
      { id: 6, pais: "Grupo 6" }
    ];

    delay(100).then(() => {
      this.cargarSelect0();
    });
  }

  ngOnInit() {

  }

  getDepartementos(idPais) {
    var json = '{"idPais": "'+idPais+'"}';
    this.autenticacionService.getDeptos(json)
      .subscribe(res => {
        this.autenticacionService.departamentos = res as Departamentos;
        //this.departamentos={};
        this.departamentos = this.autenticacionService.departamentos.data.listaDepartamentos;
        //console.log(this.departamentos);
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

  cargarSelect0() {
    var elem = document.getElementById('select0');
    var instance = M.FormSelect.init(elem);
    //var elems = document.querySelectorAll('select');
    //var instances = M.FormSelect.init(elems, this.departamentos);
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
    //var elems = document.querySelectorAll('select');
    //var instances = M.FormSelect.init(elems, this.departamentos);
  }
  
  paisSelected (paisSelected){
    this.idPais=paisSelected;
    this.getDepartementos(paisSelected);
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

  autenticar() {
    localStorage.setItem('Pais', this.idPais);
    localStorage.setItem('Dpto', this.idDepartamento);
    localStorage.setItem('Muni', this.idMunicicipio);
    this.router.navigateByUrl('/nacimientos');
  }

}
