import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DatosDepto } from '../models/datosDepto';
import { Departamentos } from '../models/departamentos';
import { DataD } from '../models/datoDepto';
import { DatosMuni } from '../models/datosMuni';
import { Municipios } from '../models/municipios';
import { DataM } from '../models/datoMuni';
@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  departamentos: Departamentos;
  municipios: Municipios; 
  readonly URL_API = 'http://35.233.139.110:3000/api';

  constructor(private router: Router,private http: HttpClient) { 
    this.departamentos = new Departamentos();
    this.departamentos.data= new DataD();
    this.departamentos.data.listaDepartamentos = new DatosDepto()[22];

    this.municipios = new Municipios();
    this.municipios.data= new DataM();
    this.municipios.data.listaMunicipios = new DatosMuni();
  }


  getDeptos(pais) {
    console.log(pais);
    return this.http.post(this.URL_API+'/obtenerListaDepartamentos',pais,{
      headers: { 'Content-Type':'application/json'}});
  }


  getMunicipios(depto) {
    console.log(depto);
    return this.http.post(this.URL_API+'/obtenerListaMunicipios',depto,{
      headers: { 'Content-Type':'application/json'}});
  }
  
  
  public estaAutenticado(): boolean {
    var dpto =localStorage.getItem('Dpto');
    if( parseInt(dpto,10) >0 && parseInt(dpto,10) < 22  ){
        return true;
    }else{
      return false;
    }
    
  }

  public salir(): void {
    localStorage.removeItem('Dpto');
    localStorage.removeItem('Muni');
    this.router.navigateByUrl('/');
  }

}
