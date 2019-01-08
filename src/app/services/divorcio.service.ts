import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Divorcio } from '../models/divorcio';
import { DatosDiv } from '../models/datosDiv';
import { DIRS } from '../models/uri';

@Injectable({
  providedIn: 'root'
})
export class DivorcioService {
  
  divorcio: Divorcio;
  selectedDivorcio: Divorcio; 
  readonly URL_API = DIRS.uri;

  constructor(private http: HttpClient) {
    this.selectedDivorcio = new Divorcio();
    this.selectedDivorcio.data= new DatosDiv();
    this.divorcio= new Divorcio();
    this.divorcio.data = new DatosDiv();
  }

  imprimirDivorcio(divorcio) {
    console.log(divorcio);
    return this.http.post(this.URL_API+'/imprimirDivorcio', divorcio,{
      headers: { 'Content-Type':'application/json'}});
  }

  registrarDivorcio(divorcio) {
    console.log(divorcio);
    return this.http.post(this.URL_API+'/registrarDivorcio', divorcio,{
      headers: { 'Content-Type':'application/json'}});
  }

}