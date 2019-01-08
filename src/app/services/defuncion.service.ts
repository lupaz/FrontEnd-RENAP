import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatosDef } from '../models/datosDef';
import { Defuncion } from '../models/defuncion';

@Injectable({
  providedIn: 'root'
})
export class DefuncionService {

  defuncion: Defuncion;
  selectedDefuncion: Defuncion; 
  readonly URL_API = 'http://35.233.139.110:3000/api';

  constructor(private http: HttpClient) {
    this.selectedDefuncion = new Defuncion();
    this.selectedDefuncion.data = new DatosDef();
    this.defuncion= new Defuncion();
    this.defuncion.data= new DatosDef();
  }

  imprimirDefuncion(defuncion) {
    //console.log(defuncion);
    return this.http.post(this.URL_API+'/imprimirDefuncion', defuncion,{
      headers: { 'Content-Type':'application/json'}});
  }

  registrarDefuncion(defuncion) {
    //console.log(defuncion);
    return this.http.post(this.URL_API+'/registrarDefuncion', defuncion,{
      headers: { 'Content-Type':'application/json'}});
  }
}
