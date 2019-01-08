import { Component } from '@angular/core';
import { AutenticacionService } from './services/autenticacion.service';
import { NacimientoService } from './services/nacimiento.service';
import { DefuncionService} from './services/defuncion.service';
import { MatrimonioService} from './services/matrimonio.service';
import { DivorcioService} from './services/divorcio.service';
 
declare var M: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Renap';

  optionsTabs = {
    duration: 300,
    swipeable: true,
    responsiveThreshold: 1366
  };

  constructor(
    public autenticacionService: AutenticacionService,
    public nacimientoService: NacimientoService,
    public defuncionService: DefuncionService,
    public matrimonioService: MatrimonioService,
    public divorcioService : DivorcioService 
    ) {
      document.addEventListener('DOMContentLoaded', function() {
        const elemsTabs = document.querySelectorAll('.tabs');
        // const elemsModal = document.querySelectorAll('.modal');
        M.Tabs.init(elemsTabs, this.optionsTabs);
        // M.Modal.init(elemsModal, this.optionsModal);
      });
  }
}
