import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Matrimonio } from '../models/matrimonio';
import { DatosMat } from '../models/datosMat';

@Injectable({
  providedIn: 'root'
})
export class MatrimonioService {
  
  matrimonio: Matrimonio;
  selectedMatrimonio: Matrimonio; 
  readonly URL_API = 'http://35.233.139.110:3000/api';

  constructor(private http: HttpClient) {
    this.selectedMatrimonio = new Matrimonio();
    this.selectedMatrimonio.data= new DatosMat();
    this.matrimonio= new Matrimonio();
    this.matrimonio.data = new DatosMat();
  }

  imprimirMatrimonio(matrimonio) {
    console.log(matrimonio);
    return this.http.post(this.URL_API+'/imprimirMatrimonio', matrimonio,{
      headers: { 'Content-Type':'application/json'}});
  }

  registrarMatrimonio(matrimonio) {
    console.log(matrimonio);
    return this.http.post(this.URL_API+'/registrarMatrimonio', matrimonio,{
      headers: { 'Content-Type':'application/json'}});
  }

}