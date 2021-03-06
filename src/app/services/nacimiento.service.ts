import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Datos } from '../models/datos';
import { Nacimiento } from '../models/nacimiento';
import { DIRS } from '../models/uri';

@Injectable({
  providedIn: 'root'
})
export class NacimientoService {
  
  nacimiento: Nacimiento;
  selectedNacimiento: Nacimiento; 
  readonly URL_API = DIRS.uri;

  constructor(private http: HttpClient) {
    this.selectedNacimiento = new Nacimiento();
    this.selectedNacimiento.data = new Datos();
    this.nacimiento= new Nacimiento();
    this.nacimiento.data= new Datos();
  }

  imprimirNacimiento(json) {
    return this.http.post(this.URL_API+'/imprimirNacimiento',json,{
    headers: { 'Content-Type':'application/json'}});
  }

  registrarNacimiento(json) {
    //console.log(nacimiento);
    return this.http.post(this.URL_API+'/registrarNacimiento',json,{
      headers: { 'Content-Type':'application/json'}});
  }

}
