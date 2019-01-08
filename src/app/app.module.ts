import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//componentes
import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { AutenticacionComponent } from './components/autenticacion/autenticacion.component';
import { NacimientosComponent } from './components/nacimientos/nacimientos.component'
import { DefuncionesComponent } from './components/defunciones/defunciones.component'
import { MatrimoniosComponent } from './components/matrimonios/matrimonios.component';
import { DivorciosComponent } from './components/divorcios/divorcios.component';
//servicios
import { AutenticacionService } from './services/autenticacion.service';
import { AutenticacionMiddleware } from './middlewares/autenticacion.middleware';
import { NacimientoService } from './services/nacimiento.service';
import { DefuncionService } from './services/defuncion.service';
import { MatrimonioService } from './services/matrimonio.service';
import { DivorcioService } from './services/divorcio.service';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'autenticar', component: AutenticacionComponent },
  { path: 'nacimientos', component: NacimientosComponent, canActivate: [AutenticacionMiddleware] },
  { path: 'defunciones', component: DefuncionesComponent, canActivate: [AutenticacionMiddleware] },
  { path: 'matrimonios', component: MatrimoniosComponent, canActivate: [AutenticacionMiddleware] },
  { path: 'divorcios', component: DivorciosComponent, canActivate: [AutenticacionMiddleware] }
];

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    AutenticacionComponent,
    NacimientosComponent,
    DefuncionesComponent,
    MatrimoniosComponent,
    DivorciosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    AutenticacionService,
    AutenticacionMiddleware,
    NacimientoService,
    DefuncionService,
    MatrimonioService,
    DivorcioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
